import { ApolloError, AuthenticationError } from "apollo-server-express";
import dotenv from "dotenv";
import {
  serializeUser,
  createActivationToken,
} from "../utils/Userfunctions.js";
import { User } from "../Database/Models";

dotenv.config();
const resolvers = {
  Query: {
    authUser: (_, __, { user }) => user,
    users: async (_, __, { user }) => {
      let users;
      users = await User.find();
      return users;
    },
    user: async (_, { id }, { user }) => {
      try {
        return await User.findById(id);
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },

  Mutation: {
    signin: async (_, { userName, password }) => {
      try {
        let user = await User.findOne({
          userName,
        });
        if (!user) {
          throw new AuthenticationError(
            "userName không tồn tại trong hệ thống"
          );
        }

        user = await serializeUser(user);

        if (user.password !== password) {
          throw new AuthenticationError("Vui lòng nhập lại mật khẩu");
        } else {
          let token = await createActivationToken(user);
          return {
            user,
            token,
          };
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    addUser: async (_parent, { newUser }, { user }) => {
      try {
        let result;
        if (user.admin) {
          let { userName } = newUser;

          let user = await User.findOne({
            userName,
          });
          if (user) {
            throw new ApolloError("userName is already registred", "400");
          }
          user = new User(newUser);

          result = await user.save();
          result = await serializeUser(result);
        }
        if (result) {
          let activation_token = await createActivationToken(result);
          return {
            user: result,
            token: activation_token,
          };
        }
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    updateUser: async (_parent, { id, updatedUser }, { user }) => {
      try {
        let findUser;
        if (user.admin) {
          findUser = await User.findByIdAndUpdate(
            { _id: id },
            { ...updatedUser },
            { new: true }
          );
        }
        if (!findUser) throw new error("Unathorized Access");

        return findUser;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
    deleteUser: async (_, { id }, { user }) => {
      try {
        let currentUser;
        currentUser = await User.findByIdAndDelete({ _id: id });

        if (!currentUser) {
          throw new ApolloError("Unathorized Access");
        }
        return {
          success: true,
          message: "Delete User Successfully",
        };
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },
};

export default resolvers;
