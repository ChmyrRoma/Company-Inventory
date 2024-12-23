import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import i18next from 'i18next';
import styles from './languageSwitch.module.scss';
const LanguageSwitch = () => {
    const [currentLanguage, setCurrentLanguage] = useState(i18next.language);
    const handleLanguageChange = (language) => {
        i18next.changeLanguage(language);
        setCurrentLanguage(language);
        localStorage.setItem('language', language);
    };
    return (_jsx("div", { className: styles.lngsSwitch, children: _jsxs(DropdownButton, { id: "dropdown-menu-align-end", align: "end", title: currentLanguage || '', variant: "outline-secondary", children: [_jsx(Dropdown.Item, { eventKey: "EN", onClick: () => handleLanguageChange('EN'), children: "EN" }), _jsx(Dropdown.Item, { eventKey: "UA", onClick: () => handleLanguageChange('UA'), children: "UA" }), _jsx(Dropdown.Item, { eventKey: "RU", onClick: () => handleLanguageChange('RU'), children: "RU" })] }) }));
};
export default LanguageSwitch;
