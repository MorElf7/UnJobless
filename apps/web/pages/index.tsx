import Link from 'next/link';

const HomePage = () => {
    return (
        <div>
            <h1>Home Page</h1>
            <Link href="/profile">
                <p>Go to your profile!</p>
            </Link>
        </div>
    );
};

export default HomePage;

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
