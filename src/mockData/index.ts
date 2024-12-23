import { IOrder, IProduct } from '../types';

const orders: IOrder[] = [
    {
        id: 1,
        title: 'Order 1',
        date: '2017-06-29 12:09:33',
        description: 'desc',
        get products() {
            return products.filter((product) => product.orderId === this.id);
        },
    },
    {
        id: 2,
        title: 'Order 2',
        date: '2017-06-29 12:09:33',
        description: 'desc',
        get products() {
            return products.filter((product) => product.orderId === this.id);
        },
    },
    {
        id: 3,
        title: 'Order 3',
        date: '2017-06-29 12:09:33',
        description: 'desc',
        get products() {
            return products.filter((product) => product.orderId === this.id);
        },
    },
];

const products: IProduct[] = [
    {
        id: 1,
        serialNumber: 1234,
        isNew: 1,
        photo: 'pathToFile.jpg',
        title: 'Products 1',
        orderId: 1,
        type: 'Computer',
        specification: 'Specification 1',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2017-06-29 12:09:33',
        },
        price: [
            { value: 100, symbol: 'USD', isDefault: 0 },
            { value: 2600, symbol: 'UAH', isDefault: 1 },
        ],
        order: 1,
        date: '2017-06-29 12:09:33',
    },
    {
        id: 2,
        serialNumber: 1234,
        isNew: 1,
        photo: 'pathToFile.jpg',
        title: 'GFORC-35',
        orderId: 2,
        type: 'Monitors',
        specification: 'Specification 1',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2017-06-29 12:09:33',
        },
        price: [
            { value: 100, symbol: 'USD', isDefault: 0 },
            { value: 2600, symbol: 'UAH', isDefault: 1 },
        ],
        order: 2,
        date: '2017-06-29 12:09:33',
    },
    {
        id: 3,
        serialNumber: 1234,
        isNew: 1,
        photo: 'pathToFile.jpg',
        title: 'Armagedon',
        orderId: 2,
        type: 'Monitors',
        specification: 'Specification 1',
        guarantee: {
            start: '2017-06-29 12:09:33',
            end: '2017-06-29 12:09:33',
        },
        price: [
            { value: 100, symbol: 'USD', isDefault: 0 },
            { value: 2600, symbol: 'UAH', isDefault: 1 },
        ],
        order: 3,
        date: '2017-06-29 12:09:33',
    },
];

export const mockData = { orders, products };
