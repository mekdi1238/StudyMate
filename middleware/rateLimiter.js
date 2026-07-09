const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: { message: 'Too many login attempts. Please try again in 15 minutes.' }
});

const createStudySetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 20,
    message: { message: 'Too many study sets created. Please try again later.' }
});

module.exports = { loginLimiter, createStudySetLimiter };