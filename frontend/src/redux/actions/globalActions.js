import {store} from "../store/store";

const dispatch = store.dispatch;

export function isLoading (val) {
    dispatch({type: 'TURN_ISLOADING', payload: val})
}

export function setShow (obj)  {
    dispatch({type: 'TURN_ART_MODAL', payload: obj})
}