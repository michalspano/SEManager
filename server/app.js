// app.js - back-end (server) 

const express   = require('express');
const mongoose  = require('mongoose');
const morgan    = require('morgan');
const path      = require('path');
const cors      = require('cors');
const history   = require('connect-history-api-fallback');

// Define variables
const port      = process.env.PORT || 3000;
const mongoURI  = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/animalDevelopmentDB';

// Connect to MongoDB
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

// HTTP request logger
app.use(morgan('dev'));

// Enable cross-origin resource sharing for frontend must be registered before api
app.options('*', cors());
app.use(cors());

// A test `api` route
app.get('/api', (req, res) => {
    res.json({'message': 'Welcome to your DIT342 backend ExpressJS project!'});
});

// Catch all non-error handler for api (i.e., 404 Not Found)
app.use('/api/*', (req, res) => {
    res.status(404).json({ 'message': 'Not Found' });
});

// Configuration for serving frontend in production mode
// Support Vue.js HTML 5 history mode
app.use(history());

// Serve static assets
const root      = path.normalize(__dirname + '/..');
const client    = path.join(root, 'client', 'dist');

app.use(express.static(client));

// Error handler (i.e., when exception is thrown) must be registered last
const env = app.get('env');

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
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
    console.log(`Backend: http://localhost:${port}/api/`);
    console.log(`Frontend (production): http://localhost:${port}/`);
});

module.exports = app;
