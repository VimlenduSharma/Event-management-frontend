import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const EventCard = ({ event }) => {
  return (
    <Card className="mb-3">
      {event.imageUrl && (
        <Card.Img
          variant="top"
          src={event.imageUrl}
          alt={event.title}
          style={{ maxHeight: '200px', objectFit: 'cover' }}
        />
      )}
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text>{new Date(event.date).toLocaleString()}</Card.Text>
        <Card.Text>{event.description}</Card.Text>
        <Card.Text>Attendees: {event.attendees?.length || 0}</Card.Text>
        <Button variant="primary" as={Link} to={`/event/${event._id}`}>
          View Details
        </Button>
      </Card.Body>
    </Card>
  );
};

export default EventCard;
