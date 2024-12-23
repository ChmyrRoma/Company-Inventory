import ProductOrderDetails from '../business/ProductOrderDetails/ProductOrderDetails';

interface IProductOrderDetails {
    type: string;
}

export const ProductOrderDetailsPage = ({ type }: IProductOrderDetails) => {
    return <ProductOrderDetails type={type} />;
};
