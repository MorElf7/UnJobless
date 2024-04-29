import React from 'react';
import { Box, IconButton, Image, Tooltip, Spinner} from '@chakra-ui/react';

const ProfileActionButtons = ({ handler, editProfile, loading}: { handler: () => void; editProfile: () => void , loading: boolean}) => {
    return (
        <Box display="flex" flexDirection="column" fontFamily="Ubuntu" >
            <Tooltip label="Auto Fill Profile" placement='right' fontSize="6px">
                <IconButton
                    aria-label="Auto Fill"
                    icon={loading ? <Spinner size="sm" color="#FFFFFF"/> : <Image src={chrome.runtime.getURL("AutoFill.svg")} alt="Auto Fill Profile" boxSize="20px"/>}
                    onClick={handler}
                    disabled={loading}
                    bg = {loading ? "#B1DAC2" : "transparent"}
                    _hover={{ bg: loading ? "#B1DAC2" : "#E1E1E9" }}
                    fontSize="5px"
                    size="sm"
                />
            </Tooltip>
            <Tooltip label="Edit Profile" placement='right' fontSize="6px">
                <IconButton
                    aria-label="Edit"
                    icon={<Image src={chrome.runtime.getURL("Edit.svg")} alt="Edit Profile" boxSize="20px" />}
                    onClick={editProfile}
                    bg="transparent"
                    size="sm"
                />
            </Tooltip>
        </Box>
    );
};

export default ProfileActionButtons;
