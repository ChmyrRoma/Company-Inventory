import { useEffect, useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import i18next from 'i18next';

import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { fetchProducts } from '../../../store/slices';
import { IProduct } from '../../../types';
import { formatDate } from '../../../utils/fotmatDate';

import PriceChart from './PriceChart/PriceChart';

import styles from './productDetails.module.scss';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const { data } = useAppSelector((state) => state.products) as unknown as { data: IProduct[] };
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);

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
        return (
            <div className={styles.productDetails__loader}>
                <FontAwesomeIcon icon={faCircleNotch} spin className={styles.productDetails__loader_icon} />
            </div>
        );
    }

    if (!product) {
        navigate('/');
        return null;
    }

    return (
        <Stack direction="horizontal" gap={3} className={styles.productDetails}>
            <div className={styles.productDetails__chart}>
                <PriceChart priceData={product?.price || []} />
            </div>
            <div className={styles.productDetails__info}>
                <Stack gap={3}>
                    <Stack direction="horizontal" gap={2}>
                        <h1>{product?.title}</h1>
                        <h5 className={`${styles.productDetails__type} ms-auto`}>{product?.type}</h5>
                    </Stack>
                    <Stack gap={3}>
                        <div className={styles.productDetails__content}>
                            {t('serialNumber')}: <b>{product?.serialNumber}</b>
                        </div>
                        <div className={styles.productDetails__content}>
                            {t('specification')}: <b>{product?.specification}</b>
                        </div>
                        <div className={`${styles.productDetails__content} ${styles.productDetails__content_flex}`}>
                            <span>{t('date')}:</span>
                            <Stack direction="horizontal" gap={2}>
                                <Stack direction="horizontal" gap={2}>
                                    <span>{t('dateFrom')}</span>
                                    <b>
                                        {product?.guarantee.start
                                            ? formatDate(
                                                  product.guarantee.start,
                                                  'shortMonth',
                                                  i18next.language.toLowerCase() as 'ru' | 'ua' | 'en'
                                              )
                                            : ''}
                                    </b>
                                </Stack>
                                <Stack direction="horizontal" gap={2}>
                                    <span>{t('dateTo')}</span>
                                    <b>
                                        {product?.guarantee.end
                                            ? formatDate(
                                                  product.guarantee.end,
                                                  'shortMonth',
                                                  i18next.language.toLowerCase() as 'ru' | 'ua' | 'en'
                                              )
                                            : ''}
                                    </b>
                                </Stack>
                            </Stack>
                        </div>
                    </Stack>
                </Stack>
            </div>
        </Stack>
    );
};

export default ProductDetails;
