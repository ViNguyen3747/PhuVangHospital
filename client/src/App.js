import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./tailwind/output.css";
import Navbar from "./components/Navbar";
import Employees from "./components/Employees";
import Departments from "./components/Department";
import Authentication from "./components/Authentication";
import Tasks from "./components/Tasks";
import Users from "./components/User";
function App() {
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Authentication />} />
        <Route path="/bangchamcong" element={<Tasks />} />
        <Route path="/nhanvien" element={<Employees />} />
        <Route path="/khoa" element={<Departments />} />
        <Route path="/taikhoan" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
