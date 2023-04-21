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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;