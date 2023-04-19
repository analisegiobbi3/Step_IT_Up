const { gql } = require('apollo-server-express')

const typeDef = gql`
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
    }

    type Mutation{
        addPost(title: String!, text: String!): Post
        addComment(postId: ID!, commentText: String!): Post
        editPost(postId: ID!, title: String!, text: String!): Post
        removePost(postId: ID!): Post
        removeComment(postId: ID!, commentId: ID!): Post
    }

`

module.exports = typeDef;