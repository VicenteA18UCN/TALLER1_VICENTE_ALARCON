import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import { RootState } from "../../app/store/store";
import exp from 'constants';

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
    exp: number | null;

}

const initialState: AdminState = {
    id: null,
    username: null,
    token: null,
    exp: null,
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
            state.exp = payload.exp;

        },
        logout(state) {
            state.id = null;
            state.username = null;
            state.token = null;
            state.exp = null;
        }
    },
});

export const selectToken = (state : RootState) => state.admin.token;
export const selectId = (state : RootState) => state.admin.id;
export const selectUsername = (state : RootState) => state.admin.username;
export const selectExp = (state : RootState) => state.admin.exp;

export const {login, logout} = adminSlice.actions;