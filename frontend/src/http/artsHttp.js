import $api from "./index";

class ArtsHttp {
    async getArts() {
        return $api(`/arts`)
    }

    async getOneArt(id) {
        return $api(`/arts/${id}`)
    }

    async getTypes() {
        return $api(`/arts/types`)
    }

    async getGenres() {
        return $api(`/arts/genres`)
    }

    async addGenreToArt(artId, genreId) {
        return $api.post(`/arts/add-genre-to-art`, {artId, genreId})
    }

    async getArtsGenres() {
        return $api(`/arts/arts-genres`)
    }

    async getArtGenres(artId) {
        return $api.post(`/arts/art-genres`, {artId})
    }
}

export default new ArtsHttp