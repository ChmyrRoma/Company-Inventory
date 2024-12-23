import { Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import Monitor from '../../../assets/inventory _monitor.png';
import { IProduct } from '../../../types';
import { formatDate } from '../../../utils/fotmatDate';
import { getLanguage } from '../../../utils/getLanguage';

import styles from './products.module.scss';

interface IProductCard {
    data: IProduct;
    orderTitle: string;
}

const Products = ({ data, orderTitle }: IProductCard) => {
    const { t } = useTranslation();

    const language = getLanguage();

    return (
        <Link to={`/products/${data.id}`} className={styles.productCardLink}>
            <Stack direction="horizontal" gap={12} className={styles.productCard}>
                <div className={styles.productCard__status} />
                <div className={`${styles.productCard__logoContainer} p-4`}>
                    <img src={Monitor} alt="logo" className={styles.productCard__logoContainer_logo} />
                </div>
                <div className={`${styles.productCard__infoBlock} p-5`}>
                    <div className={styles.productCard__infoContainer}>
                        <span className={styles.productCard__infoContainer_title}>{data.title}</span>
                        <span className={styles.productCard__infoContainer_description}>{data.type}</span>
                    </div>
                </div>
                <div className={`${styles.productCard__container}`}>
                    <div className={styles.productCard__container_block}>
                        <span className={styles.productCard__container_text}>{t('dateFrom')}</span>
                        {formatDate(data.guarantee.start)}
                    </div>
                    <div className={styles.productCard__container_block}>
                        <span className={styles.productCard__container_text}>{t('dateTo')}</span>
                        {formatDate(data.guarantee.end)}
                    </div>
                </div>
                <div className={`${styles.productCard__container} ms-auto`}>
                    {data.price.map((el, index) => (
                        <span
                            key={index}
                            className={el.symbol === 'USD' ? styles.productCard__container_textColor : ''}
                        >
                            {el.value} {el.symbol === 'USD' ? '$' : 'UAH'}
                        </span>
                    ))}
                </div>
                <div className={`${styles.productCard__titleContainer} ms-auto`}>
                    <div className={styles.productCard__titleContainer_title}>{orderTitle}</div>
                </div>
                <div className={`${styles.productCard__container} ms-auto`}>
                    <span>{formatDate(data.date, 'shortMonth', language)}</span>
                </div>
            </Stack>
        </Link>
    );
};

export default Products;
