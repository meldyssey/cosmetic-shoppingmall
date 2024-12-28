import React from 'react';
import styles from '../../../scss/product/detailUse.module.scss';

const ColognesUse = () => {
    return (
        <div>
            <div className={styles.useContentWrap}>
                <div className={styles.useContent}>
                    <div className={styles.useTitle}>코롱 사용법</div>
                    <div className={styles.useText}>
                        <p>코롱에 관한 다양한 에티켓을 살펴보고 프레그런스 전문가처럼 향을 입는 방법을 알아보세요.</p>
                        <p>손목, 귀 뒤 등 맥박이 뛰는 곳에 뿌려줍니다. </p>
                        <p>
                            단독으로 사용하거나 다른 제품과 함께 컴바이닝할 수 있으며 같은 라인의 바디 제품과 사용할 수
                            있습니다.
                        </p>
                    </div>
                </div>
                <div className={styles.useContent}>
                    <video src="/imgs/product/HowTo_Cologne.mp4" loop={true} muted={true} autoPlay={true} />
                </div>
            </div>
        </div>
    );
};

export default ColognesUse;
