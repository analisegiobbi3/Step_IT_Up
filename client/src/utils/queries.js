import { gql } from '@apollo/client'

export const QUERY_POSTS = gql`
    query getPosts {
        posts {
            _id
            title
            text
            author
            likes
            createdAt
        }
    }
`

export const QUERY_USER_POST = gql`
    query getUserPost($postId: ID!) {
        post(postId: $postId){
            _id
            title
            text
            author
            likes
            createdAt
            comments {
                _id
                commentText
                commentAuthor
                createdAt
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
      title
      routine
    }
  }
`;

export const QUERY_SINGLE_ROUTINE = gql`
  query singleRoutine {
    routine {
      _id
      title
      routine
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
        comments {
          _id
          commentText
          commentAuthor
          createdAt
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
        title
        routine
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
        comments {
          _id
          commentText
          commentAuthor
          createdAt
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
        title
        routine
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
