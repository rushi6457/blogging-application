const jwt = require("jsonwebtoken");
const multer = require('multer');
const BlogModel = require('../models/BlogModel');
const UserModel = require('../models/userModel');
const upload = multer({ dest: 'uploads/' })

const CreateBlog = async(req,res) =>{

      try {
        const {title,blog,author} = req.body;
    
        const cart = await BlogModel.create({title,blog,author});
        
          const newBlog = await BlogModel.findById(cart._id).populate('author');
          await newBlog.save()
         res.status(201).send({ message:`Blog created Successfully`  ,  newBlog});
    } catch (error) {
         res.status(404).send({ message: 'Something went wrong' });
    }
} 

const DeleteBlog = async(req,res) =>{
    const {id} = req.params;
   
    
    try {
        const userId = await BlogModel.findById(id);
        const {token} = req.cookies;
        let check = jwt.decode(token)
        // jwt.verify(token,process.env.SecretToken,{},async() =>{
            // console.log(userId.author , check.id);
            // if(token && userId.author == check.id){
                 const deleteBlog = await BlogModel.findByIdAndDelete({_id:id})
                res.status(200).send({"message":"Blog deleted successfully",deleteBlog})
            // }
            // else{
                // res.status(400).send({"message":"Unauthorised person"})
            // } 
        // })
    } catch (error) {
        res.send(error)
    }
}

const UpdateBlog = async(req,res) =>{
    const {id} = req.params;
   
    try {
        const {title,blog} = req.body;
        const userId = await BlogModel.findById(id);
        const {token} = req.cookies;
        let check = jwt.decode(token)
        // jwt.verify(token,process.env.SecretToken,{},async() =>{
        //     if(token && userId.author == check.id){
                 const updateBlog = await BlogModel.findByIdAndUpdate({_id:id})
                 
                  await updateBlog.updateOne({
                                title,
                                blog
                            });

                res.status(200).send({"message":"Blog updated successfully",updateBlog})
        //     }
        //     else{
        //         res.status(400).send({"message":"Unauthorised person"})
        //     } 
        // })
    } catch (error) {
        res.send(error)
    }
}

const SingleBlog = async(req,res) =>{
    const {id} = req.params;

    try {
        const blog = await BlogModel.findById({_id:id}).populate("author").select("-password");
        res.status(200).send(blog)
    } catch (error) {
        res.status(404).send({"message":"Blog not found"})
    }
}

const AllBlogs = async(req,res) =>{
    try {
        let blogs = await BlogModel.find().populate("author").select("-password")
        res.send(blogs).status(200)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = {
    CreateBlog,
    DeleteBlog,
    UpdateBlog,
    SingleBlog,
    AllBlogs
}