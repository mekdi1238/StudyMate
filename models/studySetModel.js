const pool = require('../config/db');

async function createStudySet(userId, topic, originalContent) {
    try {
        const result = await pool.query(
            'INSERT INTO study_sets (user_id, topic, original_content) VALUES ($1, $2, $3) RETURNING *',
            [userId, topic, originalContent]
        );
        return result.rows[0];
    } catch (error) {
        console.log('Error creating study set:', error);
        throw error;
    }
}

async function getStudySetsByUser(userId) {
    try {
        const result = await pool.query(
            'SELECT * FROM study_sets WHERE user_id = $1 ORDER BY created_at DESC',
            [userId]
        );
        return result.rows;
    } catch (error) {
        console.log('Error getting study sets:', error);
        throw error;
    }
}

async function getStudySetById(id) {
    try {
        const result = await pool.query(
            'SELECT * FROM study_sets WHERE id = $1',
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.log('Error getting study set:', error);
        throw error;
    }
}

module.exports = { createStudySet, getStudySetsByUser, getStudySetById };