/**
 * api/v1/Api.js
 * 
 * @description :: Axios configuration for the main entry of API v1.0
 * @version     :: 1.0
 */

import axios from 'axios'
import * as config from '@/api/v1/apiConfig'

const Api = axios.create({
    baseURL: `${config.BASE_URL}:${config.PORT}/api/v${config.VERSION}`
})

export const getApi = async () => {
    try {
        const response = await Api.get('/')
        return response.data
    } catch (err) {
        console.log(err)
        throw err
    }
}