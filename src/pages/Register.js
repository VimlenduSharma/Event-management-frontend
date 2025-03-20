import React, { useState } from "react";
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/register`,
                { name, email, password }
            );
            localStorage.setItem('user', JSON.stringify(data));
            navigate('/');
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Register</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Name: </label>
                    <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;