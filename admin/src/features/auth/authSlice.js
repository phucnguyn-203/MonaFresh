import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    isAuth: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.isAuth = true;
        },
        setUserFail: (state) => {
            state.currentUser = null;
            state.isAuth = false;
        },
        setLogoutUser: (state) => {
            state.currentUser = null;
            state.isAuth = false;
        },
    },
});

export default authSlice.reducer;
export const { setUserSuccess, setUserFail, setLogoutUser } = authSlice.actions;
