const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postedAt: {
        type: String,
        default: Date
    },
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    dislikes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    loves: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    postText: String,
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, {timestamps: true});

module.exports = mongoose.model('Post', postSchema);