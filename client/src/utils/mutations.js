import { gql } from '@apollo/client'

export const ADD_USER = gql`
  mutation addUser($newUsername: String!, $newEmail: String!, $newPassword: String!) {
    addUser(username: $newUsername, email: $newEmail, password: $newPassword) {
      token
      user {
        _id
        username
      }
    }
  }
`;

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

export const ADD_PROFILE = gql`
  mutation addProfile($newAge: Int!, $newSex: String!, $newWeight: Int!, $newHeight: Int!, $newGoalWeight: Int!) {
    addProfile(age: $newAge, sex: $newSex, weight: $newWeight, height: $newHeight, goalWeight: $newGoalWeight) {
        _id
        age
        sex
        weight
        height
        goalWeight
    }
}
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($id: ID!, $age: Int!, $weight: Int!, $height: Int!, $goalWeight: Int!) {
    updateProfile(id: $id, age: $age, weight: $weight, height: $height, goalWeight: $goalWeight) {
      _id
      age
      weight
      height
      goalWeight
    } 
  }
`;

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

export const ADD_LIKE = gql`
    mutation addLike($postId: ID!, $userId: ID!){
      addLike(postId: $postId, userId: $userId){
        _id
      }
    }
`
export const REMOVE_LIKE = gql`
    mutation removeLike($userId: ID){
      removePost(userId: $userId){
        _id
      }
    }
`;

// export const REMOVE_COMMENT = gql`
//     mutation removeComment($commentId: ID){
//       removeComment(commentId: $commentId){
//         _id
//       }
//     }
// `

export const EDIT_POST = gql`
    mutation editPost($postId: ID!, $title: String!, $text: String!){
      editPost(postId: $postId, title: $title, text: $text){
        _id
        title
        text
      }
    }
`
export const REMOVE_POST = gql`
    mutation removePost($postId: ID){
      removePost(postId: $postId){
        _id
      }
    }
`;

export const ADD_ROUTINE = gql`
  mutation addRoutine(
    $title: String
    $routine: String
  ) {
    addRoutine(
      title: $title
      routine: $routine
    ) {
      _id
      title
      routine
    }
  }
`;