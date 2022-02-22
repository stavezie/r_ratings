const defaultState = {
    isLoading: true,
    isAuthError: false,
    apiUrl: `http://localhost:5000/api`,
    modal: {
        item: {},
        userId: null,
        show: false
    }

}
export const globalReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'TURN_ISLOADING':
            return {...state, isLoading: action.payload}
        case 'TURN_AUTH_ERROR':
            return {...state, isAuthError: action.payload}
        case 'TURN_ART_MODAL':
            return {...state, modal: action.payload}
        default:
            return state;
    }
}
