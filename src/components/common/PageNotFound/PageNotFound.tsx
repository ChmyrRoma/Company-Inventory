import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import styles from './pageNotFound.module.scss';

const PageNotFound = () => {
    return (
        <div className={styles.page}>
            <span className={styles.page__title}>404</span>
            <span className={styles.page__text}>Page Not Found</span>
            <Link to="/" className={styles.page__button}>
                <Button size="lg" variant="outline-secondary">
                    GO TO HOME
                </Button>
            </Link>
        </div>
    );
};

export default PageNotFound;
