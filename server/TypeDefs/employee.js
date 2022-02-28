import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    employees(department: String!): [Employee!]!
    employee(id: ID!): Employee!
  }
  extend type Mutation {
    addEmployee(input: addEmployeeInput): Employee! @isAuth
    updateEmployee(id: ID!, input: updateEmployeeInput): Employee! @isAuth
    deleteEmployee(id: ID!): Message! @isAuth
  }

  input addEmployeeInput {
    name: String!
    department: String!
    email: String
    phone: String
    address: String
  }

  input updateEmployeeInput {
    name: String
    department: String
    email: String
    phone: String
    address: String
  }

  type Employee {
    id: ID!
    name: String!
    department: String!
    email: String
    phone: String
    address: String
    createdAt: Date!
  }
  type Message {
    message: String!
    success: Boolean
  }
`;
export default typeDefs;
