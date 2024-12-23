import { Route, Routes } from 'react-router-dom';

import './i18n';

import GlobalLayout from './components/layout/GlobalLayout';
import { PageNotFoundPage } from './components/pages/PageNotFoundPage';
import { ProductDetailsPage } from './components/pages/ProductDetailsPage';
import { ProductOrderDetailsPage } from './components/pages/ProductOrderDetailsPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const App = () => {
    return (
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/" element={<ProductOrderDetailsPage type="orders" />} />
                <Route path="/products" element={<ProductOrderDetailsPage type="products" />} />
                <Route path="/products/:id" element={<ProductDetailsPage />} />
            </Route>
            <Route path="*" element={<PageNotFoundPage />} />
        </Routes>
    );
};

export default App;
