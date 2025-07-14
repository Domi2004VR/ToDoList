const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');


router.put('/create',authMiddleware.accessTokenVerify , taskController.createTask);

module.exports = router;