import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://uec-api-33mk.vercel.app"; // Change this to your Vercel API

const App = () => {
  const [persons, setPersons] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  // Fetch persons from backend
  const fetchPersons = async () => {
    const res = await axios.get(`${API_BASE_URL}/persons`);
    setPersons(res.data);
  };

  useEffect(() => {
    fetchPersons(); // Initial fetch

    // Listen for MongoDB Change Events via SSE
    const eventSource = new EventSource(`${API_BASE_URL}/events`);
    eventSource.onmessage = () => {
      fetchPersons(); // Update UI when a new person is added
    };

    return () => eventSource.close(); // Cleanup on unmount
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname) return;

    await axios.post(`${API_BASE_URL}/persons`, { firstname, lastname });

    setFirstname("");
    setLastname("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Person List</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {persons.map((p) => (
          <li key={p._id}>
            {p.firstname} {p.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
