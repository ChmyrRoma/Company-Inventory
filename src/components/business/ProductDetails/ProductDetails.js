import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18next from 'i18next';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchProducts } from '../../../store/slices';
import { formatDate } from '../../../utils/fotmatDate';
import PriceChart from './PriceChart/PriceChart';
import styles from './productDetails.module.scss';
const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.products);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            await dispatch(fetchProducts());
            setIsLoading(false);
        })();
    }, [dispatch]);
    const product = useMemo(() => {
        return data?.find((product) => product.id === Number(id));
    }, [data, dispatch, id]);
    if (isLoading) {
        return (_jsx("div", { className: styles.productDetails__loader, children: _jsx(FontAwesomeIcon, { icon: faCircleNotch, spin: true, className: styles.productDetails__loader_icon }) }));
    }
    if (!product) {
        navigate('/');
        return null;
    }
    return (_jsxs(Stack, { direction: "horizontal", gap: 3, className: styles.productDetails, children: [_jsx("div", { className: styles.productDetails__chart, children: _jsx(PriceChart, { priceData: product?.price || [] }) }), _jsx("div", { className: styles.productDetails__info, children: _jsxs(Stack, { gap: 3, children: [_jsxs(Stack, { direction: "horizontal", gap: 2, children: [_jsx("h1", { children: product?.title }), _jsx("h5", { className: `${styles.productDetails__type} ms-auto`, children: product?.type })] }), _jsxs(Stack, { gap: 3, children: [_jsxs("div", { className: styles.productDetails__content, children: [t('serialNumber'), ": ", _jsx("b", { children: product?.serialNumber })] }), _jsxs("div", { className: styles.productDetails__content, children: [t('specification'), ": ", _jsx("b", { children: product?.specification })] }), _jsxs("div", { className: `${styles.productDetails__content} ${styles.productDetails__content_flex}`, children: [_jsxs("span", { children: [t('date'), ":"] }), _jsxs(Stack, { direction: "horizontal", gap: 2, children: [_jsxs(Stack, { direction: "horizontal", gap: 2, children: [_jsx("span", { children: t('dateFrom') }), _jsx("b", { children: product?.guarantee.start
                                                                ? formatDate(product.guarantee.start, 'shortMonth', i18next.language.toLowerCase())
                                                                : '' })] }), _jsxs(Stack, { direction: "horizontal", gap: 2, children: [_jsx("span", { children: t('dateTo') }), _jsx("b", { children: product?.guarantee.end
                                                                ? formatDate(product.guarantee.end, 'shortMonth', i18next.language.toLowerCase())
                                                                : '' })] })] })] })] })] }) })] }));
};
export default ProductDetails;
