import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    authUser: User!
    users: [User!]! @isAuth
  }

  extend type Mutation {
    addUser(newUser: addUserInput!): Auth!
    signin(email: String!, password: String!): Auth!
    updateRole(id: ID!, role: Boolean!): User! @isAuth
  }
  input addUserInput {
    firstName: String!
    lastName: String!
    email: String!
    admin: Boolean!
    password: String!
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
    password: String!
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
