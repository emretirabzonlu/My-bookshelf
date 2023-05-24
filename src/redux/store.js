import { createStore,combineReducers } from "redux";

import booksReducer from "./reducers/booksReducers";
import categoriesReducers from "./reducers/categoriesReducers";

const rootReducer = combineReducers({
    booksState:booksReducer,
    categoriesState:categoriesReducers
})

const store = createStore(rootReducer)

export default store