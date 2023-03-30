import { Button, Center, FormControl, Input, Spinner, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import styles from "../Styles/CreateBlog.module.css";
import useScrollbarSize from 'react-scrollbar-size';
import { useDispatch, useSelector } from 'react-redux';
import { addblog } from '../Redux/blog/blogActions';
import { useJwt } from "react-jwt";
import { Link } from 'react-router-dom';

const CreateBlog = () => {

    const token = useSelector(storee=>storee.login)
    console.log(token.token);
    const [input,setInput] = useState({
        title:'',
        blog:'',
        author:token.token._id
    })
    
    const store = useSelector(store => store.blog)
    console.log(store);
    const toast = useToast()
    const dispatch = useDispatch();

     const handleChange = (e) =>{
        const {name,value} = e.target;
        setInput({
            ...input,
            [name]:value
        })
     }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addblog(input))
            toast({
                title:"Blog added Successfully",
                status:"success",
                isClosable:true,
                duration:5000
            })
            setInput({
                title:'',
                blog:'',
            })
     }
     
     if(store.isLoading){
            return (
                <Center
                    h={'100vh'}
                >
                    <Spinner
                        thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='blue.500'
                        size='xl'
                    />
                </Center>
            )
        }

    
    return (
        <>
        <Link to='/authorallblogs'>
            <Text textAlign={'right'} padding={'2% 5% 0% 0%'} fontSize={'2xl'} textDecoration={'underline'}>View all blogs</Text>
        </Link>
    <Center
        w='100vw'
        h='80vh'
    >
        <VStack
            w='70%'
            margin={'auto'}
        >
            <FormControl>
                <form onSubmit={handleSubmit}>
                    <Input
                        name='title'
                        value={input.title}
                        onChange={handleChange}
                        placeholder='Title'
                        border={'none'}
                        size={'xl'}
                        variant='flushed'
                        fontSize={'3rem'}
                    ></Input>
                    <Textarea
                        onChange={handleChange}
                        name='blog'
                        value={input.blog}
                        className={styles.blogContent}
                        size={'xl'}
                        variant='flushed'
                        fontSize={'2rem'}
                        placeholder='Tell your story...'
                    ></Textarea>
                    <Button 
                        className={styles.button}
                        mt='6'
                        type='submit'
                        disabled={input.title === '' || input.blog === ''}
                        colorScheme='#063970'
                        borderRadius={'2rem'}
                        fontFamily={'cursive'}
                        fontSize={'2xl'}
                        variant={'solid'}
                    >create Blog</Button>
                </form>
            </FormControl>
        </VStack>
    </Center>
    </>
    );
}

export default CreateBlog;
/*
Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, nisi quas quis cupiditate itaque doloremque magni quisquam eveniet minus voluptates excepturi delectus pariatur, quasi nam possimus! Tenetur omnis incidunt velit!
     Error nihil dolorem at rerum iste officiis culpa odio aliquam suscipit aspernatur debitis nesciunt distinctio recusandae, est fugit maxime quis quam veniam temporibus? Consequuntur earum molestias vero voluptas magni accusantium?
     Sit ducimus culpa sapiente temporibus fugiat, atque perspiciatis optio veniam in suscipit distinctio at vitae aperiam ipsa harum, rerum autem eius, mollitia magnam unde recusandae amet nesciunt libero modi. Odit.

*/