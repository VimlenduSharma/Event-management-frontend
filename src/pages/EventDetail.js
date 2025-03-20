import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';

const EventDetail = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [attendeesCount, setAttendeesCount] = useState(0);
    const [joining, setJoining] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/events/${id}`);
                setEvent(data);
                setAttendeesCount(data.attendees?.length || 0);
            } catch (error) {
                console.error(error.response?.data?.message || error.message);
            }
        };
        fetchEvent();
    }, [id]);

    useEffect(() => {
        const socket = io(process.env.REACT_APP_API_URL.replace('/api', ''));
        socket.on('attendeeUpdated', (data) => {
            if(data.eventId===id) {
                setAttendeesCount(data.attendeesCount);
            }
        });
        return () => socket.disconnect();
    }, [id]);
    const attendHandler = async () => {
        setJoining(true);
        const user = JSON.parse(localStorage.getItem('user'));
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            await axios.post(`${process.env.REACT_APP_API_URL}/events/${id}/attend`, {}, config);
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
        setJoining(false);
    };

    if(!event) return <div>Loading...</div>;

    return (
        <div style={{ padding: '1rem' }}>
            <h2>{event.title}</h2>
            <p>{new Date(event.date).toLocaleString()}</p>
            {event.imageUrl && (
                <img
                src={event.imageUrl}
                alt={event.title}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
                />
            )}
            <p>{event.description}</p>
            <p>Attendees: {attendeesCount}</p>
            <button onClick={attendHandler} disabled={joining}>
                {joining ? 'Joining...' : 'Join Event'}
            </button>
        </div>
    );
};

export default EventDetail;