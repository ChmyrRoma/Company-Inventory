import { mockData } from '../../mockData';
var ERequestKey;
(function (ERequestKey) {
    ERequestKey["ORDERS"] = "orders";
    ERequestKey["PRODUCTS"] = "products";
})(ERequestKey || (ERequestKey = {}));
const { orders, products } = mockData;
export function apiRequest(callback, delay = 300) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(callback());
        }, delay);
    });
}
const initializeData = (key, data) => {
    if (!localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(data));
    }
};
initializeData(ERequestKey.PRODUCTS, products);
initializeData(ERequestKey.ORDERS, orders);
// API functions
const getOrders = () => apiRequest(() => {
    const storedOrders = localStorage.getItem(ERequestKey.ORDERS);
    const orders = storedOrders ? JSON.parse(storedOrders) : [];
    return orders.map((order) => ({
        ...order,
        products: products.filter((product) => product.orderId === order.id),
    }));
});
const getProducts = () => apiRequest(() => {
    const storedProducts = localStorage.getItem(ERequestKey.PRODUCTS);
    return storedProducts ? JSON.parse(storedProducts) : [];
});
const deleteOrderById = (id) => apiRequest(() => {
    const storedOrders = localStorage.getItem(ERequestKey.ORDERS);
    if (storedOrders) {
        const orders = JSON.parse(storedOrders);
        const updatedOrders = orders.filter((order) => order.id !== id);
        localStorage.setItem(ERequestKey.ORDERS, JSON.stringify(updatedOrders));
    }
    const storedProducts = localStorage.getItem(ERequestKey.PRODUCTS);
    if (storedProducts) {
        const products = JSON.parse(storedProducts);
        const updatedProducts = products.filter((product) => product.orderId !== id);
        localStorage.setItem(ERequestKey.PRODUCTS, JSON.stringify(updatedProducts));
    }
});
export const productsApi = {
    getOrders,
    getProducts,
    deleteOrderById,
};
