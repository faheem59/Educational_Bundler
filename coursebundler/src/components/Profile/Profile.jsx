import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Avatar,
    Button,
    Container,
    HStack,
    Heading,
    Image,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    Text,
    VStack,
    useDisclosure,
    useToast
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { RiDeleteBin7Fill } from 'react-icons/ri';


const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isOpen, onClose, onOpen } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/v1/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setUser(data.user);
            } catch (err) {
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const removeFromPlaylisHandler = (id) => {
        console.log(id);

    };

    const changeSubmitHandler = async (e, image) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('image', image);

            await axios.put('http://localhost:4000/api/v1/updateprofilepicture', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });

            toast({
                title: 'Photo updated',
                description: 'Your profile photo has been updated successfully.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            onClose();
        } catch (err) {
            toast({
                title: 'Error',
                description: 'Failed to update photo',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Container>
            <Heading children="Profile" m="8" textTransform={'uppercase'} />
            {user && (
                <>
                    <Stack
                        justifyContent={'flex-start'}
                        direction={['column', 'row']}
                        alignItems={'center'}
                        spacing={['8', '12']}
                        padding={'8'}
                    >
                        <VStack>
                            <Avatar boxSize={'48'} src={user.avatar.url || '/default-avatar.png'} />
                            <Button colorScheme='yellow' variant={'ghost'} onClick={onOpen}>Change Photo</Button>
                        </VStack>
                        <VStack spacing={'4'} alignItems={['center', 'flex-start']}>
                            <HStack>
                                <Text children='Name' fontWeight={'bold'} />
                                <Text children={user.name} />
                            </HStack>
                            <HStack>
                                <Text children='Email' fontWeight={'bold'} />
                                <Text children={user.email} />
                            </HStack>
                            <HStack>
                                <Text children='CreatedAt' fontWeight={'bold'} />
                                <Text children={user.createdAt.split("T")[0]} />
                            </HStack>
                            {user.role !== 'admin' && (
                                <HStack>
                                    <Text children="Subscription" fontWeight={'bold'} />
                                    {user.subscriptions?.status === 'active' ? (
                                        <Button color={'yellow.500'} variant="unstyled">Cancel Subscription</Button>
                                    ) : (
                                        <Link to='/subscribe'>
                                            <Button colorScheme='yellow'>Subscribe</Button>
                                        </Link>
                                    )}
                                </HStack>
                            )}

                            <Stack direction={['column', 'row']} alignItems={'center'}>
                                <Link to={'/updateprofile'}>
                                    <Button>Update Profile</Button>
                                </Link>
                                <Link to={'/changepassword'}>
                                    <Button>Change Password</Button>
                                </Link>
                            </Stack>
                        </VStack>
                    </Stack>

                    <Heading children="Playlist" size={'md'} my={'8'} />
                    {user.playlist.length > 0 && (
                        <Stack
                            direction={['column', 'row']}
                            alignItems={'center'}
                            flexWrap={'wrap'}
                            p='4'
                        >
                            {user.playlist.map((element) => (
                                <VStack w='48' m={'2'} key={element.course}>
                                    <Image boxSize={'full'} objectFit='contain' src={element.poster} />
                                    <HStack>
                                        <Link to={`/course/${element.course}`}>
                                            <Button colorScheme='yellow' variant={'ghost'}>Watch Now</Button>
                                        </Link>
                                        <Button onClick={() => removeFromPlaylisHandler(element.course)}>
                                            <RiDeleteBin7Fill />
                                        </Button>
                                    </HStack>
                                </VStack>
                            ))}
                        </Stack>
                    )}
                </>
            )}
            <ChangePhotoBox changeSubmitHandler={changeSubmitHandler} isOpen={isOpen} onClose={onClose} />
        </Container>
    );
};

export default Profile;

export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
};

function ChangePhotoBox({ isOpen, onClose, changeSubmitHandler }) {
    const [image, setImage] = useState('');
    const [imagePrev, setImagePrev] = useState('');

    const changeImage = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
    };

    const closeHandler = () => {
        onClose();
        setImage('');
        setImagePrev("");
    };

    return (
        <Modal isOpen={isOpen} onClose={closeHandler}>
            <ModalOverlay backdropFilter={'blur(10px) '} />
            <ModalContent>
                <ModalHeader>Change Photo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Container>
                        <form onSubmit={(e) => changeSubmitHandler(e, image)}>
                            <VStack spacing={'8'}>
                                {imagePrev && <Avatar src={imagePrev} boxSize={'48'} />}
                                <Input type='file' css={{ '&::file-selector-button': fileUploadCss }} onChange={changeImage} />
                                <Button w='full' colorScheme='yellow' type='submit'>Change</Button>
                            </VStack>
                        </form>
                    </Container>
                </ModalBody>
                <ModalFooter>
                    <Button mr='3' onClick={closeHandler}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
