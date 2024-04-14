import React, { useState } from "react";
import Link from 'next/link';
import styles from "../styles/Navbar.module.scss";
import "boxicons/css/boxicons.min.css";

interface Props {
  isCollapsed: boolean;
  handleCollapse: (arg: boolean) => void;
}

const Navbar = ({ isCollapsed, handleCollapse }: Props) => {
  const items = ["Dashboard", "Jobs", "Applications", "Profile"];
  const icons = ["grid-alt", "briefcase", "paper-plane", "user"];
  const refs = ["/", "/jobs", "/applications", "/profile"];
  const [collapse, setCollapse] = useState(isCollapsed);
  const [activeItem, setActiveItem] = useState(0);

  const toggleSidebar = () => {
    setCollapse(!collapse);
    handleCollapse(!collapse);
  };

  return (
    <div className={styles.global}>
      <div className={`${styles.navbar} ${!collapse && styles.open}`}>
        <div className={styles.logoDetails}>
          <i className={`bx bxs-cat ${styles.icon}`}></i>
          <div className={styles.logoName}>UnjoBless</div>
          <i className={`bx bx-menu ${styles.btn}`} onClick={toggleSidebar}></i>
        </div>
        <ul className={styles.navList}>
          <div>
            {items.map((item, id) => (
              <li key={id} className={`${styles.linkItem} ${activeItem === id && styles.active}`} onClick={() => setActiveItem(id)}>
                <Link href={refs[id]} className={styles.link}>
                  <i className={`bx bx-${icons[id]}`}></i>
                  <span className={styles.linksName}>{item}</span>
                </Link>
                <span className={styles.tooltip}>{item}</span>
              </li>
            ))}
          </div>
          <div>
            <li className={`${styles.linkItem} ${styles.profile}`}>
              <div className={styles.profileDetails}>
                <img src="profile.jpg" alt="profileImg" />
                <span className={styles.name}>Real Name</span>
              </div>
              <i className={`bx bx-log-out ${styles.logOut}`} ></i>
            </li>
          </div>
        </ul>
      </div>
    </div>

  );
};

export default Navbar;

