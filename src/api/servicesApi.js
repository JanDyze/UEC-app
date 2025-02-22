import { apiClient, handleRequest } from "./apiConfig";

/**
 * Fetch all services.
 */
export const fetchServices = async () => {
  const response = await handleRequest(() => apiClient.get("/services"));
  return response.data || [];
};

/**
 * Fetch a single service by ID.
 */
export const fetchServiceById = async (id) => {
  const response = await handleRequest(() => apiClient.get(`/services/${id}`));
  return response.data || null;
};

/**
 * Add a new service.
 */
export const addService = async (service) => {
  const response = await handleRequest(() =>
    apiClient.post("/services", service)
  );
  return response.data || null;
};

/**
 * Update a service's details.
 */
export const updateService = async (id, service) => {
  const response = await handleRequest(() =>
    apiClient.put(`/services/${id}`, service)
  );
  return response.data || null;
};

/**
 * Delete a service.
 */
export const deleteService = async (id) => {
  const response = await handleRequest(() =>
    apiClient.delete(`/services/${id}`)
  );
  return response.success; // Assuming deletion returns success status
};
