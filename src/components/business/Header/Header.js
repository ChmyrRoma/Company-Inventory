import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
const Header = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { currentData, currentTime } = currentDate();
    const { data } = useAppSelector((state) => state.products);
    const language = getLanguage();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchDebounce = useDebounce(searchTerm, 1000);
    useEffect(() => {
        const fetchFilteredProducts = async () => {
            if (searchDebounce) {
                setIsLoading(true);
                await new Promise((resolve) => setTimeout(resolve, 300));
                const filtered = data.filter((product) => product.title.toLowerCase().includes(searchDebounce.toLowerCase()));
                setFilteredProducts(filtered);
            }
            else {
                setFilteredProducts([]);
            }
            setIsLoading(false);
        };
        fetchFilteredProducts();
    }, [searchDebounce, data]);
    const handleFocus = () => setShowDropdown(true);
    const handleBlur = () => setTimeout(() => setShowDropdown(false), 200);
    const handleProductClick = (id) => {
        setShowDropdown(false);
        setSearchTerm('');
        navigate(`/products/${id}`);
    };
    return (_jsx("div", { className: styles.header, children: _jsxs(Stack, { direction: "horizontal", gap: 3, className: styles.header__container, children: [_jsxs(Stack, { direction: "horizontal", gap: 2, className: styles.header__logoAndSearch, children: [_jsxs("div", { className: styles.header__logoAndSearch_block, children: [_jsx("img", { src: Logo, alt: "logo", className: styles.header__logoAndSearch_logo }), _jsx("span", { className: styles.header__logoAndSearch_text, children: "INVENTORY" })] }), _jsxs("div", { className: styles.header__content, children: [_jsxs("div", { className: styles.header__search, children: [_jsx(Form.Control, { type: "text", placeholder: t('search'), className: styles.header__logoAndSearch_search, value: searchTerm, onFocus: handleFocus, onBlur: handleBlur, "data-testid": "search-menu", onChange: (e) => setSearchTerm(e.target.value) }), isLoading && (_jsx("div", { className: styles.header__search_icon, role: "status", children: _jsx(FontAwesomeIcon, { icon: faCircleNotch, spin: true }) }))] }), searchTerm && (_jsx(Dropdown.Menu, { show: showDropdown, className: styles.header__dropdownMenu, "data-testid": "dropdown-menu", children: filteredProducts.length > 0 ? (filteredProducts.map((product) => (_jsx(Dropdown.Item, { onClick: () => handleProductClick(product.id), "data-testid": `dropdown-menu-products-${product.id}`, children: product.title }, product.id)))) : (_jsx(Dropdown.Item, { className: styles.header__dropdownMenu_noResults, children: t('ordersMessage') })) }))] })] }), _jsx("div", { className: "p-2 ms-auto", children: _jsxs("div", { className: styles.header__timeDisplay_date, children: [formatDate(currentData, 'dayAndMonth', language), _jsxs("div", { className: styles.header__timeDisplay_time, children: [_jsx(FontAwesomeIcon, { icon: faClock, className: styles.header__timeDisplay_icon }), _jsx("span", { children: currentTime })] })] }) }), _jsx(LanguageSwitch, {})] }) }));
};
export default Header;
