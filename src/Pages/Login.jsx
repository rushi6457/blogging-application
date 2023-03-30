import { Button, Center, Container, FormLabel, Heading, Input, Spinner, VStack, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Redux/auth/authActions';
import { Navigate, useNavigate } from 'react-router-dom';

const Login = () => {

    const [user,setUser] = useState({
        email:'',
        password:''
    })
    const toast = useToast()
    const dispatch = useDispatch();
    const store = useSelector(store =>store.login)
    console.log(store);
    const navigate = useNavigate()
    const handleChange = (e) =>{
        const {name,value} = e.target;
        setUser({
            ...user,
            [name]:value
        })
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        dispatch(login(user)) 
        
         if(store.isAuth === true){
             navigate("/createblog")
             toast({
                 title:"Login Successful",
                 status:"success",
                 isClosable:true,
                 duration:5000
             })
           
        }
        else if(store.isAuth === false){
            
                toast({
                title:"Email or Password is incorrect",
                status:"error",
                isClosable:true,
                duration:5000
            })
           
        }
        
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
    <Center 
        paddingTop={'0%'} 
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
                    textAlign={'center'}>Login into account</Heading>
                <form onSubmit={handleSubmit}>
                <FormLabel fontFamily={'cursive'} fontSize={'xl'}>Email</FormLabel>
                <Input
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={handleChange}
                ></Input>
                <FormLabel fontFamily={'cursive'} fontSize={'xl'}>Password</FormLabel>
                <Input
                    type='text'
                    name='password'
                    value={user.password}
                    onChange={handleChange}
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
                    mt='4'>Login</Button>
                </form>
            </Container>
        </VStack>
    </Center>
    );
}

export default Login;
