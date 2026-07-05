// This file sets up the connection between our app and PostgreSQL
// Every other file that needs to run a database query will import "pool" from here

const { Pool } = require('pg');
require('dotenv').config();

// A pool manages multiple database connections for us
// instead of opening and closing one every single query
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// This just checks that the connection actually works when the server starts
pool.connect((error, client, release) => {
    if (error) {
        console.log('Error connecting to the database:', error);
    } else {
        console.log('Connected to PostgreSQL database successfully');
        release(); // give the connection back to the pool
    }
});

module.exports = pool;