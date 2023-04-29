const { Profile, User, Post, Routine, Tracker } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate("posts")
        .populate("profile")
        .populate("routines")
        .populate("tracker");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate("posts")
        .populate("profile")
        .populate("routines")
        .populate("tracker");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("posts")
          .populate("profile")
          .populate("routines")
        .populate("tracker");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    profiles: async () => {
      return await Profile.find({});
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    posts: async () => {
      return Post.find().sort({ createAt: -1 });
    },
    post: async (parent, { postId }) => {
      return Post.findOne({ _id: postId });
    },
    routines: async () => {
      return Routine.find({});
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
    },
    addProfile: async (
      parent,
      { age, sex, weight, height, goalWeight },
      context
    ) => {
      if (context.user) {
        return await Profile.create({
          age,
          sex,
          weight,
          height,
          goalWeight,
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateProfile: async (
      parent,
      { profileId, age, weight, height, goalWeight },
      context
    ) => {
      if (context.user) {
        return await Profile.findOneAndUpdate(
          { _id: profileId },
          { age },
          { weight },
          { height },
          { goalWeight },
          { new: true }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addPost: async (parent, { title, text }, context) => {
      if (context.user) {
        const post = await Post.create({
          title,
          text,
          author: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { posts: post._id } }
        );
        return post;
      }
      throw new AuthenticationError("You need to be logged in to post!");
    },
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, commentAuthor: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in to comment!");
    },
    addLike: async (parent, { postId, userId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          { $addToSet: { likes: userId } },
          { new: true, runValidators: true }
        )
      }
    },
    updatePost: async (parent, { postId, title, text }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          { $set: { title: title, text: text, author: context.user.username } },
          { new: true }
        );
      }
    },
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Post.findOneAndDelete({
          _id: postId,
          author: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { posts: post._id } }
        );
        return post;
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a post!"
      );
    },
    removeLike: async (parent, { postId, userId }, context) => {
      if (context.user) {
        return Post.findByIdAndUpdate(
          { _id: postId },
          { $pull: { likes: { _id: userId } } },
          { new: true }
        )

      }
    },
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        return Post.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: {
                _id: commentId,
                commentAuthor: context.user.username,
              },
            },
          },
          { new: true }
        );
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a comment!"
      );
    },
    addRoutine: async (parent, { title, text }, context) => {
      if (context.user) {
        const routine = await Routine.create({
          title,
          text,
          author: context.user.username,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { routines: routine._id } }
        );
        return routine;
      }
      throw new AuthenticationError("You need to be logged in to create routine!");
    },
    removeRoutine: async (parent, { routineId }, context) => {
      if (context.user) {
        const routine = await Routine.findOneAndDelete({
          _id: routineId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { routines: routine._id } }
        );
        return routine;
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a routine!"
      );
    },
    addTracker: async (parent, { date }, context) => {
      if (context.user) {
        const tracker = await Tracker.create({
          date,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { tracker: tracker._id } }
        );
        return tracker;
      }
      throw new AuthenticationError("You need to be logged in to start tracking!");
    },
    updateTracker: async (parent, { trackerId, weight, calorie }, context) => {
      if (context.user) {
        return await Tracker.findOneAndUpdate(
          { _id: trackerId },
          { $set: { weight: weight, calorie: calorie } },
          { new: true }
        );
      }
    },
    addScheduledRoutines: async (parent, { trackerId, routineName }, context) => {
      if (context.user) {
        return Tracker.findOneAndUpdate(
          { _id: trackerId },
          { $addToSet: { scheduledRoutines: { routineName: routineName}, }, },
          { new: true, runValidators: true }
        );
      }
      throw new AuthenticationError("You need to be logged in to update routine!");
    },
    updateScheduledRoutines: async (parent, { scheduledRoutinesId, complete }, context) => {
      if (context.user) {
        return await Tracker.findOneAndUpdate(
          { "scheduledRoutines._id": scheduledRoutinesId },
          { $set: { "scheduledRoutines.$.complete": complete } },
          { new: true }
        );
      }
    },
    removeScheduledRoutines: async (parent, { trackerId, scheduledRoutinesId }, context) => {
      if (context.user) {
        return Tracker.findOneAndUpdate(
          { _id: trackerId },
          { $pull: { scheduledRoutines: {_id: scheduledRoutinesId,},}, }
        );
      }
      throw new AuthenticationError(
        "You need to be logged in to remove a scheduled routine!"
      );
    },
    removeTracker: async (parent, { trackerId }, context) => {
      if (context.user) {
        const tracker = await Tracker.findOneAndDelete({
          _id: trackerId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { tracker: tracker._id } }
        );
        return tracker;
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a track!"
      );
    },
  },
};

module.exports = resolvers;