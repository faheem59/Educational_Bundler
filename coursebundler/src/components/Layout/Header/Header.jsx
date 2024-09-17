import React from 'react'
import { ColorModeSwitcher } from "../../../ColorModeSwitcher"
import { Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, HStack, VStack, useDisclosure, } from '@chakra-ui/react'
import { RiDashboardFill, RiLogoutBoxLine, RiMenu5Fill } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

const LinkButton = ({ url = '/', title = 'Home', onClose }) => (

    <Link to={url} onClick={onClose}>
        <Button variant={'ghost'}>{title}</Button>
    </Link>
);

const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const logoutHandler = () => {
        localStorage.removeItem("currentUser");
        navigate('/')
    }
    return (
        <>
            <ColorModeSwitcher />
            <Button onClick={onOpen}
                colorScheme='yellow'
                width={'12'}
                height={'12'}
                rounded={'full'}
                zIndex={'overlay'}
                position={'fixed'}
                top={'6'}
                left={'6'}
            >

                <RiMenu5Fill />
            </Button>
            <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth={'1px'}>BUNDLER</DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={'12'} alignItems={'flex-start'}>
                            <LinkButton onClose={onClose} url='/' title='Home' />
                            <LinkButton onClose={onClose} url='/courses' title='ALL Courses' />
                            <LinkButton onClose={onClose} url='/learningdash' title='Learning Dashboard' />
                            <LinkButton onClose={onClose} url='request' title='Request Courses' />
                            <LinkButton onClose={onClose} url='/contact' title='Contact' />
                            <LinkButton onClose={onClose} url='/about' title='About' />

                            <HStack justifyContent={'space-evenly'} position={'absolute'}
                                bottom={'2rem'}
                                width={'80%'}
                            >
                                {
                                    user ? (<>
                                        <VStack>
                                            <HStack>
                                                <Link to='/profile' onClick={onClose}>
                                                    <Button colorScheme='yellow' variant={'ghost'}>Profile
                                                    </Button></Link>
                                                <Button variant={'ghost'} onClick={logoutHandler}>
                                                    <RiLogoutBoxLine />Logout
                                                </Button>
                                            </HStack>
                                            {
                                                user && user.role === 'admin' && <Link to={'/admin/dashboard'} onClick={onClose}>
                                                    <Button colorScheme='purple' variant={'ghost'}><RiDashboardFill style={{ margin: '4px' }} />Dashboard</Button>
                                                </Link>
                                            }
                                        </VStack>
                                    </>) : (<>
                                        <Link to='/login' onClick={onClose}><Button colorScheme='yellow'>Login
                                        </Button></Link>
                                        <p>OR</p>
                                        <Link to='/signup' onClick={onClose}><Button colorScheme='yellow'>Sign up
                                        </Button></Link>
                                    </>)
                                }
                            </HStack>

                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default Header