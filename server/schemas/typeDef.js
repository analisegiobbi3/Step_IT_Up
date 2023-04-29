const { gql } = require('apollo-server-express')

const typeDef = gql`

  type Auth {
    token: ID!
    user: User
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    posts: [Post]
    profile: [Profile]
    routines: [Routine]
    tracker: [Tracker]
  }

  type Routine {
    _id: ID!
    author: String!
    title: String!
    text: String!
  }

  type Profile {
    _id: ID!
    age: Int!
    sex: String!
    weight: Int!
    height: Int!
    goalWeight: Int!
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

  type Tracker {
    _id: ID!
    date: String!
    scheduledRoutines: [ScheduledRoutines]
    weight: Int
    calorie: Int
  }

  type ScheduledRoutines {
    _id: ID
    routineName: String
    complete: Boolean
  }

  type Query {
    posts(username: String): [Post]!
    post(postId: ID!): Post
    profiles: [Profile]
    profile(profileId: ID!): Profile
    me: User
    users: [User]
    user(username: String!): User
    routines: [Routine]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addProfile(age: Int!, sex: String!, weight: Int!, height: Int!, goalWeight: Int!): Profile
    updateProfile(profileId: ID!, age: Int!, weight: Int!, height: Int!, goalWeight: Int!): Profile
    addPost(title: String!, text: String!): Post
    addLike(postId: ID!, userId: ID!): Post
    removeLike(postId: ID!, userId: ID!): Post
    addComment(postId: ID!, commentText: String!): Post
    updatePost(postId: ID!, title: String!, text: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addRoutine(title: String!, text: String!): Routine
    removeRoutine(routineId: ID!): Routine
    addTracker(date: String!): Tracker
    updateTracker(trackerId: ID!, weight: Int, calorie: Int): Tracker
    removeTracker(trackerId: ID!): Tracker
    addScheduledRoutines(trackerId: ID!, routineName: String!): Tracker
    updateScheduledRoutines(scheduledRoutinesId: ID!, complete: Boolean!): Tracker
    removeScheduledRoutines(trackerId: ID!, scheduledRoutinesId: ID!): Tracker
  }
`;

module.exports = typeDef;