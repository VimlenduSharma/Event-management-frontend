import React from "react";
import {Link, useNavigate} from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const logoutHandler = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={{ padding: '1rem', background: '#f0f0f0' }}>
            <Link to="/">Dashboard</Link> |{' '}
            {user ? (
                <>
                <Link to="/create">Create Event</Link> |{' '}
                <span>Welcome, {user.name}</span> |{' '}
                <button onClick={logoutHandler}>Logout</button>
                </>
            ) : (
                <>
                <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
                </>
            )} 
        </nav>
    );
};

export default Navbar;