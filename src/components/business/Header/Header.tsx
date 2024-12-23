import { useEffect, useState } from 'react';
import { Dropdown, Form, Stack } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { faCircleNotch, faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Logo from '../../../assets/inventory.png';
import useDebounce from '../../../hooks/useDebounce/useDebounce';
import { useAppSelector } from '../../../store/hooks';
import { currentDate, formatDate } from '../../../utils/fotmatDate';
import { getLanguage } from '../../../utils/getLanguage';

import LanguageSwitch from './LanguageSwitch/LanguageSwitch';

import styles from './header.module.scss';

interface IProduct {
    id: string;
    title: string;
}

interface ICurrentDateTime {
    currentData: string;
    currentTime: string;
}

const Header = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const { currentData, currentTime }: ICurrentDateTime = currentDate();
    const { data } = useAppSelector((state) => state.products) as unknown as { data: IProduct[] };

    const language = getLanguage();

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const searchDebounce = useDebounce(searchTerm, 1000);

    useEffect(() => {
        const fetchFilteredProducts = async () => {
            if (searchDebounce) {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 300));

                const filtered = data.filter((product) =>
                    product.title.toLowerCase().includes(searchDebounce.toLowerCase())
                );
                setFilteredProducts(filtered);
            } else {
                setFilteredProducts([]);
            }
            setIsLoading(false);
        };

        fetchFilteredProducts();
    }, [searchDebounce, data]);

    const handleFocus = () => setShowDropdown(true);
    const handleBlur = () => setTimeout(() => setShowDropdown(false), 200);

    const handleProductClick = (id: string) => {
        setShowDropdown(false);
        setSearchTerm('');
        navigate(`/products/${id}`);
    };

    return (
        <div className={styles.header}>
            <Stack direction="horizontal" gap={3} className={styles.header__container}>
                <Stack direction="horizontal" gap={2} className={styles.header__logoAndSearch}>
                    <div className={styles.header__logoAndSearch_block}>
                        <img src={Logo} alt="logo" className={styles.header__logoAndSearch_logo} />
                        <span className={styles.header__logoAndSearch_text}>INVENTORY</span>
                    </div>
                    <div className={styles.header__content}>
                        <div className={styles.header__search}>
                            <Form.Control
                                type="text"
                                placeholder={t('search')}
                                className={styles.header__logoAndSearch_search}
                                value={searchTerm}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                data-testid="search-menu"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {isLoading && (
                                <div className={styles.header__search_icon} role="status">
                                    <FontAwesomeIcon icon={faCircleNotch} spin />
                                </div>
                            )}
                        </div>
                        {searchTerm && (
                            <Dropdown.Menu
                                show={showDropdown}
                                className={styles.header__dropdownMenu}
                                data-testid="dropdown-menu"
                            >
                                {filteredProducts.length > 0 ? (
                                    filteredProducts.map((product) => (
                                        <Dropdown.Item
                                            key={product.id}
                                            onClick={() => handleProductClick(product.id)}
                                            data-testid={`dropdown-menu-products-${product.id}`}
                                        >
                                            {product.title}
                                        </Dropdown.Item>
                                    ))
                                ) : (
                                    <Dropdown.Item className={styles.header__dropdownMenu_noResults}>
                                        {t('ordersMessage')}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        )}
                    </div>
                </Stack>
                <div className="p-2 ms-auto">
                    <div className={styles.header__timeDisplay_date}>
                        {formatDate(currentData, 'dayAndMonth', language)}
                        <div className={styles.header__timeDisplay_time}>
                            <FontAwesomeIcon icon={faClock} className={styles.header__timeDisplay_icon} />
                            <span>{currentTime}</span>
                        </div>
                    </div>
                </div>
                <LanguageSwitch />
            </Stack>
        </div>
    );
};

export default Header;
