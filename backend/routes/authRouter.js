import express from "express";
import userController from '../controllers/user-controller.js'
import {body} from 'express-validator'
import roleMiddleware from "../middlewares/role-middleware.js";

const router = express.Router();

router.post('/registration',
    body('name').isLength({min: 3, max: 32}),
    body('email').isEmail(),
    body('password').isLength({min: 3, max: 32}),
    userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/activate/:link', userController.activate);
router.get('/refresh', userController.refresh);
router.get('/users', roleMiddleware(['admin']), userController.getAllUsers);

export default router;