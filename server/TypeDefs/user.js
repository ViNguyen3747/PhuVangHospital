import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    authUser: User!
    users: [User!]! @isAuth
  }

  extend type Mutation {
    signup(newUser: signupInput!): Auth!
    signin(email: String!, password: String!): Auth!
    updateRole(id: ID!, role: Boolean!): User! @isAuth
  }
  input signupInput {
    firstName: String!
    lastName: String!
    email: String!
    admin: Boolean!
  }

  input signinInput {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    admin: Boolean!
    createdAt: Date!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Message {
    message: String!
  }
`;
export default typeDefs;
