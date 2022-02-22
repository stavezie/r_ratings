import $api from "./index";

export default class AuthHttp {
    static async login(email, password) {
        return $api.post('/auth/login', {email, password})
    }

    static async registration(name, email, password) {
        return $api.post('/auth/registration', {name, email, password})
    }

    static async logout() {
        return $api.post('/auth/logout')
    }

    static async refresh() {
        return $api(`/auth/refresh`, {withCredentials: true})
    }
}