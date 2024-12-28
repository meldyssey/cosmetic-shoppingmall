import React from 'react';
import styles from '../../scss/product/subPageTop.module.scss';

const Floral = () => {
    return (
        <div className={styles.subPageTop}>
            <div>
                <div className={styles.title}>플로랄</div>
                <div className={styles.content}>
                    <p>
                        풍성한 플로랄 향은 화려함의 정수를 표현합니다. 때로는 부드럽고 때로는 반짝 빛나는 느낌을
                        선사합니다.
                    </p>
                    <p>
                        다채로움을 지닌 꽃부터 강렬한 화이트로 만발한 꽃까지, 다양한 팔레트를 선사하는 플로랄 향으로
                        공간에 행복감을 더해보세요.
                    </p>
                    <img src="/imgs/product/cologne_floral.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Floral;
