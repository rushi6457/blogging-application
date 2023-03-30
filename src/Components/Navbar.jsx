import { Avatar, Box, Button, Flex, HStack, Heading, Image, Tooltip, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import {EditIcon, MoonIcon,SunIcon} from "@chakra-ui/icons"
import {FcReadingEbook} from "react-icons/fc";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/auth/authActions';
import styles from "./Navbar.module.css";
import {GiHamburgerMenu} from "react-icons/gi"
import {FaBars} from "react-icons/fa"
import {FaTimes} from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
     const { colorMode, toggleColorMode } = useColorMode()
     const store = useSelector(store=>store.login)
     console.log(store);
    const [state,setState] = useState(false)
    const dispatch = useDispatch()
    const [click , setClick ] = useState(false)
    const [color , setColor] = useState(false)
    const handleClic = () =>setClick(!click)
     const handleClick = () =>{
        dispatch(logout())
     }
    return (
        <HStack 
            className={styles.navbar}
            bgColor={colorMode === "light" ? 'white' : '#030b15f'}            >
            <Flex 
                align={'center'} 
                gap={'10px'}>
                <FcReadingEbook fontSize={'40px'}/>
                <Link to='/'>
                <Heading
                    fontFamily={'cursive'}
                    >BlogApp</Heading>
                </Link>
            </Flex>
            <Flex 
                className={click ? "nav-menu active"  : "nav-menu"}
                align={'center'} 
                gap={'20px'}>
                    <Link to={store.token?.token ? '/createblog' : "/login"}>
                    <Button variant={'ghost'} fontSize={'1.2rem'} gap={'10px'}>Write <EditIcon fontSize={'1.2rem'}/></Button>
                    
                    </Link>
                    <Button 
                        className='mode'
                        variant={'outline'}
                        colorScheme='black' 
                        onClick={toggleColorMode}>{colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}</Button>   
                    <Link to={'/login'}>  
                    {/* <Tooltip hasArrow label='Profile' fontSize='md'> */}
                        <Button
                        fontFamily={'monospace'}
                        letterSpacing={'1px'}
                        fontSize={'lg'}
                        variant={'solid'}
                        colorScheme='red'
                        >{store.isAuth ? "Logout" : 'Login'}</Button>
                    {/* </Tooltip> */}
                    </Link>
                    <Link to={'/signup'}>
                    <Button
                        fontFamily={'monospace'}
                        letterSpacing={'1px'}
                        fontSize={'lg'}
                        variant={'outline'}
                        colorScheme='red'
                        >Signup</Button>
                    </Link>
            </Flex>
            <Box className={styles.hamberger} onClick={handleClic}>
                {!click ? (
                     <FaBars  size='30' style ={{color:'red'}} />
                ):(

                   <FaTimes  size={30} style ={{color:'white'}}  />
                )
            }
               
            </Box>
                    {/* <GiHamburgerMenu fontSize={'1.4rem'} className={styles.hamberger} /> */}
        </HStack>
    );
}

export default Navbar;
