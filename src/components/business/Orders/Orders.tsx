import { useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { faAngleRight, faListUl } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18next from 'i18next';

import Stock from '../../../assets/stock-out.svg';
import { IOrder } from '../../../types';
import { formatDate } from '../../../utils/fotmatDate';
import { getProductDeclension } from '../../../utils/getProductDeclension';

import { CustomModal } from './CustomModal/CustomModal';

import styles from './orders.module.scss';

interface IOrders {
    data: IOrder;
    id: number;
    isOrderOpen: boolean;
    setIsOrderOpen: (status: boolean) => void;
    setId: (id: number) => void;
}

const Orders = ({ data, id, isOrderOpen, setIsOrderOpen, setId }: IOrders) => {
    const [isOpened, setIsOpened] = useState<boolean>(false);

    const handleOpen = () => setIsOpened(true);

    const handleClose = () => setIsOpened(false);

    const handleChange = () => {
        if (!isOrderOpen) {
            setIsOrderOpen(true);
        }
    };

    const total = useMemo(() => {
        return data.products.reduce(
            (totals, product) => {
                product.price.forEach((price) => {
                    if (price.symbol === 'USD') {
                        totals.totalUSD += price.value;
                    } else if (price.symbol === 'UAH') {
                        totals.totalUAH += price.value;
                    }
                });
                return totals;
            },
            { totalUSD: 0, totalUAH: 0 }
        );
    }, [data.products]);

    return (
        <Stack
            direction="horizontal"
            gap={2}
            className={`${styles.orders} ${isOrderOpen && styles.orders__collapsed}`}
            onClick={() => setId(data.id)}
        >
            <Stack
                className={`${!isOrderOpen && styles.orders__orderContainer}`}
                direction="horizontal"
                gap={isOrderOpen ? 2 : 4}
                onClick={handleChange}
            >
                {!isOrderOpen && (
                    <div className={styles.orders__titleContainer}>
                        <div className={styles.orders__titleContainer_title}>{data.title}</div>
                    </div>
                )}
                {data.products.length ? (
                    <Stack
                        direction="horizontal"
                        gap={2}
                        className={`${styles.orders__content} ${isOrderOpen ? 'p-2' : 'ms-auto'}`}
                    >
                        <div className={styles.orders__list}>
                            <FontAwesomeIcon icon={faListUl} className={styles.orders__list_icon} />
                        </div>
                        <div className={styles.orders__productsSummary}>
                            <div className={styles.orders__productsSummary_summary}>{data.products.length}</div>
                            <div className={styles.orders__productsSummary_text}>
                                {getProductDeclension(
                                    data.products.length,
                                    i18next.language?.toLowerCase() as 'ua' | 'ru' | 'en'
                                )}
                            </div>
                        </div>
                    </Stack>
                ) : (
                    <div className={`${styles.orders__content} text-center ms-auto`}>
                        <img src={Stock} alt="no-icon" className={styles.orders__content_icon} />
                    </div>
                )}
                <div className={`${styles.orders__date} ${!isOrderOpen && 'ms-auto'}`}>
                    <div className={styles.orders__date_text}>{formatDate(data.date, 'dayAndMonthOnly')}</div>
                    {formatDate(data.date, 'shortMonth', i18next.language?.toLowerCase() as 'ua' | 'ru' | 'en')}
                </div>
                {!isOrderOpen && (
                    <div className={`${styles.orders__container} ms-auto`}>
                        {data.products.length ? (
                            <>
                                <span className={styles.orders__container_textColor}>{total.totalUSD} $</span>
                                <span>{total.totalUAH} UAH</span>
                            </>
                        ) : null}
                    </div>
                )}
            </Stack>
            {!isOrderOpen && (
                <>
                    <div className={`ms-auto ${styles.orders__deleteContainer}`} onClick={handleOpen}>
                        <FontAwesomeIcon icon={faTrash} />
                    </div>
                    {data.products.length ? (
                        data.products.map((el) => (
                            <CustomModal
                                key={el.id}
                                title={el.title}
                                id={data.id}
                                type={el.type}
                                isOpen={isOpened}
                                handleClose={handleClose}
                            />
                        ))
                    ) : (
                        <CustomModal isOpen={isOpened} id={data.id} handleClose={handleClose} isProductNone />
                    )}
                </>
            )}
            {isOrderOpen && data.id === id && (
                <div className={`${styles.orders__selectOrder} ms-auto`}>
                    <FontAwesomeIcon icon={faAngleRight} className={styles.orders__selectOrder_icon} />
                </div>
            )}
        </Stack>
    );
};

export default Orders;
