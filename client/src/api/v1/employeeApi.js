/**
 * api/v1/employeeApi.js
 * 
 * @description :: Axios configuration for the Employees.
 * @version     :: 1.0
 */

import axios from "axios";
import * as config from '@/api/v1/apiConfig'

/**
 * EmployeeApi is an Axios instance which provides the baseURL for all the HTTP requests.
 * The reason why the headers are not created here is that the token can be mutated.
 */
const EmployeeApi = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}/employees`
})

/**
 * Function to return all the employees.
 * @returns {Promise} Promise object represents the list of employees.
 */
export const getEmployees = async () => {
    try {
        const response = await EmployeeApi.get('/');
        return response.data.employees
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Function to return a specific employee.
 * @returns {Promise} Promise object represents the employee.
 */
export const getEmployee = async (employeeEmailAddress, includeLinks = false) => {
    try {
        const response = await EmployeeApi.get('/' + employeeEmailAddress);
        if (includeLinks) {
            return response.data
        }
        return response.data.employee
    } catch (err) {
        throw err
    }
}

/**
 * Delete a specific employee.
 * @param {String} id - unique identifier of the employee.
 * @returns {Promise} Promise object represents the status of the HTTP request.
 */
export const deleteEmployee = async (id) => {
    try {
        const response = await EmployeeApi.delete('/' + id, {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
        })
        return response.status
    } catch (err) {
        throw err
    }
}

/**
 * Function to create a new employee.
 * @param {Object} body - the body of the request
 * @returns {Promise} - a promise that resolves to the response data
 */
export const postEmployee = async (body) => {
    try {
        const response = await EmployeeApi.post('/', body, {
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
 * Delete all employees.
 * @returns {Promise} Promise object represents the status of the HTTP request.
 */
export const deleteEmployees = async () => {
    try {
        const response = await EmployeeApi.delete('/', {
            withCredentials: true,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
        })
        return response.status
    } catch (err) {
        throw err
    }
}