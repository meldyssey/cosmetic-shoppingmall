import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../scss/product/homeTop.module.scss';

const CandleHomeTop = () => {
    return (
        <div className={styles.homeTop}>
            <div className={styles.breadCrum}>
                <Link to="/">홈</Link>
                <span> &gt; </span>
                <Link to="/home-scents">홈 프레그런스</Link>
                <span> &gt; </span>
                <Link to="/home-scents/candles">캔들</Link>
            </div>
            <div>
                <div className={styles.title}>캔들</div>
                <div className={styles.content}>
                    <p>영국에서 수작업으로 만들어지는 조 말론 런던의 캔들은 16명의 장인의 손을 거쳐 완성됩니다.</p>
                    <p>
                        가장 선호하는 향으로 트래블, 홈 캔들, 디럭스 및 럭셔리 캔들을 믹스 매치하여 오감을 만족시켜
                        보세요.
                    </p>
                </div>
                <img src="/imgs/product/candle_total.jpg" alt="" />
            </div>
        </div>
    );
};

export default CandleHomeTop;
