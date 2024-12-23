import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import i18next from 'i18next';

import styles from './languageSwitch.module.scss';

const LanguageSwitch = () => {
    const [currentLanguage, setCurrentLanguage] = useState<string>(i18next.language);

    const handleLanguageChange = (language: string) => {
        i18next.changeLanguage(language);
        setCurrentLanguage(language);
        localStorage.setItem('language', language);
    };

    return (
        <div className={styles.lngsSwitch}>
            <DropdownButton
                id="dropdown-menu-align-end"
                align="end"
                title={currentLanguage || ''}
                variant="outline-secondary"
            >
                <Dropdown.Item eventKey="EN" onClick={() => handleLanguageChange('EN')}>
                    EN
                </Dropdown.Item>
                <Dropdown.Item eventKey="UA" onClick={() => handleLanguageChange('UA')}>
                    UA
                </Dropdown.Item>
                <Dropdown.Item eventKey="RU" onClick={() => handleLanguageChange('RU')}>
                    RU
                </Dropdown.Item>
            </DropdownButton>
        </div>
    );
};

export default LanguageSwitch;
