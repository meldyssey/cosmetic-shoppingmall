import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../scss/main/home.module.scss';
import MainSlide from './MainSlide';
import BestSlide from './BestSlide';

function Home(props) {
    const url = '/imgs/main/';

    return (
        <>
            <MainSlide />
            {/* 히노키 */}
            <section className={styles.new}>
                <Link to="/product/45">
                    <div>
                        <img src={`${url}main_new1.avif`} alt="" />
                        <div className={styles.newText}>
                            <p>히노키 앤 시더우드 코롱</p>
                            <span>더 알아보기</span>
                        </div>
                    </div>
                    <img src={`${url}main_new2.avif`} alt="" />
                </Link>
            </section>
            <BestSlide />
            {/* 센트파인더 */}
            <section className={styles.scent}>
                <Link to="/scent-finder">
                    <img src={`${url}scentFinder.avif`} alt="" />
                    <div>
                        <p>센트 파인더</p>
                        <p>조 말론 런던의 도움을 받아 편리하게 나만의 시그니처 향을 찾아보세요.</p>
                        <span>시작하기</span>
                    </div>
                </Link>
            </section>
            <section className={styles.content}>
                <Link to="/colognes">
                    <img src={`${url}main_best.avif`} alt="" />
                    <p>베스트 코롱</p>
                    <span>코롱 전체보기</span>
                </Link>
            </section>
            <section className={styles.content2}>
                <div>
                    <Link to="/home-scents">
                        <img src={`${url}main_content1.jpg`} alt="" />
                        <p>홈 프레그런스</p>
                        <span>제품보기</span>
                    </Link>
                    <Link to="/bath-body">
                        <img src={`${url}main_content2.avif`} alt="" />
                        <p>배스 앤 바디</p>
                        <span>더 알아보기</span>
                    </Link>
                </div>
            </section>
        </>
    );
}

export default Home;
