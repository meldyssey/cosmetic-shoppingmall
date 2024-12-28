import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../scss/product/homeTop.module.scss';

const HomeScentsHomeTop = () => {
    return (
        <div className={styles.homeTop}>
            <div className={styles.breadCrum}>
                <Link to="/">홈</Link>
                <span> &gt; </span>
                <Link to="/home-scents">홈 프레그런스</Link>
            </div>
            <div>
                <div className={styles.title}>홈 프레그런스</div>
                <div className={styles.content}>
                    <p>어느 공간이든 그 장소에 맞는 향기로운 이야기를 채워 보세요.</p>
                    <p>분위기를 이끄는 향과 향기로운 추억에 영감을 실어주세요.</p>
                    <p>조 말론 런던이 당신의 공간에 새로운 영감을 불어 넣어줍니다.</p>
                </div>
                <img src="/imgs/product/homescents_total.jpg" alt="" />
            </div>
        </div>
    );
};

export default HomeScentsHomeTop;
