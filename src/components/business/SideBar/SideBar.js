import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './sideBar.module.scss';
const links = [
    { id: 1, title: 'orders', link: '/' },
    { id: 3, title: 'products', link: '/products' },
];
const SideBar = () => {
    const { t } = useTranslation();
    return (_jsx("div", { className: styles.sideBar, children: _jsxs("div", { className: styles.sideBar__container, children: [_jsxs("div", { className: styles.sideBar__avatarContainer, children: [_jsx("div", { className: styles.sideBar__avatarContainer_avatar }), _jsx("div", { className: styles.sideBar__avatarContainer_settings, children: _jsx(FontAwesomeIcon, { icon: faGear }) })] }), _jsx("div", { className: styles.sideBar__links, children: links.map((el) => (_jsx(NavLink, { to: el.link, className: ({ isActive }) => `${styles.sideBar__links_link} ${isActive ? styles.sideBar__links_linkActive : ''}`, children: t(el.title).toUpperCase() }, el.id))) })] }) }));
};
export default SideBar;
