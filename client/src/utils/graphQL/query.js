import { gql } from "@apollo/client";

export const Auth_User = gql`
  query authUser {
    authUser {
      email
      firstName
      lastName
    }
  }
`;
