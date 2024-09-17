import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CoursePage = () => {
    const [lectureNumber, setLectureNumber] = useState(0);
    const [lectures, setLectures] = useState([]);
    const { id } = useParams();
    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchLectures = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/v1/course/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setLectures(response.data.lectures);
            } catch (error) {
                console.error('Error fetching lectures:', error);
            }
        };

        fetchLectures();
    }, [id, token]);

    const currentLecture = lectures[lectureNumber] || {};
    console.log(currentLecture.video, "video")

    return (
        <Grid minH={'90vh'} templateColumns={['1fr', '3fr 1fr']} gap={4}>
            <Box mb={'40'} pt={'20'}>

                {lectures.length > 0 && (
                    <video
                        width={'100%'}
                        controls
                        controlsList='nodownload noremoteplayback'
                        disablePictureInPicture
                        disableRemotePlayback
                        src={currentLecture?.video?.url}
                        onError={() => alert('Error loading video')}
                        style={{
                            marginTop: '16px',
                            display: 'block'
                        }}
                    />
                )}
                <Heading m='4'>{`#${lectureNumber + 1} ${currentLecture.title || 'Title'}`}</Heading>
                <Heading m='4'>Description</Heading>
                <Text m={'4'}>{currentLecture.description || 'Description not available'}</Text>
            </Box>
            <VStack mt='94px'>
                {lectures.map((element, index) => (
                    <button
                        onClick={() => setLectureNumber(index)}
                        key={element._id}
                        style={{
                            width: '100%',
                            padding: '1rem',
                            textAlign: 'center',
                            margin: 0,
                            borderBottom: '1px solid rgba(0,0,0,0.2)',
                            backgroundColor: lectureNumber === index ? 'rgba(0,0,0,0.1)' : 'transparent', // Highlight selected lecture
                        }}
                    >
                        <Text noOfLines={1}>
                            #{index + 1} {element.title}
                        </Text>
                    </button>
                ))}
            </VStack>
        </Grid>
    );
};

export default CoursePage;
