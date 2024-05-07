import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import { Profile } from "../pages/Profile";
import Applications from "../pages/Applications";
import Login from "../pages/Login";

function Router() {
  const { user } = useAuth(); // Use the user from AuthContext

  return (
    <Routes>
      <Route path="/" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      {user ? (
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/applications" element={<Applications />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}

export default Router;