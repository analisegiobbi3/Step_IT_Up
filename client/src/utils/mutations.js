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

export const ADD_PROFILE = gql`
  mutation addProfile(age: Int!, sex: String!, weight: Int!, height: Int!, goalWeight: Int!) {
    addProfile(age: $newAge, sex: $newSex, weight: $newWeight, height: $newHeight, goalWeight: $newGoalWeight) {
        _id
        age
        sex
        weight
        height
        goalWeight
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


export const UPDATE_PROFILE = gql`
  mutation updateProfile(id: ID!, age: Int!, weight: Int!, height: Int!, goalWeight: Int!) {
    updateProfile(age: $age, weight: $weight, height: $height, goalWeight: $goalWeight) {
        _id
        age
        weight
        height
        goalWeight

    }
}
`

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