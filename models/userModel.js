const pool = require('../config/db');

async function createUser(name, email, hashedPassword) {
    try {
        const result = await pool.query(
            'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email, created_at',
            [name, email, hashedPassword]
        );
        
        return result.rows[0];
    } catch (error) {
        console.log('Error creating user:', error);
        throw error;
    }
}

async function findUserByEmail(email) {
    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );
        return result.rows[0];
    } catch (error) {
        console.log('Error finding user:', error);
        throw error;
    }
}

module.exports = { createUser, findUserByEmail };