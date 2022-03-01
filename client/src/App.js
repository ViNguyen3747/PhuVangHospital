import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./tailwind/output.css";
import Navbar from "./components/Navbar";
import Employees from "./components/Employees";
import Departments from "./components/Department";
import Authentication from "./components/Authentication";
import Tasks from "./components/Tasks";
import Users from "./components/User";
import { Signin, SignUp } from "./components/Authentication";
function App() {
  return (
    <Router className="App">
      <Navbar />
      <div className="flex h-screen z-0">
        <div className="static m-auto">
          <Routes>
            <Route path="/" exact element={<Tasks />} />
            <Route path="/nhanvien" element={<Employees />} />
            <Route path="/khoa" element={<Departments />} />
            <Route path="/taikhoan" element={<Users />} />
            <Route path="/dangnhap" element={<Signin />} />
            <Route path="/dangky" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
