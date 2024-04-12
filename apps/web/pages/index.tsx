import React, { useState } from "react";
import Link from 'next/link';
import Navbar from "../components/Navbar";
import Dashboard from "./dashboard";
// import "../styles/index.scss"

function HomePage() {
    const [collapse, setCollapse] = useState(false);

    const handleCollapse = (collapse: boolean) => {
        setCollapse(collapse);
    };

    return (
        <div className="layout-container">
            <div className={`bar-${!collapse && 'open'}`}>
                <Navbar isCollapsed={collapse} handleCollapse={handleCollapse} />
            </div>
            <div className="outlet">
                <Dashboard />
            </div>
        </div>
    );
}

export default HomePage;

// const HomePage = () => {
//     return (
//         <div>
//             <h1>Home Page</h1>
//             <Link href="/profile">
//                 <p>Go to your profile!</p>
//             </Link>
//         </div>
//     );
// };

// export default HomePage;

// import { useEffect } from 'react';
// import { useRouter } from 'next/router';

// const Home = () => {
//   const router = useRouter();

//   useEffect(() => {
//     router.replace('/profile');
//   }, [router]);

//   return null;
// };

// export default Home;
