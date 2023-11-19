import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import { RootState } from "../../app/store/store";

interface JwtPayload {
    "nameid": string,
    "unique_name": string,
    "nbf": number,
    "exp": number,
    "iat": number
}

export interface AdminState
{
    id: string | null;
    username: string | null;
    token: string | null;

}

const initialState: AdminState = {
    id: null,
    username: null,
    token: null,
};



export const adminSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state: any, action: PayloadAction<string>) {
            const payload = jwtDecode<JwtPayload>(action.payload);
            state.id = payload.nameid ?? "";
            state.username = payload.unique_name;
            state.token = action.payload;
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