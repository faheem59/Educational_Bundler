import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
const Contact = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');



    return (
        <Container h={'90vh'}>

            <VStack h={'full'} justifyContent={'center'} spacing={'16'}>
                <Heading children={'Contact Us'} textTransform={'uppercase'} />

                <form style={{ width: '100%' }}>

                    <Box my={'4'}>
                        <FormLabel htmlFor='name' children='Name' />
                        <Input required id='name' value={name}
                            onChange={e => setName(e.target.value)}
                            placeholder='example'
                            type='text'
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='email' children='Email Address' />
                        <Input required id='email' value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder='example@gmail.com'
                            type='email'
                            focusBorderColor='yellow.500'
                        />
                    </Box>
                    <Box my={'4'}>
                        <FormLabel htmlFor='message' children='Message' />
                        <Textarea required id='message' value={message}
                            onChange={e => setMessage(e.target.value)}
                            placeholder='Your message........'

                            focusBorderColor='yellow.500'
                        />
                    </Box>


                    <Button colorScheme='yellow' my={'4'} type='submit'>Send Meassage</Button>
                    <Box my={'4'}>
                        Request a Course?{' '}
                        <Link to='/request'>
                            <Button colorScheme='yellow' variant={'link'}>Click</Button>{' '} here
                        </Link>

                    </Box>


                </form>
            </VStack>
        </Container>
    )
}

export default Contact