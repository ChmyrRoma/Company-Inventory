import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './pageNotFound.module.scss';
const PageNotFound = () => {
    return (_jsxs("div", { className: styles.page, children: [_jsx("span", { className: styles.page__title, children: "404" }), _jsx("span", { className: styles.page__text, children: "Page Not Found" }), _jsx(Link, { to: "/", className: styles.page__button, children: _jsx(Button, { size: "lg", variant: "outline-secondary", children: "GO TO HOME" }) })] }));
};
export default PageNotFound;
