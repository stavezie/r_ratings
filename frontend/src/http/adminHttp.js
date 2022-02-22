import $api from "./index";

class AdminHttp {
    async add(data) {
        return $api.post(`/admin/add`, {data})
    }
}

export default new AdminHttp