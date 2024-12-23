import { createAsyncThunk } from '@reduxjs/toolkit';
import { ordersSliceActions } from '../reducers/orders';
import { productsSliceActions } from '../reducers/products';
import { productsApi } from '../rest/productsApi';
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, thunkAPI) => {
    const response = await productsApi.getProducts();
    if (response) {
        thunkAPI.dispatch(productsSliceActions.getProducts(response));
    }
    return response;
});
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
    thunkAPI.dispatch(ordersSliceActions.setLoading(true));
    const response = await productsApi.getOrders();
    if (response) {
        thunkAPI.dispatch(ordersSliceActions.getOrders(response));
        thunkAPI.dispatch(ordersSliceActions.setLoading(false));
    }
    thunkAPI.dispatch(ordersSliceActions.setLoading(false));
    return response;
});
export const deleteOrders = createAsyncThunk('orders/deleteOrders', async (id, thunkAPI) => {
    await productsApi.deleteOrderById(id);
    const response = await productsApi.getProducts();
    thunkAPI.dispatch(productsSliceActions.getProducts(response));
    return response;
});
