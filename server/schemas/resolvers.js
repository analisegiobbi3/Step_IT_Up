const { Profile, User, Post, Routine } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');


const resolvers = {
  Query: {
    users: async () => {
      return User.find()
        .populate("posts")
        .populate("profile")
        .populate("routines")
        .populate("routineSchedule")
        .populate("weightSchedule")
        .populate("calorieSchedule");
    },
    user: async (parent, { username }) => {
      return User.findOne({ username })
        .populate("posts")
        .populate("profile")
        .populate("routines")
        .populate("routineSchedule")
        .populate("weightSchedule")
        .populate("calorieSchedule");
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate("profile");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    profiles: async () => {
      return await Profile.find({});
    },
    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },
    myProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id })
      }
      throw new AuthenticationError("You need to be logged in!")
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
    routine: async (parent, { routineId }) => {
      return Routine.findOne({ _id: routineId });
    },
    routineSchedules: async () => {
      return RoutineSchedule.find({});
    },
    routineSchedule: async (parent, { routineScheduleId }) => {
      return RoutineSchedule.findOne({ _id: routineScheduleId });
    },
    weightSchedules: async () => {
      return WeightSchedule.find({});
    },
    weightSchedule: async (parent, { weightScheduleId }) => {
      return WeightSchedule.findOne({ _id: weightScheduleId });
    },
    calorieSchedules: async () => {
      return CalorieSchedule.find({});
    },
    calorieSchedule: async (parent, { calorieScheduleId }) => {
      return CalorieSchedule.findOne({ _id: calorieScheduleId });
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
      { age, sex, weight, height, goalWeight, activityLevel, calories },
      context
    ) => {
      if (context.user) {
         const profile = await Profile.create({
          age,
          sex,
          weight,
          height,
          goalWeight,
          activityLevel,
          calories
        });
        await User.updateOne({_id: context.user._id}, {profile: profile._id})
        return profile
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateProfile: async (
      parent,
      { profileId, age, sex, weight, height, goalWeight, activityLevel, calories },
      context
    ) => {
      if (context.user) {
        return await Profile.findOneAndUpdate(
          { _id: profileId },
          { age,
           sex ,
           weight ,
           height ,
           goalWeight ,
           activityLevel ,
           calories },
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
          {
            $addToSet: {
              likes: { userId }
            }
          },
          { new: true, runValidators: true }
        )
      }
    },
    editPost: async (parent, { postId, title, text }, context) => {
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
    addRoutine: async (
      parent,
      { title, routine },
      context
    ) => {
      if (context.user) {
        return await Routine.create({
          title,
          routine
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    addRoutineSchedule: async (
      parent,
      { date, routine },
      context
    ) => {
      if (context.user) {
        return await RoutineSchedule.create({
          date,
          routine
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateRoutineSchedule: async (
      parent,
      { routineScheduleId, complete },
      context
    ) => {
      if (context.user) {
        return await RoutineSchedule.findOneAndUpdate(
          { _id: routineScheduleId },
          { complete }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  removeRoutineSchedule: async (
    parent, { routineScheduleId }, 
    context) => {
    if (context.user) {
      const routineSchedule = await RoutineSchedule.findOneAndDelete({
        _id: routineScheduleId,
      });
      await User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { routineSchedule: RoutineSchedule._id } }
      );
      return routineSchedule;
    }
    throw new AuthenticationError(
      "You need to be logged in to delete a post!"
    );
  },
    addWeightSchedule: async (
      parent,
      { date, weight },
      context
    ) => {
      if (context.user) {
        return await WeightSchedule.create({
          date,
          weight
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    updateWeightSchedule: async (
      parent,
      { weightScheduleId, weight },
      context
    ) => {
      if (context.user) {
        return await WeightSchedule.findOneAndUpdate(
          { _id: weightScheduleId },
          { weight }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeWeightSchedule: async (
      parent, { weightScheduleId }, 
      context) => {
      if (context.user) {
        const weightSchedule = await WeightSchedule.findOneAndDelete({
          _id: weightScheduleId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { weightSchedule: WeightSchedule._id } }
        );
        return weightSchedule;
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a post!"
      );
    },
    addCalorieSchedule: async (
      parent,
      { date, calorie },
      context
    ) => {
      if (context.user) {
        return await CalorieSchedule.create({
          date,
          calorie
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    
    updateCalorieSchedule: async (
      parent,
      { calorieScheduleId, calorie },
      context
    ) => {
      if (context.user) {
        return await CalorieSchedule.findOneAndUpdate(
          { _id: calorieScheduleId },
          { calorie }
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    removeCalorieSchedule: async (
      parent, { calorieScheduleId }, 
      context) => {
      if (context.user) {
        const calorieSchedule = await CalorieSchedule.findOneAndDelete({
          _id: calorieScheduleId,
        });
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { calorieSchedule: CalorieSchedule._id } }
        );
        return calorieSchedule;
      }
      throw new AuthenticationError(
        "You need to be logged in to delete a post!"
      );
    },
  },
};

module.exports = resolvers;