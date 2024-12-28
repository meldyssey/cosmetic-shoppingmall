import React from 'react';
import styles from '../../../scss/product/subPageTop.module.scss';

const BodyCream = () => {
    return (
        <div className={styles.subPageTop}>
            <div>
                <div className={styles.title}>바디 크림</div>
                <div className={styles.content}>
                    <p>피부에 수분과 영양을 공급하는 동시에 시그니처 향을 온 몸 가득히 남깁니다</p>
                </div>
            </div>
        </div>
    );
};

export default BodyCream;
