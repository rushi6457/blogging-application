import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, Heading, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import DateFormatter from 'react-date-formatter';
import { useSelector } from 'react-redux';
import styles from "../Styles/AuthorAllBlogs.module.css"
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
const AuthorAllBlogs = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [filterData,setFilterData] = useState([])
     let [data,setData] = useState([]);
     const store = useSelector(store =>store.login)
     const [edit,setEdit] = useState({
        title:'',
        blog:''
     })
     const [title,setTitle] = useState('')
     const [blog,setBlog] = useState('')
     const toast = useToast()
     const ref = useRef(null)
    useEffect(()=>{
        axios.get(`https://blog-app-5323.onrender.com/blog/allblogs`)
        .then((res) =>setData(res.data.filter((el) =>el.author?._id === store.token?._id)))
    },[data])
    // console.log(data);
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setTitle({
            ...title,
            [name]:value
        })
        setBlog({
            ...blog,
            [name]:value
        })
    }
    const handleDelete = async(id) => {
        let a = await axios.delete(`https://blog-app-5323.onrender.com/blog/deleteblog/${id}`)
        setData(data.filter((el)=>el._id !== id))
        toast({
          title: "Blog deleted successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
    }
    const handleEdit = (id,el) => {
        axios.put(`https://blog-app-5323.onrender.com/blog/updateblog/${id}`,blog,title)
        .then((res)=>console.log(res.data))
        setBlog('')
        toast({
          title: "Blog updated successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
    }

    if(data.length === 0){
        return (
            <Center h={'85vh'}>
                <Flex direction={'column'} align={'center'} gap={'20px'}>
                <Heading>You don't have any blog</Heading>
                    <Flex align={'center'} gap={'10px'}>
                     <Link to={'/createblog'}>
                    <Text textColor={'blue.400'} fontWeight={'bold'} fontSize={'xl'}>Click here {" "}</Text>
                    </Link>
                    <Text fontSize={'md'}>to start your blogging journey</Text>
                    </Flex>
                </Flex>
            </Center>
        )
    }
    return (
        <div>
            
           {data.map((el) =>{
                return(
                    <Box
                        key={el._id}
                        className={styles.admin}>
                        <Divider 
                            fontSize={'20px'} 
                            color={'black'}/>
                    <Flex 
                        justifyContent={'space-between'} 
                        align={'center'}>
                        <Heading 
                            as={'h1'}>{el.title}</Heading>
                        <Flex 
                            margin={'5px'} 
                            gap={'20px'}>
                            <Button 
                            onClick={() =>handleDelete(el._id)}
                            variant={'ghost'} 
                            colorScheme='green'>
                            <DeleteIcon 
                            fontSize={'18px'} 
                            color={'red'}/></Button>

                            <Button 
                            onClick={onOpen}
                            variant={'ghost'} 
                            colorScheme='green'>
                            <EditIcon 
                            fontSize={'18px'} 
                            color={'blue'}/></Button>
                        </Flex>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                            <ModalHeader>Edit your blog</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <FormControl>
                                    <FormLabel>Edit Text</FormLabel>
                                    <Input
                                        name='title'
                                        // value={title} 
                                        onChange={handleChange}></Input>
                                    <FormLabel>Edit Blog</FormLabel>
                                    <Textarea
                                        name='blog'
                                        // value={blog} 
                                        onChange={handleChange}></Textarea>
                                </FormControl>
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                Close
                                </Button>
                                <Button type='submit' variant='ghost' onClick={() =>handleEdit(el._id,el)}>Submit</Button>
                            </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Flex>
                        <Text 
                            fontWeight={'bold'} 
                            fontFamily={'sans-serif'}>{`Updated on: ${DateFormatter(el.updatedAt).longDate()}`}</Text>
                        <Text 
                            className={styles.adminBlog}>{el.blog}</Text>
                        <Divider 
                            fontSize={'20px'} 
                            color={'black'}/>
                    </Box>
                )
           })}
        </div>
    );
}

export default AuthorAllBlogs;
