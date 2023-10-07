/**
 * api/v1/courseApi.js
 * 
 * @description :: Axios configuration for the Courses.
 * @version     :: 1.0
 */

import axios from 'axios'
import * as config from '@/api/v1/apiConfig'
import Graph from '../../utils/Graph'

/**
 * CourseApi is an Axios instance which provides the baseURL for all the HTTP requests.
 */
const CourseApi = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}/courses`,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    }
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

export const getCourse = async (courseCode) => {
    try {
        const response = await CourseApi.get('/' + courseCode);
        return response.data.course
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

    graph.addVertexArray(courses);

    var graph2 = new Graph(numberOfCourses);

    graph2.addVertexArrayObjects(courses);

    console.log('Course objects graph: ')
    graph2.printObjectGraph();
    console.log(graph2.getAdjList());

    // graph.printGraph();
    
    console.log('End of API call \n\n\n')
    return graph.getAdjList();
}

export const getCoursesGraph2 = async () => {
    let response = null;
    try {
        response = await CourseApi.get('/');
    } catch (err) {
        console.log(err)
        throw err
    }

    let courses = response.data.courses;
    let numberOfCourses = courses.length;


    var graph2 = new Graph(numberOfCourses);

    graph2.addVertexArrayObjects(courses);

    // graph.printGraph();
    
    console.log('End of API call \n\n\n')
    return graph2.getAdjList();
}