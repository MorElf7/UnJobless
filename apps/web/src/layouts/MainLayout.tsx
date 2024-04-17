import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/MainLayout.scss"

function MainLayout() {
  // const [collapse, setCollapse] = useState(false);

  // const handleCollapse = (collapse: boolean) => {
  //   setCollapse(collapse);
  // };

  return (
    <div className="layout-container">
      {/* <div className={"sidebar"}> */}
      <Navbar />
      {/* </div>
      <div className="outlet"> */}
      <Outlet />
      {/* </div> */}
    </div>
  );
}

export default MainLayout;