import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../../scss/dup/nav.module.scss';

function HamburgerMenu({ ham, hideMenu, subMenu, toggleSubMenu }) {
    return (
        <>
            <div className={styles.hamBg} style={{ display: ham ? 'block' : 'none' }} onClick={hideMenu}></div>
            <div id={styles.hamMenu} style={{ display: ham ? 'block' : 'none' }}>
                <ul className={styles.hMenu}>
                    <li>
                        <Link to="#" onClick={(e) => toggleSubMenu(0, e)}>
                            브랜드 소개
                        </Link>
                        <ul className={styles.hSubmenu} style={{ display: subMenu[0] ? 'block' : 'none' }}>
                            <li>
                                <Link to="/storymain">소개</Link>
                            </li>
                            <li>
                                <Link to="/all-product">제품전체</Link>
                            </li>
                            <li>
                                <Link to="/best-seller">베스트셀러</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#" onClick={(e) => toggleSubMenu(1, e)}>
                            코롱
                        </Link>
                        <ul className={styles.hSubmenu} style={{ display: subMenu[1] ? 'block' : 'none' }}>
                            <li>
                                <Link to="/colognes">센트패밀리</Link>
                                <ul className={styles.hSubitem}>
                                    <li>
                                        <Link to="/colognes/citrus">시트러스</Link>
                                    </li>
                                    <li>
                                        <Link to="/colognes/fruity">프루티</Link>
                                    </li>
                                    <li>
                                        <Link to="/colognes/light-floral">라이트 플로랄</Link>
                                    </li>
                                    <li>
                                        <Link to="/colognes/floral">플로랄</Link>
                                    </li>
                                    <li>
                                        <Link to="/colognes/woody">우디</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/colognes/size" onClick={(e) => toggleSubMenu(2, e)}>
                                    사이즈
                                </Link>
                                <ul
                                    className={styles.hSubitem}
                                    style={{
                                        display: subMenu[2] ? 'block' : 'none',
                                    }}
                                >
                                    <li>
                                        <Link to="/colognes/size/100ml">100ml</Link>
                                    </li>
                                    <li>
                                        <Link to="/colognes/size/50ml">50ml</Link>
                                    </li>
                                    <li>
                                        <Link to="/colognes/size/30ml">30ml</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#" onClick={(e) => toggleSubMenu(3, e)}>
                            홈 프레그런스
                        </Link>
                        <ul className={styles.hSubmenu} style={{ display: subMenu[3] ? 'block' : 'none' }}>
                            <li>
                                <Link to="/home-scents/candles">캔들</Link>
                            </li>
                            <li>
                                <Link to="/home-scents/diffusers">디퓨저</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#" onClick={(e) => toggleSubMenu(4, e)}>
                            배스 앤 바디
                        </Link>
                        <ul className={styles.hSubmenu} style={{ display: subMenu[4] ? 'block' : 'none' }}>
                            <li>
                                <Link to="/bath-body/bath-shower">배스 앤 샤워</Link>
                                <ul className={styles.hSubitem}>
                                    <li>
                                        <Link to="/bath-body/bath-shower/body-hand-wash">바디 앤 핸드워시</Link>
                                    </li>
                                    <li>
                                        <Link to="/bath-body/bath-shower/shower-gel-oil">샤워 젤 앤 오일</Link>
                                    </li>
                                    <li>
                                        <Link to="/bath-body/bath-shower/bath-oil">배스 오일</Link>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/bath-body/body-care" onClick={(e) => toggleSubMenu(5, e)}>
                                    바디 케어
                                </Link>
                                <ul
                                    className={styles.hSubitem}
                                    style={{
                                        display: subMenu[5] ? 'block' : 'none',
                                    }}
                                >
                                    <li>
                                        <Link to="/bath-body/body-care/body-cream">바디 크림</Link>
                                    </li>
                                    <li>
                                        <Link to="/bath-body/body-care/body-hand-lotion">바디 앤 핸드 로션</Link>
                                    </li>
                                    <li>
                                        <Link to="/bath-body/body-care/body-mist">바디 미스트</Link>
                                    </li>
                                    <li>
                                        <Link to="/bath-body/body-care/hand-cream">핸드 크림</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="#" onClick={(e) => toggleSubMenu(6, e)}>
                            서비스
                        </Link>
                        <ul className={styles.hSubmenu} style={{ display: subMenu[6] ? 'block' : 'none' }}>
                            <li>
                                <Link to="/scent-finder">센트 파인더</Link>
                            </li>
                            <li>
                                <Link to="/info/faq">고객 서비스</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/myPage">마이페이지</Link>
                    </li>
                    <li>
                        <Link to="/basket">장바구니</Link>
                    </li>
                    <li>
                        <Link to="/map">매장안내</Link>
                    </li>
                    <li>
                        <Link to="/search">검색</Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default HamburgerMenu;
