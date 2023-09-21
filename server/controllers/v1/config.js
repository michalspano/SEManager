/**
 * controllers/v1/config.js
 * 
 * @description :: A config file for version 1 of the API.
 * @version     :: 1.0
 */

/**
 * @description An immutable configuration {Object} for the API.
 */
const CONFIG = Object.freeze({
    "version": 'v1',
    "api_info": {
        "releaseDate": Date('2023-09-16'),
        "description": "Version 1 of the API for the SEM Program System.",
        "authors": ["Michal Spano", "Erik Lindstrand", "Ionel Pop Jara"]
    }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "http://localhost";

/**
 * This function formats the resource's URI for the purpose
 * of the HATEOAS mechanism.
 * @param {String} resource - the type of the resource.
 * @param {String} id - the identifier of the resource.
 * @returns {String} - the formatted URI.
 */
const formatHref = (resource, id) => {
    return `${HOST}:${PORT}/${CONFIG.version}/${resource}/${id}`;
};

module.exports = { formatHref, CONFIG };