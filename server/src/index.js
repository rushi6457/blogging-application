require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connect = require("./config/db")
const app = express()
const userRoute = require("./routes/userRouter")
const blogRoute = require("./routes/blogRoute")
const cookieParser = require('cookie-parser')
app.use(express.urlencoded({extended:true}))
app.use(cors({origin:true,credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use("/user",userRoute)
app.use("/blog",blogRoute)
// app.use("/blog",blogRoute)
app.get("/",(req,res) =>res.send("HELLO"))

app.listen(process.env.PORT, async() =>{
    await connect()
    console.log(`Server started on http://localhost:${process.env.PORT}`);
})


