import React, { useState, useEffect, useMemo } from 'react';
import { ChakraProvider, Box, Image, Text, Button, VStack, CloseButton, IconButton, TabPanel, Tab, Tabs, TabList, TabPanels,  Flex, Divider, Link, Textarea, calc, HStack, Icon } from '@chakra-ui/react';
import { AdditionType, PopupProps, Profile } from '@root/src/shared/typing/types';
import { AutoFillManager, EventEmitter } from './auto/autoManager';
import { defaultEducation, defaultExperience, defaultProfile } from '@root/src/shared/typing/constant';
import { GreenHouseAutoFillManager } from './auto/greenhouse';
import { WorkdayAutoFillManager } from './auto/workday';

import { Scrollbar, ScrollbarPlugin } from "smooth-scrollbar-react";
import { DefaultManager } from './auto/defaultManager';
import {IoIosArrowUp} from 'react-icons/io';
import { RiSparkling2Fill } from "react-icons/ri";


import findAdditionalFields from './auto/additionalFields';
import TextToCopy from './components/TextToCopy';
import ProfileActionButtons from './components/ProfileActionButtons';
import saveApplication from './auto/saveApplication';


const Popup = ({ type } : PopupProps) => {
    const [profile, setProfile] = useState<Profile>(defaultProfile);
    const [additionalFields, setAdditionalFields] = useState<AdditionType>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [close, setClose] = useState<boolean>(false);
    const eventEmitter = new EventEmitter();
    const autoFillManager: AutoFillManager = useMemo(() => {
        switch (type) {
            case 0:
                return new GreenHouseAutoFillManager(eventEmitter);
            case 1:
                return new WorkdayAutoFillManager(eventEmitter);
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
                            } else if (response.error) {
                                reject(new Error(response.error));
                            } else {
                                resolve(response);                            }
                        });
                    });

                    const profileFromMessage: Profile = await requestProfile() as Profile;
                    setProfile(profileFromMessage);
                    location.reload();

                }
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            }
        };
        const fetchAdditionalFields = async () => {
            await findAdditionalFields(type).then((addition) => {
                setAdditionalFields(addition);
            }).catch((error) => {
                console.error('Failed to fetch additional fields:', error);
            });
        }

        fetchAdditionalFields();
        fetchProfile();
    }, []);

    useEffect(() => {
        if (type == 1) {
            const h2 = document.querySelector("h2.css-1j9bnzb")
            if (!h2) return;
            const observer = new MutationObserver(() => {
                saveApplication(type, profile);
            })
            observer.observe(h2, {
                childList: true, // Watch for changes in child nodes
                subtree: true // Watch for changes in the whole subtree
            });

            return () => {
                observer.disconnect();
            }
        } 

    }, []);

    const handleLoading = (isLoading: boolean): void => {
        setLoading(isLoading);
    };
    eventEmitter.subscribe<boolean>('loading', handleLoading);

    const handleAutofill = () => {
        autoFillManager.autoFill(profile, additionalFields);
    };

    const handleDocumnet = (): void => {
        autoFillManager.fillUpload(profile);
    }

    const handleIdentityFields = () => {
        autoFillManager.fillIdentityFields(profile);
    }

    const handleEducationFields = () => {
        autoFillManager.fillEducation(profile);
    }

    const handleExperienceFields = () => {
        autoFillManager.fillExperience(profile);
    }

    const editProfile = () => {
        chrome.runtime.sendMessage({ method: "clearProfile" });
        const path = 'http://localhost:3000/dashboard'
        window.open(path, '_blank');
    }

    const handleGenAi = async (index: number, label:string) => {
        const writingSpeed = 10;
        setLoading(true);
        try {
            const response = await chrome.runtime.sendMessage({ method: "genAi", question: label });
            const text = response.data;
            const error = response.error;
            if (error) {
                throw new Error(error);
            }
            let idx = 0;
    
            await new Promise((resolve) => { 
                const interval = setInterval(() => {
                    if (idx < text.length) {
                        handleInputChange(index, text.slice(0, idx + 1));
                        idx += 1;
                    } else {
                        clearInterval(interval);
                        resolve(true); 
                    }
                }, writingSpeed);
            });
        } catch (error) {
            console.error('Failed to generate AI:', error);
        }
        setLoading(false);

    }

    const handleInputChange = (index: number, newValue: string) => {
        setAdditionalFields(prevFields => {
            const updatedFields = [...prevFields];
            if (updatedFields[index]) {
                updatedFields[index] = [updatedFields[index][0], newValue, updatedFields[index][2]];
            }
            return updatedFields;
        });
    };

    return (
        <ChakraProvider>
            {close ? 
                <Box
                bg="#45BC7A"
                position="fixed"
                top="5vh"
                right="-15px"
                fontFamily="Ubuntu"
                borderRadius="15px"
                boxShadow="xl"
                p="5"
                mt="4"
                zIndex="6"
                onClick={() => setClose(false)}
                transition="right 0.3s ease-in-out"
                _hover={{
                  right: "2", // Moves the box to be fully visible on hover
                  bg: "#3DA367",
                  cursor: "pointer"
                }}
              >
                <Image src={chrome.runtime.getURL("logo_white.svg")} alt="Unjobless Logo" width="50px" objectFit="contain" />
              </Box> : 
            <Box
                id="unjobless_container"
                position="fixed"
                top="5vh" 
                right="1vw"
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
                zIndex="6"
            >   
                <Box>
                    <Box display="flex" 
                        justifyContent="space-between"
                        padding="5px 0px 15px 0px" 
                        >
                        <Image 
                            src={chrome.runtime.getURL("logo.svg")} 
                            alt="Unjobless Logo"
                            width='150px'
                            height='auto'
                            objectFit='contain'
                        />
                        <CloseButton 
                            size='lg' 
                            onClick={() => setClose(true)} />
                    </Box>
                    <VStack spacing={5}>
                        <Text fontSize="14px"  fontFamily="'Ubuntu', sans-serif">Get ready to job hunt like a boss! Hit 'Let's Do It!' and watch the magic happen!</Text>
                        <Button 
                            fontFamily="Nunito"
                            fontWeight="bold"
                            fontSize="14px"
                            width="full"
                            height= "40px"
                            bgColor='#45BC7A'
                            isLoading = {loading}
                            loadingText='Running...'
                            color="white"
                            _hover={{ bg: '#3DA367' }}
                            onClick={handleAutofill}
                            >
                            LET'S DO IT!!
                        </Button>
                    </VStack>
                    { profile &&
                    (<Box display="flex" flexDirection="row" justifyContent="flex-end">
                    <IconButton
                        aria-label="Page Up"
                        icon={
                            <IoIosArrowUp
                                style={{
                                    fontSize: "30px",
                                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                                    transition: 'transform 0.2s'
                                }}
                            />
                        }
                        paddingTop="5px"
                        onClick={() => setOpen(!open)}
                        bg="transparent"
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        size="md"
                    />
                    </Box>)
            }
                    { open && profile && (
                        <>
                            <Tabs 
                                isFitted 
                                variant="unstyled"
                                marginTop="7px"
                                fontFamily="Ubuntu"
                                >
                                <TabList mb="1em" shadow="0 0 0 1px #E1E1E9" borderRadius="5px" p="1" marginBottom="5px">
                                    <Tab fontSize="12px" borderRadius="5px" fontFamily="Nunito" fontWeight="600" _selected={{ color: 'white', bg: '#45BC7A', fontWeight: '700' }}>PROFILE</Tab>
                                    <Tab fontSize="12px" borderRadius="5px" fontFamily="Nunito" fontWeight="600" _selected={{ color: 'white', bg: '#45BC7A', fontWeight: '700' }}>FUNCTIONALITY</Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel padding="3px 0px 5px 0px">
                                        <Box 
                                            width="full"
                                            maxHeight="calc(75vh - 250px)"
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
                                        <Box >
                                            <Box>
                                                <Flex paddingBottom="7px" fontWeight="700" fontSize="12px">
                                                <TextToCopy text={profile.first_name} defaultValue={defaultProfile.first_name}/>
                                                <Text paddingRight="3px">, </Text>
                                                <TextToCopy text={profile.last_name} defaultValue={defaultProfile.last_name}/>
                                                </Flex>
                                                <Box display="flex" flexDirection="column">
                                                <Box display="flex" justifyContent="space-between" width="100%">
                                                    <Box display="flex" alignItems="center">
                                                    <Image 
                                                        boxSize="50px"
                                                        borderRadius='full'
                                                        src = {`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${profile.first_name}+${profile.last_name}`}
                                                        fallbackSrc='https://via.placeholder.com/50'
                                                    />
                                                    <VStack align="flex-start" paddingLeft="15px" spacing="1px" fontSize="12px" fontWeight="400">
                                                        <Flex>
                                                        <TextToCopy text={profile.city} defaultValue={defaultProfile.city}/>
                                                        <Text paddingRight="3px">, </Text>
                                                        <TextToCopy text={profile.state} defaultValue={defaultProfile.state}/>
                                                        <Text paddingRight="3px">, </Text>
                                                        <TextToCopy text={profile.zip_code} defaultValue={defaultProfile.zip_code} />
                                                        </Flex>
                                                        <TextToCopy text={profile.email} defaultValue={defaultProfile.email}/>
                                                        <TextToCopy text={profile.phone} defaultValue={defaultProfile.phone}/>
                                                    </VStack>
                                                    </Box>
                                                    <ProfileActionButtons handler={handleIdentityFields} editProfile={editProfile} loading = {loading}/>
                                                </Box>
                                                </Box>
                                            </Box>
                                            <Divider paddingTop="7px" borderColor="#C2D1D9"/>
                                            {profile.education &&
                                            <>
                                            <Box paddingTop="7px">
                                                <Text paddingBottom="7px" fontWeight="700" fontSize="12px">Education</Text>
                                                <Box display="flex" flexDirection="column">
                                                <Box display="flex" justifyContent="space-between" width="100%">
                                                    <VStack spacing="5px" align="stretch" w="full">
                                                    {
                                                        profile.education && profile.education.map((edu, index) => (
                                                            <Box paddingBottom="5px">
                                                                <Box display="flex" alignItems="center" paddingTop="5px">
                                                                <Image 
                                                                    boxSize="50px"
                                                                    borderRadius='full'
                                                                    src = {edu.logo}
                                                                    fallbackSrc='https://via.placeholder.com/50'
                                                                />
                                                                <VStack align="flex-start" paddingLeft="15px" spacing="1px">
                                                                    <Box fontSize="12px" fontWeight="700">
                                                                        <TextToCopy text={edu.school} defaultValue={defaultEducation[0].school}/>
                                                                    </Box>
                                                                    <Flex fontSize="10px" fontWeight="400">
                                                                        <TextToCopy text={edu.degree} defaultValue={defaultEducation[0].degree} />
                                                                        <Text padding="0px 3px 0px 3px"> in </Text>
                                                                        <TextToCopy text={edu.major} defaultValue={defaultEducation[0].major}/>
                                                                    </Flex>
                                                                    <Flex fontSize="10px" fontWeight="400">
                                                                        <TextToCopy text={edu.startDate} defaultValue={defaultEducation[0].startDate}/>
                                                                        <Text paddingRight="3px" paddingLeft="3px"> - </Text>
                                                                        <TextToCopy text={edu.endDate} defaultValue={defaultEducation[0].endDate}/>
                                                                    </Flex>
                                                                </VStack>
                                                                </Box>
                                                            </Box>
                                                        ))
                                                    }
                                                    </VStack>
                                                    <ProfileActionButtons handler={handleEducationFields} editProfile={editProfile} loading = {loading} />
                                                </Box>
                                                </Box>
                                            </Box>
                                            <Divider paddingTop="7px" borderColor="#C2D1D9"/>
                                            </>}
                                            {profile.experience &&
                                            <>
                                            <Box paddingTop="7px">
                                                <Text paddingBottom="7px" fontWeight="700" fontSize="12px">Experience</Text>
                                                <Box display="flex" flexDirection="column">
                                                <Box display="flex" justifyContent="space-between" width="100%">
                                                    <VStack spacing="5px" align="stretch" w="full">
                                                    {
                                                        profile.experience && profile.experience.map((exp, index) => (
                                                            <VStack paddingBottom="5px" align="stretch" w="full" spacing="5px"> 
                                                                <Box display="flex" alignItems="center" paddingTop="5px">
                                                                <Image 
                                                                    boxSize="50px"
                                                                    borderRadius='full'
                                                                    src = {exp.logo}
                                                                    fallbackSrc='https://via.placeholder.com/50'
                                                                />
                                                                <VStack align="flex-start" paddingLeft="15px" spacing="1px">
                                                                    <Box fontSize="12px" fontWeight="700">
                                                                        <TextToCopy text={exp.position} defaultValue={defaultExperience[0].position}/>
                                                                    </Box>
                                                                    <Flex fontSize="10px" fontWeight="400">
                                                                        <TextToCopy text={exp.company} defaultValue={defaultExperience[0].company}/>
                                                                        <Text padding="0px 3px 0px 3px">, </Text>
                                                                        <TextToCopy text={exp.location} defaultValue={defaultExperience[0].location}/>
                                                                    </Flex>
                                                                    <Flex fontSize="10px" fontWeight="400">
                                                                        <TextToCopy text={exp.startDate} defaultValue={defaultExperience[0].startDate}/>
                                                                        <Text paddingRight="3px" paddingLeft="3px"> - </Text>
                                                                        <TextToCopy text={exp.endDate} defaultValue={defaultExperience[0].endDate}/>
                                                                    </Flex>
                                                                </VStack>
                                                                </Box>
                                                                <Box fontSize="12px" fontWeight="400">
                                                                    <TextToCopy text={exp.description} defaultValue={defaultExperience[0].description}/>
                                                                </Box>
                                                            </VStack>
                                                        ))
                                                    }
                                                    </VStack>
                                                    <ProfileActionButtons handler={handleExperienceFields} editProfile={editProfile} loading = {loading} />
                                                </Box>
                                                </Box>
                                            </Box>
                                            <Divider paddingTop="7px" borderColor="#C2D1D9"/>
                                            </>}
                                            {(profile.resumeUrl || profile.coverLetterUrl) &&
                                            <Box paddingTop="7px">
                                                <Text paddingBottom="7px" fontWeight="700" fontSize="12px">Documents</Text>
                                                <Box display="flex" flexDirection="column">
                                                <Box display="flex" justifyContent="space-between" width="100%">
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
                                            }
                                        </Box>
                                        </Scrollbar>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel padding="13px 0px 7px 0px">
                                        <Scrollbar  
                                            plugins={{
                                                overscroll: {
                                                effect: "bounce"
                                                } as ScrollbarPlugin
                                            }}
                                            >
                                        <Box w="full" maxHeight="calc(75vh - 250px)">
                                            <Text fontWeight="500"> We'll use these values to autofill inputs with matching labels. Press the icon to AI generated the given text.</Text>
                                            <Box paddingTop="10px">
                                            {additionalFields.length > 0 ? (
                                                    additionalFields.map(([key, value, element], index) => (
                                                        <Box key={index} w="full" fontSize="12px">
                                                            <TextToCopy text={key} defaultValue={"default question"}/>
                                                            <Box position="relative" marginTop="7px" >
                                                            <IconButton 
                                                                aria-label='gen-ai' 
                                                                icon={<RiSparkling2Fill
                                                                    style={{
                                                                        fontSize: "20px",
                                                                        color: "#45BC7A"
                                                                    }}
                                                                />} 
                                                                position="absolute" 
                                                                bottom="7px" 
                                                                right="7px" 
                                                                zIndex="tooltip"
                                                                bg="transparent"
                                                                _hover={{ bg: 'transparent', transform: "scale(1.2)", transition: "transform 0.2s ease" }}
                                                                onClick= {() => {handleGenAi(index, key)}}
                                                                isDisabled={loading}
                                                                />
                                                            <Textarea
                                                                placeholder="Enter your Input Here"
                                                                value={value}
                                                                onChange={(e) => handleInputChange(index, e.target.value)}
                                                                position="relative"
                                                                sx={{
                                                                    '&::-webkit-scrollbar': {
                                                                      display: 'none', // This hides the scrollbar in WebKit browsers like Chrome and Safari
                                                                    },
                                                                    '-ms-overflow-style': 'none',  // This hides the scrollbar in IE and Edge
                                                                    'scrollbar-width': 'none'  // This hides the scrollbar in Firefox
                                                                  }}
                                                                overflowY="scroll" // keeps the scroll functionality without the scrollbar
                                                            />
                                                            </Box>
                                                            <Divider borderColor="#0F893D" margin="7px 0px 7px 0px"/>
                                                        </Box>
                                                    ))
                                                ) : (
                                                    <Text fontSize="14px" color="red">Page don't have any text to genrate.</Text>
                                                )}
                                            </Box>
                                        </Box>
                                        </Scrollbar>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </>
                        
                    )}
                </Box>
                
            </Box>
            }
            <Button onClick={() => {
                chrome.runtime.sendMessage({ method: "assignTestProfile" })
                }}>Save Profile</Button>
            <Button onClick={() => {
                chrome.runtime.sendMessage({ method: "clearProfile" })
                }}>Delete Profile</Button>

        </ChakraProvider>
  );
};


export default Popup;
