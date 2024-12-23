import { Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Monitor from '../../../../assets/inventory _monitor.png';
import { IOrder } from '../../../../types';
import { formatDate } from '../../../../utils/fotmatDate';

import styles from './orderCard.module.scss';

interface IOrderCard {
    data: IOrder;
    handleClose: () => void;
}

const OrderCard = ({ data, handleClose }: IOrderCard) => {
    const { t } = useTranslation();

    return (
        <div className={styles.orderCard}>
            <div onClick={handleClose} className={styles.orderCard__closeIcon}>
                <FontAwesomeIcon icon={faXmark} />
            </div>
            <div className={styles.orderCard__title}>{data.title}</div>
            {data.products.map((el) => (
                <Stack key={el.id} direction="horizontal" gap={2} className={styles.orderCard__container}>
                    <Stack direction="horizontal" gap={2}>
                        <div className={styles.orderCard__status} />
                        <div className={`${styles.orderCard__logoContainer} ms-auto`}>
                            <img src={Monitor} alt="logo" className={styles.orderCard__logoContainer_logo} />
                        </div>
                    </Stack>
                    <Stack direction="horizontal" gap={3} className={styles.orderCard__product}>
                        <div className={`${styles.orderCard__infoContainer} ms-auto`}>
                            <span className={styles.orderCard__infoContainer_title}>{el.title}</span>
                            <span className={styles.orderCard__infoContainer_description}>{el.type}</span>
                        </div>
                        <div className={`${styles.orderCard__content} ms-auto`}>
                            <div className={styles.orderCard__content_block}>
                                <span className={styles.orderCard__date_text}>{t('dateFrom')}</span>
                                {formatDate(el.guarantee.start)}
                            </div>
                            <div className={styles.orderCard__content_block}>
                                <span className={styles.orderCard__date_text}>{t('dateTo')}</span>
                                {formatDate(el.guarantee.end)}
                            </div>
                        </div>
                        <div className={`${styles.orderCard__content} ms-auto`}>
                            {el.price.map((el, index) => (
                                <span
                                    key={index}
                                    className={el.symbol === 'USD' ? styles.orderCard__content_textColor : ''}
                                >
                                    {el.value} {el.symbol === 'USD' ? '$' : 'UAH'}
                                </span>
                            ))}
                        </div>
                    </Stack>
                </Stack>
            ))}
        </div>
    );
};

export default OrderCard;
