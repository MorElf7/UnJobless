import React from 'react';
import { IconButton, Spinner, Icon, VStack} from '@chakra-ui/react';
import { FaBoltLightning } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";


const ProfileActionButtons = ({ handler, editProfile, loading}: { handler: () => void; editProfile: () => void , loading: boolean}) => {
    return (
        <VStack spacing="5px" fontFamily="Ubuntu" >
            <IconButton
                aria-label="Auto Fill"
                icon={loading ? <Spinner size="sm" color="#FFFFFF"/> : <Icon as={FaBoltLightning} color="white" w="15px" h="15px"/>}
                onClick={handler}
                disabled={loading}
                bg = {loading ? "#B1DAC2" : "#45BC7A"}
                _hover={{ bg: loading ? "#B1DAC2" : "#3DA367" }}
                size="sm"
            />
            <IconButton
                aria-label="Edit"
                icon={<Icon as={MdModeEdit} color="white" w="15px" h="15px"/>}
                onClick={editProfile}
                _hover={{ bg: '#3DA367' }}
                bg="#45BC7A"
                size="sm"
            />
        </VStack>
    );
};

export default ProfileActionButtons;
