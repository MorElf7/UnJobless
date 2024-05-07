// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { CSSTransition, SwitchTransition } from 'react-transition-group';
// import MultiStepForm from '../components/MultistepForm';  // Import the detailed multi-step form component

// const Login = () => {
//     const [isNewUser, setIsNewUser] = useState(false);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [showFullRegistration, setShowFullRegistration] = useState(false);  // New state to control full registration flow

//     const handleSubmit = (e: { preventDefault: () => void; }) => {
//         e.preventDefault();
//         if (isNewUser && !showFullRegistration) {
//             // Move to full registration after initial signup data is provided
//             setShowFullRegistration(true);
//         } else {
//             console.log("Login:", email, password);
//             setIsLoggedIn(true);  // Simulate successful login
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen p-4"
//             style={{
//                 backgroundImage: `url(/login_bg.svg)`,
//                 backgroundSize: 'cover',
//                 backgroundPosition: 'center',
//                 backgroundRepeat: 'no-repeat',
//             }}
//         >
//             <div className="max-w-md w-full py-12 px-6 bg-white rounded-xl shadow-md space-y-4">
//                 <h2 className="text-2xl font-medium text-center text-gray-700">{isNewUser ? "Register" : "Login"}</h2>
//                 {isLoggedIn ? (
//                     <div className="text-center mt-4">
//                         <Link to="/dashboard" className="text-lg text-green-500 hover:text-green-700">Go to Dashboard</Link>
//                     </div>
//                 ) : (
//                     <SwitchTransition>
//                         <CSSTransition
//                             key={isNewUser ? "New User" : "Existing User"}
//                             timeout={300}
//                             classNames="fade"
//                         >
//                             <div>
//                                 {showFullRegistration ? (
//                                     <MultiStepForm />
//                                 ) : (
//                                     <form onSubmit={handleSubmit} className="space-y-6">
//                                         {isNewUser ? (
//                                             <>
//                                                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
//                                                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
//                                                 <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
//                                             </>
//                                         )}
//                                         <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Submit</button>
//                                     </form>
//                                 )}
//                             </div>
//                         </CSSTransition>
//                     </SwitchTransition>
//                 )}
//                 {!showFullRegistration && (
//                     <div className="text-center mt-6">
//                         <button
//                             onClick={() => setIsNewUser(!isNewUser)}
//                             className="text-blue-500 hover:text-green-600">
//                             {isNewUser ? "Already have an account?" : "New to this site?"}
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Login;

// Login component
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import MultiStepForm from '../components/MultistepForm';  // Import the detailed multi-step form component

const Login = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showFullRegistration, setShowFullRegistration] = useState(false);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (isNewUser && !showFullRegistration) {
            setShowFullRegistration(true);
        } else {
            console.log("Login:", email, password);
            setIsLoggedIn(true);
        }
    };

    // Define dynamic class based on the form displayed
    const formClass = showFullRegistration ? 
        "max-w-4xl w-full py-12 px-6 bg-white rounded-xl shadow-md space-y-4" : 
        "max-w-md w-full py-12 px-6 bg-white rounded-xl shadow-md space-y-4";

    return (
        <div className="flex items-center justify-center min-h-screen p-4"
            style={{
                backgroundImage: `url(/login_bg.svg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className={formClass}>
                <h2 className="text-2xl font-medium text-center text-gray-700">{isNewUser ? "Register" : "Login"}</h2>
                {isLoggedIn ? (
                    <div className="text-center mt-4">
                        <Link to="/dashboard" className="text-lg text-green-500 hover:text-green-700">Go to Dashboard</Link>
                    </div>
                ) : (
                    <SwitchTransition>
                        <CSSTransition
                            key={isNewUser ? "New User" : "Existing User"}
                            timeout={300}
                            classNames="fade"
                        >
                            <div>
                                {showFullRegistration ? (
                                    <MultiStepForm />
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        {isNewUser ? (
                                            <>
                                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                            </>
                                        ) : (
                                            <>
                                                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                            </>
                                        )}
                                        <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Submit</button>
                                    </form>
                                )}
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                )}
                {!showFullRegistration && (
                    <div className="text-center mt-6">
                        <button
                            onClick={() => setIsNewUser(!isNewUser)}
                            className="text-blue-500 hover:text-green-600">
                            {isNewUser ? "Already have an account?" : "New to this site?"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
