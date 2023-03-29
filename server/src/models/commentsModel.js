const mongoose = require('mongoose')

const CommentsSchema = mongoose.Schema({
    comment:{
        type:String
    },
    userCommented:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const CommentsModel = mongoose.model('comments',CommentsSchema)
module.exports = CommentsModel