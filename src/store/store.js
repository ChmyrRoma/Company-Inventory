import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { combinedReducers } from './reducers/root';
export const store = configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        reducer: rootReducer,
        immutableCheck: false,
        serializableCheck: false,
    }),
});
