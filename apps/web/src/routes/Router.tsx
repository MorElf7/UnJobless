import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import { Profile } from "../pages/Profile";
import Applications from "../pages/Applications";

function Router() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/applications" element={<Applications />} />
            </Route>
        </Routes>
    );
}

export default Router;