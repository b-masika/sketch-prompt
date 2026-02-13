// src/components/Navbar.jsx
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const linkStyle = ({ isActive }) =>
        isActive
            ? 'text-blue-500 border-b-2 border-blue-500'
            : 'text-gray-700 hover:text-blue-500';
    return (
        <nav className="bg-white shadow-md p-4 flex gap-6">
            <NavLink to="/" className={linkStyle} end>
                Home
            </NavLink>
            <NavLink to="/calendar" className={linkStyle}>
                Calendar
            </NavLink>
            <NavLink to="/mood" className={linkStyle}>
                Mood
            </NavLink>
            <NavLink to="/random" className={linkStyle}>
                Random
            </NavLink>
            <NavLink to="/saved" className={linkStyle}>
                Saved
            </NavLink>
        </nav>
    );
};

export default Navbar;