import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    orders: [],
    isLoading: true,
};
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
