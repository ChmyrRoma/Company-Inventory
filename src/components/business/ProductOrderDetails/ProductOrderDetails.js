import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { faCircleNotch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchOrders, fetchProducts } from '../../../store/slices';
import OrderCard from '../Orders/OrderCard/OrderCard';
import Orders from '../Orders/Orders';
import Products from '../Products/Products';
import styles from './productOrderDetails.module.scss';
const ProductOrderDetails = ({ type }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { orders, isLoading } = useAppSelector((state) => state.orders);
    const [isOrderOpen, setIsOrderOpen] = useState(false);
    const [id, setId] = useState(0);
    const [selectedType, setSelectedType] = useState(null);
    const [filterValue, setFilterValue] = useState('');
    const [isLoadingFilter, setIsLoadingFilter] = useState(true);
    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchProducts());
    }, [dispatch]);
    const products = useMemo(() => {
        return orders.reduce((acc, item) => acc.concat(item.products), []);
    }, [orders]);
    const currentType = useMemo(() => {
        const product = type === 'products';
        const order = type === 'orders';
        return { product, order };
    }, [type]);
    const filteredProducts = useMemo(() => {
        return selectedType ? products.filter((product) => product.type === selectedType) : products;
    }, [products, selectedType]);
    useEffect(() => {
        if (type !== 'orders') {
            setIsOrderOpen(false);
        }
    }, [type]);
    useEffect(() => {
        setIsLoadingFilter(true);
        const timer = setTimeout(() => {
            setIsLoadingFilter(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [orders]);
    const handleFilterChange = (event) => {
        setIsLoadingFilter(true);
        const selectedValue = event.target.value;
        setTimeout(() => {
            setFilterValue(selectedValue);
            setSelectedType(selectedValue);
            setIsLoadingFilter(false);
        }, 500);
    };
    const clearFilter = () => {
        setIsLoadingFilter(true);
        setTimeout(() => {
            setFilterValue('');
            setSelectedType(null);
            setIsLoadingFilter(false);
        }, 500);
    };
    if (isLoading) {
        return (_jsx("div", { className: styles.productOrderDetails__loading, "data-testid": "loading-spinner", children: _jsx(FontAwesomeIcon, { icon: faCircleNotch, className: styles.productOrderDetails__loading_icon }) }));
    }
    if (!orders)
        return null;
    return (_jsxs("div", { className: styles.productOrderDetails, children: [_jsxs(Stack, { direction: "horizontal", gap: 2, className: styles.productOrderDetails__header, children: [_jsxs("div", { className: styles.productOrderDetails__header_title, children: [currentType.product ? t('products') : t('orders'), ' / ', currentType.product ? products.length : orders.length] }), currentType.product && (_jsx("div", { className: styles.productOrderDetails__header_filter, children: _jsxs(Form.Select, { "aria-label": "Default select example", className: styles.productOrderDetails__header_select, onChange: handleFilterChange, value: filterValue, children: [_jsx("option", { value: "", hidden: true, children: t('type') }), products
                                    .filter((product, index, self) => self.findIndex((p) => p.type === product.type) === index)
                                    .map((product) => (_jsx("option", { value: product.type, children: product.type }, product.type)))] }) })), selectedType && (_jsx(FontAwesomeIcon, { icon: faXmark, onClick: clearFilter, "data-testid": "loading-clear", className: styles.productOrderDetails__header_clearFilter }))] }), _jsxs("div", { className: `styles.productOrderDetails__content ${isOrderOpen && styles.productOrderDetails__content_flex}`, children: [_jsx("div", { className: styles.productOrderDetails__products, children: currentType.product &&
                            (!isLoadingFilter ? (filteredProducts.map((product) => (_jsx(Products, { data: product, orderTitle: orders.find((order) => order.id === product.orderId)?.title || '' }, product.id)))) : (_jsx("div", { className: styles.productOrderDetails__loading, children: _jsx(FontAwesomeIcon, { icon: faCircleNotch, className: styles.productOrderDetails__loading_icon }) }))) }), _jsx("div", { className: isOrderOpen ? styles.productOrderDetails__content_currentOrder : '', children: currentType.order &&
                            orders.map((order) => (_jsx(Orders, { data: order, id: id, isOrderOpen: isOrderOpen, setIsOrderOpen: setIsOrderOpen, setId: setId }, order.id))) }), isOrderOpen && (_jsx("div", { className: styles.productOrderDetails__content_orderCard, children: orders.map((order) => {
                            if (order.id === id && order.products.length === 0) {
                                setIsOrderOpen(false);
                                return null;
                            }
                            return (order.id === id && (_jsx(OrderCard, { data: order, handleClose: () => setIsOrderOpen(false) }, order.id)));
                        }) }))] })] }));
};
export default ProductOrderDetails;
