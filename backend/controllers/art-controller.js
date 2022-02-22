import {Art} from "../models/artsModel.js";
import ArtService from "../service/art-service.js";
import {Genre} from "../models/genresModel.js";
import {Types} from "../models/typesModel.js";
import {ArtGenre} from "../models/artGenreModel.js";

class ArtController {
    async addArt(req, res, next) {
        try {
            const {data} = req.body;
            console.log(data)
            const art = await ArtService.add(data)
            res.json(art)
        } catch (e) {
            next(e)
        }
    }

    async getAllTypes(req, res, next) {
        try {
            const types = await Types.findAll()
            res.json(types)
        } catch (e) {
            next(e);
        }
    }

    async addGenreToArt(req, res, next) {
        try {
            const {artId, genreId} = req.body;
            const newArt = await ArtService.addArtGenre(artId, genreId)
            res.json(newArt)
        } catch (e) {
            next(e)
        }
    }

    async getArtGenres(req, res, next) {
        try {
            const {artId} = req.body
            const genres = await ArtService.getArtGenres(artId)
            res.json(genres)
        } catch (e) {
            next(e)
        }
    }

    async getAllGenres(req, res, next) {
        try {
            const genres = await Genre.findAll()
            res.json(genres)
        } catch (e) {
            next(e)
        }
    }

    async getAllArtsGenres(req, res, next) {
        try {
            const genres = await ArtGenre.findAll()
            res.json(genres)
        } catch (e) {
            next(e)
        }
    }
}


export const getAllArts = async (req, res) => {
    try {
        const arts = await Art.findAll();
        res.json(arts);
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getOne = async (req, res) => {
    try {
        const id = req.params.id;
        const art = await Art.findOne({where: {id}});
        res.json(art);
    } catch (error) {
        res.json({message: error.message})
    }
}
export default new ArtController()