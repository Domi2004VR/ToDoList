const express = require ('express')
const router = express.Router()
const toDoController = require('../controllers/toDoController')


router.post('/create' , toDoController.createToDoList);
router.get('/join' , toDoController.joinToDoList);

module.exports = router;