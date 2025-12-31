import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo-tickets.png';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, isAdmin } = useAuth();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const scrollToFeatured = () => {
        const scrollToSection = () => {
            const element = document.getElementById('featured-events');
            if (element) {
                const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
                const elementHeight = element.offsetHeight;
                const windowHeight = window.innerHeight;
                const scrollPosition = elementTop - (windowHeight / 2) + (elementHeight / 4);

                window.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        };

        if (location.pathname === '/') {
            scrollToSection();
        } else {
            navigate('/');
        }
    };

    return (
        <nav className="bg-primary shadow-lg relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo/Brand */}
                    <Link
                        to="/"
                        onClick={(e) => {
                            e.preventDefault();
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            if (location.pathname !== '/') {
                                navigate('/');
                            }
                        }}
                        className="flex-shrink-0 flex items-center"
                    >
                        <img src={logo} alt="Ticket Master Logo" className="h-10 w-auto mr-3" />
                        <h1 className="text-white text-2xl font-bold">
                            TicketMaster
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        <button
                            onClick={scrollToFeatured}
                            className="text-white hover:text-primary_hint px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                        >
                            Home
                        </button>
                        <Link
                            to="/events"
                            className="text-white hover:text-primary_hint px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                        >
                            Events
                        </Link>
                        <Link
                            to="/tickets"
                            className="text-white hover:text-primary_hint px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                        >
                            My Tickets
                        </Link>
                        <Link
                            to="/about"
                            className="text-white hover:text-primary_hint px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                        >
                            About
                        </Link>
                        {user ? (
                            <>
                                {isAdmin() && (
                                    <Link
                                        to="/dashboard"
                                        className="text-white hover:text-primary_hint px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                                <Link
                                    to="/orders"
                                    className="text-white hover:text-primary_hint px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                >
                                    Orders
                                </Link>
                                <div className="flex items-center gap-3">
                                    <span className="text-white/60 text-sm">{user.email}</span>
                                    <button
                                        onClick={() => {
                                            logout();
                                            navigate('/');
                                        }}
                                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="bg-primary_important text-white hover:bg-primary_hint px-4 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="text-white hover:text-primary_hint focus:outline-none focus:ring-2 focus:ring-primary_hint focus:ring-offset-2 focus:ring-offset-primary p-2 rounded-md"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            ) : (
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <div
                className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                    }`}
            >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-primary border-t border-gray-800">
                    <button
                        className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out w-full text-left"
                        onClick={() => {
                            setIsOpen(false);
                            scrollToFeatured();
                        }}
                    >
                        Home
                    </button>
                    <Link
                        to="/events"
                        className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                        onClick={() => setIsOpen(false)}
                    >
                        Events
                    </Link>
                    <Link
                        to="/tickets"
                        className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                        onClick={() => setIsOpen(false)}
                    >
                        My Tickets
                    </Link>
                    <Link
                        to="/about"
                        className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                        onClick={() => setIsOpen(false)}
                    >
                        About
                    </Link>
                    {user ? (
                        <>
                            {isAdmin() && (
                                <Link
                                    to="/dashboard"
                                    className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </Link>
                            )}
                            <Link
                                to="/orders"
                                className="text-white hover:bg-gray-800 block px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                                onClick={() => setIsOpen(false)}
                            >
                                Orders
                            </Link>
                            <div className="px-3 py-2 text-white/60 text-sm">
                                {user.email}
                            </div>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    logout();
                                    navigate('/');
                                }}
                                className="w-full text-left block bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="w-full text-left block bg-primary_important text-white hover:bg-primary_hint px-3 py-2 rounded-md text-base font-medium transition duration-150 ease-in-out"
                            onClick={() => setIsOpen(false)}
                        >
                            Sign In
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

