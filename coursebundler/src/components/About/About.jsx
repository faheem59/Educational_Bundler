import { Avatar, Button, Container, HStack, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'
import intro from '../../assets/video/intro.mp4'
import imag from '../../assets/images/admin.png'
import { RiSecurePaymentFill } from 'react-icons/ri'
const Founder = () => (
    <Stack direction={['column', 'row']} spacing={['4', '16']} padding={'8'}>

        <VStack>
            <Avatar boxSize={['40', '48']} src={imag} />
            <Text children='Co-Founder' opacity={'0.7'} />
        </VStack>
        <VStack justifyContent={'center'} alignItems={['center', 'flex-start']}>
            <Heading children='Faheem Akhtar' size={['md', 'xl']} />

            <Text textAlign={['center', 'left']} children={'Hi, I am a full-stack developer and Our mission is to provide the content at a reasonable price'} />

        </VStack>
    </Stack>
)

const VideoPlayer = () => (
    <video
        autoPlay
        controls
        muted
        loop
        controlsList='nodownload nofullscreen noremoteplayback'
        disablePictureInPicture
        disableRemotePlayback
        src={intro}
    >

    </video>
)

const About = () => {
    return (
        <Container maxW={'container.lg'} padding={'16'} boxShadow={'lg'}>
            <Heading children="About us" textAlign={['center', 'left']} />
            <Founder />
            <Stack m={'8'} direction={['column', 'row']} alignItems={'center'}>

                <Text fontFamily={'cursive'} m={'8'} textAlign={['center', 'left']}>
                    We are a video streaming platform with some premium course
                    available only for premium users.
                </Text>
                <Link to='/subscribe'>
                    <Button variant={'ghost'} colorScheme='yellow'> Checkout Our Plan</Button>
                </Link>
            </Stack>
            <VideoPlayer />

            <HStack my={'4'} p={'4'}>
                <RiSecurePaymentFill />
                <Heading
                    size={'xs'}
                    fontFamily={'sans-serif'}
                    textTransform={'uppercase'}
                    children={'Payement is secured by Razorpay'}
                />
            </HStack>
        </Container>
    )
}

export default About