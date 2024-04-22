import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import { Profile } from "../pages/Profile";
import Applications from "../pages/Applications";
import Login from "../pages/Login";

function Router() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<MainLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/applications" element={<Applications />} />
            </Route>
        </Routes>
    );
}

export default Router;