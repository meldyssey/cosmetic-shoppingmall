import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../scss/product/homeTop.module.scss';

const ColognesHomeTop = () => {
    return (
        <div className={styles.homeTop}>
            <div className={styles.breadCrum}>
                <Link to="/">홈</Link>
                <span> &gt; </span>
                <Link to="/colognes">코롱</Link>
            </div>
            <div>
                <div className={styles.title}>코롱</div>
                <div className={styles.content}>
                    <p>
                        조 말론 런던의 심플하면서도 우아한 코롱은 엄선된 원료를 바탕으로 서로 다른 코롱과 함께 페어링 할
                        수 있도록 디자인되었습니다.
                    </p>
                    <p>나만을 위한, 가장 잘 어울리는 향을 완성해 보세요.</p>
                </div>
                <img src="/imgs/product/cologne_total.jpg" alt="" />
            </div>
        </div>
    );
};

export default ColognesHomeTop;
