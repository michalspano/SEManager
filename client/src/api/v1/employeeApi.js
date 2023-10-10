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
export const getEmployee = async (employeeEmailAddress) => {
    try {
        const response = await EmployeeApi.get('/' + employeeEmailAddress);
        return response.data.employee
    } catch (err) {
        console.log(err)
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