/**
 * api/v1/studentApi.js
 * 
 * @description :: Axios configuration for the Students.
 * @version     :: 1.0
 */

import axios from 'axios'
import * as config from '@/api/v1/apiConfig'

/**
 * CourseApi is an Axios instance which provides the baseURL for all the HTTP requests.
 */
const StudentApi = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}/students`,
    // Always use the token in the Authorization header of HTTP requests
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
})

/**
 * Function to verify from the server if the user provided the correct password
 * given an email address (i.e., the unique identifier of the entity)
 * @param {String} id - given ID of the entity
 * @param {String} pass - as password provided by the user in the session
 * @returns {Promise} - a promise that resolves to the response data
 */
export const verifyStudent = async (id, pass) => {
    try {
        const response = await StudentApi.post(`/${id}/verify`, { password: pass });
        return response.data;
    } catch (error) {
        throw error;
    }
};
