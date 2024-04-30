import React from 'react';
import { Box, IconButton, Tooltip, Spinner, Icon, VStack} from '@chakra-ui/react';
import { FaBoltLightning } from "react-icons/fa6";
import { TbPencilBolt } from "react-icons/tb";
import { MdModeEdit } from "react-icons/md";




const ProfileActionButtons = ({ handler, editProfile, loading}: { handler: () => void; editProfile: () => void , loading: boolean}) => {
    return (
        <VStack spacing="5px" fontFamily="Ubuntu" >
            <Tooltip label="Auto Fill Profile" placement='right' fontSize="6px">
                <IconButton
                    aria-label="Auto Fill"
                    icon={loading ? <Spinner size="sm" color="#FFFFFF"/> : <Icon as={FaBoltLightning} color="white" w="15px" h="15px"/>}
                    onClick={handler}
                    disabled={loading}
                    bg = {loading ? "#B1DAC2" : "#45BC7A"}
                    _hover={{ bg: loading ? "#B1DAC2" : "#3DA367" }}
                    size="sm"
                />
            </Tooltip>
            <Tooltip label="Edit Profile" placement='right' fontSize="6px">
                <IconButton
                    aria-label="Edit"
                    icon={<Icon as={MdModeEdit} color="white" w="15px" h="15px"/>}
                    onClick={editProfile}
                    _hover={{ bg: '#3DA367' }}
                    bg="#45BC7A"
                    size="sm"
                />
            </Tooltip>
        </VStack>
    );
};

export default ProfileActionButtons;
