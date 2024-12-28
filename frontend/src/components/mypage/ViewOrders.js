import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../scss/mypage/ViewOrders.module.scss';
import axios from 'axios';

function ViewOrders() {
    const [orders, setOrders] = useState([]); // 주문 목록 상태
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보 상태
    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        const ViewOrders = async () => {
            const sessionToken = sessionStorage.getItem('sessionToken');
            const email = sessionStorage.getItem('email');

            if (!sessionToken || !email) {
                alert('로그인이 필요합니다.');
                return;
            }

            try {
                // 사용자 정보 가져오기 -- 세션토큰은 마이페이지에서
                const userResponse = await axios.post(`${bkURL}/myPage`, { action: 'getUserInfo', email }, { headers: { Authorization: sessionToken } });
                setUserInfo(userResponse.data.userInfo);

                // 세션토큰 이메일을 기준으로 주문데이터 가져오기
                const ordersResponse = await axios.post(`${bkURL}/myPage`, { action: 'getOrders', email }, { headers: { Authorization: sessionToken } });
                setOrders(ordersResponse.data.orders);
            } catch (err) {
                console.error('데이터 가져오기 오류:', err);
                alert('데이터를 불러올 수 없습니다.');
            }
        };

        ViewOrders();
    }, []);

    // 날짜 포맷팅 함수
    const formatDate = dateString => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className={styles.orderlistcontainer}>
            <div className={styles.block}>
                <div className={styles.orderheader}>주문 전체 보기</div>
                <p className={styles.orderdescription}>주문하신 제품의 상세내역을 보시려면 아래 자세히 보기를 클릭해 주세요.</p>

                <div className={styles.orderlist}>
                    <div className={styles.orderlistheader}>
                        <div>주문번호</div>
                        <div>주문일</div>
                        <div>주문상태</div>
                        <div>수령인</div>
                    </div>
                </div>
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div className={styles.orderlistitem} key={index}>
                            <div>
                                {order.order_id}
                                <Link to={`/myPage/orderDetail/${order.order_id}`} className={styles.a1}>
                                    &nbsp; 자세히 보기
                                </Link>
                            </div>
                            <div>{formatDate(order.order_date)}</div>
                            <div>{order.order_status}</div>
                            <div>{order.order_name}</div>
                        </div>
                    ))
                ) : (
                    <div className={styles.no_order}>주문하신 내역이 없습니다.</div>
                )}
            </div>
        </div>
    );
}

export default ViewOrders;
