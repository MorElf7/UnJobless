import React from 'react';
import styles from '../styles/CategoryList.module.scss';
import "boxicons/css/boxicons.min.css";

function CategoryList() {
    return (
        <div className={styles.cardList}>
            <a href="#" className={`${styles.cardItem} ${styles.applied}`}>
                <div className={styles.counter}>300</div>
                <div className={styles.text}>Applied jobs</div>
                <div className={styles.icon}>
                    <i className="bx bxs-briefcase"></i>
                </div>
            </a>
            <a href="#" className={`${styles.cardItem} ${styles.alert}`}>
                <div className={styles.counter}>300</div>
                <div className={styles.text}>Alert jobs</div>
                <div className={styles.icon}>
                    <i className="bx bxs-bookmark"></i>
                </div>
            </a>
            <a href="#" className={`${styles.cardItem} ${styles.rejected}`}>
                <div className={styles.counter}>300</div>
                <div className={styles.text}>Rejected jobs</div>
                <div className={styles.icon}>
                    <i className="bx bxs-error-circle"></i>
                </div>
            </a>
        </div>
    );
}

export default CategoryList;