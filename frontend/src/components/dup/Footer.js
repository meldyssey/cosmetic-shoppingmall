import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from '../../scss/dup/footer.module.scss';

function Footer(props) {
    const location = useLocation(); // 현재 경로 가져오기
    const [isSize, setIsSize] = useState(window.innerWidth <= 800);

    // 화면 크기 변경 감지
    useEffect(() => {
        const handleResize = () => setIsSize(window.innerWidth <= 800);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 메뉴 상태 관리 (태블릿릿 전용)
    const [isCustomerServiceOpen, setIsCustomerServiceOpen] = useState(false);
    const [isExploreOpen, setIsExploreOpen] = useState(false);
    const [isSocialOpen, setIsSocialOpen] = useState(false);

    return (
        <footer>
            <div className={styles.footerSite}>
                {/* 고객 서비스 */}
                <div>
                    <div
                        className={styles.tt}
                        onClick={() => isSize && setIsCustomerServiceOpen(!isCustomerServiceOpen)}
                    >
                        <span>고객 서비스</span>
                        {isSize && (
                            <div className={styles.footerIcons}>
                                <img
                                    className={styles.down}
                                    src="/imgs/main/downIcon.svg"
                                    alt="펼치기"
                                    style={{ display: isCustomerServiceOpen ? 'none' : 'inline' }}
                                />
                                <img
                                    className={styles.up}
                                    src="/imgs/main/upIcon.svg"
                                    alt="접기"
                                    style={{ display: isCustomerServiceOpen ? 'inline' : 'none' }}
                                />
                            </div>
                        )}
                    </div>
                    {(isSize && isCustomerServiceOpen) || !isSize ? (
                        <div>
                            <Link to="/info/faq" className={location.pathname === '/info/faq' ? styles.active : ''}>
                                자주 묻는 질문
                            </Link>
                            <Link
                                to="/info/myprofile"
                                className={location.pathname === '/info/myprofile' ? styles.active : ''}
                            >
                                나의 프로필
                            </Link>
                            <Link
                                to="/info/myorder"
                                className={location.pathname === '/info/myorder' ? styles.active : ''}
                            >
                                나의 오더
                            </Link>
                            <Link
                                to="/info/delivery"
                                className={location.pathname === '/info/delivery' ? styles.active : ''}
                            >
                                배송관련
                            </Link>
                            <Link
                                to="/info/excahngerefund"
                                className={location.pathname === '/info/excahngerefund' ? styles.active : ''}
                            >
                                교환 및 환불 규정
                            </Link>
                            <Link
                                to="/info/onlineshopping"
                                className={location.pathname === '/info/onlineshopping' ? styles.active : ''}
                            >
                                온라인 쇼핑하기
                            </Link>
                            <Link
                                to="/info/terms"
                                className={`${styles.link} ${location.pathname === '/info/terms' ? styles.active : ''}`}
                            >
                                <p className={styles.fterms}>서비스 이용약관 <br /> 및 개인정보 처리방침</p>
                            </Link>
                        </div>
                    ) : null}
                </div>

                {/* 살펴보기 */}
                <div>
                    <div className={styles.tt} onClick={() => isSize && setIsExploreOpen(!isExploreOpen)}>
                        <span>살펴보기</span>
                        {isSize && (
                            <div className={styles.footerIcons}>
                                <img
                                    className={styles.down}
                                    src="/imgs/main/downIcon.svg"
                                    alt="펼치기"
                                    style={{ display: isExploreOpen ? 'none' : 'inline' }}
                                />
                                <img
                                    className={styles.up}
                                    src="/imgs/main/upIcon.svg"
                                    alt="접기"
                                    style={{ display: isExploreOpen ? 'inline' : 'none' }}
                                />
                            </div>
                        )}
                    </div>
                    {(isSize && isExploreOpen) || !isSize ? (
                        <div>
                            <Link to="/storymain">브랜드 소개</Link>
                            <Link to="/all-product">제품 전체</Link>
                            <Link to="/best-seller">베스트 셀러</Link>
                            <Link to="main/map.html">매장 안내</Link>
                        </div>
                    ) : null}
                </div>

                {/* 소셜 네트워크 */}
                <div>
                    <div className={styles.tt} onClick={() => isSize && setIsSocialOpen(!isSocialOpen)}>
                        <span>소셜 네트워크</span>
                        {isSize && (
                            <div className={styles.footerIcons}>
                                <img
                                    className={styles.down}
                                    src="/imgs/main/downIcon.svg"
                                    alt="펼치기"
                                    style={{ display: isSocialOpen ? 'none' : 'inline' }}
                                />
                                <img
                                    className={styles.up}
                                    src="/imgs/main/upIcon.svg"
                                    alt="접기"
                                    style={{ display: isSocialOpen ? 'inline' : 'none' }}
                                />
                            </div>
                        )}
                    </div>
                    {(isSize && isSocialOpen) || !isSize ? (
                        <div>
                            <Link to="https://www.instagram.com/jomalonelondon">인스타그램</Link>
                            <Link to="https://www.facebook.com/JoMaloneLondon">페이스북</Link>
                            <Link to="https://www.youtube.com/channel/UCWMSJ5L5Zvkr9JfflU4JMUA">유튜브</Link>
                        </div>
                    ) : null}
                </div>
            </div>

            {/* Footer 기본 정보 */}
            <div className={styles.footer}>
                <div>
                    <p>© Jo Malone London 2021</p>
                    <img src="/imgs/main/main_trustmark.webp" alt="" />
                </div>
                <div>
                    <p>
                        이엘씨에이한국(유) 대표: Teng, Hsiao-Hua (Catherine), 서울시 강남구 강남대로 382 (역삼동)
                        메리츠타워, 06232
                        <br />
                        사업자등록번호: 211-81-71889
                        <br />
                        통신판매업신고번호: 강남-15737호
                        <br />
                        고객관리지원팀: <Link to="tel:1644-3753">1644-3753</Link>
                        <br />
                        호스팅서비스 사업자: (주)엘지유플러스
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
