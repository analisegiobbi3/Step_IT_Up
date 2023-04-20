const { Profile, User, Post } = require('../models')

const resolvers = {
Query: {
    profile: async (parent, { profileId }) => {
        return Profile.findOne({ _id: profileId });
    },
    profiles: async () => {
        return await Profile.find({})
    },
     posts: async () => {
         return Post.find().sort({ createAt: -1 })
     },
     post: async (parent, { postId }) => {
         return Post.fineOne({ _id: postId })
      },
},

Mutation: {
    addProfile: async (parent, { username, age, sex, weight, height, goalWeight, dailyCalories }, context) => {
        if (context.user) {
        return await Profile.create({ username, age, sex, weight, height, goalWeight, dailyCalories });
        }
        throw new AuthenticationError('You need to be logged in!');
      },
      updateProfile: async (parent, { id, age, weight, height, goalWeight, dailyCalories }, context) => {
        if (context.user) {
        return await Profile.findOneAndUpdate(
          { _id: id }, 
          { age },
          { weight },
          { height },
          { goalWeight },
          { dailyCalories },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
        addPost: async (parent, { title, text }, context) => {
            if (context.user) {
                const post = await Post.create({
                    title,
                    text,
                    author: context.user.username,
                })
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: post._id }}
                )
                return post;
            }
            throw new AuthenticationError('You need to be logged in to post!')
        },
        addComment: async (parent, { postId, commentText }, context) => {
            if(context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    { $addToSet: { comments: { commentText, commentAuthor: context.user.username } }},
                    { new: true, runValidators: true },
                )
            }
            throw new AuthenticationError('You need to be logged in to comment!')
        },
        editPost: async (parent, { postId, title, text }, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    { $set: { title: title, text: text, author: context.user.username }},
                    { new: true }
                )
            }
        },
        removePost: async(parent, { postId }, context) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({
                    _id: postId,
                    author: context.user.username
                })
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id }}
                )
                return post;
            }
            throw new AuthenticationError('You need to be logged in to delete a post!')
        },
        removeComment: async (parent, { postId, commentId}, context) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    { $pull: { comments: { _id: commentId, commentAuthor: context.user.username }}},
                    { new: true }
                )
            }
            throw new AuthenticationError('You need to be logged in to delete a comment!')
        },
    }
}

module.exports = resolvers;