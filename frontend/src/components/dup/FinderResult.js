import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../scss/dup/finderResult.module.scss';

const FinderResult = ({ arr }) => {
    return (
        <div className={styles.scentResult}>
            <div className={styles.name}>{arr.product_name}</div>
            <div className={styles.image}>
                <img src={`/imgs/product/${arr.product_img}`} alt="" />
            </div>
            <div className={styles.content}>
                <div>{arr.product_intro}</div>
            </div>
            <Link to={`/product/${arr.product_opt_id}`}>제품 바로가기</Link>
        </div>
    );
};

export default FinderResult;
