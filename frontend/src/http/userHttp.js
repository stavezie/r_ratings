import $api from "./index";

class UserHttp {
    async getUserLib(id) {
        return $api.post(`/users/userlib`, {id})
    }

    async DeleteArtFromUserLib(userId, artId) {
        return $api.post(`/users/userlib/delete`, {userId, artId})
    }

    async changeItem(userId, artId, settings) {
        return $api.post(`/users/userlib/change`, {userId, artId, settings})
    }

    async addItem(userId, artId, settings) {
        return $api.post(`/users/userlib/add`, {userId, artId, settings})
    }

    async changeSettings(data) {
        return $api.post(`/users/user/change-acc`, {data})
    }
}

export default new UserHttp