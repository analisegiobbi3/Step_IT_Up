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
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        createdAt
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
      thoughts {
        _id
        thoughtText
        thoughtAuthor
        createdAt
      }
    }
  }
`;
