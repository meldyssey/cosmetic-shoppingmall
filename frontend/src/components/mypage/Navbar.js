import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../scss/mypage/Navbar.module.scss';

function Navbar() {
    const navigate = useNavigate();
    const customerName = sessionStorage.getItem('customerName'); // 세션에서 이름 가져오기

    const Logout = (e) => {
        e.preventDefault(); // Link의 기본 이동 동작 방지
        const logoutChk = window.confirm(`${customerName}님, 로그아웃 하시겠습니까?`);
        if (logoutChk) {
            sessionStorage.clear(); // 세션 스토리지 초기화
            navigate('/'); // 홈으로 이동
        }
    };

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbar}>
                {/* 왼쪽 링크 */}
                <div className={styles.leftLinks}>
                    <Link to="/myPage">내 정보</Link>
                </div>

                {/* 중앙 링크 */}
                <div className={styles.centerLinks}>
                    <Link to="myinfoEdit">회원정보 수정</Link>
                    <Link to="addressList">배송 주소록</Link>
                    <Link to="viewOrders">주문내역 보기</Link>
                    <Link to="/onetoonelist">1:1 문의</Link>
                </div>

                {/* 오른쪽 링크 */}
                <div className={styles.rightLinks}>
                    <Link to="/" onClick={Logout}>
                        로그아웃
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
