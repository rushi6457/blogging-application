import { Button, Center, Container, FormControl, FormLabel, Heading, Input, Spinner, VStack, useToast } from '@chakra-ui/react';import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../Redux/auth/authActions';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [user,setUser] = useState({
        name:'',
        email:'',
        password:''
    })
    const navigate = useNavigate()
    const toast = useToast()
    const dispatch = useDispatch()
    const store = useSelector(store =>store.signup)
    
    useEffect(()=>{
        if(store.isAuth.id){
            navigate("/login")
            toast({
                title:"Signup Successfully",
                status: "success",
                duration:5000,
                isClosable:true
            })
        }
    },[store.isAuth])

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

    const handleChange = (e) =>{
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]:value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(signup(user))
        
    }
    return (
        <Center
            // paddingTop={'-20px'} 
            w='100vw'
            h='85vh'>
        <VStack  
            boxShadow= "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"   
            width={'40%'}
            padding={'3rem'}
            margin={'auto'}
            borderTopRightRadius={'2rem'}
            borderBottomRadius={'2rem'}
            >
            <Container>
                <Heading 
                    fontFamily={'cursive'}
                    paddingBottom={'20px'}    
                    size={'lg'} 
                    textAlign={'center'}>Create Account</Heading>
                <form 
                    onSubmit={handleSubmit}>
                <FormLabel 
                    fontFamily={'cursive'} 
                    fontSize={'xl'}>Name</FormLabel>
                <Input 
                    type='text'
                    name='name'
                    value={user.name}
                    onChange={handleChange}
                    borderRadius={'2rem'}
                ></Input>
                <FormLabel 
                    fontFamily={'cursive'} 
                    fontSize={'xl'}>Email</FormLabel>
                <Input 
                    type='email'
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                    borderRadius={'2rem'}
                ></Input>
                <FormLabel 
                    fontFamily={'cursive'} 
                    fontSize={'xl'}>Password</FormLabel>
                <Input 
                    type='password'
                    name='password'
                    value={user.password}
                    onChange={handleChange}
                    borderRadius={'2rem'}
                ></Input>
                <Button 
                    type='submit'
                    variant={'solid'}
                    colorScheme='blue'
                    width='10vw'
                    color='white'
                    borderRadius={'30px'}
                    fontFamily={'cursive'}
                    fontSize={'lg'}
                    mt='4'>Signup</Button>
                </form>
            </Container>
        </VStack>
    </Center>
    );
}

export default Signup;
