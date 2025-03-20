import React, { useState, useEffect, use } from "react";
import axios from 'axios';
import EventCard from "../components/EventCard";

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [filterDate, setFilterDate] = useState('');

    const fetchEvents = async () => {
        try {
            let url = `${process.env.REACT_APP_API_URL}/events`;
            if(filterDate){
                const startDate = new Date(filterDate).setHours(0, 0, 0, 0);
                const endDate = new Date(filterDate).setHours(23, 59, 59, 999);
                url+=`?startDate=${startDate}&endDate=${endDate}`;
            }
            const { data } = await axios.get(url);
            setEvents(data);
        } catch (error) {
            console.error(error.response?.data?.message || error.message);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [filterDate]);

    return (
        <div style={{ padding: '1rem' }}>
            <h2>Event Dashboard</h2>
            <div>
                <label>Filter by Date: </label>
                <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                />
                <button onClick={fetchEvents}>Apply Filter</button>
            </div>
            <div>
                {events.map((event) => (
                    <EventCard key={event._id} event={event} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;