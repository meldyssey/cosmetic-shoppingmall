import React from 'react';
import styles from '../../scss/product/subPageTop.module.scss';

const Woody = () => {
    return (
        <div className={styles.subPageTop}>
            <div>
                <div className={styles.title}>우디</div>
                <div className={styles.content}>
                    <p>
                        우디향은 관능적이면서도 풍부한 향으로, 변치않는 우아함과 지금 이 순간에 몰입하는 듯한 느낌을
                        선사합니다.
                    </p>
                    <p>
                        따뜻하고 크리미한 나무향부터 가볍고 스모키한 노트까지, 아늑한 편안함과 매력적인 에너지로 공간을
                        채워보세요.
                    </p>
                    <img src="/imgs/product/cologne_woody.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Woody;
