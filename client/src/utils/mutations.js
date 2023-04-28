import { gql } from '@apollo/client'

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
  mutation addProfile($newAge: Int!, $newSex: String!, $newWeight: Int!, $newHeight: Int!, $newGoalWeight: Int!, $activityLevel: Int!, $calories: Int) {
    addProfile(age: $newAge, sex: $newSex, weight: $newWeight, height: $newHeight, goalWeight: $newGoalWeight, activityLevel: $activityLevel, calories: $calories) {
        _id
        age
        sex
        weight
        height
        goalWeight
        calories
        activityLevel
    }
}
`;

export const UPDATE_PROFILE = gql`
  mutation updateProfile($profileId: ID!, $age: Int, $sex: String, $weight: Int, $height: Int, $goalWeight: Int, $calories: Int, $activityLevel: Int) {
    updateProfile(profileId: $profileId, age: $age, sex: $sex, weight: $weight, height: $height, goalWeight: $goalWeight, calories: $calories, activityLevel: $activityLevel) {
      _id
      age
      sex
      weight
      height
      goalWeight
      calories
      activityLevel
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
                commentCreatedAt
            }
        }
    }
`

export const ADD_LIKE = gql`
    mutation addLike($postId: ID!, $userId: ID!){
      addLike(postId: $postId, userId: $userId){
        _id
        likes{
          _id
        }
      }
    }
`
export const REMOVE_LIKE = gql`
    mutation removeLike($postId: ID!, $userId: ID){
      removePost(postId: $postId, userId: $userId){
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
    mutation removePost($postId: ID!){
      removePost(postId: $postId){
        _id
      }
    }
`;

export const ADD_ROUTINE = gql`
  mutation addRoutine($title: String, $routine: String) {
    addRoutine(title: $title, routine: $routine) {
      _id
      title
      routine
    }
  }
`;

export const REMOVE_ROUTINE = gql`
    mutation removeRoutine($routineId: ID!){
      removeRoutine(routineId: $routineId){
        _id
      }
    }
`;
