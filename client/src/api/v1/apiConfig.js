/**
 * src/api/v1/apiConfig.js
 * 
 * @description :: A reusable configuration file to access the API from the client.
 * @version     :: 1.0
 */

export const VERSION = 1;
export const PORT = import.meta.env.VITE_PORT || "3000";
export const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost";
