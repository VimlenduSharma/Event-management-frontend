import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const user =  JSON.parse(localStorage.getItem('user'));
        try {
            let imageData = null;
            if(image) {
                const reader = new FileReader();
                reader.readAsDataURL(image);
                await new Promise((resolve) => {
                    reader.onloadend = () => {
                        imageData = reader.result;
                        resolve();
                    };
                });
            }
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.post(
                `${process.env.REACT_APP_API_URL}/events`,
                { title, description, date, image: imageData},
                config
            );
            navigate(`/event/${data._id}`);
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    return (
        <div style = {{ padding: '1rem' }}>
            <h2>Create Event</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Title: </label>
                    <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label>Description: </label>
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Date & Time: </label>
                    <input
                    type="datetime-local"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    />
                </div>
                <div>
                    <label>Image: </label>
                    <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.value)}
                    />
                </div>
                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;