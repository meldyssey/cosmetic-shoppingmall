import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../scss/mypage/MyInfo.module.scss";
import axios from "axios";

const MyInfo = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보
    const [recentOrder, setRecentOrder] = useState(null); // 최신 주문 데이터
    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        const sessionToken = sessionStorage.getItem("sessionToken");
        const email = sessionStorage.getItem("email");

        if (!sessionToken) {
            navigate("/signIn"); // 세션 토큰 없으면 로그인 페이지로 이동
        } else {
            // 사용자 정보 가져오기
            axios
                .post(
                    `${bkURL}/myPage`,
                    { action: "getUserInfo", email },
                    {
                        headers: {
                            Authorization: sessionToken,
                        },
                    }
                )
                .then((response) => setUserInfo(response.data))
                .catch((error) => {
                    console.error("사용자 정보 가져오기 실패:", error);
                    navigate("/signIn");
                });

            // 주문 내역 가져오기
            axios
                .post(
                    `${bkURL}/myPage`,
                    { action: "getOrders", email },
                    { headers: { Authorization: sessionToken } }
                )
                .then((response) => {
                    const orders = response.data.orders || [];
                    if (orders.length > 0) {
                        // order_date 기준으로 내림차순 정렬 (최신 주문이 첫 번째로 옴)
                        const sortedOrders = orders.sort(
                            (a, b) =>
                                new Date(b.order_date) - new Date(a.order_date)
                        );
                        setRecentOrder(sortedOrders[0]); // 가장 최근 주문 1건 확인
                    }
                })
                .catch((err) => {
                    console.error("주문 내역 가져오기 실패:", err);
                });

            // 배송 업데이트 하기
            axios
                .post(`${bkURL}/delivery/update`, { email })
                .then(() => {
                    console.log("배송 완료 업데이트");
                })
                .catch((error) => {
                    console.error("배송 완료 업데이트실패:", error);
                });
        }
    }, []);

    const deleteMember = () => {
        if (window.confirm("정말 탈퇴하시겠습니까?")) {
            const sessionToken = sessionStorage.getItem("sessionToken");
            const email = sessionStorage.getItem("email");
            axios
                .post(
                    `${bkURL}/myPage`,
                    { action: "deleteMember", email },
                    {
                        headers: { Authorization: sessionToken },
                    }
                )
                .then(() => {
                    alert("회원 탈퇴가 완료되었습니다.");
                    sessionStorage.clear(); // 세션 정리
                    navigate("/");
                })
                .catch((error) => {
                    console.error("회원 탈퇴 실패", error);
                    alert(
                        "회원 탈퇴 중 문제가 발생했습니다. 다시 시도해 주세요."
                    );
                });
        }
    };

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    return (
        <div className={styles.mainContainer}>
            <div className={styles.sectionContainer}>
                <div className={styles.sectionBox}>
                    {/* 섹션 1: 나의 정보 */}
                    <div className={styles.sectionHeader}>
                        나의 정보
                        <div>
                            <Link
                                to="/myPage/myinfoEdit"
                                className={styles.editinfo}
                            >
                                정보 수정하기
                            </Link>
                            <button
                                onClick={deleteMember}
                                className={styles.deleteMember}
                            >
                                회원 탈퇴
                            </button>
                        </div>
                    </div>
                    <div className={styles.infoBlock}>
                        {userInfo ? (
                            <>
                                <p>이름 : {userInfo.customer_name}</p>
                                <p>이메일 : {userInfo.email}</p>
                                <p>연락처 : {userInfo.contact_number}</p>
                                <p>가입일 : {formatDate(userInfo.join_date)}</p>
                                <p>
                                    개인정보 수집 동의 :{" "}
                                    {userInfo.optional_agree === 1
                                        ? "동의"
                                        : "동의 안함"}
                                </p>
                            </>
                        ) : (
                            <p>사용자 정보 없음</p>
                        )}
                    </div>
                </div>
                <div className={styles.sectionBox}>
                    {/* 섹션 2: 주문 내역 */}
                    <div className={styles.sectionHeader}>
                        주문 내역
                        <div>
                            <Link to="/myPage/viewOrders" className={styles.a1}>
                                주문 내역 전체보기
                            </Link>
                        </div>
                    </div>
                    <div className={styles.infoBlock}>
                        {recentOrder ? (
                            <div className={styles.recentOrder}>
                                <p>주문번호 : {recentOrder.order_id}</p>
                                <p>
                                    주문일자 :{" "}
                                    {formatDate(recentOrder.order_date)}
                                </p>
                                <p>주문상태 : {recentOrder.order_status}</p>
                                <p>수령인 : {recentOrder.order_name}</p>
                                <Link
                                    to={`/myPage/orderDetail/${recentOrder.order_id}`}
                                    className={styles.a1}
                                >
                                    자세히 보기
                                </Link>
                                <div className={styles.orderMessage}>
                                    <p>
                                        가장 최근 주문내역만 노출됩니다.
                                        <br />
                                        전체 주문내역은
                                        <Link
                                            to="/myPage/viewOrders"
                                            className={styles.a1}
                                        >
                                            &nbsp; 주문 내역 전체보기
                                        </Link>
                                        를 클릭해주세요.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p>
                                고객님의 주문내역이 없습니다.
                                <Link to="/all-product" className={styles.a1}>
                                    &nbsp; 쇼핑하러가기
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyInfo;
