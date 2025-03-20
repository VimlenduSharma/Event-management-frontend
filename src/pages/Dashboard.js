import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const Dashboard = () => {
  const [events, setEvents] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  const fetchEvents = async () => {
    try {
      let url = `${process.env.REACT_APP_API_URL}/events`;
      if (filterDate) {
        const startDate = new Date(filterDate).setHours(0, 0, 0, 0);
        const endDate = new Date(filterDate).setHours(23, 59, 59, 999);
        url += `?startDate=${startDate}&endDate=${endDate}`;
      }
      const { data } = await axios.get(url);
      setEvents(data);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchEvents();
    // eslint-disable-next-line
  }, [filterDate]);

  return (
    <Container className="mt-4">
      <h2 className="mb-3">Event Dashboard</h2>
      <Row className="mb-3">
        <Col xs={12} md={6}>
          <Form.Label>Filter by Date:</Form.Label>
          <Form.Control
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </Col>
        <Col xs={12} md={6} className="d-flex align-items-end">
          <Button variant="primary" onClick={fetchEvents} className="ms-md-2">
            Apply Filter
          </Button>
        </Col>
      </Row>
      <Row>
        {events.map((event) => (
          <Col key={event._id} xs={12} md={6} lg={4}>
            <EventCard event={event} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Dashboard;
