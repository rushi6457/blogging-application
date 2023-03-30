const mongoose  = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    blog:{
        type:String,
        required:true,
        trim:true
    },
    // image:{
    //     data:Buffer,
    //     ContentType:String
    // },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    // comments:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'comments'
    // },
    // likes:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     ref:'user',
    //     max:1
    // }
},{
    timestamps:true
})

const BlogModel = mongoose.model('blog',BlogSchema)
module.exports = BlogModel