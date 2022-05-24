import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    tasks(date: Date): [Task!]!
    task(id: ID!): Task!
  }

  extend type Mutation {
    addTask(input: addTaskInput): Task!
    updateTask(id: ID!, input: updateTaskInput): Task!
    deleteTask(id: ID!): Message!
  }

  input addTaskInput {
    taskName: String!
    date: Date
    employee: String!
  }

  input updateTaskInput {
    taskName: String
    date: Date
    employee: String
  }
  type Task {
    id: ID!
    taskName: String!
    date: Date!
    employee: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    message: String!
    success: Boolean
  }
`;
export default typeDefs;
