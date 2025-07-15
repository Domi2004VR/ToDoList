const express = require ('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/login', authController.loginUser);
router.post('/register', authController.registerUser);
router.post('/logout', authMiddleware.accessTokenVerify, authController.logoutUser);
router.post('/refresh', authController.refreshToken);

module.exports = router;
