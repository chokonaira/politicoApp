import express from 'express';
import userController from '../controller/users';
import authMiddleware from '../middleware/auth'
 
const { loginValidation, signupValidation, userExists } = authMiddleware
const router = express.Router();

router.post('/auth/signup', signupValidation, userExists, userController.signup);
router.post('/auth/login', loginValidation, userController.login);

export default router; 
