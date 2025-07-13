const express = require ('express')
const router = express.Router()
const toDoController = require('../controllers/toDoController')
const authMiddleware = require('../middlewares/authMiddleware')


router.get('/user/:userId', authMiddleware.accessTokenVerify, toDoController.getToDoListsByUser);
router.post('/create' , authMiddleware.accessTokenVerify, toDoController.createToDoList);
router.get('/join' , toDoController.joinToDoList);
router.delete('/delete', authMiddleware.accessTokenVerify, toDoController.deleteToDoList);
router.get('/open/:listId' , toDoController.openToDoList);


module.exports = router;