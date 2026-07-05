const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

async function registerUser(request, response) {
    try {
        const { name, email, password } = request.body;

        if (!name || !email || !password) {
            return response.status(400).json({
                message: 'Name, email, and password are all required'
            });
        }

        const existingUser = await userModel.findUserByEmail(email);
        if (existingUser) {
            return response.status(409).json({
                message: 'An account with this email already exists'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await userModel.createUser(name, email, hashedPassword);

        console.log('New user registered:', newUser.email);

        return response.status(201).json({
            message: 'User registered successfully',
            user: newUser
        });
    } catch (error) {
        console.log('Error in registerUser:', error);
        return response.status(500).json({
            message: 'Something went wrong while registering the user'
        });
    }
}

async function loginUser(request, response) {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                message: 'Email and password are required'
            });
        }

        const user = await userModel.findUserByEmail(email);
        if (!user) {
            return response.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password_hash);
        if (!passwordMatches) {
            return response.status(401).json({
                message: 'Invalid email or password'
            });
        }

        const token = jwt.sign(
            { userId: user.id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        return response.status(200).json({
            message: 'Login successful',
            token: token
        });
    } catch (error) {
        console.log('Error in loginUser:', error);
        return response.status(500).json({
            message: 'Something went wrong while logging in'
        });
    }
}

module.exports = { registerUser, loginUser };