import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {adminSlice} from '../../features/auth/adminSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: "root",
    storage,
};

const rootReducer = combineReducers({
    admin: adminSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);