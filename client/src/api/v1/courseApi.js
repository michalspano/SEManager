import axios from 'axios'
import * as config from '@/api/v1/apiConfig'

const CourseApi = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}/courses`
})

export const getCourses2 = () => {
    CourseApi.get('/').then((response) => {
        console.log(response.data.courses);
        return response.data.courses
    }).catch((err) => {
        console.log(err)
    })
}

export const getCourses = async () => {
    try {
        console.log('courses 1');
        const response = await CourseApi.get('/');
        console.log(response);
        console.log('courses 2');
        return response.data.courses
    } catch (err) {
        console.log(err)
        throw err
    }
}
