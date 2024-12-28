import React from 'react';
import styles from '../../../scss/product/detailUse.module.scss';

const CandleUse = () => {
    return (
        <div>
            <div className={styles.useContentWrap}>
                <div className={styles.useContent}>
                    <div className={styles.useTitle}>5분 간의 평온한 휴식</div>
                    <div className={styles.useText}>
                        <p>느긋하고 편안한 밤을 위한 비결.</p>
                        <p>그 힌트는 바로 향기로운 캔들입니다.</p>
                    </div>
                </div>
                <div className={styles.useContent}>
                    <video src="/imgs/product/HowTo_Candle.mp4" loop={true} muted={true} autoPlay={true} />
                </div>
            </div>
        </div>
    );
};

export default CandleUse;
