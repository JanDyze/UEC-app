import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const App = () => {
  const [persons, setPersons] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  // Fetch persons from backend
  const fetchPersons = async () => {
    const res = await axios.get("http://localhost:5000/persons");
    setPersons(res.data);
  };

  useEffect(() => {
    fetchPersons();
    socket.on("update", fetchPersons);
    return () => socket.off("update");
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!firstname || !lastname) return;

    await axios.post("http://localhost:5000/persons", { firstname, lastname });

    setFirstname("");
    setLastname("");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Person List</h2>

      {/* Form */}
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

      {/* Person List */}
      <ul>
        {persons.map((p) => (
          <li key={p._id}>{p.firstname} {p.lastname}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
