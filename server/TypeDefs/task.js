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
    employee: String!
    task: [String!]!
  }

  input updateTaskInput {
    employee: String
    task: [String]
  }
  type TaskDate {
    _1: String
    _2: String
    _3: String
    _4: String
    _5: String
    _6: String
    _7: String
    _8: String
    _9: String
    _10: String
    _11: String
    _12: String
    _13: String
    _14: String
    _15: String
    _16: String
    _17: String
    _18: String
    _19: String
    _20: String
    _21: String
    _22: String
    _23: String
    _24: String
    _25: String
    _26: String
    _27: String
    _28: String
    _29: String
    _30: String
    _31: String
  }
  type Task {
    id: ID!
    employee: String!
    task: [String!]!
    createdAt: Date!
    updatedAt: Date!
  }

  type Message {
    message: String!
    success: Boolean
  }
`;
export default typeDefs;
