import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/login`,
                { email, password }
            );
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    const guestLoginHandler = async () => {
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/guest`
            );
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Email: </label>
                    <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label>Password: </label>
                    <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <hr />
            <button onClick={guestLoginHandler}>Guest Login</button>
        </div>
    );
};

export default Login;