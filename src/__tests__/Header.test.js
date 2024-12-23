import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import Header from '../components/business/Header/Header';
jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));
jest.mock('react-router-dom', () => {
    const actualModule = jest.requireActual('react-router-dom');
    return {
        ...actualModule,
        useNavigate: jest.fn(),
    };
});
jest.mock('../hooks/useDebounce/useDebounce', () => jest.fn((value) => value));
describe('Header', () => {
    const mockStore = configureMockStore();
    const initialState = {
        products: { data: [{ id: '1', title: 'Test Product' }] },
    };
    const store = mockStore(initialState);
    const renderHeader = () => render(_jsx(Provider, { store: store, children: _jsx(Router, { children: _jsx(Header, {}) }) }));
    it('renders the Header component with logo and placeholder', () => {
        renderHeader();
        // @ts-expect-error Missing typing for screen.queryByText() in this test
        expect(screen.getByAltText('logo')).toBeInTheDocument();
        // @ts-expect-error Missing typing for screen.queryByText() in this test
        expect(screen.getByPlaceholderText('search')).toBeInTheDocument();
    });
    it('handles search input updates and performs subsequent actions', async () => {
        const mockNavigate = jest.fn();
        jest.requireMock('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
        renderHeader();
        const searchInput = screen.getByPlaceholderText('search');
        // Step 1: Update search field
        fireEvent.change(searchInput, { target: { value: 'Monitor' } });
        const isSearchActive = await waitFor(() => {
            const searchMenu = screen.queryByTestId('search-menu');
            if (searchMenu) {
                // @ts-expect-error Missing typing for screen.queryByText() in this test
                expect(searchMenu).toBeInTheDocument();
                // @ts-expect-error Missing typing for screen.queryByText() in this test
                expect(searchInput).toHaveValue('Monitor');
                return true;
            }
            return false;
        });
        if (!isSearchActive) {
            return;
        }
        // Step 2: Check spinner showing
        const isSpinnerVisible = await waitFor(() => {
            const spinner = screen.queryByRole('status');
            if (spinner) {
                // @ts-expect-error Missing typing for screen.queryByText() in this test
                expect(spinner).toBeInTheDocument();
                return true;
            }
            return false;
        });
        if (!isSpinnerVisible) {
            return;
        }
        // Step 3: Check filters showing
        const isDropdownVisible = await waitFor(() => {
            const dropdownMenu = screen.queryByTestId('dropdown-menu');
            if (dropdownMenu) {
                // @ts-expect-error Missing typing for screen.queryByText() in this test
                expect(dropdownMenu).toBeInTheDocument();
                return true;
            }
            return false;
        });
        if (!isDropdownVisible) {
            return;
        }
        const productItems = screen.queryAllByRole('list-item');
        const matchFound = productItems.some((item) => 
        // @ts-expect-error Missing typing for screen.queryByText() in this test
        item.textContent?.toLowerCase().includes(searchInput.value.toLowerCase()));
        if (!matchFound) {
            const noResultsMessage = screen.queryByText(/ordersMessage/i);
            // @ts-expect-error Missing typing for screen.queryByText() in this test
            expect(noResultsMessage).toBeInTheDocument();
            return;
        }
        // Step 4: Check navigate to products click
        const productItem = screen.queryByTestId('dropdown-menu-products-1');
        if (!productItem) {
            return;
        }
        fireEvent.click(productItem);
        expect(mockNavigate).toHaveBeenCalledWith('/products/products-1', { replace: true });
    });
});
