const express = require ('express')
const router = express.Router()
const toDoController = require('../controllers/toDoController')
const authMiddleware = require('../middlewares/authMiddleware')
const taskController = require('../controllers/taskController')


router.get('/user/:userId', authMiddleware.accessTokenVerify, toDoController.getToDoListsByUser);
router.post('/create' , authMiddleware.accessTokenVerify, toDoController.createToDoList);
router.get('/join' , toDoController.joinToDoList);
router.delete('/delete', authMiddleware.accessTokenVerify, toDoController.deleteToDoList);
router.get('/open/:listId' , toDoController.openToDoList);
router.get('/mytodo/:todolistId', authMiddleware.accessTokenVerify, taskController.getToDoList)


module.exports = router;