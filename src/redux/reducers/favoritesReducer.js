import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
    name : 'favorites',
    initialState : [],
    reducers : {
        addToFavorite: (state, action) => {
            state.push(action.payload)
        },
        removeFromFavorite: (state, action) => {
            return state.filter((favoriteItemID) => favoriteItemID !== action.payload);
        }
    }
})

export const {addToFavorite, removeFromFavorite} = favoritesSlice.actions;
export default favoritesSlice.reducer