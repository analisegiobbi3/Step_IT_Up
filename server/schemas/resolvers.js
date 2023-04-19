const { Profile, User } = require('../models')

const resolvers = {
Query: {
    profile: async (parent, { profileId }) => {
        return Profile.findOne({ _id: profileId });
      },
    profiles: async () => {
        return await Profile.find({})
    }
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
    }
}

};

module.exports = resolvers;