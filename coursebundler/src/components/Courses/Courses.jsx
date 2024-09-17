import { Button, Container, HStack, Heading, Image, Input, Stack, Text, VStack } from '@chakra-ui/react'
import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

const Course = ({ views, title, imageSrc, id, addToPlaylistHandler, creator, description, lectureCount }) => {

    return (
        <VStack className='course' alignItems={['center', 'flex-start']}>
            <Image src={imageSrc} boxSize={'60'} objectFit={'contain'} />
            <Heading
                textAlign={['center', 'left']}
                maxW={'200px'}
                size={'sm'}
                fontFamily={'sans-serif'}
                noOfLines={3}
                children={title}
            />
            <Text children={description} noOfLines={2} />
            <HStack>
                <Text fontWeight={'bold'} textTransform={'uppercase'} children={'Creator :'} />
                <Link to={`/instructor/${creator?._id}`}>
                    <Text fontFamily={'body'} textTransform={'uppercase'} color='blue.500' _hover={{ textDecoration: 'underline' }}>
                        {creator?.name || 'Unknown Creator'}
                    </Text>
                </Link>
            </HStack>
            <Heading
                textAlign={'center'}
                size={'xs'}
                children={`Lectures - ${lectureCount}`}
                textTransform={'uppercase'} />
            <Heading
                size={'xs'}
                children={`Views - ${views}`}
                textTransform={'uppercase'} />
            <Stack direction={['column', 'row']} alignItems={'center'}>
                <Link to={`/course/${id}`}>
                    <Button colorScheme='yellow'>Watch Now</Button>
                </Link>
                <Button variant={'ghost'} colorScheme='yellow' onClick={() => addToPlaylistHandler(id)}>Add To Playlist</Button>
            </Stack>
        </VStack>
    );
};


const Courses = () => {
    const [courses, setCourses] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [category, setCategory] = useState('');
    const [playlist, setPlaylist] = useState([])
    const token = localStorage.getItem('authToken')

    const categories = [
        "App Development",
        "Web Development",
        "Data Structures & Algorithm",
        "Machine Learning",
        "Artificial Intelligence",
        "Data Science"
    ];

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('http://localhost:4000/api/v1/course', {
                    withCredentials: true,
                });
                setCourses(data.courses);
            } catch (error) {
                console.error(error.response.data.message);
            }
        };

        fetchCourses();
    }, []);

    // Filter courses based on keyword and category
    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(keyword.toLowerCase()) &&
        (category ? course.category === category : true)
    );

    const addToPlaylistHandler = async (courseId) => {
        try {
            const response = await axios.post(
                'http://localhost:4000/api/v1/addtoplaylist',
                { id: courseId },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearesr ${token}`
                    }
                }
            );
            setPlaylist(response.data.playlist);
        } catch (err) {
            console.error('Error adding to playlist:', err.response?.data?.message || err.message);
        }
    };

    return (
        <Container minH={'95vh'} maxW={'container.lg'} paddingY={'8'}>
            <Heading children='All Courses' m={'8'} />

            <Input
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search a course'
                type='text'
                focusBorderColor='yellow'
            />

            <HStack overflowX={'auto'} padding={'8'} css={{ '&::-webkit-scrollbar': { display: 'none' } }}>
                {
                    categories.map((item, index) => (
                        <Button
                            colorScheme='yellow'
                            variant={'ghost'}
                            key={index}
                            onClick={() => setCategory(item)}
                            minW={'60'}
                        >
                            <Text children={item} />
                        </Button>
                    ))
                }
                <Button
                    colorScheme='yellow'
                    variant={'ghost'}
                    onClick={() => setCategory('')}
                    minW={'60'}
                >
                    <Text children="All Categories" />
                </Button>
            </HStack>

            <Stack
                direction={['column', 'row']}
                flexWrap={'wrap'}
                justifyContent={['flex-start', 'space-evenly']}
                alignItems={['center', 'flex-start']}
            >
                {
                    filteredCourses.length > 0 ? (
                        filteredCourses.map(course => (
                            <Course
                                key={course._id}
                                title={course.title}
                                description={course.description}
                                views={course.views}
                                imageSrc={course.poster.url}
                                id={course._id}
                                creator={course.createdBy}
                                lectureCount={course.numOfVideos}
                                addToPlaylistHandler={addToPlaylistHandler}
                            />
                        ))
                    ) : (
                        <Text>No courses found</Text>
                    )
                }
            </Stack>
        </Container>
    );
};

export default Courses;