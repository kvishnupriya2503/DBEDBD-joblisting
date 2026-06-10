import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserDashboard from "./pages/UserDashborad";
import AddJob from "./pages/AddJob";
import AllJobs from "./pages/AllJobs";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import AddRecruiter from "./pages/AddRecruiter";
import DashboardLayout from "./components/DashboardLayout";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route element={<DashboardLayout />}>

          <Route path="/admin" element={<AdminDashboard />} />

          <Route path="/manager" element={<ManagerDashboard />} />

          <Route path="/user" element={<UserDashboard />} />

          <Route path="/addjob" element={<AddJob />} />

          <Route path="/addrecruiter" element={<AddRecruiter />} />

          <Route path="/jobs" element={<AllJobs />} />

          <Route path="/apply/:id" element={<ApplyJob />} />

          <Route path="/applications" element={<Applications />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );
}

export default App;
