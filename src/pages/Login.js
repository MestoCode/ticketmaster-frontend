import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-tickets.png';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        if (email && password) {
            // Redirect to homepage after "login"
            navigate('/');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md'>
                {/* Logo and Title */}
                <div className='text-center mb-8'>
                    <img src={logo} alt='Logo' className='h-16 mx-auto mb-4' />
                    <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
                    <p className='text-white/60'>Sign in to access your account</p>
                </div>

                {/* Login Card */}
                <div className='bg-primary rounded-2xl shadow-2xl p-8 border border-primary_hint/20'>
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
                            className='w-full bg-primary_important hover:bg-primary_hint text-white font-semibold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Divider */}
                    <div className='relative my-6'>
                        <div className='absolute inset-0 flex items-center'>
                            <div className='w-full border-t border-white/10'></div>
                        </div>
                        <div className='relative flex justify-center text-sm'>
                            <span className='px-4 bg-primary text-white/40'>New to our platform?</span>
                        </div>
                    </div>

                    {/* Create Account Link */}
                    <button
                        onClick={() => navigate('/')}
                        className='w-full bg-transparent border-2 border-primary_hint/30 hover:border-primary_hint text-white font-semibold py-3 px-6 rounded-lg transition duration-300'
                    >
                        Browse Events as Guest
                    </button>
                </div>

                {/* Footer */}
                <p className='text-center text-white/40 text-sm mt-6'>
                    By signing in, you agree to our Terms of Service and Privacy Policy
                </p>
            </div>
        </div>
    );
}

export default Login;

