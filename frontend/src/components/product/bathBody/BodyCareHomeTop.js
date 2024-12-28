import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../scss/product/homeTop.module.scss';

const BodyCareHomeTop = () => {
    return (
        <div className={styles.homeTop}>
            <div className={styles.breadCrum}>
                <Link to="/">홈</Link>
                <span> &gt; </span>
                <Link to="/bath-body">배스 앤 바디</Link>
                <span> &gt; </span>
                <Link to="/bath-body/body-care">바디 케어</Link>
            </div>
            <div>
                <div className={styles.title}>바디 케어</div>
                <div className={styles.content}>
                    <p>
                        피부를 가꾸고 영양을 공급하는 조 말론 런던의 호화로운 바디 케어 컬렉션으로 피부를 관리하고
                        감각을 충족시켜보세요.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BodyCareHomeTop;
