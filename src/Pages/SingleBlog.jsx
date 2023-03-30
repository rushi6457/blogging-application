import { Box, Center, Flex, Heading, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DateFormatter from 'react-date-formatter';
import { useParams } from 'react-router-dom';
import styles from "../Styles/SingleBlog.module.css"
const SingleBlog = () => {
    const [data,setData] = useState([])
    const {id} = useParams()
    console.log(id); 

    useEffect(()=>{
        axios.get(`https://blog-app-5323.onrender.com/blog/getsingleblog/${id}`)
        .then((res) =>setData(res.data))
    },[id])
    return (
        <Center 
            h='100vh'
            
            width={'80%'}
            margin={'auto'}
        >
            <Box
                className={styles.singleBlog}
            >
                <Heading as={'h1'} size={'xl'} textAlign={'center'}>{data.title}</Heading>
                <Flex 
                    // border={'1px solid'}
                    // w={'60%'}
                    // margin={'auto'}
                    // justifyContent={'center'}
                    // gap={'20px'}
                    // align={'center'}
                    className={styles.flex}
                >
                    <Text
                        fontSize={'18px'}
                        fontFamily={'calibri'}
                        letterSpacing={'wide'}
                        fontWeight={'bold'}
                    >{`Author: ${data.author?.name !== undefined ? data.author?.name : 'Unknown author' }`}</Text>
                    <Text
                        padding={'4px'}
                        fontSize={'15px'}
                        fontFamily={'cursive'}
                        width={'100%'}
                        // textAlign={'center'}
                    >Created on: {DateFormatter(data.updatedAt).longDate()}</Text>
                </Flex>
                <Text
                    width={'100%'}
                    margin={'auto'}
                    padding={'5px'}
                    textAlign={'justify'}
                    fontSize={'1.1rem'}
                    className={styles.mainBlog}
                >{data.blog}</Text>
            </Box>
        </Center>
    );
}

export default SingleBlog;
