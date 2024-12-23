import { createSlice } from '@reduxjs/toolkit';

export interface IProductsReducer {
    data: object[];
    isLoading: boolean;
}

const initialState = {
    data: [],
    isLoading: true,
} as unknown as IProductsReducer;

export const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        getProducts: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const productsSliceActions = productsSlice.actions;
