import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="bg-white shadow-md sticky top-0 z-30">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        className="md:hidden focus:outline-none text-gray-700"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        {open ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <Link to="/" className="text-3xl font-extrabold text-green-600">
                        EcoBite<span className="text-yellow-400">Foods</span>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-700 hover:text-green-600 transition font-medium">
                            Home
                        </Link>
                        <Link to="/menu" className="text-gray-700 hover:text-green-600 transition font-medium">
                            Menu
                        </Link>
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-yellow-400 text-green-800 font-semibold rounded-full shadow-lg hover:bg-yellow-500 transition"
                        >
                            Sign In
                        </Link>
                        <Link
                            to="/register"
                            className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full shadow-lg hover:bg-yellow-400 hover:text-white transition"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}

                </div>
            </nav>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 z-40 ${open ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <Link to="/" className="text-2xl font-bold text-green-600" onClick={() => setOpen(false)}>
                        EcoBite<span className="text-yellow-400">Foods</span>
                    </Link>
                    <button onClick={() => setOpen(false)} aria-label="Close menu">
                        <X size={24} className="text-gray-700" />
                    </button>
                </div>
                <div className="flex flex-col px-6 py-4 space-y-4">
                    <Link
                        to="/"
                        onClick={() => setOpen(false)}
                        className="text-gray-700 hover:text-green-600 transition font-medium"
                    >
                        Home
                    </Link>
                    <Link
                        to="/menu"
                        onClick={() => setOpen(false)}
                        className="text-gray-700 hover:text-green-600 transition font-medium"
                    >
                        Menu
                    </Link>

                    <Link
                        to="/login"
                        onClick={() => setOpen(false)}
                        className="mt-4 px-4 py-2 bg-yellow-400 text-green-800 font-semibold rounded-full shadow hover:bg-yellow-500 transition text-center"
                    >
                        Sign In
                    </Link>
                    <Link
                        to="/register"
                        onClick={() => setOpen(false)}
                        className="px-4 py-2 border-2 border-yellow-400 text-yellow-400 font-semibold rounded-full shadow hover:bg-yellow-400 hover:text-white transition text-center"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>

            {/* Overlay */}
            {open && <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setOpen(false)} />}
        </>
    );
}
