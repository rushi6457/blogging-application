const mongoose = require('mongoose')

const LikesSchema = mongoose.Schema({
    likes:{
        type:Number
    },
    userLiked:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }
})

const LikesModel = mongoose.model('comments',LikesSchema)
module.exports = LikesModel