/**
 * api/v1/Api.js
 * 
 * @description :: Axios configuration for the main entry of API v1.0
 * @version     :: 1.0
 */

import axios from 'axios'
import * as config from '@/api/v1/apiConfig'

/**
 * Api is an Axios instance which provides the baseURL for all the HTTP requests.
 */
const Api = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}`
})

/**
 * Function to return the configuration JSON object of API version 1.0
 * @returns {Promise} Promise JSON Object with API's configuration.
 */
export const getApi = async () => {
    try {
        const response = await Api.get('/')
        return response.data
    } catch (err) {
        throw err
    }
}

/**
 * Generic method to perform HTTP requests based on the method type and URL obtained from
 * responses that contain HATEOAS links.
 * @param {string} methodType - The HTTP method type (e.g., GET, PUT, PATCH, POST, DELETE).
 * @param {string} url - The URL to make the HTTP request to.
 * @param {object} data - Optional data to send in the request body (for PUT and POST).
 * @returns {Promise} Promise object represents the HTTP response.
 */
export const performRequest = async (methodType, url, data = null) => {
    try {
        const axiosConfig = {
            method: methodType, url, data,
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        }
        const response = await axios(axiosConfig)
        return response.data
    } catch (error) {
        throw error;
    }
}