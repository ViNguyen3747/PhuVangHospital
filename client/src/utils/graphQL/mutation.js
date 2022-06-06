import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      token
      user {
        email
        firstName
        lastName
        admin
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation AddTask($input: addTaskInput) {
    addTask(input: $input) {
      id
      createdAt
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation UpdateTask($updateTaskId: ID!, $input: updateTaskInput) {
    updateTask(id: $updateTaskId, input: $input) {
      id
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation DeleteTask($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId) {
      message
      success
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation AddEmployee($input: addEmployeeInput) {
    addEmployee(input: $input) {
      id
      updatedAt
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($deleteEmployeeId: ID!) {
    deleteEmployee(id: $deleteEmployeeId) {
      message
      success
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($newUser: addUserInput!) {
    addUser(newUser: $newUser) {
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $updatedUser: updateUserInput) {
    updateUser(id: $updateUserId, updatedUser: $updatedUser) {
      updatedAt
      id
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId) {
      message
      success
    }
  }
`;
