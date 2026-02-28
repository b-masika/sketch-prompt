// src/components/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import { usePromptStore } from '../store/usePromptStore';

const Navbar = () => {

    const savedPromptIds = usePromptStore((state) => state.savedPromptIds);

    const linkStyle = ({ isActive }) =>
        isActive
            ? 'text-blue-500 border-b-2 border-blue-500 flex items-center gap-1'
            : 'text-gray-700 hover:text-blue-500 flex items-center gap-1';

    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center px-8 py-4 shadow-sm bg-white">

            {/* LEFT SIDE-Logo */}

            <Link
                to="/"
                className="flex items-center gap-2 font-bold text-lg text-gray-800 hover:text-purple-600 transition"
                >

                <span className="text-purple-600 text-xl">🎨</span>
                <span>Sketch Prompt</span>
        
            </Link>

            <div className="flex gap-6 text-sm">
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
                    Saved
                    {savedPromptIds.length > 0 && (
                        <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full min-w-[18px] text-center ml-1">
                            {savedPromptIds.length}
                        </span>
                    )}
                </NavLink>
            </div>
            
        </nav>
    );
};

export default Navbar;