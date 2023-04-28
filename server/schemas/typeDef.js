const { gql } = require('apollo-server-express')

const typeDef = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
    profile: Profile
    routines: [Routine]
  }

  type RoutineSchedule {
    _id: ID
    date: String
    routine: String
    complete: Boolean
  }

  type WeightSchedule {
    _id: ID
    date: String
    weight: Int
  }

  type CalorieSchedule {
    _id: ID
    date: String
    calorie: Int
  }

  type Routine {
    _id: ID
    title: String
    routine: String
  }

  type Profile {
    _id: ID!
    age: Int!
    sex: String!
    weight: Int!
    height: Int!
    goalWeight: Int!
    activityLevel: Int!
    calories: Int
  }

  type Post {
    _id: ID
    title: String
    text: String
    author: String
    createdAt: String
    comments: [Comment]!
    likes: [User]!
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    commentCreatedAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    posts(username: String): [Post]!
    post(postId: ID!): Post
    profiles: [Profile]
    profile(profileId: ID!): Profile
    me: User
    myProfile: Profile
    users: [User]
    user(username: String!): User
    routine: Routine
    routines: [Routine]
    routineSchedule: RoutineSchedule
    routineSchedules: [RoutineSchedule]
    weightSchedule: WeightSchedule
    weightSchedules: [WeightSchedule]
    calorieSchedule: CalorieSchedule
    calorieSchedules: [CalorieSchedule]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(title: String!, text: String!): Post
    addLike(postId: ID!, userId: ID!): Post
    removeLike(postId: ID!, userId: ID!): Post
    addComment(postId: ID!, commentText: String!): Post
    editPost(postId: ID!, title: String!, text: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addRoutine(title: String!, routine: String!): Routine
    removeRoutine(routineId: ID!): Routine
    addRoutineSchedule(date: String!, routine: String!): RoutineSchedule
    updateRoutineSchedule(routineId: ID!, routine: String!): RoutineSchedule
    removeRoutineSchedule(routineId: ID): RoutineSchedule
    addWeightSchedule(date: String!, weight: Int!): WeightSchedule
    updateWeightSchedule(weightId: ID!, weight: String!): WeightSchedule
    removeWeightSchedule(weightId: ID): WeightSchedule
    addCalorieSchedule(date: String!, calorie: Int!): CalorieSchedule
    updateCalorieSchedule(calorieId: ID!, calorie: String!): CalorieSchedule
    removeCalorieSchedule(calorieId: ID): CalorieSchedule
    addProfile(
      age: Int!
      sex: String!
      weight: Int!
      height: Int!
      goalWeight: Int!
      activityLevel: Int!
      calories: Int
    ): Profile
    updateProfile(
      profileId: ID!
      age: Int
      sex: String
      weight: Int
      height: Int
      goalWeight: Int
      activityLevel: Int
      calories: Int
    ): Profile
  }
`;

module.exports = typeDef;