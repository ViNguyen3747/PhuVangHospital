import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./tailwind/output.css";
import Navbar from "./components/Navbar";
import Employees from "./components/Employees";
import Departments from "./components/Department";
import Authentication from "./components/Authentication";
import Tasks from "./components/Tasks";
function App() {
  return (
    <Router className="App">
      <Navbar />
      <Routes>
        <Route path="/" exact element={<Authentication />} />
        <Route path="/bangchamcong" exact element={<Tasks />} />
        <Route path="/nhanvien" exact element={<Employees />} />
        <Route path="/khoa" exact element={<Departments />} />
      </Routes>
    </Router>
  );
}

export default App;
