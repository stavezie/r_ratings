import {Art} from "../models/artsModel.js";
import ApiErrors from "../exceptions/api-errors.js";
import {Genre} from "../models/genresModel.js";

class ArtService {
    async add(data) {
        const art = await Art.findOne({where: {name: data.name}})
        if (art) {
            return ApiErrors.BadRequest('Такая запись уже существует')
        }
        const newArt = await Art.create({
            name: data.name,
            type: data.type,
            description: data.description,
            path: data.path,
            genre: data.genre,
            date: data.date,
            episodes: data.episodes
        })
        return newArt
    }

    async addArtGenre(artId, genreId) {
        const art = await Art.findOne({where: {id: artId}})
        const genre = await Genre.findOne({where: {id: genreId}})
        art.addGenre(genre)
    }

    async getArtGenres(artId) {
        const art = await Art.findOne({where: {id: artId}})
        const genres = art.getGenres()
        return genres
    }
}

export default new ArtService()