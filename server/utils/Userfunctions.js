import { pick } from "lodash";
import dotenv from "dotenv";

import jwt from "jsonwebtoken";
dotenv.config();

const createActivationToken = async (jwtPayload) => {
  let token = await jwt.sign(jwtPayload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: 3600 * 24,
  });
  return token;
};

const serializeUser = (user) =>
  pick(user, ["id", "email", "lastName", "firstName", "password", "admin"]);
export { createActivationToken, serializeUser };
