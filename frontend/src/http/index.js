import axios from "axios";
import {useSelector} from "react-redux";
import {store} from "../redux/store/store";

const state = store.getState()
const token = state.userReducer.token
const apiUrl = state.global.apiUrl

const $api = axios.create({
    withCredentials: true,
    baseURL: apiUrl
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`
    return config
})

export default $api

