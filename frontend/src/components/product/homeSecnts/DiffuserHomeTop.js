import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../../../scss/product/homeTop.module.scss';

const DiffuserHomeTop = () => {
    return (
        <div className={styles.homeTop}>
            <div className={styles.breadCrum}>
                <Link to="/">홈</Link>
                <span> &gt; </span>
                <Link to="/home-scents">홈 프레그런스</Link>
                <span> &gt; </span>
                <Link to="/home-scents/diffusers">디퓨저</Link>
            </div>
            <div>
                <div className={styles.title}>럭셔리 리드 디퓨저</div>
                <div className={styles.content}>
                    <p>조 말론 런던의 럭셔리 리드 디퓨저로 공간을 보다 매력적으로 만들어 보세요.</p>
                    <p>
                        절제된 디자인의 룸 디퓨저가 어느 공간이든 분위기를 끌어올려주며 공기를 기분 좋게 환기해줍니다.
                    </p>
                    <p>다양한 프레그런스를 즐길 수 있는 조 말론 런던의 여러 가지 리드 디퓨저를 만나보세요.</p>
                </div>
            </div>
        </div>
    );
};

export default DiffuserHomeTop;
