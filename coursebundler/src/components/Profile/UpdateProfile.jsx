import React, { useState } from 'react';
import { Button, Container, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const toast = useToast();
    const navigate = useNavigate()
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put('http://localhost:4000/api/v1/updateprofile', { name, email }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            toast({
                title: "Profile Updated",
                description: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate('/profile')
        } catch (error) {
            console.error('Error updating profile:', error);
            toast({
                title: "Update Failed",
                description: error.response ? error.response.data.message : "An unexpected error occurred.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Container py='16' minH={'90vh'}>
            <form onSubmit={handleSubmit}>
                <Heading textTransform={'uppercase'} children='Update Profile' my='16' textAlign={['center', 'left']} />
                <VStack spacing={'8'}>
                    <Input
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Name'
                        type='text'
                        focusBorderColor='yellow.500'
                    />
                    <Input
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='Email'
                        type='email'
                        focusBorderColor='yellow.500'
                    />
                    <Button w={'full'} colorScheme='yellow' type='submit'>Update Profile</Button>
                </VStack>
            </form>
        </Container>
    );
}

export default UpdateProfile;
