const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');


router.put('/create',authMiddleware.accessTokenVerify , taskController.createTask);
router.delete('/delete',authMiddleware.accessTokenVerify , taskController.deleteTask);
router.put('/update',authMiddleware.accessTokenVerify , taskController.updateTask);

module.exports = router;