import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes } from 'react-router-dom';
import './i18n';
import GlobalLayout from './components/layout/GlobalLayout';
import { PageNotFoundPage } from './components/pages/PageNotFoundPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage';
import { ProductOrderDetailsPage } from './components/pages/ProductOrderDetailsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
const App = () => {
    return (_jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(GlobalLayout, {}), children: [_jsx(Route, { path: "/", element: _jsx(ProductOrderDetailsPage, { type: "orders" }) }), _jsx(Route, { path: "/products", element: _jsx(ProductOrderDetailsPage, { type: "products" }) }), _jsx(Route, { path: "/products/:id", element: _jsx(ProductDetailsPage, {}) })] }), _jsx(Route, { path: "*", element: _jsx(PageNotFoundPage, {}) })] }));
};
export default App;
