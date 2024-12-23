import { createSlice } from '@reduxjs/toolkit';

export interface IOrdersReducer {
    orders: object[];
    isLoading: boolean;
}

const initialState = {
    orders: [],
    isLoading: true,
} as unknown as IOrdersReducer;

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        getOrders: (state, action) => {
            state.orders = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const ordersSliceActions = ordersSlice.actions;
