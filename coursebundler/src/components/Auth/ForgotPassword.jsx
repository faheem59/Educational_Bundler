import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    return (
        <Container py={'16'} h={'90vh'}>
            <form>
                <Heading children='Forgot Password'
                    my={'16'}
                    alignItems={'center'}
                    textTransform={'uppercase'}
                    textAlign={['center', 'left']}
                />
                <VStack spacing={'8'}>
                    <Input required id='email' value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='example@gmail.com'
                        type='email'
                        focusBorderColor='yellow.500'
                    />
                    <Button type='submit' colorScheme='yellow'>Forget Password</Button>
                </VStack>
            </form>
        </Container>
    )
}

export default ForgotPassword