import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.scss";
import "boxicons/css/boxicons.min.css";

// interface Props {
//   isCollapsed: boolean;
//   handleCollapse: (arg: boolean) => void
// }

const Navbar = () => {
  const items = ["Dashboard", "Jobs", "Applications", "Profile"];
  const icons = ["grid-alt", "briefcase", "paper-plane", "user"];
  const refs = ["/", "/jobs", "applications", "profile"];
  const [collapse, setCollapse] = useState(false);
  const [activeItem, setActiveItem] = useState(0);

  const toggleSidebar = () => {
    setCollapse(!collapse);
    // handleCollapse(!collapse);
  }

  return (
    <div className={`navbar ${!collapse && 'open'}`}>
      <div className="logo-details">
        {collapse && <img src="icon.png" alt="Unjobless icon" />}
        {!collapse && <img src="logo.png" alt="Unjobless logo" />}
      </div>
      <ul className="nav-list">
        <div>
          {items.map((item, id) => (
            <li className={`${activeItem === id && "active"}`} onClick={() => { setActiveItem(id) }}>
              <Link className="link" to={refs[id]}>
                <i className={`bx bx-${icons[id]}`}></i>
                <span className="links_name">{item}</span>
              </Link>
              <span className="tooltip">{item}</span>
            </li>
          ))}
        </div>
        <div className = 'bottom'>
          {!collapse && <i className='bx bx-arrow-to-left' id="btn" onClick={toggleSidebar}>Collapse</i>}
          {collapse && <i className='bx bx-arrow-to-right' id="btn" onClick={toggleSidebar}></i>}
          <li className="profile">
            <div className="profile-details">
              <img src="user.jpg" alt="profileImg" />
              <span className="name">Real Name</span>
            </div>
            <i className='bx bx-log-out' id="log_out" ></i>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;