import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Monitor from '../../../assets/inventory _monitor.png';
import { formatDate } from '../../../utils/fotmatDate';
import { getLanguage } from '../../../utils/getLanguage';
import styles from './products.module.scss';
const Products = ({ data, orderTitle }) => {
    const { t } = useTranslation();
    const language = getLanguage();
    return (_jsx(Link, { to: `/products/${data.id}`, className: styles.productCardLink, children: _jsxs(Stack, { direction: "horizontal", gap: 12, className: styles.productCard, children: [_jsx("div", { className: styles.productCard__status }), _jsx("div", { className: `${styles.productCard__logoContainer} p-4`, children: _jsx("img", { src: Monitor, alt: "logo", className: styles.productCard__logoContainer_logo }) }), _jsx("div", { className: `${styles.productCard__infoBlock} p-5`, children: _jsxs("div", { className: styles.productCard__infoContainer, children: [_jsx("span", { className: styles.productCard__infoContainer_title, children: data.title }), _jsx("span", { className: styles.productCard__infoContainer_description, children: data.type })] }) }), _jsxs("div", { className: `${styles.productCard__container}`, children: [_jsxs("div", { className: styles.productCard__container_block, children: [_jsx("span", { className: styles.productCard__container_text, children: t('dateFrom') }), formatDate(data.guarantee.start)] }), _jsxs("div", { className: styles.productCard__container_block, children: [_jsx("span", { className: styles.productCard__container_text, children: t('dateTo') }), formatDate(data.guarantee.end)] })] }), _jsx("div", { className: `${styles.productCard__container} ms-auto`, children: data.price.map((el, index) => (_jsxs("span", { className: el.symbol === 'USD' ? styles.productCard__container_textColor : '', children: [el.value, " ", el.symbol === 'USD' ? '$' : 'UAH'] }, index))) }), _jsx("div", { className: `${styles.productCard__titleContainer} ms-auto`, children: _jsx("div", { className: styles.productCard__titleContainer_title, children: orderTitle }) }), _jsx("div", { className: `${styles.productCard__container} ms-auto`, children: _jsx("span", { children: formatDate(data.date, 'shortMonth', language) }) })] }) }));
};
export default Products;
