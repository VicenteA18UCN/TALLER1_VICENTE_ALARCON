import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {adminSlice} from '../../features/auth/adminSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

/**
 * Configuración de persistencia para Redux Persist.
 * @constant
 * @type {object}
 * @property {string} key - Clave utilizada para almacenar el estado persistente en el almacenamiento.
 * @property {object} storage - Almacenamiento utilizado para almacenar el estado persistente.
 */
const persistConfig = {
    key: "root",
    storage,
};

/**
 * Combinación de todos los reducers de la aplicación.
 * @constant
 * @type {object}
 */
const rootReducer = combineReducers({
    admin: adminSlice.reducer,
});

/**
 * Reducer persistente que utiliza la configuración de persistencia.
 * @constant
 * @type {object}
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Almacén de Redux configurado con el reducer persistente y middleware adicional.
 * @constant
 * @type {object}
 */
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

/**
 * Tipo que representa el estado global de la aplicación.
 * @typedef {object} RootState
 * @property {object} admin - Estado del slice admin.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Persistor utilizado para persistir el estado del almacenamiento.
 * @constant
 * @type {object}
 */
export const persistor = persistStore(store);