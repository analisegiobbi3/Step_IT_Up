import { gql } from '@apollo/client'

export const QUERY_POSTS = gql`
    query getPosts {
        posts {
            _id
            title
            text
            author
            likes {
              username
            }
            createdAt
            comments {
              _id
              commentText
              commentAuthor
              commentCreatedAt
          }
        }
    }
`

export const QUERY_POST = gql`
    query getPost($postId: ID!) {
        post(postId: $postId){
            _id
            title
            text
        }
    }
`

export const QUERY_USER_POST = gql`
    query getUserPost($userId: ID!) {
        post(userId: $userId){
            _id
            title
            text
            author
            likes {
              username
            }
            createdAt
            comments {
                _id
                commentText
                commentAuthor
                commentCreatedAt
            }
        }
    }
`

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
        _id
        age
        sex
        weight
        height
        goalWeight
        activityLevel
        calories
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
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
`
export const QUERY_ROUTINES = gql`
  query allRoutines {
    routines {
      _id
      author
      title
      text
    }
  }
`;

export const QUERY_SINGLE_ROUTINE = gql`
  query singleRoutine {
    routine {
      _id
      author
      title
      text
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      posts {
            _id
            title
            text
            author
            createdAt
            likes {
              username
            }
            comments {
                _id
                commentText
                commentAuthor
                commentCreatedAt
            }
      }
        profile {
            _id
            age
            sex
            weight
            height
            goalWeight
            calories
            activityLevel
        }
        routines {
            _id
            author
            title
            text
      }
      tracker {
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
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      posts {
        _id
        title
        text
        author
        createdAt
        likes {
              username
            }
        comments {
          _id
          commentText
          commentAuthor
          commentCreatedAt
        }
      }
        profile {
          _id
          age
          sex
          weight
          height
          goalWeight
          calories
          activityLevel
        }
        routines {
          _id
          author
        title
        text
      }
      tracker {
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
  }
`;

export const QUERY_MYPROFILE = gql`
  query myProfile {
    myProfile {
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

export const QUERY_WEIGHT = gql`
  query weightSchedules {
    weightSchedules {
      _id
      date
      weight
    }
  }
`

export const QUERY_CALORIES = gql`
  query calorieSchedules {
    calorieSchedules {
      _id
      date
      calories
    }
  }
`

