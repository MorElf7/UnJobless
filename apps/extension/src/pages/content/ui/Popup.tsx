import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import{ greenHouse } from './greenhouse';
import { ChakraProvider, Box, Image, Text, Button, VStack, CloseButton, IconButton, TabPanel, Tab, Tabs, TabList, TabPanels, Icon, UnorderedList, ListItem, Spacer, Flex } from '@chakra-ui/react';


const Popup = ({ type }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [close, setClose] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                chrome.storage.sync.get(['profile'], (result) => {
                    if (result.profile) {
                        setProfile(JSON.parse(result.profile));
                    } else {
                        // Request profile if not found and handle it in a callback
                        chrome.runtime.sendMessage({ message: "getProfile" }, () => {
                            chrome.storage.sync.get(['profile'], (updatedResult) => {
                                if (updatedResult.profile) {
                                    setProfile(JSON.parse(updatedResult.profile));
                                }
                            });
                        });
                    }
                });
            } catch (error) {
                console.error('Failed to fetch profile:', error);
            } 
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        const handleMessage = (request, sender, sendResponse) => {
            if (request.message === "greenhouseCompleted") {
                setLoading(false);  // Update loading state based on the message
                console.log("Greenhouse task completed, loading set to false.");
                if (request.success) {
                    console.log("Operation was successful.");
                } else {
                    console.error("Operation failed.");
                }
            }
        };

        chrome.runtime.onMessage.addListener(handleMessage);
    }, []);

    const handleAutofill = () => {

        setLoading(true);
        if (!profile) {
            alert("No profile loaded");
            return;
        }
        switch (type) {
            case 0:
                setTimeout(() => setLoading(false), greenHouse(profile));
                break;
            case 1:
                // Implement case 1 logic
                break;
            default:
                alert("System not supported");
        }
        //ko impliment noi dung nay
        // const handleMessage = (request, sender, sendResponse) => {
        //     console.log("Message received: ", request);
        //     if (request.message === "greenhouseCompleted") {
        //         setLoading(false);  // Update loading state based on the message
        //         console.log("Greenhouse task completed, loading set to false.");
        //         if (request.success) {
        //             console.log("Operation was successful.");
        //         } else {
        //             console.error("Operation failed.");
        //         }
        //     }
        // };

        // chrome.runtime.onMessage.addListener(handleMessage);
    };

    const TextToCopy = ({ text }) => {
        return (
            <div
                onClick={() => navigator.clipboard.writeText(text)}
                style={{
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    backgroundColor: 'transparent',
                }}
            >
                <Text borderRadius="5px" _hover={{ color: '#3DA367' }} _active={{ backgroundColor: '#F1F2F4' }} transition="background-color 0.3s ease">
                    {text}
                </Text>
            </div>
        );
    };

    return (
        <ChakraProvider>
            <Box
                id="unjobless_container"
                position="fixed"
                top="30px" 
                right="5px"
                maxWidth={['240px', '360px']} // This sets responsive width
                maxHeight="80%"
                bg="white"
                maxW="420px"
                borderRadius="15px"
                m="4"
                p="6"
                boxShadow="xl"
                border="1px solid #E1E1E9"
                color="gray.700"
                zIndex="tooltip"
            >
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
                <Button onClick={() => chrome.runtime.sendMessage({ message: "assignTestProfile" })}>Save Profile</Button>
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
                                <TabPanel padding="5px">
                                    <Flex paddingBottom="7px" fontWeight="700" fontSize="14px">
                                        <TextToCopy text={profile.first_name} />
                                        <Text paddingRight="3px">, </Text>
                                        <TextToCopy text={profile.last_name} />
                                    </Flex>
                                    <Box display="flex" alignItems="center">
                                        {/* <Icon as={FaUserCircle} w={6} h={6} color="green.500" /> */}
                                        <Image 
                                            boxSize="50px"
                                            borderRadius='full'
                                            fallbackSrc='https://via.placeholder.com/50'

                                        />
                                        <VStack align="flex-start" paddingLeft="15px"  spacing="1px" fontSize="12px" fontWeight="500">
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
                                    <UnorderedList>
                                        <ListItem>
                                            {/* <Icon as={MdSchool} w={6} h={6} color="green.500" /> */}
                                            <Text display="inline">School Name</Text>
                                        </ListItem>
                                        {/* Add additional list items for each educational experience */}
                                    </UnorderedList>
                                </TabPanel>
                                <TabPanel>
                                    <VStack align="flex-start">
                                        {/* Add functionality related content */}
                                    </VStack>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                        <UnorderedList>
                            <ListItem>
                                {/* <Icon as={MdWork} w={6} h={6} color="green.500" /> */}
                                <Text display="inline"></Text>
                                {/* Add additional list items for each work experience */}
                            </ListItem>
                        </UnorderedList>
                    </>
                )}
            </Box>
        </ChakraProvider>
  );
};


export { Popup };
