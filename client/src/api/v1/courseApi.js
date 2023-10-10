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
 */
const CourseApi = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}/courses`
})

/**
 * Function to return all the courses.
 * @returns {Promise} Promise object represents the list of courses.
 */
export const getCourses = async () => {
    try {
        const response = await CourseApi.get('/');
        return response.data.courses
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Function to return a specific course.
 * @returns {Promise} Promise object represents the course.
 */
export const getCourse = async (courseCode) => {
    try {
        const response = await CourseApi.get('/' + courseCode);
        return response.data.course
    } catch (err) {
        console.log(err)
        throw err
    }
}

/**
 * Function to return all employees of a specific course.
 * @returns {Promise} Promise object representing the list of employees.
 */
export const getCourseEmployees = async (courseCode) => {
    try {
        const response = await CourseApi.get('/' + courseCode + '/employees');
        return response.data.employees
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getTermCourses = async (term, period) => {
    try {
        const response = await CourseApi.get('/' + `?filterBy[term]=${term}&filterBy[studyPeriod]=${period}`);
        return response.data.courses
    } catch (err) {
        console.log(err)
        throw err
    }
}

export const getCoursesGraph = async () => {
    let response = null;

    try {
        response = await CourseApi.get('/');
    } catch (err) {
        console.log(err)
        throw err
    }

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
    try {
        const response = await CourseApi.delete('/' + id, {
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