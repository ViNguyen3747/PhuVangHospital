import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./tailwind/output.css";
import Navbar from "./components/Navbar";
import Employees from "./components/Employees";
import Tasks from "./components/Tasks";
import Users from "./components/User";
import {
  Signin,
  SignUp,
  ResetPassword,
  Confirmation,
  ForgotPassword,
} from "./components/Authentication";
function App() {
  return (
    <Router className="App">
      <Navbar />
      <div className="flex h-screen z-0">
        <div className="static m-auto">
          <Routes>
            <Route path="/" exact element={<Tasks />} />
            <Route path="/nhanvien" element={<Employees />} />
            <Route path="/taikhoan" element={<Users />} />
            <Route path="/dangnhap" element={<Signin />} />
            <Route path="/dangky" element={<SignUp />} />
            <Route
              path="/user/activate/:activation_token"
              element={<Confirmation />}
            />
            <Route path="/user/reset" element={<ResetPassword />} />
            <Route path="/user/forgotpassword" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
