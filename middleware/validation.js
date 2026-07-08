function validateRegistration(request, response, next) {
    const { name, email, password } = request.body;

    if (!name || name.trim().length < 2) {
        return response.status(400).json({
            message: 'Name must be at least 2 characters'
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
        return response.status(400).json({
            message: 'Please provide a valid email address'
        });
    }

    if (!password || password.length < 6) {
        return response.status(400).json({
            message: 'Password must be at least 6 characters'
        });
    }

    next();
}

function validateStudySet(request, response, next) {
    const { topic, originalContent } = request.body;

    if (!topic || topic.trim().length === 0) {
        return response.status(400).json({
            message: 'Topic is required'
        });
    }

    if (topic.length > 200) {
        return response.status(400).json({
            message: 'Topic must be under 200 characters'
        });
    }

    if (!originalContent || originalContent.trim().length === 0) {
        return response.status(400).json({
            message: 'Content is required'
        });
    }

    if (originalContent.length > 10000) {
        return response.status(400).json({
            message: 'Content must be under 10,000 characters'
        });
    }

    next();
}

module.exports = { validateRegistration, validateStudySet };