import { Box, Button, Container, FormLabel, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for HTTP requests

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post('http://localhost:4000/api/v1/login', { email, password });
            toast({
                title: data.message || 'Login successful!',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            localStorage.setItem("currentUser", JSON.stringify(data.user));
            localStorage.setItem("authToken", data.token);
            navigate('/');
        } catch (error) {
            toast({
                title: error.response?.data?.message || 'An error occurred.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container h={'95vh'}>
            <VStack h={'full'} justifyContent={"center"} spacing={'16'}>
                <Heading>Welcome To Bundler</Heading>
                <form style={{ width: '100%' }} onSubmit={handleSubmit}>
                    <Box>
                        <FormLabel htmlFor='email'>Email Address</FormLabel>
                        <Input
                            required
                            id='email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='example@gmail.com'
                            type='email'
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box>
                        <FormLabel htmlFor='password'>Password</FormLabel>
                        <Input
                            required
                            id='password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder='********'
                            type='password'
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box>
                        <Link to='/forgetpassword'>
                            <Button fontSize={'sm'} variant={'link'}>Forgot Password?</Button>
                        </Link>
                    </Box>
                    <Button colorScheme='yellow' my={'4'} type='submit' isLoading={loading}>Login</Button>
                    <Box my={'4'}>
                        New User?{' '}
                        <Link to='/signup'>
                            <Button colorScheme='yellow' variant={'link'}>Sign Up</Button>{' '} here
                        </Link>
                    </Box>
                </form>
            </VStack>
        </Container>
    );
};

export default Login;
