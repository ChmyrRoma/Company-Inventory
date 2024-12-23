import { AnyAction, combineReducers } from '@reduxjs/toolkit';

import { IOrdersReducer, ordersSlice } from './orders';
import { IProductsReducer, productsSlice } from './products';

export interface StoreState {
    products: IProductsReducer;
    orders: IOrdersReducer;
}

export const combinedReducers = combineReducers({
    [productsSlice.name]: productsSlice.reducer,
    [ordersSlice.name]: ordersSlice.reducer,
});

export type Store = ReturnType<typeof combinedReducers>;

const rootReducer = (state: Store, action: AnyAction) => combinedReducers(state, action);

export default rootReducer;
