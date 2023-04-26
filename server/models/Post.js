const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat')

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 300,
            trim: true,
        },
        text: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
        comments: [
            {
                commentText: {
                    type: String,
                    require: true,
                    minlength: 1,
                    maxlength: 300,
                },
                commentAuthor: {
                    type: String,
                    required: true,
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                    get: (timestamp) => dateFormat(timestamp),
                },
            },
        ],
    }
)

const Post = model('Post', postSchema);

module.exports = Post;