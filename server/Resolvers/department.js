import { ApolloError } from "apollo-server-express";
import { Department } from "../Database/Models";

const resolvers = {
  Query: {
    departments: async () => {
      try {
        let departments;
        departments = await Department.find();
        return departments;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    department: async (_, { id }) => {
      try {
        return await Department.findById(id);
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },
  Mutation: {
    addDepartment: async (_, { input }, { user }) => {
      try {
        let department;
        if (true) {
          department = await new Department({
            ...input,
            createdAt: new Date().toISOString(),
          }).save();
        }
        if (!department) throw new error("Unathorized Access");

        return department;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    updateDepartment: async (_, { id, input }, { user }) => {
      try {
        let department;
        if (user.admin) {
          department = await Department.findByIdAndUpdate(
            { _id: id },
            { ...input },
            { new: true }
          );
        }
        if (!department) throw new error("Unathorized Access");

        return department;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    deleteDepartment: async (_, { id }, { user }) => {
      try {
        let department;
        if (user.admin) {
          department = await Department.findByIdAndDelete({
            _id: id,
          });
        }
        if (!department) {
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
