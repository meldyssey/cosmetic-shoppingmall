import React from 'react';
import styles from '../../../scss/product/detailUse.module.scss';

const DiffuserUse = () => {
    return (
        <div>
            <div className={styles.useContentWrap}>
                <div className={styles.useContent}>
                    <div className={styles.useTitle}>공간을 향기롭게 하는 방법</div>
                    <div className={styles.useText}>
                        <p>분위기를 이끌며 향기로운 추억을 불러일으키는 향을 찾아보세요.</p>
                        <p>조 말론 런던이 당신의 공간에 새로운 영감을 불어 넣어줍니다.</p>
                    </div>
                </div>
                <div className={styles.useContent}>
                    <video src="/imgs/product/HowTo_Diffuser.mp4" loop={true} muted={true} autoPlay={true} />
                </div>
            </div>
        </div>
    );
};

export default DiffuserUse;
