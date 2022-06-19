import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    authUser: User!
    users: [User!]! @isAuth
    user(id: ID!): User! @isAuth
  }

  extend type Mutation {
    addUser(newUser: addUserInput!): Auth! @isAuth
    updateUser(id: ID!, updatedUser: updateUserInput): User! @isAuth
    deleteUser(id: ID!): Message! @isAuth
    signin(userName: String!, password: String!): Auth!
  }
  input addUserInput {
    firstName: String!
    lastName: String!
    userName: String!
    admin: Boolean!
    department: String!
    password: String!
  }

  input updateUserInput {
    firstName: String
    lastName: String
    userName: String
    admin: Boolean
    department: String
    password: String
  }

  input signinInput {
    userName: String!
    password: String!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    admin: Boolean!
    department: String!
    password: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Auth {
    token: String!
    user: User!
  }

  type Message {
    message: String!
    success: Boolean
  }
`;
export default typeDefs;
