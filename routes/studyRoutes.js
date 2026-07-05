const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, studyController.createStudySet);
router.get('/', verifyToken, studyController.getMyStudySets);
router.get('/:id', verifyToken, studyController.getStudySetById);

module.exports = router;