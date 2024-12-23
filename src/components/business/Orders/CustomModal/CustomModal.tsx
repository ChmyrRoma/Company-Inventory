import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Monitor from '../../../../assets/inventory _monitor.png';
import { useAppDispatch } from '../../../../store/hooks';
import { deleteOrders, fetchOrders } from '../../../../store/slices';

import styles from './customModal.module.scss';

interface ICustomModal {
    title?: string;
    type?: string;
    id: number;
    isOpen: boolean;
    handleClose: () => void;
    isProductNone?: boolean;
}

export const CustomModal = ({ title, type, id, isOpen, handleClose, isProductNone }: ICustomModal) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const handleDelete = async () => {
        await dispatch(deleteOrders(id));
        dispatch(fetchOrders());
        handleClose();
    };

    return (
        <Modal show={isOpen} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{t('deleteOrderText')}</Modal.Title>
            </Modal.Header>
            {!isProductNone ? (
                <Modal.Body className={styles.customModal}>
                    <Form.Group className={styles.customModal__icon}>
                        <div className={styles.customModal__status} />
                        <div className={`${styles.customModal__logoContainer} ms-auto`}>
                            <img src={Monitor} alt="logo" className={styles.customModal__logoContainer_logo} />
                        </div>
                    </Form.Group>
                    <Form.Group className={styles.customModal__infoContainer}>
                        <span className={styles.customModal__infoContainer_title}>{title}</span>
                        <span className={styles.customModal__infoContainer_description}>{type}</span>
                    </Form.Group>
                </Modal.Body>
            ) : (
                <Modal.Body>{t('ordersMessage')}</Modal.Body>
            )}
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                    {t('cancel')}
                </Button>
                <Button variant="outline-danger" onClick={handleDelete}>
                    {t('remove')}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
