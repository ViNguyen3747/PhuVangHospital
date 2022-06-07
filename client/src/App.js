import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./tailwind/output.css";
import "./index.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Navbar from "./components/Navbar";
import Employees from "./components/Employees";
import Tasks from "./components/Tasks";
import Users from "./components/User";
import Signin from "./components/Authentication";
import auth from "./utils/auth";
const link = new HttpLink({
  uri: "http://localhost:5000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router className="App">
        {auth.loggedIn() && <Navbar />}
        <div className="flex h-screen z-0">
          <div className="static m-auto">
            <Routes>
              <Route path="/" exact element={<Signin />} />
              <Route path="/bangchamcong" element={<Tasks />} />
              <Route path="/nhanvien" element={<Employees />} />
              <Route path="/taikhoan" element={<Users />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
