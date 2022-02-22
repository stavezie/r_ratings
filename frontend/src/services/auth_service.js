import AuthHttp from "../http/authHttp";
import {store} from "../redux/store/store";
import {isLoading} from "../redux/actions/globalActions";
import {getLib} from "./user_service";
import {getArts, getGenres, getTypes} from "./art_service";

const dispatch = store.dispatch;

export async function login(email, password) {
    try {
        const response = await AuthHttp.login(email, password)
        let user = response.data.user
        user.lib = response.data.lib
        dispatch({type: 'SET_TOKEN', payload: response.data.accessToken})
        dispatch({type: 'SET_AUTH', payload: true})
        dispatch({type: 'SET_USER', payload: user})
        return response.status
    } catch (e) {
        console.log(e)
    }
}

export async function registration(name, email, password) {
    try {
        const response = await AuthHttp.registration(name, email, password)
        dispatch({type: 'SET_TOKEN', payload: response.data.accessToken})
        dispatch({type: 'SET_AUTH', payload: true})
        dispatch({type: 'SET_USER', payload: response.data.user})
        return response.status
    } catch (e) {
        console.log(e)
    }
}

export async function logout() {
    try {
        const response = await AuthHttp.logout()
        if (response) {
            dispatch({type: 'SET_TOKEN', payload: ''})
            dispatch({type: 'SET_AUTH', payload: false})
            dispatch({
                type: 'SET_USER', payload: {
                    refreshToken: '',
                    email: '',
                    isActivated: '',
                    id: null
                }
            })
        }
    } catch (e) {
        console.log(e)
    }
}

export async function checkAuth() {
    try {
        await AuthHttp.refresh()
            .then(async (response) => {
            dispatch({type: 'SET_TOKEN', payload: response.data.accessToken})
            dispatch({type: 'SET_AUTH', payload: true})
            dispatch({type: 'SET_USER', payload: response.data.user})
            await getLib(response.data.user.id)
        })
            .finally(async () => {
                await getArts();
                await getTypes();
                await getGenres();
                isLoading(false)
            })
    } catch (e) {
        console.log(e)
        isLoading(false)
    }
}
