import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Heading, Input, VStack, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put('http://localhost:4000/api/v1/updatepassword', { oldPassword, newPassword }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            toast({
                title: "Password Updated",
                description: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate('/profile');
        } catch (error) {
            console.error('Error updating password:', error);
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
                <Heading textTransform={'uppercase'} my='16' textAlign={['center', 'left']}>
                    Change Password
                </Heading>
                <VStack spacing={'8'}>
                    <Input
                        required
                        id='oldPassword'
                        value={oldPassword}
                        onChange={e => setOldPassword(e.target.value)}
                        placeholder='Enter Old Password'
                        type='password'
                        focusBorderColor='yellow.500'
                    />
                    <Input
                        required
                        id='newPassword'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder='Enter New Password'
                        type='password'
                        focusBorderColor='yellow.500'
                    />
                    <Button w={'full'} colorScheme='yellow' type='submit'>
                        Change Password
                    </Button>
                </VStack>
            </form>
        </Container>
    );
};

export default ChangePassword;
