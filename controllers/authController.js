const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
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

module.exports = { registerUser };