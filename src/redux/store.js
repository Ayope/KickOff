import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./reducers/favoritesReducer";

const store = configureStore({
    reducer : {
        favorites : favoritesReducer
    }
});

export default store