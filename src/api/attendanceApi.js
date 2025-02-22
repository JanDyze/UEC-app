import { apiClient, handleRequest } from "./apiConfig";

/**
 * Fetch all attendance records.
 */
export const fetchAttendanceRecords = async () => {
  const response = await handleRequest(() => apiClient.get("/attendance"));
  return response.data || [];
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
 * Fetch attendance records for a specific service.
 */
export const fetchAttendanceByServiceId = async (serviceId) => {
  const response = await handleRequest(() =>
    apiClient.get(`/attendance/service/${serviceId}`)
  );
  return response.data || [];
};

/**
 * Initialize attendance for a service by registering all persons as absent.
 */
export const setAttendanceByServiceId = async (serviceId) => {
  const response = await handleRequest(() =>
    apiClient.post(`/attendance/service/${serviceId}`)
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
  return response.success;
};

/**
 * Fetch attendance records by date.
 */
export const fetchAttendanceByDate = async (date) => {
  const response = await handleRequest(() =>
    apiClient.get(`/attendance/date/${date}`)
  );
  return response.data || [];
};
