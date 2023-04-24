import { gql } from '@apollo/client'

export const QUERY_POSTS = gql`
    query getPosts {
        posts {
            _id
            title
            text
            author
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
            createdAt
            comments {
                _id
                commentText
                comment Author
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

    }
}
`

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
                comment Author
                createdAt
            }
        profile {
            _id
            age
            sex
            weight
            height
            goalWeight
        }
      }
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
        _id
        age
        sex
        weight
        height
        goalWeight
    }
  }
`;

