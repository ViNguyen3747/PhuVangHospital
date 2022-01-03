import jwt from "jsonwebtoken";
import { User } from "../Database/Models";
import dotenv from "dotenv";
dotenv.config();

export const AuthMiddleware = async (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAuth = false;
    return req;
  }

  const token = authHeader.replace("Bearer ", "");
  if (!token || token === "") {
    req.isAuth = false;
    return req;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);
  } catch (err) {
    req.isAuth = false;
    return req;
  }

  if (!decodedToken) {
    req.isAuth = false;
    return req;
  }

  let authUser = await User.findById(decodedToken.id);
  if (!authUser) {
    req.isAuth = false;
  } else {
    req.isAuth = true;
    req.user = authUser;
  }

  return req;
};
