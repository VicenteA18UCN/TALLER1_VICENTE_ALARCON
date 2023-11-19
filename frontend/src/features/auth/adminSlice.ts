import {createSlice} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import { RootState } from "../../app/store/store";

const initialState = {
    id: null,
    username: null,
    token: null,
};

export const adminSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action) {
            const {id, username, token} = action.payload;
            state.id = id;
            state.username = username;
            state.token = token;
        },
        logout(state) {
            state.id = null;
            state.username = null;
            state.token = null;
        }
    },
});

export const selectToken = (state : RootState) => state.admin.token;
export const selectId = (state : RootState) => state.admin.id;
export const selectUsername = (state : RootState) => state.admin.username;

export const {login, logout} = adminSlice.actions;