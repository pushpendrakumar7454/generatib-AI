import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",

    initialState: {
        users:null,
        accessToken: null,
        isLoading: true
    },

    reducers: {
        addUser: (state, action) => {
            state.users = action.payload;
            state.isLoading = false;
        },

        setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },

        removeUser: (state) => {
            state.users = [];
            state.accessToken = null;
            state.isLoading = false;
        },
        setAuthLoading: (state, action) => {
    state.isLoading = action.payload;
},

    }
});

export const {
    addUser,
    setAccessToken,
    removeUser,
    setAuthLoading
} = authSlice.actions;

export default authSlice.reducer;