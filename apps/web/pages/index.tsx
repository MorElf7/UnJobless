import React, { useState } from "react";
import Link from 'next/link';
import Navbar from "../components/Navbar";
import Dashboard from "./dashboard";
import styles from "../styles/index.module.scss";

function HomePage() {
    const [collapse, setCollapse] = useState(false);

    const handleCollapse = () => {
        setCollapse(collapse => !collapse); // Toggle the current state
    };
    
    return (
        <div className={styles.layoutContainer}>
            <div className={collapse ? styles.barClosed : styles.barOpen}>
                <Navbar isCollapsed={collapse} handleCollapse={handleCollapse} />
            </div>
            <div className={styles.outlet}>
                <Dashboard />
            </div>
        </div>
    );
}

export default HomePage;
