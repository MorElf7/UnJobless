import React, { useState, useEffect, useMemo } from 'react';
import { ChakraProvider, Box, Image, Text, Button, VStack, CloseButton, IconButton, TabPanel, Tab, Tabs, TabList, TabPanels, Icon, UnorderedList, ListItem, Spacer, Flex, Divider, Link } from '@chakra-ui/react';
import { PopupProps, Profile } from '@root/src/shared/typing/types';
import { AutoFillManager, EventEmitter } from './auto/autoManager';
import { defaultProfile } from '@root/src/shared/typing/constant';
import { GreenHouseAutoFillManager } from './auto/greenhouse';
import { Scrollbar, ScrollbarPlugin } from "smooth-scrollbar-react";
import { DefaultManager } from './auto/defaultManager';
import TextToCopy from './components/TextToCopy';
import ProfileActionButtons from './components/ProfileActionButtons';


const Popup = ({ type } : PopupProps) => {
    const [profile, setProfile] = useState<Profile>(defaultProfile);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);
    const eventEmitter = new EventEmitter();


    // let autoFillManager: AutoFillManager;
    const autoFillManager: AutoFillManager = useMemo(() => {
        switch (type) {
            case 0:
                return new GreenHouseAutoFillManager(eventEmitter);
            default:
                alert('Provider is not supported.');
                return new DefaultManager(eventEmitter);
        }
    }, [type]);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Wrap chrome.storage.sync.get into a Promise
                const getProfile = () => new Promise((resolve, reject) => {
                    chrome.storage.sync.get(['profile'], (result) => {
                        if (chrome.runtime.lastError) {
                            reject(new Error(chrome.runtime.lastError.message));
                        } else {
                            resolve(result.profile ? JSON.parse(result.profile) : undefined);
                        }
                    });
                });

                const profile: Profile = await getProfile() as Profile;
                if (profile) {
                    setProfile(profile);
                } else {
                    const requestProfile = () => new Promise((resolve, reject) => {
                        chrome.runtime.sendMessage({ method: "getProfile" }, (response) => {
                            if (chrome.runtime.lastError) {
                                reject(new Error(chrome.runtime.lastError.message));
                            } else if (response) {
                                resolve(response);
                            } else {
                                reject(new Error("Failed to fetch profile."));
                            }
                        });
                    });

                    const profileFromMessage: Profile = await requestProfile() as Profile;
                    setProfile(profileFromMessage);
                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };
        fetchProfile();
    }, []);

    const handleLoading = (isLoading: boolean): void => {
        setLoading(isLoading);
    };
    eventEmitter.subscribe<boolean>('loading', handleLoading);

    const handleDocumnet = (): void => {
        autoFillManager.fillUpload(profile);
    }

    const handleAutofill = () => {
        autoFillManager.autoFill(profile);
    };

    const handleIdentityFields = () => {
        autoFillManager.fillIdentityFields(profile);
    }

    const editProfile = () => {
        const path = 'https://www.google.com/'
        window.open(path, '_blank');
    }

    return (
        <ChakraProvider>
            <Box
                id="unjobless_container"
                position="fixed"
                top="30px" 
                right="5px"
                maxWidth={['240px', '360px']} // This sets responsive width
                maxHeight="80vh"
                bg="white"
                maxW="420px"
                borderRadius="15px"
                m="4"
                p="6"
                boxShadow="xl"
                border="1px solid #E1E1E9"
                color="gray.700"
                overflowY="auto" 
                overflow="hidden"
            >   
            {close ? 
                <Box>
                    <Image src={chrome.runtime.getURL("logo.svg")} alt="Unjobless Logo" width='150px' height='auto' objectFit='contain' />
                    <Button onClick={() => setClose(false)}>Open</Button>
                </Box> :
                <Box>
                    <Box display="flex" 
                        // gap={['150px', '130px']} 
                        justifyContent="space-between"
                        padding="5px" 
                        paddingBottom="15px">
                        <Image 
                            src={chrome.runtime.getURL("logo.svg")} 
                            alt="Unjobless Logo"
                            width='150px' // This sets responsive width
                            height='auto'
                            objectFit='contain'
                        />
                        <CloseButton 
                            size='lg' 
                            bg={'transparent'}
                            _hover={{ bg: 'transparent' }}
                            _active={{ bg: 'transparent' }}
                            onClick={() => setClose(true)} />
                    </Box>
                    <VStack spacing={5}>
                        <Text fontSize="14px"  fontFamily="'Ubuntu', sans-serif">Get ready to job hunt like a boss! Hit 'Let's Do It!' and watch the magic happen!</Text>
                        <Button 
                            size="lg" 
                            fontFamily="Nunito"
                            fontWeight="bold"
                            width="100%"
                            bgColor='#45BC7A'
                            isLoading = {loading}
                            loadingText='Auto-filling...'
                            color="white"
                            _hover={{ bg: '#3DA367' }}
                            onClick={handleAutofill}
                            >
                            LET'S DO IT!!
                        </Button>
                    </VStack>
                    <Box display="flex" flexDirection="row" justifyContent="flex-end">
                    <IconButton
                        aria-label="Page Up"
                        icon={
                        <Image
                            src={chrome.runtime.getURL("Chevron_up.svg")}
                            alt="Page Up"
                            transform={open ? 'rotate(180deg)' : 'rotate(0deg)'}
                            transition="transform 0.2s" // Smooth transition for the rotation
                        />
                        }
                        paddingTop="5px"
                        onClick={() => setOpen(!open)}
                        bg={'transparent'}
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        size="sm"
                    />
                    </Box>

                    { open && (
                        <>
                            <Tabs 
                                isFitted 
                                variant="unstyled"
                                marginTop="7px"
                                fontFamily="Ubuntu"
                                >
                                <TabList mb="1em" shadow="0 0 0 1px #E1E1E9" borderRadius="5px" p="1" marginBottom="5px">
                                    <Tab borderRadius="5px" fontFamily="Nunito" fontWeight="600" _selected={{ color: 'white', bg: '#45BC7A', fontWeight: '700' }}>PROFILE</Tab>
                                    <Tab borderRadius="5px" fontFamily="Nunito" fontWeight="600" _selected={{ color: 'white', bg: '#45BC7A', fontWeight: '700' }}>FUNCTIONALITY</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel padding="3px 0px 5px 0px">
                                        <Box 
                                            width="100%"
                                            maxHeight="45vh"
                                            display="flex"
                                            overflowY="auto"
                                            borderRadius="lg"
                                        >
                                        <Scrollbar  
                                            plugins={{
                                                overscroll: {
                                                effect: "bounce"
                                                } as ScrollbarPlugin
                                            }}
                                        >
                                        <Box width="100%">
                                            <Box>
                                                <Flex paddingBottom="7px" fontWeight="700" fontSize="12px">
                                                <TextToCopy text={profile.first_name} />
                                                <Text paddingRight="3px">, </Text>
                                                <TextToCopy text={profile.last_name} />
                                                </Flex>
                                                <Box display="flex" flexDirection="column">
                                                <Box display="flex" justifyContent="space-between">
                                                    <Box display="flex" alignItems="center">
                                                    <Image 
                                                        boxSize="50px"
                                                        borderRadius='full'
                                                        fallbackSrc='https://via.placeholder.com/50'
                                                    />
                                                    <VStack align="flex-start" paddingLeft="15px" spacing="1px" fontSize="12px" fontWeight="400">
                                                        <Flex>
                                                        <TextToCopy text={profile.city} />
                                                        <Text paddingRight="3px">, </Text>
                                                        <TextToCopy text={profile.state} />
                                                        <Text paddingRight="3px">, </Text>
                                                        <TextToCopy text={profile.zip_code} />
                                                        </Flex>
                                                        <TextToCopy text={profile.email} />
                                                        <TextToCopy text={profile.phone} />
                                                    </VStack>
                                                    </Box>
                                                    <ProfileActionButtons handler={handleIdentityFields} editProfile={editProfile} loading = {loading}/>
                                                </Box>
                                                </Box>
                                            </Box>
                                            <Divider paddingTop="7px" borderColor="#C2D1D9"/>
                                            <Box paddingTop="7px">
                                                <Text paddingBottom="7px" fontWeight="700" fontSize="12px">Education</Text>
                                                <Box display="flex" flexDirection="column">
                                                <Box display="flex" justifyContent="space-between">
                                                    <VStack spacing="5px" align="stretch" w="full">
                                                    {
                                                        profile.education.map((edu, index) => (
                                                            <Box paddingBottom="5px">
                                                                <Box display="flex" alignItems="center" paddingTop="5px">
                                                                <Image 
                                                                    boxSize="50px"
                                                                    borderRadius='full'
                                                                    fallbackSrc='https://via.placeholder.com/50'
                                                                />
                                                                <VStack align="flex-start" paddingLeft="15px" spacing="1px">
                                                                    <Box fontSize="12px" fontWeight="700">
                                                                        <TextToCopy text={edu.name} />
                                                                    </Box>
                                                                    <Flex fontSize="10px" fontWeight="400">
                                                                        <TextToCopy text={edu.degree} />
                                                                        <Text padding="0px 3px 0px 3px"> in </Text>
                                                                        <TextToCopy text={edu.major} />
                                                                    </Flex>
                                                                    <Flex fontSize="10px" fontWeight="400">
                                                                        <TextToCopy text={edu.start_date} />
                                                                        <Text paddingRight="3px" paddingLeft="3px"> - </Text>
                                                                        <TextToCopy text={edu.end_date} />
                                                                    </Flex>
                                                                </VStack>
                                                                </Box>
                                                            </Box>
                                                        ))
                                                    }
                                                    </VStack>
                                                    <ProfileActionButtons handler={handleIdentityFields} editProfile={editProfile} loading = {loading} />
                                                </Box>
                                                </Box>
                                            </Box>
                                            <Divider paddingTop="7px" borderColor="#C2D1D9"/>
                                            <Box paddingTop="7px">
                                                <Text paddingBottom="7px" fontWeight="700" fontSize="12px">Experience</Text>
                                                <Box display="flex" flexDirection="column">
                                                <Box display="flex" justifyContent="space-between">
                                                    <VStack spacing="5px" align="stretch" w="full">
                                                    {
                                                        profile.experience.map((exp, index) => (
                                                            <VStack paddingBottom="5px" align="stretch" w="full" spacing="5px"> 
                                                                <Box display="flex" alignItems="center" paddingTop="5px">
                                                                <Image 
                                                                    boxSize="50px"
                                                                    borderRadius='full'
                                                                    fallbackSrc='https://via.placeholder.com/50'
                                                                />
                                                                <VStack align="flex-start" paddingLeft="15px" spacing="1px">
                                                                    <Box fontSize="12px" fontWeight="700">
                                                                        <TextToCopy text={exp.position} />
                                                                    </Box>
                                                                    <Flex fontSize="10px" fontWeight="400">
                                                                        <TextToCopy text={exp.position} />
                                                                        <Text padding="0px 3px 0px 3px">, </Text>
                                                                        <TextToCopy text={exp.location} />
                                                                    </Flex>
                                                                    <Flex fontSize="10px" fontWeight="400">
                                                                        <TextToCopy text={exp.start_date} />
                                                                        <Text paddingRight="3px" paddingLeft="3px"> - </Text>
                                                                        <TextToCopy text={exp.end_date} />
                                                                    </Flex>
                                                                </VStack>
                                                                </Box>
                                                                <Box fontSize="12px" fontWeight="400">
                                                                    <TextToCopy text={exp.description} />
                                                                </Box>
                                                            </VStack>
                                                        ))
                                                    }
                                                    </VStack>
                                                    <ProfileActionButtons handler={handleIdentityFields} editProfile={editProfile} loading = {loading} />
                                                </Box>
                                                </Box>
                                            </Box>
                                            <Divider paddingTop="7px" borderColor="#C2D1D9"/>
                                            <Box paddingTop="7px">
                                                <Text paddingBottom="7px" fontWeight="700" fontSize="12px">Documents</Text>
                                                <Box display="flex" flexDirection="column">
                                                <Box display="flex" justifyContent="space-between">
                                                    <VStack spacing="5px" align="stretch" w="full">
                                                    {
                                                        profile.resumeUrl && (
                                                            <VStack paddingBottom="5px" align="stretch" w="full" spacing="5px"> 
                                                                <Box display="flex" alignItems="center" paddingTop="5px">
                                                                <Image 
                                                                    marginLeft="10px"
                                                                    boxSize="30px"
                                                                    src = "https://handshake-production-cdn.joinhandshake.com/assets/filetypes/pdf-b3ab89677b0665d9c2ddc7fd2efd258b3933da81870bd1adc6bf84bcad945e92.png"
                                                                    fallbackSrc='https://via.placeholder.com/30'
                                                                />
                                                                <VStack align="flex-start" paddingLeft="25px" spacing="1px">
                                                                    <Link fontSize="12px" href={profile.resumeUrl} isExternal>
                                                                        {profile.resumeFileName}
                                                                    </Link>
                                                                </VStack>
                                                                </Box>
                                                            </VStack>
                                                        )
                                                    }
                                                    {
                                                        profile.coverLetterUrl && (
                                                            <VStack paddingBottom="5px" align="stretch" w="full" spacing="5px"> 
                                                                <Box display="flex" alignItems="center" paddingTop="5px">
                                                                <Image 
                                                                    marginLeft="10px"
                                                                    boxSize="30px"
                                                                    src = "https://handshake-production-cdn.joinhandshake.com/assets/filetypes/pdf-b3ab89677b0665d9c2ddc7fd2efd258b3933da81870bd1adc6bf84bcad945e92.png"
                                                                    fallbackSrc='https://via.placeholder.com/30'
                                                                />
                                                                <VStack align="flex-start" paddingLeft="25px" spacing="1px">
                                                                    <Link fontSize="12px" href={profile.coverLetterUrl} isExternal>
                                                                        {profile.coverLetterFileName}
                                                                    </Link>
                                                                </VStack>
                                                                </Box>
                                                            </VStack>
                                                        )
                                                    }
                                                    </VStack>
                                                    <ProfileActionButtons handler={handleDocumnet} editProfile={editProfile} loading = {loading} />
                                                </Box>
                                                </Box>
                                            </Box>
                                        </Box>
                                        </Scrollbar>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel>
                                        <VStack align="flex-start">
                                            {/* Add functionality related content */}
                                        </VStack>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </>
                        
                    )}
                </Box>
                }
            </Box>
            <Button onClick={() => chrome.runtime.sendMessage({ method: "assignTestProfile" })}>Save Profile</Button>

        </ChakraProvider>
  );
};


export { Popup };
