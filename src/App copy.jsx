import { useState } from "react";
import { addPerson } from "@/api/api";

const App = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedFirstname = firstname.trim();
    const trimmedLastname = lastname.trim();

    if (!trimmedFirstname || !trimmedLastname) {
      alert("Please enter both first and last names.");
      return;
    }

    try {
      setLoading(true);
      await addPerson({ firstname: trimmedFirstname, lastname: trimmedLastname });
      setFirstname("");
      setLastname("");
    } catch (error) {
      alert("Failed to add person. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h2>Add Person</h2>

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
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
};

export default App;
