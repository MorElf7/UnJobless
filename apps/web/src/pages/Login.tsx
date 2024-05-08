import React, { useState } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import MultiStepForm from '../components/MultistepForm';  
import { useAuth } from '../contexts/AuthContext'; 

const Login = () => {
    const [isNewUser, setIsNewUser] = useState(false);
    const [showFullRegistration, setShowFullRegistration] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        if (isNewUser && !showFullRegistration) {
            setShowFullRegistration(true);
            setLoading(false);
        } else {
            try {
                await login(email, password);
            } catch (err) {
                console.error(err);
                setError('Failed to login. Please check your credentials.');  
                setLoading(false);  
            }
        }
    };

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
                                    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 border rounded-md" />
                                    <button type="submit" disabled={loading} className="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
                                        {loading ? 'Loading...' : 'Submit'}
                                    </button>
                                    {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                                </form>
                            )}
                        </div>
                    </CSSTransition>
                </SwitchTransition>
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