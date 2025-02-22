import { apiClient, handleRequest } from "./apiConfig";

/**
 * Fetch all attendance records.
 */
export const fetchAttendanceRecords = async () => {
  const response = await handleRequest(() => apiClient.get("/attendance"));
  return response.data || []; // Extracts `data` directly
};

/**
 * Fetch a single attendance record by ID.
 */
export const fetchAttendanceById = async (id) => {
  const response = await handleRequest(() =>
    apiClient.get(`/attendance/${id}`)
  );
  return response.data || null;
};

/**
 * Add a new attendance record.
 */
export const addAttendance = async (attendance) => {
  const response = await handleRequest(() =>
    apiClient.post("/attendance", attendance)
  );
  return response.data || null;
};

/**
 * Update an attendance record.
 */
export const updateAttendance = async (id, attendance) => {
  const response = await handleRequest(() =>
    apiClient.put(`/attendance/${id}`, attendance)
  );
  return response.data || null;
};

/**
 * Delete an attendance record.
 */
export const deleteAttendance = async (id) => {
  const response = await handleRequest(() =>
    apiClient.delete(`/attendance/${id}`)
  );
  return response.success; // Keep this since deletion doesn't return data
};
