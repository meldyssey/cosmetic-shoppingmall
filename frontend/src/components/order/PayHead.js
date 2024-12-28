import React from 'react';
import styles from '../../scss/order/payHead.module.scss';

function PayHead({ activeStep }) {
    return (
        <div className={styles.stepContainer}>
            {/* 주문서 작성 */}
            <div className={`${styles.step} ${activeStep === 0 ? styles.stepActive : ''}`}>
                <div className={styles.circle}></div>
                <div className={styles.label}>주문서 작성</div>
            </div>

            {/* 주문 검토 */}
            <div className={`${styles.step} ${activeStep === 1 ? styles.stepActive : ''}`}>
                <div className={styles.circle}></div>
                <div className={styles.label}>주문 검토</div>
            </div>

            {/* 결제 */}
            <div className={`${styles.step} ${activeStep === 2 ? styles.stepActive : ''}`}>
                <div className={styles.circle}></div>
                <div className={styles.label}>결제</div>
            </div>

            {/* 주문 최종 확인 */}
            <div className={`${styles.step} ${activeStep === 3 ? styles.stepActive : ''}`}>
                <div className={styles.circle}></div>
                <div className={styles.label}>주문 최종 확인</div>
            </div>
        </div>
    );
}

export default PayHead;
