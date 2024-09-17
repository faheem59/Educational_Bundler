import React, { useState } from 'react';
import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const fileUploadCss = {
    cursor: 'pointer',
    marginLeft: '-5%',
    width: '110%',
    height: '100%',
    color: '#ECC94B',
    backgroundColor: 'white',
};

const fileUploadStyle = {
    '&file-selector-button': fileUploadCss,
};
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [imagePrev, setImagePrev] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const changeImageHandler = (e) => {
        const file = e.target.files[0];
        const maxSize = 5 * 1024 * 1024;
        if (file && file.size > maxSize) {
            alert('File size exceeds 5 MB limit.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePrev(reader.result);
            setImage(file);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        if (image) {
            formData.append('image', image);
        }

        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/createuser', formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert(data.message);
            navigate('/login');
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('An unexpected error occurred.');
            }
        }
    };

    return (
        <Container h={'95vh'}>
            <VStack h={'full'} justifyContent={'center'}>
                <Heading>User Registration</Heading>
                <form style={{ width: '100%' }} onSubmit={submitHandler}>
                    <Box my={'4'} justifyContent={'center'} display={'flex'}>
                        <Avatar src={imagePrev} size={'xl'} />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='name'>Name</FormLabel>
                        <Input
                            required
                            id='name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder='example'
                            type='text'
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='email'>Email Address</FormLabel>
                        <Input
                            required
                            id='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='example@gmail.com'
                            type='email'
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input
                            required
                            id='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='********'
                            type='password'
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='chooseAvatar'>Choose Avatar</FormLabel>
                        <Input
                            accept='image/*'

                            id='chooseAvatar'
                            name='avatar' // This must match the backend field name
                            type='file'
                            onChange={changeImageHandler}
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Button colorScheme='yellow' my={'4'} type='submit'>Sign Up</Button>
                    <Box my={'4'}>
                        User Already Exist?{' '}
                        <Link to='/login'>
                            <Button colorScheme='yellow' variant={'link'}>Login</Button> here
                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    );
};

export default Register;
