import { apiClient, handleRequest } from "./apiConfig";

/**
 * Fetch all persons.
 */
export const fetchPersons = async () => {
  const response = await handleRequest(() => apiClient.get("/persons"));
  return response.data || []; // Extracts `data` directly
};

/**
 * Fetch a single person by ID.
 */
export const fetchPersonById = async (id) => {
  const response = await handleRequest(() => apiClient.get(`/persons/${id}`));
  return response.data || null;
};

/**
 * Add a new person.
 */
export const addPerson = async (person) => {
  const response = await handleRequest(() =>
    apiClient.post("/persons", person)
  );
  return response.data || null;
};

/**
 * Update a person's details.
 */
export const updatePerson = async (id, person) => {
  const response = await handleRequest(() =>
    apiClient.put(`/persons/${id}`, person)
  );
  return response.data || null;
};

/**
 * Delete a person.
 */
export const deletePerson = async (id) => {
  const response = await handleRequest(() =>
    apiClient.delete(`/persons/${id}`)
  );
  return response.success; // Keep this since deletion doesn't return data
};
