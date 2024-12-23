import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    data: [],
    isLoading: true,
};
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
