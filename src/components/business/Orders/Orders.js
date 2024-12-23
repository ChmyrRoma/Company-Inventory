import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { faAngleRight, faListUl } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18next from 'i18next';
import Stock from '../../../assets/stock-out.svg';
import { formatDate } from '../../../utils/fotmatDate';
import { getProductDeclension } from '../../../utils/getProductDeclension';
import { CustomModal } from './CustomModal/CustomModal';
import styles from './orders.module.scss';
const Orders = ({ data, id, isOrderOpen, setIsOrderOpen, setId }) => {
    const [isOpened, setIsOpened] = useState(false);
    const handleOpen = () => setIsOpened(true);
    const handleClose = () => setIsOpened(false);
    const handleChange = () => {
        if (!isOrderOpen) {
            setIsOrderOpen(true);
        }
    };
    const total = useMemo(() => {
        return data.products.reduce((totals, product) => {
            product.price.forEach((price) => {
                if (price.symbol === 'USD') {
                    totals.totalUSD += price.value;
                }
                else if (price.symbol === 'UAH') {
                    totals.totalUAH += price.value;
                }
            });
            return totals;
        }, { totalUSD: 0, totalUAH: 0 });
    }, [data.products]);
    return (_jsxs(Stack, { direction: "horizontal", gap: 2, className: `${styles.orders} ${isOrderOpen && styles.orders__collapsed}`, onClick: () => setId(data.id), children: [_jsxs(Stack, { className: `${!isOrderOpen && styles.orders__orderContainer}`, direction: "horizontal", gap: isOrderOpen ? 2 : 4, onClick: handleChange, children: [!isOrderOpen && (_jsx("div", { className: styles.orders__titleContainer, children: _jsx("div", { className: styles.orders__titleContainer_title, children: data.title }) })), data.products.length ? (_jsxs(Stack, { direction: "horizontal", gap: 2, className: `${styles.orders__content} ${isOrderOpen ? 'p-2' : 'ms-auto'}`, children: [_jsx("div", { className: styles.orders__list, children: _jsx(FontAwesomeIcon, { icon: faListUl, className: styles.orders__list_icon }) }), _jsxs("div", { className: styles.orders__productsSummary, children: [_jsx("div", { className: styles.orders__productsSummary_summary, children: data.products.length }), _jsx("div", { className: styles.orders__productsSummary_text, children: getProductDeclension(data.products.length, i18next.language?.toLowerCase()) })] })] })) : (_jsx("div", { className: `${styles.orders__content} text-center ms-auto`, children: _jsx("img", { src: Stock, alt: "no-icon", className: styles.orders__content_icon }) })), _jsxs("div", { className: `${styles.orders__date} ${!isOrderOpen && 'ms-auto'}`, children: [_jsx("div", { className: styles.orders__date_text, children: formatDate(data.date, 'dayAndMonthOnly') }), formatDate(data.date, 'shortMonth', i18next.language?.toLowerCase())] }), !isOrderOpen && (_jsx("div", { className: `${styles.orders__container} ms-auto`, children: data.products.length ? (_jsxs(_Fragment, { children: [_jsxs("span", { className: styles.orders__container_textColor, children: [total.totalUSD, " $"] }), _jsxs("span", { children: [total.totalUAH, " UAH"] })] })) : null }))] }), !isOrderOpen && (_jsxs(_Fragment, { children: [_jsx("div", { className: `ms-auto ${styles.orders__deleteContainer}`, onClick: handleOpen, children: _jsx(FontAwesomeIcon, { icon: faTrash }) }), data.products.length ? (data.products.map((el) => (_jsx(CustomModal, { title: el.title, id: data.id, type: el.type, isOpen: isOpened, handleClose: handleClose }, el.id)))) : (_jsx(CustomModal, { isOpen: isOpened, id: data.id, handleClose: handleClose, isProductNone: true }))] })), isOrderOpen && data.id === id && (_jsx("div", { className: `${styles.orders__selectOrder} ms-auto`, children: _jsx(FontAwesomeIcon, { icon: faAngleRight, className: styles.orders__selectOrder_icon }) }))] }));
};
export default Orders;
