import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Monitor from '../../../../assets/inventory _monitor.png';
import { useAppDispatch } from '../../../../store/hooks';
import { deleteOrders, fetchOrders } from '../../../../store/slices';
import styles from './customModal.module.scss';
export const CustomModal = ({ title, type, id, isOpen, handleClose, isProductNone }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const handleDelete = async () => {
        await dispatch(deleteOrders(id));
        dispatch(fetchOrders());
        handleClose();
    };
    return (_jsxs(Modal, { show: isOpen, onHide: handleClose, centered: true, children: [_jsx(Modal.Header, { closeButton: true, children: _jsx(Modal.Title, { children: t('deleteOrderText') }) }), !isProductNone ? (_jsxs(Modal.Body, { className: styles.customModal, children: [_jsxs(Form.Group, { className: styles.customModal__icon, children: [_jsx("div", { className: styles.customModal__status }), _jsx("div", { className: `${styles.customModal__logoContainer} ms-auto`, children: _jsx("img", { src: Monitor, alt: "logo", className: styles.customModal__logoContainer_logo }) })] }), _jsxs(Form.Group, { className: styles.customModal__infoContainer, children: [_jsx("span", { className: styles.customModal__infoContainer_title, children: title }), _jsx("span", { className: styles.customModal__infoContainer_description, children: type })] })] })) : (_jsx(Modal.Body, { children: t('ordersMessage') })), _jsxs(Modal.Footer, { children: [_jsx(Button, { variant: "outline-secondary", onClick: handleClose, children: t('cancel') }), _jsx(Button, { variant: "outline-danger", onClick: handleDelete, children: t('remove') })] })] }));
};
