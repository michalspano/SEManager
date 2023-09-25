import axios from 'axios'

// TODO: load the version
const VERSION = 1

export const Api = axios.create({
    // TODO: Load the env variable via Vite.js
    // baseURL: process.env.VUE_APP_API_ENDPOINT || `http://localhost:3000/api/v${VERSION}`
    baseURL: `http://localhost:3000/api/v${VERSION}`
})

export const CourseApi = axios.create({
    // baseURL: process.env.VUE_APP_API_ENDPOINT || `http://localhost:3000/api/v${VERSION}/courses`
    baseURL: `http://localhost:3000/api/v${VERSION}/courses`
})