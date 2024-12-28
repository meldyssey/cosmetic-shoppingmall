import React from 'react';
import styles from '../../scss/product/subPageTop.module.scss';

const Citrus = () => {
    return (
        <div className={styles.subPageTop}>
            <div>
                <div className={styles.title}>시트러스</div>
                <div className={styles.content}>
                    <p>상쾌하고 생기있는 에너지를 부여하며 활력을 불러일으키는 향.</p>
                    <p>시트러스 향의 산뜻함과 과즙이 더해져 즉각적으로 생기를 더해줍니다.</p>
                    <img src="/imgs/product/cologne_citrus.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Citrus;
