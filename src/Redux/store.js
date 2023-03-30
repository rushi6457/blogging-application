import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import thunk from "redux-thunk";
import { blogReducer } from "./blog/blogReducer";
const { loginReducer, signupReducer } = require("./auth/authReducer");

const rootReducer = combineReducers({
    login:loginReducer,
    signup:signupReducer,
    blog:blogReducer
})

const createComposer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer,createComposer(applyMiddleware(thunk)))