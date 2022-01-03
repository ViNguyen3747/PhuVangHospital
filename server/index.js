import express from "express";
import { error, success } from "consola";
import { ApolloServer } from "apollo-server-express";
import { connection } from "./Database";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { AuthMiddleware } from "./middleware/auth";
import { schemaDirectives } from "./directives";
import * as AppModels from "./Database/Models";
import typeDefs from "./TypeDefs";
import resolvers from "./Resolvers";

dotenv.config();
const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(cors());

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives,
  context: async ({ req }) => {
    const { user, isAuth } = await AuthMiddleware(req);
    return {
      req,
      user,
      isAuth,
      ...AppModels,
    };
  },
});

const startServer = async () => {
  try {
    await apolloServer.start();
    apolloServer.applyMiddleware({ app, cors: true, path: "/graphql" });
    const PORT = process.env.PORT || 80;
    app.use("/", (req, res, next) => {
      res.send({ message: "Hello" });
    });
    await connection();
    app.listen(PORT, () =>
      success({
        badge: true,
        message: `Server ready on PORT: ${PORT}`,
      })
    );
  } catch (err) {
    error({
      badge: true,
      message: err.message,
    });
  }
};

startServer();
