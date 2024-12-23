import { mockData } from '../../mockData';
import { IOrder, IProduct } from '../../types';

enum ERequestKey {
    ORDERS = 'orders',
    PRODUCTS = 'products',
}

const { orders, products } = mockData;

export function apiRequest<T>(callback: () => T, delay = 300): Promise<T> {
    return new Promise<T>((resolve) => {
        setTimeout(() => {
            resolve(callback());
        }, delay);
    });
}

const initializeData = (key: string, data: IOrder[] | IProduct[]) => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};

initializeData(ERequestKey.PRODUCTS, products);
initializeData(ERequestKey.ORDERS, orders);

// API functions
const getOrders = (): Promise<IOrder[]> =>
    apiRequest(() => {
        const storedOrders = localStorage.getItem(ERequestKey.ORDERS);
        const orders: IOrder[] = storedOrders ? JSON.parse(storedOrders) : [];
        return orders.map((order) => ({
            ...order,
            products: products.filter((product) => product.orderId === order.id),
        }));
    });

const getProducts = (): Promise<IProduct[]> =>
    apiRequest(() => {
        const storedProducts = localStorage.getItem(ERequestKey.PRODUCTS);
        return storedProducts ? JSON.parse(storedProducts) : [];
    });

const deleteOrderById = (id: number): Promise<void> =>
    apiRequest(() => {
        const storedOrders = localStorage.getItem(ERequestKey.ORDERS);
        if (storedOrders) {
            const orders: IOrder[] = JSON.parse(storedOrders);
            const updatedOrders = orders.filter((order) => order.id !== id);
            localStorage.setItem(ERequestKey.ORDERS, JSON.stringify(updatedOrders));
        }

        const storedProducts = localStorage.getItem(ERequestKey.PRODUCTS);
        if (storedProducts) {
            const products: IProduct[] = JSON.parse(storedProducts);
            const updatedProducts = products.filter((product) => product.orderId !== id);
            localStorage.setItem(ERequestKey.PRODUCTS, JSON.stringify(updatedProducts));
        }
    });

export const productsApi = {
    getOrders,
    getProducts,
    deleteOrderById,
};
