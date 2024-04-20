// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "boxicons/css/boxicons.min.css"; // Make sure boxicons are included in your project

// const Navbar = () => {
//   const items = ["Dashboard", "Jobs", "Applications", "Profile"];
//   const icons = ["grid-alt", "briefcase", "paper-plane", "user"];
//   const refs = ["/", "/jobs", "/applications", "/profile"];
//   const [collapse, setCollapse] = useState(false);
//   const [activeItem, setActiveItem] = useState(0);

//   const toggleSidebar = () => {
//     setCollapse(!collapse);
//   };

//   return (
//     <div className={`sticky top-0 h-screen bg-white border-r border-gray-300 transition-width duration-500 ${collapse ? 'w-20' : 'w-64'} p-2 z-50`}>
//       <div className="flex items-center justify-between h-15 p-1">
//         <img src={collapse ? "icon.png" : "logo.png"} alt="Logo" className="h-10 transition-all duration-500" />
//         <i className='bx bx-menu text-3xl cursor-pointer' onClick={toggleSidebar}></i>
//       </div>
//       <ul className="mt-5 space-y-2">
//         {items.map((item, id) => (
//           <li key={id} className={`relative ${activeItem === id ? "bg-green-500 text-white" : "text-black"} p-2 rounded-md cursor-pointer`}
//               onClick={() => setActiveItem(id)}>
//             <Link className="flex items-center space-x-2" to={refs[id]}>
//               <i className={`bx bx-${icons[id]} text-lg`}></i>
//               <span className={`${collapse ? 'hidden' : 'block'} text-sm`}>{item}</span>
//             </Link>
//           </li>
//         ))}
//       </ul>
//       <div className="absolute bottom-0 left-0 w-full">
//         <div className="flex items-center justify-between p-2 border-t border-gray-200">
//           <div className="flex items-center space-x-3">
//             <img src="user.jpg" alt="Profile" className="h-12 w-12 rounded-full border border-gray-300" />
//             <span className={`${collapse ? 'hidden' : 'block'} text-sm font-medium`}>Real Name</span>
//           </div>
//           <i className='bx bx-log-out text-xl cursor-pointer'></i>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { createContext, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronFirst, ChevronLast, Home, LayoutDashboard, Send, User } from "lucide-react";
import logo from "./logo.png";
import profile from "./user.jpg";

interface SidebarContextType {
  expanded: boolean;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

interface SidebarItemProps {
  icon: React.ReactNode;
  text: string;
  link: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, link }) => {
  const { expanded } = useContext(SidebarContext)!;
  const location = useLocation();
  const isActive = location.pathname === link;

  return (
    <Link to={link} className="text-inherit no-underline">
      <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${isActive ? "bg-gradient-to-r from-green-200 to-green-100 text-green-800" : "hover:bg-green-50 text-gray-600"}`}>
        {icon}
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>{text}</span>
      </li>
    </Link>
  );
};

const Sidebar: React.FC = () => {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img src={logo} className={`overflow-hidden transition-all ${expanded ? "w-32" : "w-0"}`} alt="Logo" />
        </div>
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            <SidebarItem icon={<Home size={20} />} text="Dashboard" link="/" />
            <SidebarItem icon={<LayoutDashboard size={20} />} text="Jobs" link="/jobs" />
            <SidebarItem icon={<Send size={20} />} text="Applications" link="/applications" />
            <SidebarItem icon={<User size={20} />} text="Profile" link="/profile" />
          </ul>
        </SidebarContext.Provider>
        <div className="mt-auto mb-4 px-3">
          <button onClick={() => setExpanded(!expanded)} className={`flex items-center justify-start w-full p-2 my-1 font-medium rounded-md cursor-pointer transition-colors bg-green-50 hover:bg-green-100 ${expanded ? 'bg-green-200' : ''}`}>
            <div className="bg-green-500 p-2 rounded-md">
              {expanded ? <ChevronFirst size={20} color="white" /> : <ChevronLast size={20} color="white" />}
            </div>
            <span className={`ml-3 ${expanded ? 'block' : 'hidden'}`}>Collapse</span>
          </button>
        </div>
        <div className="border-t flex p-3">
          <img src={profile} className="w-10 h-10 rounded-md" alt="Profile" />
          <div className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"} `}>
            <div className="leading-4">
              <h4 className="font-semibold">Real Name</h4>
              <span className="text-xs text-gray-600">realname@example.com</span>
            </div>
            <ChevronLast size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;