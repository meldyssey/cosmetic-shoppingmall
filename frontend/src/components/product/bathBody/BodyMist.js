import React from 'react';
import styles from '../../../scss/product/subPageTop.module.scss';

const BodyMist = () => {
    return (
        <div className={styles.subPageTop}>
            <div>
                <div className={styles.title}>바디 미스트</div>
                <div className={styles.content}>
                    <p>
                        가볍게 사용할 수 있는 바디 미스트는 자연 유래 글리세린과 피부를 건강하게 가꾸어 주는 성분이
                        함유된 포뮬러는 쉽게 흡수되며, 피부를 부드럽고 건강하게 가꾸는데 도움을 줍니다.
                    </p>
                </div>
                <img src="/imgs/product/bodymist_total.jpg" alt="" />
            </div>
        </div>
    );
};

export default BodyMist;
