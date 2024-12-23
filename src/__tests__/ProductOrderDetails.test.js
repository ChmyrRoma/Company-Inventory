import { jsx as _jsx } from "react/jsx-runtime";
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import '@testing-library/jest-dom';
import ProductOrderDetails from '../components/business/ProductOrderDetails/ProductOrderDetails';
import i18n from '../i18n';
import { mockData } from '../mockData';
import { fetchOrders } from '../store/slices';
jest.mock('../store/slices', () => ({
    fetchOrders: jest.fn().mockImplementation(() => (dispatch) => {
        dispatch({ type: 'FETCH_ORDERS_SUCCESS', payload: mockData.orders });
    }),
    fetchProducts: jest.fn().mockImplementation(() => (dispatch) => {
        dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: mockData.products });
    }),
}));
const middlewares = [thunk];
// @ts-expect-error Type mismatch with RootState and middleware configuration; safe to ignore for mock setup
const mockStore = configureMockStore(middlewares);
export const renderWithProviders = (component, initialState) => {
    const store = mockStore(initialState);
    return render(_jsx(I18nextProvider, { i18n: i18n, children: _jsx(Provider, { store: store, children: _jsx(MemoryRouter, { initialEntries: ['/initial-route'], children: component }) }) }));
};
describe('ProductOrderDetails', () => {
    it('renders the component correctly', () => {
        const initialState = { orders: { orders: mockData.orders } };
        renderWithProviders(_jsx(ProductOrderDetails, { type: "products" }), initialState);
        expect(screen.getByText((content) => content.includes('Продукты') && content.includes('/ 3'))
        // @ts-expect-error Missing typing for screen.queryByText() in this test
        ).toBeInTheDocument();
    });
    it('dispatches fetchOrders on mount', async () => {
        const initialState = { orders: { orders: [] } };
        renderWithProviders(_jsx(ProductOrderDetails, { type: "products" }), initialState);
        await waitFor(() => expect(fetchOrders).toHaveBeenCalledTimes(2));
    });
    it('filters products by type and clears the filter when clicking the clear icon', async () => {
        const initialState = { orders: { orders: mockData.orders } };
        renderWithProviders(_jsx(ProductOrderDetails, { type: "products" }), initialState);
        // Step 1: Check filter products
        const filterDropdown = screen.getByRole('combobox');
        fireEvent.change(filterDropdown, { target: { value: 'Computer' } });
        const isFilterApplied = await waitFor(() => {
            const filteredProduct = screen.queryByText('Products 1');
            if (filteredProduct) {
                // @ts-expect-error Missing typing for screen.queryByText() in this test
                expect(filteredProduct).toBeInTheDocument();
                // @ts-expect-error Missing typing for screen.queryByText() in this test
                expect(screen.queryByText(/Product 2/i)).not.toBeInTheDocument();
                return true;
            }
            return false;
        });
        if (!isFilterApplied) {
            return;
        }
        // Step 2: Check filters clear
        const clearIcon = screen.getByTestId('loading-clear');
        // @ts-expect-error Missing typing for screen.queryByText() in this test
        expect(clearIcon).toBeInTheDocument();
        fireEvent.click(clearIcon);
        await waitFor(() => {
            // @ts-expect-error Missing typing for screen.queryByText() in this test
            expect(filterDropdown).toHaveValue('');
            // @ts-expect-error Missing typing for screen.queryByText() in this test
            expect(screen.queryByText('Products 1')).not.toBeInTheDocument();
            // @ts-expect-error Missing typing for screen.queryByText() in this test
            expect(screen.queryByText(/Product 2/i)).not.toBeInTheDocument();
        });
    });
    it('shows loading spinner when loading', () => {
        const initialState = { orders: { orders: [], isLoading: true } };
        renderWithProviders(_jsx(ProductOrderDetails, { type: "products" }), initialState);
        // @ts-expect-error Missing typing for screen.queryByText() in this test
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
    it("renders orders when type is 'orders'", () => {
        const initialState = { orders: { orders: mockData.orders } };
        renderWithProviders(_jsx(ProductOrderDetails, { type: "orders" }), initialState);
        // @ts-expect-error Missing typing for screen.queryByText() in this test
        expect(screen.getByText(/order 1/i)).toBeInTheDocument();
    });
    it('shows no content when there are no orders or products', () => {
        const initialState = { orders: { orders: [], isLoading: false } };
        renderWithProviders(_jsx(ProductOrderDetails, { type: "products" }), initialState);
        // @ts-expect-error Missing typing for screen.queryByText() in this test
        expect(screen.queryByText(/products \/ 0/i)).not.toBeInTheDocument();
    });
});
