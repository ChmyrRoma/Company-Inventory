import { Outlet } from 'react-router-dom';

import SideBar from '../business/SideBar/SideBar';
import { HeaderPage } from '../pages/HeaderPage';

import styles from './globalLayout.module.scss';

const GlobalLayout = () => {
    return (
        <div>
            <HeaderPage />
            <div className={styles.layout}>
                <SideBar />
                <div className={styles.layout__outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default GlobalLayout;
