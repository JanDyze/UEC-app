import axios from "axios";

const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://uec-api-33mk.vercel.app"
    : "http://localhost:5000";

// Create an Axios instance with default configuration
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Handles API requests and error logging.
 * @param {Function} apiCall - The API function to execute.
 * @returns {Promise<Object>} - API response or an error object.
 */
export const handleRequest = async (apiCall) => {
  try {
    const response = await apiCall();
    console.log("✅ API Response:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("❌ API Request Failed:", error);

    // Handle structured API error responses
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "Server error occurred.",
      };
    }

    // Handle network errors
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
};
