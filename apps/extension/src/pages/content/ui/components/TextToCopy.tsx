import { Text, Box } from '@chakra-ui/react';
import ReactDOM from 'react-dom';
import React from 'react'

const TextToCopy = ({ text, defaultValue }: { text: string, defaultValue: string }) => {
    return (
        <Box
            onClick={() => navigator.clipboard.writeText(text)}
            cursor="pointer"
            p="5px"
            transition="all 0.15s ease"
            borderRadius="5px"
            padding="0px"
            _hover={{
                bg: 'gray.100'  // Light gray background on hover, adjust color as needed
            }}
            _active={{
                bg: '#EAEAF0',  // Slightly darker gray background on active
                p: '1px',  // Increased padding
            }}
        >
            <Text borderRadius="1px" _hover={{ color: '#0F893D' }} >
                {text || defaultValue}
            </Text>
        </Box>
    );
}
export default TextToCopy;
