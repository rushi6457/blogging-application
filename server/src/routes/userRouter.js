const express = require('express');
const { Signup, Login, AllUsers } = require('../controllers/userController');
const router = express.Router();

router.post("/signup",Signup)
router.post("/login",Login)
router.get("/allusers",AllUsers)
module.exports = router