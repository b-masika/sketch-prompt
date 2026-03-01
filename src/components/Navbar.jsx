// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { usePromptStore } from '../store/usePromptStore';

const Navbar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const savedPromptIds = usePromptStore((state) => state.savedPromptIds);

    const linkStyle = ({ isActive }) =>
        `flex items-center text-sm font-bold transition-all duration-200 ${
            isActive 
            ? "text-purple-600 scale-105" 
            : "text-gray-500 hover:text-purple-400"
        }`;

    return (
        <nav className="bg-white border-b border-gray-50 sticky top-0 z-50 shadow-sm">

            {/* LEFT SIDE-Logo */}
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link
                    to="/"
                    className="flex items-center gap-2 text-purple-600 font-bold text-xl"
                >
                    <span className="text-purple-600 text-xl">🎨</span>
                    <span className="text-2xl font-black tracking-tighter text-gray-900">Sketch Prompt</span>
        
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-10">
                    <NavLink to="/" className={linkStyle} end>
                        Home
                    </NavLink>
                    <NavLink to="/calendar" className={linkStyle}>
                        Calendar
                    </NavLink>
                    <NavLink to="/moodSelector" className={linkStyle}>
                        Mood Selector
                    </NavLink>
                    <NavLink to="/random" className={linkStyle}>
                        Random
                    </NavLink>
                    <NavLink to="/saved" className={linkStyle}>
                        <span>Saved</span>
                        {savedPromptIds.length > 0 && (
                            <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center ml-2 shadow-sm shadow-purple-200 animate-pulse">
                                {savedPromptIds.length}
                            </span>
                        )}
                    </NavLink>
                </div>

                {/* Mobile Hamburger Toggle */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}></div>
                    <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}></div>
                    <div className={`w-6 h-0.5 bg-gray-800 transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}></div>
                </button>
            </div>               

            {/* Mobile Menu Button */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-50 shadow-lg animate-in slide-in-from-top duration-300">
                    <div className="flex flex-col p-6 gap-4">
                        <NavLink to="/" className={linkStyle} end onClick={() => setIsOpen(false)}>
                        Home
                        </NavLink>
                        <NavLink to="/calendar" className={linkStyle} onClick={() => setIsOpen(false)}>
                            Calendar
                        </NavLink>
                        <NavLink to="/moodSelector" className={linkStyle} onClick={() => setIsOpen(false)}>
                            Mood Selector
                        </NavLink>
                        <NavLink to="/random" className={linkStyle} onClick={() => setIsOpen(false)}>
                            Random
                        </NavLink>
                        <NavLink to="/saved" className={linkStyle} onClick={() => setIsOpen(false)}>
                                <div className="flex justify-between w-full items-center">
                                    <span>Saved</span>
                                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">
                                        {savedPromptIds.length} items
                                    </span>
                                </div>
                        </NavLink>
                    </div>       
                </div>
            )}
        </nav>
    );
};

export default Navbar;