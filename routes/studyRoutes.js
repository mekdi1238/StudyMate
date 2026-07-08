const express = require('express');
const router = express.Router();
const studyController = require('../controllers/studyController');
const verifyToken = require('../middleware/authMiddleware');
const { validateStudySet } = require('../middleware/validation');

router.post('/', verifyToken, validateStudySet, studyController.createStudySet);
router.get('/', verifyToken, studyController.getMyStudySets);
router.get('/:id', verifyToken, studyController.getStudySetById);
router.put('/:id', verifyToken, validateStudySet, studyController.updateStudySet);
router.delete('/:id', verifyToken, studyController.deleteStudySet);

module.exports = router;