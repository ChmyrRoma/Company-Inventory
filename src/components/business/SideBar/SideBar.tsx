import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './sideBar.module.scss';

interface ILinks {
    id: number;
    title: string;
    link: string;
}

const links: ILinks[] = [
    { id: 1, title: 'orders', link: '/' },
    { id: 3, title: 'products', link: '/products' },
];

const SideBar = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.sideBar}>
            <div className={styles.sideBar__container}>
                <div className={styles.sideBar__avatarContainer}>
                    <div className={styles.sideBar__avatarContainer_avatar} />
                    <div className={styles.sideBar__avatarContainer_settings}>
                        <FontAwesomeIcon icon={faGear} />
                    </div>
                </div>
                <div className={styles.sideBar__links}>
                    {links.map((el: ILinks) => (
                        <NavLink
                            to={el.link}
                            key={el.id}
                            className={({ isActive }) =>
                                `${styles.sideBar__links_link} ${isActive ? styles.sideBar__links_linkActive : ''}`
                            }
                        >
                            {t(el.title).toUpperCase()}
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SideBar;
