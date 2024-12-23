import { combineReducers } from '@reduxjs/toolkit';
import { ordersSlice } from './orders';
import { productsSlice } from './products';
export const combinedReducers = combineReducers({
    [productsSlice.name]: productsSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer,
});
const rootReducer = (state, action) => combinedReducers(state, action);
export default rootReducer;
