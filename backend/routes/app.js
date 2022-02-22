import express from "express";


const router = express.Router();

router.get('/');
router.post('/registration');
router.post('/login');
router.post('/logout');
router.get('/activate/:link');
router.get('/refresh');
router.get('/users');

export default router;