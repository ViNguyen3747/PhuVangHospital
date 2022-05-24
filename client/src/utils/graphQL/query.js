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

export const TASKS = gql`
  query Tasks {
    tasks {
      id
      taskName
      date
      employee
    }
  }
`;

export const TASK = gql`
  query Task($taskId: ID!) {
    task(id: $taskId) {
      id
      taskName
      date
      employee
    }
  }
`;

export const EMPLOYEES = gql`
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

export const EMPLOYEE = gql`
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

export const USERS = gql`
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

export const USER = gql`
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
