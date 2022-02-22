import express from "express";
import userController from "../controllers/user-controller.js";

const router = express.Router();

router.post('/userlib', userController.getUserLib);
router.post('/userlib/add', userController.addArtToUserLib);
router.post('/userlib/delete', userController.deleteArtFromUserLib);
router.post('/userlib/change', userController.changeArtInLib);
router.post('/user/change-acc', userController.changeUserAccount);

export default router;
