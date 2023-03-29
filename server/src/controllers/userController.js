const generateToken = require("../middlewares/token");
const UserModel = require("../models/userModel");
const argon = require('argon2');
const cookieParser = require('cookie-parser');

const Signup = async(req,res) =>{
    const {name,email,password} = req.body;
    const hash = await argon.hash(password)
    try {
        const existing = await UserModel.findOne({email})
    	if(existing){
            res.status(400).send({"message":"User already exists"})
        }
        else{
            if(email.includes("admin.com")){
                let newAdmin = await UserModel.create({
                    name,
                    email,
                    password:hash,
                    role:"author"
                })
                if(newAdmin){
                    res.status(200).send({
                        id:newAdmin._id,
                        name:newAdmin.name,
                        email:newAdmin.email,
                        role:newAdmin.role
                    })
                }
            }
            else{
                let newUser = await UserModel.create({
                    name,
                    email,
                    password:hash,
                    role:"user"
                })  
                 if(newUser){
                    res.status(200).send({
                        id:newUser._id,
                        name:newUser.name,
                        email:newUser.email,
                        role:newUser.role
                    })
                }  
            }
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const Login = async(req,res) =>{
    const {email,password} = req.body;
    const user = await UserModel.findOne({email})
    
    try {
        if(user && await argon.verify(user.password,password)){
            res.cookie('token',generateToken(user._id,user.role))
            .json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id,user.role)
            })
        }
        else{
            res.status(400).send({message:"User not found"})
        }
    } catch (error) {
        res.status(400).send(error)
    }
}

const AllUsers = async(req,res) =>{
    
    const users = await UserModel.find().select('-password')
    
    if(users){
    res.send(users).status(200)
    }
}

module.exports = {
    Signup,
    Login,
    AllUsers
}
