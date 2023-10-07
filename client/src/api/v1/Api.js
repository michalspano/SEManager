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