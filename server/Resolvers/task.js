import { ApolloError } from "apollo-server-errors";
import { Task } from "../Database/Models";

const resolvers = {
  Query: {
    tasks: async (_, { department, date }) => {
      try {
        let tasks;
        tasks = await (
          await Task.find().filter((t) => t.department == department)
        ).filter((t) => t.date == date);

        return tasks;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    task: async (_, { id }) => {
      try {
        return await Task.findById(id);
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },
  Mutation: {
    addTask: async (_, { input }, { user }) => {
      try {
        let task;
        if (user.admin) {
          task = await new Task({
            ...input,
            createdAt: new Date().toISOString(),
          }).save();
        }
        if (!task) throw new error("Unathorized Access");

        return task;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    updateTask: async (_, { id, input }, { user }) => {
      try {
        let task;
        if (user.admin) {
          task = await Task.findByIdAndUpdate(
            { _id: id },
            { ...input },
            { new: true }
          );
        }
        if (!task) throw new error("Unathorized Access");

        return task;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    deleteTask: async (_, { id }, { user }) => {
      try {
        let task;
        if (user.admin) {
          task = await Task.findByIdAndDelete({
            _id: id,
            owner: user._id,
          });
        }
        if (!task) {
          throw new Error("Unathorized Access");
        }
        return {
          success: true,
          message: "Task Deleted Successfully.",
        };
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },
};
export default resolvers;
