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
  mutation addProfile($newAge: Int!, $newSex: String!, $newWeight: Int!, $newHeight: Int!, $newGoalWeight: Int!, $activityLevel: Float!, $calories: Int) {
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
  mutation updateProfile($profileId: ID!, $age: Int, $sex: String, $weight: Int, $height: Int, $goalWeight: Int, $calories: Int, $activityLevel: Float) {
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

export const ADD_ROUTINE = gql`
  mutation addRoutine($title: String!, $text: String!) {
    addRoutine(title: $title, text: $text) {
      _id
      title
      text
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


export const ADD_POST = gql`
    mutation addPost($title: String!, $text: String!){
        addPost(title: $title, text: $text){
            _id
            title
            text
            author
            createdAt
        }
    }
`

export const UPDATE_POST = gql`
    mutation updatePost($postId: ID!, $title: String!, $text: String!){
      updatePost(postId: $postId, title: $title, text: $text){
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

export const ADD_COMMENT = gql`
    mutation addComment($postId: ID!, $commentText: String!){
        addComment(postId: $postId, commentText: $commentText){
            _id
            title
            text
            comments {
                _id
                commentText
                commentAuthor
                commentCreatedAt
            }
        }
    }
`

export const REMOVE_COMMENT = gql`
    mutation removeComment($postId: ID!, $commentId: ID!){
      removeComment(postId: $postId, commentId: $commentId){
        _id
      }
    }
`

export const ADD_LIKE = gql`
    mutation addLike($postId: ID!){
      addLike(postId: $postId){
        _id
        likes{
          _id
        }
      }
    }
`
export const REMOVE_LIKE = gql`
    mutation removeLike($postId: ID!){
      removeLike(postId: $postId){
        _id
      }
    }
`;

export const ADD_TRACKER = gql`
  mutation addTracker($date: String!) {
    addTracker(date: $date) {
      _id
      date
      scheduledRoutines {
        _id
        routineName
        complete
      }
      weight
      calorie
    }
  }
`;

export const UPDATE_TRACKER = gql`
  mutation updateTracker($trackerId: ID!, $weight: Int, $calorie: Int) {
    updateTracker(trackerId: $trackerId, weight: $weight, calorie: $calorie) {
      _id
      weight
      calorie
    }
  }
`;

export const REMOVE_TRACKER = gql`
  mutation removeTracker($trackerId: ID!) {
    removeTracker(trackerId: $trackerId) {
      _id
    }
  }
`;

export const ADD_SCHEDULED_ROUTINES = gql`
  mutation addScheduledRoutines($trackerId: ID!, $routineName: String!) {
    addScheduledRoutines(trackerId: $trackerId, routineName: $routineName) {
      _id
      date
      scheduledRoutines {
        _id
        routineName
        complete
      }
      weight
      calorie
    }
  }
`;

export const UPDATE_SCHEDULED_ROUTINES = gql`
  mutation updateScheduledRoutines($scheduledRoutinesId: ID!, $complete: Boolean!) {
    updateScheduledRoutines(scheduledRoutinesId: $scheduledRoutinesId, complete: $complete) {
      _id
      scheduledRoutines {
        _id
        routineName
        complete
      }
    }
  }
`;

export const REMOVE_SCHEDULED_ROUTINES = gql`
  mutation removeScheduledRoutines($trackerId: ID!, $scheduledRoutinesId: ID!) {
    removeScheduledRoutines(trackerId: $trackerId, scheduledRoutinesId: $scheduledRoutinesId) {
      _id
    }
  }
`;