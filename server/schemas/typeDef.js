const { gql } = require('apollo-server-express')

const typeDef = gql`
type Profile {
    _id: ID!
    username: String!
    age: Int!
    sex: String!
    weight: Int! 
    height: Int! 
    goalWeight: Int!
    dailyCalories: Int
    savedRoutines: [Routine]
}

type Query {
    profiles: [Profile]
    profile(profileId: ID!): Profile
}

type Mutation{
    addProfile( username: String!, age: Int!, sex: String!, weight: Int!, height: Int!, goalWeight: Int!, dailyCalories: Int): Profile
    updateProfile(id: ID!, age: Int!, weight: Int!, height: Int!, goalWeight: Int!, dailyCalories: Int): Profile
}
`

module.exports = typeDef;