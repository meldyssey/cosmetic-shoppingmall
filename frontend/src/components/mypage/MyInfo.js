import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../scss/mypage/MyInfo.module.scss";
import axios from "axios";

const MyInfo = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState({}); // 사용자 정보 초기값 빈 객체
    const [recentOrder, setRecentOrder] = useState(null); // 최신 주문 데이터
    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        const sessionToken = sessionStorage.getItem('sessionToken');
        const email = sessionStorage.getItem('email');
    
        if (!sessionToken || !email) {
            navigate('/signIn'); // 세션 또는 이메일이 없으면 로그인 페이지로 이동
            return;
        }
    
        axios.post(`${bkURL}/myPage`, { action: 'getUserInfo', email }, {
            headers: { Authorization: sessionToken },
        })
        .then(response => {
            setUserInfo(response.data);
        })
        .catch(error => {
            console.error('사용자 정보 가져오기 실패:', error);
            navigate('/signIn');
        });
    }, []);
    
    

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    const deleteMember = () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            const sessionToken = sessionStorage.getItem("sessionToken");
            const email = sessionStorage.getItem("email");

            axios
                .post(
                    `${bkURL}/myPage`,
                    { action: "deleteMember", email },
                    { headers: { Authorization: sessionToken } }
                )
                .then(() => {
                    alert("회원 탈퇴가 완료되었습니다.");
                    sessionStorage.clear(); // 세션 정리
                    navigate("/");
                })
                .catch((error) => {
                    console.error("회원 탈퇴 실패", error);
                    alert("회원 탈퇴 중 문제가 발생했습니다. 다시 시도해 주세요.");
                });
        }
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.sectionContainer}>
                {/* 나의 정보 */}
                <div className={styles.sectionBox}>
                    <div className={styles.sectionHeader}>나의 정보</div>
                    <div className={styles.actions}>
                        <Link to="/myPage/myinfoEdit" className={styles.editinfo}>
                            정보 수정하기
                        </Link>
                        <button onClick={deleteMember} className={styles.deleteMember}>
                            회원 탈퇴
                        </button>
                    </div>
                    <div className={styles.infoBlock}>
                        {Object.keys(userInfo).length > 0 ? (
                            <>
                                <p>이름: {userInfo.customer_name || "-"}</p>
                                <p>이메일: {userInfo.email || "-"}</p>
                                <p>연락처: {userInfo.contact_number || "-"}</p>
                                <p>가입일: {formatDate(userInfo.join_date)}</p>
                                <p>
                                    개인정보 수집 동의:{" "}
                                    {userInfo.optional_agree === 1 ? "동의" : "동의 안함"}
                                </p>
                            </>
                        ) : (
                            <p>사용자 정보를 불러오는 중입니다...</p>
                        )}
                    </div>
                </div>
                {/* 주문 내역 */}
                <div className={styles.sectionBox}>
                    <div className={styles.sectionHeader}>주문 내역</div>
                    <div className={styles.infoBlock}>
                        {recentOrder ? (
                            <>
                                <p>주문번호: {recentOrder.order_id}</p>
                                <p>주문일자: {formatDate(recentOrder.order_date)}</p>
                                <p>주문상태: {recentOrder.order_status}</p>
                                <p>수령인: {recentOrder.order_name}</p>
                                <Link
                                    to={`/myPage/orderDetail/${recentOrder.order_id}`}
                                    className={styles.a1}
                                >
                                    자세히 보기
                                </Link>
                            </>
                        ) : (
                            <p>주문 내역이 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfo;
