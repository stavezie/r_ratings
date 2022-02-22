import express from "express";
import artsController from "../controllers/art-controller.js";

const router = express.Router();

router.post('/add', artsController.addArt);
export default router;
