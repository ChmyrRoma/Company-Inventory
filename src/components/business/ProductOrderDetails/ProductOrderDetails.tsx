import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { faCircleNotch, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchOrders, fetchProducts } from '../../../store/slices';
import { IOrder, IProduct } from '../../../types';
import OrderCard from '../Orders/OrderCard/OrderCard';
import Orders from '../Orders/Orders';
import Products from '../Products/Products';

import styles from './productOrderDetails.module.scss';

interface IProductOrderDetails {
    type: string;
}

const ProductOrderDetails = ({ type }: IProductOrderDetails) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const { orders, isLoading } = useAppSelector((state) => state.orders) as { orders: IOrder[]; isLoading: boolean };

    const [isOrderOpen, setIsOrderOpen] = useState<boolean>(false);
    const [id, setId] = useState<number>(0);
    const [selectedType, setSelectedType] = useState<string | null>(null);
    const [filterValue, setFilterValue] = useState<string>('');
    const [isLoadingFilter, setIsLoadingFilter] = useState<boolean>(true);

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchProducts());
    }, [dispatch]);

    const products = useMemo(() => {
        return orders.reduce<IProduct[]>((acc, item) => acc.concat(item.products), []);
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

    const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
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
        return (
            <div className={styles.productOrderDetails__loading} data-testid="loading-spinner">
                <FontAwesomeIcon icon={faCircleNotch} className={styles.productOrderDetails__loading_icon} />
            </div>
        );
    }

    if (!orders) return null;

    return (
        <div className={styles.productOrderDetails}>
            <Stack direction="horizontal" gap={2} className={styles.productOrderDetails__header}>
                <div className={styles.productOrderDetails__header_title}>
                    {currentType.product ? t('products') : t('orders')}
                    {' / '}
                    {currentType.product ? products.length : orders.length}
                </div>
                {currentType.product && (
                    <div className={styles.productOrderDetails__header_filter}>
                        <Form.Select
                            aria-label="Default select example"
                            className={styles.productOrderDetails__header_select}
                            onChange={handleFilterChange}
                            value={filterValue}
                        >
                            <option value="" hidden>
                                {t('type')}
                            </option>
                            {products
                                .filter(
                                    (product, index, self) => self.findIndex((p) => p.type === product.type) === index
                                )
                                .map((product) => (
                                    <option key={product.type} value={product.type}>
                                        {product.type}
                                    </option>
                                ))}
                        </Form.Select>
                    </div>
                )}
                {selectedType && (
                    <FontAwesomeIcon
                        icon={faXmark}
                        onClick={clearFilter}
                        data-testid="loading-clear"
                        className={styles.productOrderDetails__header_clearFilter}
                    />
                )}
            </Stack>
            <div
                className={`styles.productOrderDetails__content ${isOrderOpen && styles.productOrderDetails__content_flex}`}
            >
                <div className={styles.productOrderDetails__products}>
                    {currentType.product &&
                        (!isLoadingFilter ? (
                            filteredProducts.map((product: IProduct) => (
                                <Products
                                    key={product.id}
                                    data={product}
                                    orderTitle={orders.find((order) => order.id === product.orderId)?.title || ''}
                                />
                            ))
                        ) : (
                            <div className={styles.productOrderDetails__loading}>
                                <FontAwesomeIcon
                                    icon={faCircleNotch}
                                    className={styles.productOrderDetails__loading_icon}
                                />
                            </div>
                        ))}
                </div>
                <div className={isOrderOpen ? styles.productOrderDetails__content_currentOrder : ''}>
                    {currentType.order &&
                        orders.map((order) => (
                            <Orders
                                key={order.id}
                                data={order}
                                id={id}
                                isOrderOpen={isOrderOpen}
                                setIsOrderOpen={setIsOrderOpen}
                                setId={setId}
                            />
                        ))}
                </div>
                {isOrderOpen && (
                    <div className={styles.productOrderDetails__content_orderCard}>
                        {orders.map((order) => {
                            if (order.id === id && order.products.length === 0) {
                                setIsOrderOpen(false);
                                return null;
                            }

                            return (
                                order.id === id && (
                                    <OrderCard key={order.id} data={order} handleClose={() => setIsOrderOpen(false)} />
                                )
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductOrderDetails;
