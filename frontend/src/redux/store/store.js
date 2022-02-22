import {combineReducers, createStore} from "redux";
import {globalReducer} from "../reducers/globalReducer";
import {artsReducer} from "../reducers/artsReducer";
import {userReducer} from '../reducers/userReducer'
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = (combineReducers({
    global: globalReducer,
    artsReducer: artsReducer,
    userReducer: userReducer
}))

export const store = createStore(rootReducer, composeWithDevTools());

