const express = require ('express')
const router = express.Router()
const toDoController = require('../controllers/toDoController')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/create' , authMiddleware.accessTokenVerify, toDoController.createToDoList);
router.get('/join' , toDoController.joinToDoList);

module.exports = router;