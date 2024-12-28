import React from 'react';
import styles from '../../../scss/product/prodTotal.module.scss';

const CandleTotal = () => {
    return (
        <div className={styles.prodTotal}>
            <div className={styles.content}>
                <p>캔들의 불빛으로 기쁨을 만끽하세요. </p>
                <p>조 말론 런던의 우아한 캔들은 영국에서 수작업으로 제조되며 향기로움으로 가득합니다.</p>
            </div>
        </div>
    );
};

export default CandleTotal;
