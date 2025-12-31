import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { userAPI, adminAPI } from '../services/api';
import logo from '../assets/logo-tickets.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [userType, setUserType] = useState('user'); // 'user' or 'admin'
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            let response;
            if (isSignup) {
                // Signup
                if (userType === 'user') {
                    response = await userAPI.signup(email, password);
                } else {
                    response = await adminAPI.signup(email, password);
                }
            } else {
                // Login
                if (userType === 'user') {
                    response = await userAPI.login(email, password);
                } else {
                    response = await adminAPI.login(email, password);
                }
            }

            // Handle successful login
            // Check if login was successful (message contains "successful" or we have user/admin data)
            if (response.message?.toLowerCase().includes('successful') || response.admin || response.user) {
                // If token exists, use it; otherwise use a session identifier
                const token = response.token || response.accessToken || `session_${Date.now()}_${email}`;
                // Extract userId from response
                const userId = response.admin?.id || response.user?.id || null;
                login(email, token, userType, userId);
                
                // Navigate based on user type
                if (email.endsWith('@admin.com') || userType === 'admin') {
                    navigate('/dashboard');
                } else {
                    navigate('/');
                }
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            console.error('Login error:', err);
            let errorMessage = 'An error occurred. Please try again.';
            
            if (err.message === 'Network Error' || err.code === 'ERR_NETWORK') {
                const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
                errorMessage = `Network Error: Unable to connect to the backend server. Please ensure the backend is running on ${apiUrl}`;
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message) {
                errorMessage = err.message;
            }
            
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md'>
                {/* Logo and Title */}
                <div className='text-center mb-8'>
                    <img src={logo} alt='Logo' className='h-16 mx-auto mb-4' />
                    <h1 className='text-3xl font-bold text-white mb-2'>
                        {isSignup ? 'Create Account' : 'Welcome Back'}
                    </h1>
                    <p className='text-white/60'>
                        {isSignup ? 'Sign up to get started' : 'Sign in to access your account'}
                    </p>
                </div>

                {/* Login Card */}
                <div className='bg-primary rounded-2xl shadow-2xl p-8 border border-primary_hint/20'>
                    {/* User Type Toggle */}
                    <div className='flex gap-2 mb-6'>
                        <button
                            type='button'
                            onClick={() => setUserType('user')}
                            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition duration-200 ${
                                userType === 'user'
                                    ? 'bg-primary_important text-white'
                                    : 'bg-app_bg text-white/60 hover:text-white'
                            }`}
                        >
                            User
                        </button>
                        <button
                            type='button'
                            onClick={() => setUserType('admin')}
                            className={`flex-1 py-2 px-4 rounded-lg font-semibold transition duration-200 ${
                                userType === 'admin'
                                    ? 'bg-primary_important text-white'
                                    : 'bg-app_bg text-white/60 hover:text-white'
                            }`}
                        >
                            Admin
                        </button>
                    </div>

                    {error && (
                        <div className='mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm'>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className='space-y-6'>
                        {/* Email Input */}
                        <div>
                            <label htmlFor='email' className='block text-sm font-semibold text-primary_hint mb-2'>
                                Email Address
                            </label>
                            <input
                                type='email'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className='w-full px-4 py-3 bg-app_bg border border-primary_hint/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary_hint focus:border-transparent transition duration-200'
                                placeholder='Enter your email'
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <label htmlFor='password' className='block text-sm font-semibold text-primary_hint mb-2'>
                                Password
                            </label>
                            <input
                                type='password'
                                id='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className='w-full px-4 py-3 bg-app_bg border border-primary_hint/30 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary_hint focus:border-transparent transition duration-200'
                                placeholder='Enter your password'
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type='submit'
                            disabled={loading}
                            className='w-full bg-primary_important hover:bg-primary_hint text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed'
                        >
                            {loading ? 'Processing...' : isSignup ? 'Sign Up' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='relative my-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-white/10'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-4 bg-primary text-white/40'>
                                {isSignup ? 'Already have an account?' : "Don't have an account?"}
                            </span>
                        </div>
                    </div>

                    {/* Toggle Signup/Login */}
                    <button
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError('');
                        }}
                        className='w-full bg-transparent border-2 border-primary_hint/30 hover:border-primary_hint text-white font-semibold py-3 px-6 rounded-lg transition duration-300'
                    >
                        {isSignup ? 'Sign In Instead' : 'Sign Up Instead'}
                    </button>
                </div>

                {/* Footer */}
                <p className='text-center text-white/40 text-sm mt-6'>
                    By {isSignup ? 'signing up' : 'signing in'}, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}

export default Login;
