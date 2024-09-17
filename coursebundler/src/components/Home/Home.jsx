import { Box, Button, HStack, Heading, Image, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import "./home.css"
import bg from "../../assets/images/bg.jpg"
import { Link } from 'react-router-dom'
import intro from '../../assets/video/intro.mp4'
import { CgGoogle, CgYoutube } from 'react-icons/cg'
import { SiCoursera, SiUdemy } from 'react-icons/si'




const Home = () => {
    return (
        <section className='home'>
            <div className='container'>
        
                <Stack
                    direction={["column", "row"]} height="100%" justifyContent={["center", "space-between"]}
                    alignItems="center"
                    spacing={["16", "56"]}
                >
                    <VStack width={'full'} alignItems={['center', 'flex-end']}>
                        <Heading children="LEARN FROM THE EXPERTS" size={'xl'} />
                        <Text textAlign={['center', 'left']} children='Find a vlauable content at reasonble price' />
                        <Link to={"/enroll"}>
                            <Button size={'lg'} colorScheme='yellow'>
                                Enroll Now
                            </Button>
                        </Link>
                    </VStack>
                    <Image className='vector-graphics'
                        boxSize={"md"} src={bg} objectFit={'contain'} />
                </Stack>
            </div>
            <Box padding={'8'} bg={'blackAlpha.800'}>
                <Heading
                    textAlign={'center'}
                    fontFamily={'body'}
                    color={'yellow.400'}
                    children="OUR BRANDS"
                />
                <HStack className='brandsBanner' justifyContent={'space-evenly'} marginTop={'4'}>
                    <CgGoogle />
                    <CgYoutube />
                    <SiCoursera />
                    <SiUdemy />

                </HStack>

            </Box>

            <div className='container2'>
                <video
                    autoPlay controls
                    controlsList='nodownload nofullscreen noremoteplayback'
                    disablePictureInPicture
                    disableRemotePlayback
                    src={intro}
                >

                </video>
            </div>
        </section>
    )
}

export default Home