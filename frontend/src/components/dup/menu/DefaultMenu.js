import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../scss/dup/nav.module.scss';

function DefaultMenu() {
    const url = '/imgs/main/';

    return (
        <nav>
            <div div className={styles.menuBg}></div>
            <ul className={styles.menu}>
                <li>
                    <Link to="/storymain">브랜드 소개</Link>
                    <ul className={styles.submenu}>
                        <li>
                            <div>
                                <Link to="/storymain">
                                    <img src={`${url}nav01.avif`} alt="" />
                                </Link>
                                <div className={`${styles.subItem} ${styles.bold}`}>
                                    <Link to="/storymain">소개</Link>
                                    <Link to="/all-product">제품전체</Link>
                                    <Link to="/best-seller">베스트셀러</Link>
                                    <Link to="/map">매장안내</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/colognes">코롱</Link>
                    <ul className={styles.submenu}>
                        <li>
                            <Link to="/colognes">
                                <img src={`${url}nav02.avif`} alt="" />
                                <span>센트패밀리</span>
                            </Link>
                            <div className={styles.subItem}>
                                <Link to="/colognes/citrus">시트러스</Link>
                                <Link to="/colognes/fruity">프루티</Link>
                                <Link to="/colognes/light-floral">라이트 플로랄</Link>
                                <Link to="/colognes/floral">플로랄</Link>
                                <Link to="/colognes/woody">우디</Link>
                            </div>
                        </li>
                        <li>
                            <Link to="/colognes/size">
                                <img src={`${url}nav03.avif`} alt="" />
                                <span>사이즈</span>
                            </Link>
                            <div className={styles.subItem}>
                                <Link to="/colognes/size/100ml">100ml</Link>
                                <Link to="/colognes/size/50ml">50ml</Link>
                                <Link to="/colognes/size/30ml">30ml</Link>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/home-scents">홈 프레그런스</Link>
                    <ul className={styles.submenu}>
                        <li>
                            <Link to="/home-scents/candles">
                                <img src={`${url}nav04.avif`} alt="" />
                                <span>캔들</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/home-scents/diffusers">
                                <img src={`${url}nav05.avif`} alt="" />
                                <span>디퓨저</span>
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/bath-body">배스 앤 바디</Link>
                    <ul className={styles.submenu}>
                        <li>
                            <Link to="/bath-body/bath-shower">
                                <img src={`${url}nav06.avif`} alt="" />
                                <span>배스 앤 샤워</span>
                            </Link>
                            <div className={styles.subItem}>
                                <Link to="/bath-body/bath-shower/body-hand-wash">바디 앤 핸드워시</Link>
                                <Link to="/bath-body/bath-shower/shower-gel-oil">샤워 젤 앤 오일</Link>
                                <Link to="/bath-body/bath-shower/bath-oil">배스 오일</Link>
                            </div>
                        </li>
                        <li>
                            <Link to="/bath-body/body-care">
                                <img src={`${url}nav07.avif`} alt="" />
                                <span>바디 케어</span>
                            </Link>
                            <div className={styles.subItem}>
                                <Link to="/bath-body/body-care/body-cream">바디 크림</Link>
                                <Link to="/bath-body/body-care/body-hand-lotion">바디 앤 핸드 로션</Link>
                                <Link to="/bath-body/body-care/body-mist">바디 미스트</Link>
                                <Link to="/bath-body/body-care/hand-cream">핸드 크림</Link>
                            </div>
                        </li>
                    </ul>
                </li>
                <li>
                    <Link to="/info/faq">서비스</Link>
                    <ul className={styles.submenu}>
                        <li>
                            <div>
                                <Link to="/scent-finder">
                                    <img src={`${url}nav08.avif`} alt="" />
                                </Link>
                                <div className={`${styles.subItem} ${styles.bold}`}>
                                    <Link to="/scent-finder">센트 파인더</Link>
                                    <Link to="/info/faq">고객 서비스</Link>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
}

export default DefaultMenu;
