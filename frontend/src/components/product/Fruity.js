import React from 'react';
import styles from '../../scss/product/subPageTop.module.scss';

const Fruity = () => {
    return (
        <div className={styles.subPageTop}>
            <div>
                <div className={styles.title}>프루티</div>
                <div className={styles.content}>
                    <p>감미로운 프루티 향은, 군침이 돌게하는 과즙과 매력이 넘치는 달콤함을 가득 선사합니다.</p>
                    <p>역동적이면서도 산뜻함이 프루티 향의 매력이죠.</p>
                    <p>과즙과 천진난만한 장난기가 더해진 감미로운 향으로 공간을 취향에 맞추어 꾸며보세요.</p>
                    <img src="/imgs/product/cologne_fruity.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Fruity;
