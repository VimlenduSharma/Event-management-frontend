import React from "react";
import { Link } from 'react-router-dom';
const EventCard = ({ event }) => {
    return (
        <div style={{ border: '1px solid #ddd', padding: '1rem', margin: '1rem 0'}}>
            {event.imageUrl && (
                <img
                src={event.imageUrl}
                alt={event.title}
                style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }}
                />
            )}
            <h3>{event.title}</h3>
            <p>{new Date(event.date).toLocaleString()}</p>
            <p>{event.description}</p>
            <Link to={`/event/${event._id}`}>View Details</Link>
            <p>Attendees: {event.attendees?.length || 0}</p>
        </div>
    );
};

export default EventCard;