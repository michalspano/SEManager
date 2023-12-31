/**
 * app.js
 * 
 * @description :: The main entry point of the API 
 * @version     :: 1.0
 */

// Import packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const { generateSecretKey } = require('./utils/utils');

// Import routes of the versioned API
const v1Routes = require('./routes/v1');

const API_VERSION = 1;      // Which API version to use (global constant)
require('dotenv').config(); // set-up environment variables (.env)

// Attempt to access .env variables, otherwise replace by the default values
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/SEManagerDB';
const SESSION_SECRET = process.env.SESSION_SECRET || generateSecretKey();

// Attempt to establish a connection with MongoDB
mongoose.connect(mongoURI).catch((err) => {
    if (err) {
        console.error(`Failed to connect to MongoDB with URI: ${mongoURI}`);
        console.error(err.stack);
        process.exit(1);
    }
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

// Create Express app
const app = express();

// Parse requests of content-type 'application/json'
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cookies and sessions
app.use(cookieParser());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
);

// HTTP request logger
app.use(morgan('dev'));

// Enable cross-origin resource sharing for frontend must be registered before api
// Enable cookies modification
app.use(cors({ withCredentials: true, credentials: true, origin: true }));

// Enable HTTP overriding (for multiple formats)
// This means that all middleware can be reached by using the GET/POST
// method given the method override parameter in the request body.
app.use(methodOverride('X-HTTP-Method'));           // Microsoft
app.use(methodOverride('X-HTTP-Method-Override'));  // Google/GData
app.use(methodOverride('X-Method-Override'));       // IBM

/* ---Middleware----------------------------------------------------------------------------- */

app.get('/api', (req, res) => {
    const VERSION_LINKS = {
        'v1': {
            'status': 'stable',
            'href': '/api/v1',
            'type': 'application/json'
        },
        /* Add new API versions here.
        'v1.x': {
            'status': 'experimental',
            'href': '/api/v1.x',
            'type': 'application/json'
        } */
    };
    res.json({
        'message': 'Welcome to the SEManager API',
        'version_links': VERSION_LINKS
    });
});

/* ---VERSION 1.0 API--- */
app.use('/api/v1', v1Routes);

/* ---VERSION 1.x API--- */
// Increment the API version and add the new routes here

// Handle all undefined routes
app.use('/api/*', (req, res) => {
    res.status(404).json({ 'message': 'Not Found' });
});

/* ---Middleware----------------------------------------------------------------------------- */

// Configuration for serving frontend in production mode
// Support Vue.js HTML 5 history mode
app.use(history());

// Serve static assets
const root = path.normalize(__dirname + '/..');
const client = path.join(root, 'client', 'dist');

app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
const env = process.env.NODE_ENV || 'development';

// Note: if the product is in development mode, the returned JSON object
// contains the full stack off the error.
app.use((err, req, res) => {
    console.error(err.stack);
    let err_res = {
        'message': err.message,
        'error': {}
    };
    if (env === 'development') {
        // Return sensitive stack trace only in dev mode
        err_res['error'] = err.stack;
    }
    res.status(err.status || 500);
    res.json(err_res);
});

// listen on the defined port
app.listen(port, (err) => {
    if (err) throw err;
    console.log(`Express server listening on port ${port}, in ${env} mode`);
    console.log(`Backend: http://localhost:${port}/api/v${API_VERSION}`);
    console.log(`Frontend (production): http://localhost:${port}/`);
    console.log(`Connected to MongoDB with URI: ${mongoURI}`);
});

module.exports = app;
