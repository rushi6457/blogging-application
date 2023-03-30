import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Signup from '../Pages/Signup';
import CreateBlog from '../Pages/CreateBlog';
import PrivateRoute from '../privateRoute/PrivateRoute';
import SingleBlog from '../Pages/SingleBlog';
import AuthorAllBlogs from '../Pages/AuthorAllBlogs';

const AllRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
            <Route path='/createblog' element={<PrivateRoute><CreateBlog/></PrivateRoute>}></Route>
            <Route path='/singleblog/:id' element={<SingleBlog/>}></Route>
            <Route path='/authorallblogs' element={<AuthorAllBlogs/>}></Route>
        </Routes>
    );
}

export default AllRoutes;
