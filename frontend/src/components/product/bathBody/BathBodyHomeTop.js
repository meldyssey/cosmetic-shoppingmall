import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../scss/product/homeTop.module.scss';

const BathBodyHomeTop = () => {
    return (
        <div className={styles.homeTop}>
            <div className={styles.breadCrum}>
                <Link to="/">홈</Link>
                <span> &gt; </span>
                <Link to="/bath-body">배스 앤 바디</Link>
            </div>
            <div>
                <div className={styles.title}>배스 앤 바디</div>
                <div className={styles.content}>
                    <p>새로운 아침 루틴, 잠들기 전 평온하게 힐링하는 나만의 순간을 만들어보세요.</p>
                    <p>
                        기분을 고조시키는 바디 앤 핸드 워시부터 호화로운 배스 오일까지, 조 말론 런던의 가장 기분 좋은
                        향들을 한번에 만나보세요.
                    </p>
                </div>
                <img src="/imgs/product/bath_body_total.jpg" alt="" />
            </div>
        </div>
    );
};

export default BathBodyHomeTop;
