const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const BlogModel = require("../models/BlogModel");
const fs = require('fs');
const { CreateBlog, UpdateBlog, DeleteBlog, SingleBlog, AllBlogs } = require('../controllers/blogController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' })

router.post("/addblog",CreateBlog)
router.put("/updateblog/:id",UpdateBlog)
router.delete("/deleteblog/:id",DeleteBlog)
router.get("/getsingleblog/:id",SingleBlog)
router.get("/allblogs",AllBlogs)

module.exports = router