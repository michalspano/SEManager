/**
 * api/v1/courseApi.js
 * 
 * @description :: Axios configuration for the Courses.
 * @version     :: 1.0
 */

import axios from 'axios'
import * as config from '@/api/v1/apiConfig'
import Graph from '@/modules/Graph'

/**
 * CourseApi is an Axios instance which provides the baseURL for all the HTTP requests.
 * The reason why the headers are not created here is that the token can be mutated.
 */
const CourseApi = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}/courses`
})

/**
 * Function to return all the courses.
 * @returns {Promise} Promise object represents the list of courses.
 */
export const getCourses = async () => {
    const response = await CourseApi.get('/');
    return response.data.courses
}

/**
 * Function to return a specific course.
 * @returns {Promise} Promise object represents the course.
 */
export const getCourse = async (courseCode, includeLinks = false) => {
    const response = await CourseApi.get('/' + courseCode);
    if (includeLinks) {
        return response.data
    }
    return response.data.course
}

/**
 * Function to return all employees of a specific course.
 * @returns {Promise} Promise object representing the list of employees.
 */
export const getCourseEmployees = async (courseCode) => {
    const response = await CourseApi.get('/' + courseCode + '/employees');
    return response.data.employees
}

export const getTermCourses = async (term, period) => {
    const response = await CourseApi.get('/' + `?filterBy[term]=${term}&filterBy[studyPeriod]=${period}`);
    return response.data.courses
}

/**
 * A function to return the list of courses in the form of an adjacency list.
 * @returns {Promise} Promise object represents the list of courses.
 * @throws {Error} Error object represents the error that occurred.
 */
export const getCoursesGraph = async () => {
    const response = await CourseApi.get('/');

    let courses = response.data.courses;
    let numberOfCourses = courses.length;

    var graph = new Graph(numberOfCourses);

    graph.addVertexArrayObjects(courses);

    return graph.getAdjList();
}

/**
 * Delete a specific course.
 * @param {String} id - unique identifier of the course.
 * @returns {Promise} Promise object represents the status of the HTTP request.
 */
export const deleteCourse = async (id) => {
    const response = await CourseApi.delete('/' + id, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
    })
    return response.status
}

/**
 * Function to create a new course.
 * @param {Object} body - the body of the request
 * @returns {Promise} - a promise that resolves to the response data
 */
export const postCourse = async (body) => {
    const response = await CourseApi.post('/', body, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
    })
    return response.data
}

/**
 * Delete all courses
 * @returns {Promise} Promise object represents the status of the HTTP request.
 */
export const deleteCourses = async () => {
    const response = await CourseApi.get('/', {
        withCredentials: true,
        headers: {
            'X-HTTP-Method-Override': 'DELETE',
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
    })
    return response.status
}

/**
 * Function to create an employee for a specific course.
 * @param {String} id - a unique identifier of the course
 * @param {Object} employeeBody - the Object containing the employee information
 * @returns {Promise} Promise object represents the response data.
 */
export const postEmployeeForCourse = async (id, employeeBody) => {
    const response = await CourseApi.post('/' + id + '/employees', employeeBody, {
        withCredentials: true,
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
    })
    return response.data
}