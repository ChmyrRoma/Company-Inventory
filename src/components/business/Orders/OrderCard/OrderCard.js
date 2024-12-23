import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Monitor from '../../../../assets/inventory _monitor.png';
import { formatDate } from '../../../../utils/fotmatDate';
import styles from './orderCard.module.scss';
const OrderCard = ({ data, handleClose }) => {
    const { t } = useTranslation();
    return (_jsxs("div", { className: styles.orderCard, children: [_jsx("div", { onClick: handleClose, className: styles.orderCard__closeIcon, children: _jsx(FontAwesomeIcon, { icon: faXmark }) }), _jsx("div", { className: styles.orderCard__title, children: data.title }), data.products.map((el) => (_jsxs(Stack, { direction: "horizontal", gap: 2, className: styles.orderCard__container, children: [_jsxs(Stack, { direction: "horizontal", gap: 2, children: [_jsx("div", { className: styles.orderCard__status }), _jsx("div", { className: `${styles.orderCard__logoContainer} ms-auto`, children: _jsx("img", { src: Monitor, alt: "logo", className: styles.orderCard__logoContainer_logo }) })] }), _jsxs(Stack, { direction: "horizontal", gap: 3, className: styles.orderCard__product, children: [_jsxs("div", { className: `${styles.orderCard__infoContainer} ms-auto`, children: [_jsx("span", { className: styles.orderCard__infoContainer_title, children: el.title }), _jsx("span", { className: styles.orderCard__infoContainer_description, children: el.type })] }), _jsxs("div", { className: `${styles.orderCard__content} ms-auto`, children: [_jsxs("div", { className: styles.orderCard__content_block, children: [_jsx("span", { className: styles.orderCard__date_text, children: t('dateFrom') }), formatDate(el.guarantee.start)] }), _jsxs("div", { className: styles.orderCard__content_block, children: [_jsx("span", { className: styles.orderCard__date_text, children: t('dateTo') }), formatDate(el.guarantee.end)] })] }), _jsx("div", { className: `${styles.orderCard__content} ms-auto`, children: el.price.map((el, index) => (_jsxs("span", { className: el.symbol === 'USD' ? styles.orderCard__content_textColor : '', children: [el.value, " ", el.symbol === 'USD' ? '$' : 'UAH'] }, index))) })] })] }, el.id)))] }));
};
export default OrderCard;
