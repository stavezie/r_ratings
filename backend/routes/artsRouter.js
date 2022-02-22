import express from "express";
import ArtsController, {getAllArts, getOne} from "../controllers/art-controller.js";

const router = express.Router();

router.get('/', getAllArts);
router.get('/types', ArtsController.getAllTypes);
router.get('/genres', ArtsController.getAllGenres);
router.get('/arts-genres', ArtsController.getAllArtsGenres);
router.post('/art-genres', ArtsController.getArtGenres);
router.get('/:id', getOne);
router.post('/add-genre-to-art', ArtsController.addGenreToArt);


export default router;
