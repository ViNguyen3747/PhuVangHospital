import { gql } from "@apollo/client";

export const AUTH_USER = gql`
  query authUser {
    authUser {
      email
      firstName
      lastName
    }
  }
`;

export const GET_TASKS = gql`
  query Tasks {
    tasks {
      id
      employee
      task
    }
  }
`;

export const GET_TASK = gql`
  query Task($taskId: ID!) {
    task(id: $taskId) {
      employee
      task
    }
  }
`;

export const GET_EMPLOYEES = gql`
  query Employees {
    employees {
      id
      name
      email
      phone
      address
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query Employee($employeeId: ID!) {
    employee(id: $employeeId) {
      id
      name
      email
      phone
      address
    }
  }
`;

export const GET_USERS = gql`
  query Employee {
    users {
      id
      firstName
      lastName
      email
      admin
      password
    }
  }
`;

export const GET_USER = gql`
  query Employee($userId: ID!) {
    user(id: $userId) {
      id
      firstName
      lastName
      email
      admin
    }
  }
`;
