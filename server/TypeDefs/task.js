import { gql } from "apollo-server-express";

const typeDefs = gql`
  extend type Query {
    tasks(department: String, date: Date): [Task!]!
    task(id: ID!): Task!
  }

  extend type Mutation {
    addTask(input: addTaskInput): Task! @isAuth
    updateTask(id: ID!, input: updateTaskInput): Task! @isAuth
    deleteTask(id: ID!): Message! @isAuth
  }

  input addTaskInput {
    taskName: String!
    date: Date!
    employee: String!
    department: String!
  }

  input updateTaskInput {
    taskName: String
    date: Date
    employee: String
    department: String
  }
  type Task {
    id: ID!
    taskName: String!
    date: Date!
    employee: String!
    department: String!
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    message: String!
    success: Boolean
  }
`;
export default typeDefs;
