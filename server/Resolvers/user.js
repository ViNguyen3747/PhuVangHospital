import { ApolloError, AuthenticationError } from "apollo-server-express";
import dotenv from "dotenv";
import { hash, compare } from "bcryptjs";
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

      if (user.admin) {
        users = await User.find();
      }

      return users;
    },
  },
  Mutation: {
    signin: async (_, { email, password }) => {
      try {
        let user = await User.findOne({
          email,
        });
        if (!user) {
          throw new AuthenticationError("Email not found");
        }

        const isMatch = await compare(password, user.password);

        user = await serializeUser(user);
        if (!isMatch) {
          throw new AuthenticationError("Incorrect Password");
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
    signup: async (_parent, { newUser }) => {
      try {
        let { email, username } = newUser;

        let user = await User.findOne({
          username,
        });
        if (user) {
          throw new ApolloError("Username is already taken", "400");
        }

        user = await User.findOne({
          email,
        });
        if (user) {
          throw new ApolloError("Email is already registred", "400");
        }
        user = new User(newUser);

        user.password = await hash(user.password, 12);
        let result = await user.save();
        result = await serializeUser(result);
        let activation_token = await createActivationToken(result);
        return {
          user: result,
          token: activation_token,
        };
      } catch (err) {
        throw new ApolloError(err.message);
      }
    },
    updateRole: async (_parent, { id, role }, { user }) => {
      try {
        let updatedUser;
        if (user.admin) {
          updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            { role },
            { new: true }
          );
        }
        if (!updatedUser) throw new error("Unathorized Access");

        return updatedUser;
      } catch (error) {
        throw new ApolloError(error.message);
      }
    },
  },
};

export default resolvers;
