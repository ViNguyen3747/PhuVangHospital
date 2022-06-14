import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    tasks(date: Date): [Task!]!
    task(id: ID!): Task!
  }

  extend type Mutation {
    addTask(input: addTaskInput): Task! @isAuth
    updateTask(id: ID!, input: updateTaskInput): Task! @isAuth
    deleteTask(id: ID!): Message!
  }

  input addTaskInput {
    employee: String!
    task: [[String!]]!
    updatedBy: String!
  }

  input updateTaskInput {
    employee: String
    task: [[String]]
    updatedBy: String
  }

  type Task {
    id: ID!
    employee: String!
    task: [String!]!
    createdAt: Date!
    updatedBy: String!
    updatedAt: Date!
  }

  type Message {
    message: String!
    success: Boolean
  }
`;
export default typeDefs;
