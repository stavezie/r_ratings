const defaultState = {
    token: '',
    isAuth: false,
    user: {
        refreshToken: '',
        email: '',
        isActivated: '',
        id: null,
        avatar: '',
        roles: [],
        lib: []
    }
}
export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_TOKEN":
            return {...state, token: action.payload}
        case "REMOVE_TOKEN":
            return {...state, token: action.payload}
        case "SET_AUTH":
            return {...state, isAuth: action.payload}
        case "SET_USER":
            return {...state, user: {...action.payload}}
        case "SET_USER_LIB":
            const user = state.user
            return {...state, user: {...user, lib: action.payload}}
        case "SLICE_LIB":
            return {...state, user: action.payload.slice()}
        default:
            return state;
    }
}
