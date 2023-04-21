const { gql } = require('apollo-server-express')

const typeDef = gql`

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

    type Comment{
        _id: ID
        commentText: String
        commentAuthor: String
        createdAt: String
    }

    type Query {
        posts: (username: String) [Post]!
        post(postId: ID!): Post
        profiles: [Profile]
        profile(profileId: ID!): Profile
        me: Profile
        users: [User]
        user(username: String!): User
 

    }

    type Mutation{
        addUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addPost(title: String!, text: String!): Post
        addComment(postId: ID!, commentText: String!): Post
        editPost(postId: ID!, title: String!, text: String!): Post
        removePost(postId: ID!): Post
        removeComment(postId: ID!, commentId: ID!): Post
        addProfile( username: String!, age: Int!, sex: String!, weight: Int!, height: Int!, goalWeight: Int!): Profile
        updateProfile(id: ID!, age: Int!, weight: Int!, height: Int!, goalWeight: Int!): Profile
    }

`

module.exports = typeDef;