import { Outlet } from "react-router-dom";
import Navbar from "../components/Sidebar";

function MainLayout() {
  return (
    <div className="flex min-h-screen bg-white">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;