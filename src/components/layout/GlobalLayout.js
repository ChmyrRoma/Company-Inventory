import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import SideBar from '../business/SideBar/SideBar';
import { HeaderPage } from '../pages/HeaderPage';
import styles from './globalLayout.module.scss';
const GlobalLayout = () => {
    return (_jsxs("div", { children: [_jsx(HeaderPage, {}), _jsxs("div", { className: styles.layout, children: [_jsx(SideBar, {}), _jsx("div", { className: styles.layout__outlet, children: _jsx(Outlet, {}) })] })] }));
};
export default GlobalLayout;
