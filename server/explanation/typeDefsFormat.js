import { gql } from "apollo-server-express";

const typeDefs = gql`
  enum Select {
    A
    B
    C
  }

  type Object {
    id: ID!
    property1: String!
    property2: [String!]!
    property3: Number!
    property4: Date!
    property5: Boolean!
    property6: Object2!
    property9: Select!
  }

  type Object2 {
    property7: String!
    property8: Number!
  }

  extend type Query {
    query1(input: query1Input): Object!
    query2: Object!
  }

  extend type Mutation {
    mutation1(inputMutation: mutationInput): Message!
  }

  type Message {
    message: String!
  }

  input query1Input {
    property3: Number!
    property4: Date!
    property5: Boolean!
    property6: Object2!
  }

  input mutationInput {
    property3: Number!
    property4: Date!
    property5: Boolean!
    property6: Object2!
  }
`;

export default typeDefs;

// inputMutation {
//     property3: Number!
//     property4: Date!
//     property5: Boolean!
//     property6: Object2!
// }
