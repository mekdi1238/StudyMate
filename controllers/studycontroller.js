const studySetModel = require('../models/studySetModel');

async function createStudySet(request, response) {
    try {
        const { topic, originalContent } = request.body;

        if (!topic || !originalContent) {
            return response.status(400).json({
                message: 'Topic and content are both required'
            });
        }

        const newStudySet = await studySetModel.createStudySet(
            request.userId,
            topic,
            originalContent
        );

        return response.status(201).json({
            message: 'Study set created successfully',
            studySet: newStudySet
        });
    } catch (error) {
        console.log('Error in createStudySet:', error);
        return response.status(500).json({
            message: 'Something went wrong while creating the study set'
        });
    }
}

async function getMyStudySets(request, response) {
    try {
        const studySets = await studySetModel.getStudySetsByUser(request.userId);
        return response.status(200).json({ studySets });
    } catch (error) {
        console.log('Error in getMyStudySets:', error);
        return response.status(500).json({
            message: 'Something went wrong while fetching study sets'
        });
    }
}

async function getStudySetById(request, response) {
    try {
        const studySet = await studySetModel.getStudySetById(request.params.id);

        if (!studySet) {
            return response.status(404).json({
                message: 'Study set not found'
            });
        }

        if (studySet.user_id !== request.userId) {
            return response.status(403).json({
                message: 'You do not have permission to view this study set'
            });
        }

        return response.status(200).json({ studySet });
    } catch (error) {
        console.log('Error in getStudySetById:', error);
        return response.status(500).json({
            message: 'Something went wrong while fetching the study set'
        });
    }
}
async function updateStudySet(request, response) {
    try {
        const studySet = await studySetModel.getStudySetById(request.params.id);

        if (!studySet) {
            return response.status(404).json({
                message: 'Study set not found'
            });
        }

        if (studySet.user_id !== request.userId) {
            return response.status(403).json({
                message: 'You do not have permission to edit this study set'
            });
        }

        const { topic, originalContent } = request.body;

        if (!topic || !originalContent) {
            return response.status(400).json({
                message: 'Topic and content are both required'
            });
        }

        const updatedStudySet = await studySetModel.updateStudySet(
            request.params.id,
            topic,
            originalContent
        );

        return response.status(200).json({
            message: 'Study set updated successfully',
            studySet: updatedStudySet
        });
    } catch (error) {
        console.log('Error in updateStudySet:', error);
        return response.status(500).json({
            message: 'Something went wrong while updating the study set'
        });
    }
}

async function deleteStudySet(request, response) {
    try {
        const studySet = await studySetModel.getStudySetById(request.params.id);

        if (!studySet) {
            return response.status(404).json({
                message: 'Study set not found'
            });
        }

        if (studySet.user_id !== request.userId) {
            return response.status(403).json({
                message: 'You do not have permission to delete this study set'
            });
        }

        await studySetModel.deleteStudySet(request.params.id);

        return response.status(200).json({
            message: 'Study set deleted successfully'
        });
    } catch (error) {
        console.log('Error in deleteStudySet:', error);
        return response.status(500).json({
            message: 'Something went wrong while deleting the study set'
        });
    }
}

module.exports = { createStudySet, getMyStudySets, getStudySetById, updateStudySet, deleteStudySet };