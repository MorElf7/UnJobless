import { useState } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

const Login = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePass, setRetypePass] = useState('');

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (isNewUser) {
            console.log("Register:", username, firstName, lastName, password);
            // Registration logic to be implemented here
        } else {
            console.log("Login:", email, pass);
            // Login logic to be implemented here
            setIsLoggedIn(true);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4"
            style={{
                backgroundImage: `url(/login_bg.svg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="max-w-md w-full py-12 px-6 bg-white rounded-xl shadow-md space-y-4">
                <h2 className="text-2xl font-medium text-center text-gray-700">{isNewUser ? "Register" : "Login"}</h2>
                {isLoggedIn ? (
                    // Redirect on successful login
                    <div className="text-center mt-4">
                        <Link to="/dashboard" className="text-lg text-green-500 hover:text-green-700">Insert routing logic</Link>
                    </div>
                ) : (
                    <SwitchTransition>
                        <CSSTransition
                            key={isNewUser ? "New User" : "Existing User"}
                            timeout={300}
                            classNames="fade"
                        >
                            <div>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {isNewUser ? (
                                        // Registration fields
                                        <>
                                            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                            <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                            <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                            <input type="password" placeholder="Retype Password" value={retypePass} onChange={(e) => setRetypePass(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                        </>
                                    ) : (
                                        // Login fields
                                        <>
                                            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                            <input type="password" placeholder="Password" value={pass} onChange={(e) => setPass(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                        </>
                                    )}
                                    <button type="submit" className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Submit</button>
                                </form>
                            </div>
                        </CSSTransition>
                    </SwitchTransition>
                )}
                <div className="text-center mt-6">
                    <button
                        onClick={() => setIsNewUser(!isNewUser)}
                        className="text-blue-500 hover:text-green-600">
                        {isNewUser ? "Already have an account?" : "New to this site?"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;