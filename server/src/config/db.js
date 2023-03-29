require('dotenv').config()
const mongoose = require('mongoose')
const connect = async() =>{
    return mongoose.connect(process.env.DB)
}
module.exports = connect