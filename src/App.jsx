import { useState, useEffect, useRef } from "react";
import axios from "axios";

// Always enforce HTTPS, even for local development
const API_BASE_URL = "https://uec-api-33mk.vercel.app"; // Use HTTPS locally (ensure localhost runs on HTTPS)

const App = () => {
  const [persons, setPersons] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const eventSourceRef = useRef(null);

  // Fetch persons from backend
  const fetchPersons = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/persons`);
      setPersons(res.data);
    } catch (error) {
      console.error("Error fetching persons:", error);
    }
  };

  useEffect(() => {
    fetchPersons(); // Initial fetch

    // Setup SSE for real-time updates
    const setupSSE = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close(); // Close any existing connection
      }

      eventSourceRef.current = new EventSource(`${API_BASE_URL}/events`);

      eventSourceRef.current.onmessage = () => {
        console.log("Update received from server");
        fetchPersons(); // Refresh list on update
      };

      eventSourceRef.current.onerror = () => {
        console.error("SSE connection lost. Retrying in 5s...");
        eventSourceRef.current.close();
        setTimeout(setupSSE, 5000); // Retry after 5 seconds
      };
    };

    setupSSE();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname) return;

    try {
      await axios.post(`${API_BASE_URL}/persons`, { firstname, lastname });
      setFirstname("");
      setLastname("");
    } catch (error) {
      console.error("Error adding person:", error);
    }
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
