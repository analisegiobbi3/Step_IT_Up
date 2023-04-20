import { gql } from '@apollo/client'

export const ADD_POST = gql`
    mutation addPost($title: String!, $text: String!){
        addPost(title: $title, text: $text){
            _id
            title
            text
            author
            createdAt
            comments{
                _id
                commentText
                commentAuthor
            }
        }
    }
`

export const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $commentText: String!){
        addComment(postId: $postId, commentText: $commentText){
            _id
            title
            text
            author
            createdAt
            comments{
                _id
                commentText
                commentAuthor
                createdAt
            }
        }
    }
`