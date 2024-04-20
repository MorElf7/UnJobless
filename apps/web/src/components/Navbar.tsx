import { useState } from "react";
import { Link } from "react-router-dom";
import "boxicons/css/boxicons.min.css"; // Make sure boxicons are included in your project

const Navbar = () => {
  const items = ["Dashboard", "Jobs", "Applications", "Profile"];
  const icons = ["grid-alt", "briefcase", "paper-plane", "user"];
  const refs = ["/", "/jobs", "/applications", "/profile"];
  const [collapse, setCollapse] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const toggleSidebar = () => {
    setCollapse(!collapse);
  };

  return (
    <div className={`sticky top-0 h-screen bg-white border-r border-gray-300 transition-width duration-500 ${collapse ? 'w-20' : 'w-64'} p-2 z-50`}>
      <div className="flex items-center justify-between h-15 p-1">
        <img src={collapse ? "icon.png" : "logo.png"} alt="Logo" className="h-10 transition-all duration-500" />
        <i className='bx bx-menu text-3xl cursor-pointer' onClick={toggleSidebar}></i>
      </div>
      <ul className="mt-5 space-y-2">
        {items.map((item, id) => (
          <li key={id} className={`relative ${activeItem === id ? "bg-green-500 text-white" : "text-black"} p-2 rounded-md cursor-pointer`}
              onClick={() => setActiveItem(id)}>
            <Link className="flex items-center space-x-2" to={refs[id]}>
              <i className={`bx bx-${icons[id]} text-lg`}></i>
              <span className={`${collapse ? 'hidden' : 'block'} text-sm`}>{item}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="absolute bottom-0 left-0 w-full">
        <div className="flex items-center justify-between p-2 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <img src="user.jpg" alt="Profile" className="h-12 w-12 rounded-full border border-gray-300" />
            <span className={`${collapse ? 'hidden' : 'block'} text-sm font-medium`}>Real Name</span>
          </div>
          <i className='bx bx-log-out text-xl cursor-pointer'></i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;