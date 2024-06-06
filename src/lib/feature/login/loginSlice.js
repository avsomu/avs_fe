import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    expiryFalse: false,
    ssoAuthenticated: false,
};

export const loginSlice = createSlice({
    name: "loginSlice",
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setExpiryFalse: (state, action) => {
            state.expiryFalse = action.payload;
        },
        setSSOAuth: (state, action) => {
            state.ssoAuthenticated = action.payload;
        },
    },
});

export const { setExpiryFalse, setUserName, setSSOAuth } = loginSlice.actions;
export default loginSlice.reducer;