/**
 * api/v1/userApi.js
 * 
 * @description :: Axios configuration for the Users.
 * @version     :: 1.0
 */

import axios from 'axios'
import * as config from '@/api/v1/apiConfig'

/**
 * CourseApi is an Axios instance which provides the baseURL for all the HTTP requests.
 * The reason why the headers are not created here is that the token can be mutated.
 */
export const UserApi = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}/users`
})

/**
 * Function to verify from the server if the user provided the correct password
 * given an email address (i.e., the unique identifier of the entity)
 * @param {String} id - given ID of the entity
 * @param {String} pass - as password provided by the user in the session
 * @returns {Promise} - a promise that resolves to the response data
 */
export const authenticateUser = async (id, pass) => {
    try {
        const response = await UserApi.post(`/auth/${id}`, { password: pass }, { withCredentials: true });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Function to create a new user.
 * @param {Object} body - the body of the request
 * @returns {Promise} - a promise that resolves to the response data
 */
export const postUser = async (body) => {
    try {
        const response = await UserApi.post('/', body, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        })
        return response.data
    } catch (err) {
        throw err
    }
}

/**
 * Function to return a specific user.
 * @returns {Promise} Promise object represents the user.
 */
export const getUser = async (id, includeLinks = false) => {
    try {
        const response = await UserApi.get('/' + id, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        })
        if (includeLinks) {
            return response.data
        }
        return response.data.user
    } catch (err) {
        throw err
    }
}

/**
 * Delete a specific user.
 * @param {String} id - unique identifier of the user.
 * @returns {Promise} Promise object represents the status of the HTTP request.
 */
export const deleteUser = async (id) => {
    try {
        const response = await UserApi.delete('/' + id, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        })
        return response.status
    } catch (err) {
        throw err
    }
}

/**
 * Delete all users.
 * @returns {Promise} Promise object represents the status of the HTTP request.
 */
export const deleteUsers = async () => {
    try {
        const response = await UserApi.delete('/', {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            }
        })
        return response.status
    } catch (err) {
        throw err
    }
}