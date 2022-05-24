import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee!
  }
  extend type Mutation {
    addEmployee(input: addEmployeeInput): Employee!
    updateEmployee(id: ID!, input: updateEmployeeInput): Employee!
    deleteEmployee(id: ID!): Message!
  }

  input addEmployeeInput {
    name: String
    email: String
    phone: String
    address: String
  }

  input updateEmployeeInput {
    name: String
    email: String
    phone: String
    address: String
  }

  type Employee {
    id: ID!
    name: String!
    email: String
    phone: String
    address: String
    createdAt: Date!
    updatedAt: Date!
  }
  type Message {
    message: String!
    success: Boolean
  }
`;
export default typeDefs;
