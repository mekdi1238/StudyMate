// server.js

// Import the Express framework
const express = require('express');

// Import our database connection - this runs the connection check in config/db.js
const pool = require('./config/db');

// Create an Express application
const app = express();

// Define the port number
const PORT = 3000;

// Home route
app.get('/', (req, res) => {
    console.log('Home route was hit');
    res.send('StudyMate server is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});