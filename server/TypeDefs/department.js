import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    departments: [Department!]!
    department(id: ID!): Department!
  }
  extend type Mutation {
    addDepartment(input: addDepartmentInput): Department! @isAuth
    updateDepartment(id: ID!, input: updateDepartmentInput): Department! @isAuth
    deleteDepartment(id: ID!): Message! @isAuth
  }

  input addDepartmentInput {
    name: String!
  }

  input updateDepartmentInput {
    name: String
  }

  type Department {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    message: String!
    success: Boolean
  }
`;
export default typeDefs;
