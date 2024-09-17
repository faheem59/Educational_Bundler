import { Box, HStack, Heading, Stack, VStack } from '@chakra-ui/react';
import React from 'react';
import { TiSocialYoutubeCircular, TiSocialInstagramCircular } from 'react-icons/ti';

const Footer = () => {
    return (
        <Box
            position="flex"
            bottom="0"
            left="0"
            right="0"
            padding="4"
            bg="blackAlpha.900"
            minH="10vh"
        >
            <Stack direction={['column', 'row']}>
                <VStack alignItems={['center', 'flex-start']} width="full">
                    {/* Add any content you want in the VStack */}
                </VStack>
                <Heading children="All Right Reserved" color="white" />
                <Heading children="@Course" fontFamily="body" color="yellow.400" />
                <HStack spacing={['2', '10']} justifyContent="center" color="white" fontSize="50">
                    <a href="https://studio.youtube.com/channel/UCWcAS836mcZwSmecex5ZsHQ/videos/upload?filter=%5B%5D&sort=%7B%22columnType%22%3A%22date%22%2C%22sortOrder%22%3A%22DESCENDING%22%7D" target="_blank" rel="noopener noreferrer">
                        <TiSocialYoutubeCircular />
                    </a>
                    <a href="https://studio.youtube.com/channel/UCWcAS836mcZwSmecex5ZsHQ/videos" target="_blank" rel="noopener noreferrer">
                        <TiSocialInstagramCircular />
                    </a>
                </HStack>
            </Stack>
        </Box>
    );
}

export default Footer;
