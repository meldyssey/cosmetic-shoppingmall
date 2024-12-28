import React from 'react';
import styles from '../../../scss/service/story/Story.module.scss';
import { Link } from 'react-router-dom';

const StoryMain = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.sttitle}>친절함의 문화</div>
            <p className={styles.pp}>
                우리는 환경을 보호하고 지역사회의 안녕을 위해 책임을 져야 한다는 것을 알고 있습니다.
                <br /> 이를 위해 친절함은 우리가 하는 모든 일의 초석이 됩니다.
            </p>

            <div className={styles.imgwrapper}>
                <div className={styles.iwrapper}>
                    <img src="/imgs/service/mainstory_1.avif" alt="" />
                    <p className={styles.stitle}>우리의 자선활동 미션</p>
                    <p className={styles.ppp}>
                        우리는 편견과 낙인에 맞서는 정신건강 관련 프로젝트 그리고 영감을 주는 자선단체들을 지원하기 위해
                        최선을 다하고 있습니다.
                    </p>
                    <Link to="/chartiymission" className={styles.more}>
                        더 보기
                    </Link>
                </div>
                <div className={styles.iwrapper}>
                    <img src="/imgs/service/mainstory_2.avif" alt="" />
                    <p className={styles.stitle}>지속가능성을 위한 우리의 활동</p>
                    <p className={styles.ppp}>
                        자연은 영원히 조 말론 런던의 뮤즈로서, 보다 지속가능한 미래를 향해 나아가면서 환경 보호에 있어
                        의미있는 역할을 하고자 합니다.
                    </p>
                    <Link to="/sustainable" className={styles.more}>
                        더 보기
                    </Link>
                </div>
            </div>

            <div>
                <img src="/imgs/service/mainstory_3.avif" alt="" className={styles.wideimg} />
                <p className={styles.stitle}>우리의 사람 & 우리의 일터</p>
                <p className={styles.pppp}>
                    인재를 육성하고 팀의 안녕을 제고하는 것은 매우 중요한 일입니다. 포용성이 인정되며 누구나 환영받을 수
                    있는 일터를 만들기 위해 최선을 다하고 있습니다.
                </p>
                <Link to="/peopleworkplace" className={styles.mmore}>
                    더 보기
                </Link>
            </div>
        </div>
    );
};

export default StoryMain;
