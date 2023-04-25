const { gql } = require('apollo-server-express')

const typeDef = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    posts: [Post]
    profile: [Profile]
    routines: [Routine]
  }

  type Routine {
    _id: ID
    title: String
    routine: String
  }

  type Profile {
    _id: ID!
    username: String!
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
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
  }

  type Comment {
    _id: ID
    title: String
    routine: String
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
    users: [User]
    user(username: String!): User
    routine: Routine
    routines: [Routine]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addPost(title: String!, text: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    editPost(postId: ID!, title: String!, text: String!): Post
    removePost(postId: ID!): Post
    removeComment(postId: ID!, commentId: ID!): Post
    addProfile(
      username: String!
      age: Int!
      sex: String!
      weight: Int!
      height: Int!
      goalWeight: Int!
    ): Profile
    updateProfile(
      id: ID!
      age: Int!
      weight: Int!
      height: Int!
      goalWeight: Int!
    ): Profile
    addRoutine(title: String, routine: String): Routine
  }
`;

module.exports = typeDef;