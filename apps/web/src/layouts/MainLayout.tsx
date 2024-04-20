import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  // const [collapse, setCollapse] = useState(false);

  // const handleCollapse = (collapse: boolean) => {
  //   setCollapse(collapse);
  // };

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