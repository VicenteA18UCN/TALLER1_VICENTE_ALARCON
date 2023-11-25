import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {jwtDecode} from "jwt-decode";
import { RootState } from "../../app/store/store";
import exp from 'constants';

/**
 * Interfaz que representa la estructura del payload de un token JWT.
 * @interface JwtPayload
 * @property {string} nameid - Identificador único del usuario.
 * @property {string} unique_name - Nombre único del usuario.
 * @property {number} nbf - Tiempo en que el token no debe ser utilizado antes (Not Before).
 * @property {number} exp - Tiempo en que el token expira.
 * @property {number} iat - Tiempo en que el token fue emitido (Issued At).
 */
interface JwtPayload {
    "nameid": string,
    "unique_name": string,
    "nbf": number,
    "exp": number,
    "iat": number
}
/**
 * Estado inicial para la porción de Redux relacionada con la administración de usuarios.
 * @interface AdminState
 * @property {string | null} id - Identificador del usuario o nulo si no está autenticado.
 * @property {string | null} username - Nombre de usuario o nulo si no está autenticado.
 * @property {string | null} token - Token de autenticación o nulo si no está autenticado.
 * @property {number | null} exp - Tiempo de expiración del token o nulo si no está autenticado.
 */
export interface AdminState
{
    id: string | null;
    username: string | null;
    token: string | null;
    exp: number | null;

}
/**
 * Estado inicial para la porción de Redux relacionada con la administración de usuarios.
 * @type {AdminState}
 */
const initialState: AdminState = {
    id: null,
    username: null,
    token: null,
    exp: null,
};


/**
 * Slice de Redux para la administración de usuarios.
 * @type {Slice}
 */
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

/**
 * Selector para obtener el token de autenticación del estado global.
 * @function
 * @param {RootState} state - Estado global de la aplicación.
 * @returns {string | null} - Token de autenticación o nulo si no está autenticado.
 */
export const selectToken = (state : RootState) => state.admin.token;
/**
 * Selector para obtener el identificador del usuario del estado global.
 * @function
 * @param {RootState} state - Estado global de la aplicación.
 * @returns {string | null} - Identificador del usuario o nulo si no está autenticado.
 */
export const selectId = (state : RootState) => state.admin.id;
/**
 * Selector para obtener el nombre de usuario del estado global.
 * @function
 * @param {RootState} state - Estado global de la aplicación.
 * @returns {string | null} - Nombre de usuario o nulo si no está autenticado.
 */
export const selectUsername = (state : RootState) => state.admin.username;
/**
 * Selector para obtener el tiempo de expiración del token del estado global.
 * @function
 * @param {RootState} state - Estado global de la aplicación.
 * @returns {number | null} - Tiempo de expiración del token o nulo si no está autenticado.
 */
export const selectExp = (state : RootState) => state.admin.exp;

/**
 * Acciones creadas por el slice de administración de usuarios.
 * @namespace
 * @property {function} login - Acción para iniciar sesión.
 * @property {function} logout - Acción para cerrar sesión.
 */
export const {login, logout} = adminSlice.actions;