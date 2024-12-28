import React from 'react';
import styles from '../../../scss/product/subPageTop.module.scss';

const HandCream = () => {
    return (
        <div className={styles.subPageTop}>
            <div>
                <div className={styles.title}>핸드 크림</div>
                <div className={styles.content}>
                    <p>조 말론 런던의 핸드 크림은 가볍고 섬세한 향을 남기며 손을 촉촉하게 가꾸어 줍니다.</p>
                </div>
            </div>
        </div>
    );
};

export default HandCream;
