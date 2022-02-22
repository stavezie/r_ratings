import UserHttp from "../http/userHttp";
import {store} from "../redux/store/store";
import {isLoading, setShow} from "../redux/actions/globalActions";

const dispatch = store.dispatch;

export async function getLib(id) {
    const req = await UserHttp.getUserLib(id)
    if (req) {
        dispatch({type: 'SET_USER_LIB', payload: req.data})
    }
}

export async function deleteItem(userId, artId, setIsInTheLib, userLib, item) {
    const response = await UserHttp.DeleteArtFromUserLib(userId, artId)
    if (response) {
        const newLib = userLib.filter(i => i.id !== artId)
        dispatch({type: 'SET_USER_LIB', payload: newLib})
        setShow({item, userId, show: false})
        setIsInTheLib(false)
    }
}

export async function changeItemInLib(data, item, user) {
    isLoading(true)
    const response = await UserHttp.changeItem(data.userId, data.artId, data.settings)
    if (response) {
        const artModified = {...item}
        artModified.user_rating = data.settings
        const newLib = user.lib.map(i => i.id === item.id ? i = artModified : i)
        dispatch({type: 'SET_USER_LIB', payload: newLib})
        setShow({item: item, userId: data.userId, show: false})
        isLoading(false)
    }
}

export async function addItemToLib(data, item, user) {
    isLoading(true)
    await UserHttp.addItem(data.userId, data.artId, data.settings)
        .then(() => {
            const artModified = {...item}
            artModified.user_rating = data.settings
            const newLib = [...user.lib, artModified]
            dispatch({type: 'SET_USER_LIB', payload: newLib})
            setShow({item: item, userId: data.userId, show: false})
            isLoading(false)
        })
}

export async function changeUserSettings(data) {
    isLoading(true)
    await UserHttp.changeSettings(data).then((res) => {
        if (res.data !== '') {
            dispatch({type: 'SET_USER', payload: res.data})
            isLoading(false)
        }
    })
}
