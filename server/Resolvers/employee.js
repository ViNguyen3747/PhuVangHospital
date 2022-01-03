import { ApolloError } from "apollo-server-express";
import { Employee } from "../Database/Models";

const resolvers = {
  Query: {
    employees: async (_, { department }) => {
      try {
        let employees;
        employees = await Employee.find().filter(
          (e) => e.department === department
        );

        return employees;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    employee: async (_, { id }) => {
      try {
        return await Employee.findById(id);
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },
  Mutation: {
    addEmployee: async (_, { input }, { user }) => {
      try {
        let employee;
        if (user.admin) {
          employee = await new Employee({
            ...input,
            createdAt: new Date().toISOString(),
          }).save();
        }
        if (!employee) throw new error("Unathorized Access");

        return employee;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    updateEmployee: async (_, { id, input }, { user }) => {
      try {
        let employee;
        if (user.admin) {
          employee = await Employee.findByIdAndUpdate(
            { _id: id },
            { ...input },
            { new: true }
          );
        }
        if (!employee) throw new error("Unathorized Access");

        return employee;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    deleteEmployee: async (_, { id }, { user }) => {
      try {
        let employee;
        if (user.admin) {
          employee = await Employee.findByIdAndDelete({
            _id: id,
          });
        }
        if (!employee) {
          throw new Error("Unathorized Access");
        }
        return {
          success: true,
          message: "Department Deleted Successfully.",
        };
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },
};
export default resolvers;
