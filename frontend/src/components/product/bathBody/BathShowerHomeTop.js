import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../scss/product/homeTop.module.scss';

const BathShowerHomeTop = () => {
    return (
        <div className={styles.homeTop}>
            <div className={styles.breadCrum}>
                <Link to="/">홈</Link>
                <span> &gt; </span>
                <Link to="/bath-body">배스 앤 바디</Link>
                <span> &gt; </span>
                <Link to="/bath-body/bath-shower">배스 앤 샤워</Link>
            </div>
            <div>
                <div className={styles.title}>배스 앤 샤워</div>
                <div className={styles.content}>
                    <p>향기로운 아침 루틴 혹은 기분 좋은 저녁 힐링의 순간을 만들어보세요.</p>
                    <p>시그니처 바디 앤 핸드 워시로 오감을 깨워보세요.</p>
                    <p>
                        럭셔리한 샤워오일로 풍성하고 향기로운 거품을 만끽하고, 익스폴리에이팅 샤워 젤로 부드럽게 가꾸며
                        활력을 되찾아보세요.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BathShowerHomeTop;
