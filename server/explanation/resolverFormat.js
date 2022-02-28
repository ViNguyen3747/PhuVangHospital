import { ApolloError } from "apollo-server-express";
import { Department } from "../Database/Models";

const resolvers = {
  Query: {
    queries: async (_, { department }, { user }) => {
      let departments;
      departments = await (
        await Department.find()
      ).filter((d) => d.name === department);
    },
  },
  Mutation: {},
};
export default resolvers;

/**
 * Get ALL data of collection: Collection.find() ==> return everything
 * Get one data only: Collection.findById(id) ==> return only one element with that id
 * create data: let newElement = await new Collection ({...parameter,createdAt: new Date().toISOString()}).save();
 * update data: let updatedElement = await Collection.findByIdAndUpdate( { _id: id },{...parameter},{ new: true });
 * delete data: let deletedElement = await Collection.findByIdAndDelete({_id: id})
 */
