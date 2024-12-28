import React from 'react';
import styles from '../../scss/product/subPageTop.module.scss';

const LightFloral = () => {
    return (
        <div className={styles.subPageTop}>
            <div>
                <div className={styles.title}>라이트 플로랄</div>
                <div className={styles.content}>
                    <p>
                        라이트 플로랄 프레그런스의 이슬같은 촉촉함, 부드러운 꽃잎 그리고 밝게 빛나는 듯한 노트는
                        섬세함의 정수를 표현합니다.
                    </p>
                    <p>
                        세계에서 가장 매혹적인 꽃들에서 영감을 받은 라이트 플로랄 향은 모던한 느낌이 가미되어 화려한
                        반전 매력을 선사합니다.
                    </p>
                    <p>분위기를 환하게 밝혀주는 다채로운 향기로 공간을 꾸며보세요.</p>
                    <img src="/imgs/product/cologne_light_floral.jpg" alt="" />
                </div>
            </div>
        </div>
    );
};

export default LightFloral;
