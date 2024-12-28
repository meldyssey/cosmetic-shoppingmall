import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../../../scss/admin/orderDetail.module.scss';

function OrderDetail(props) {
    const [order, setOrder] = useState([]);
    const [customer, setCustomer] = useState([]);
    const orderId = window.location.pathname.split('/').pop();
    const bkURL = process.env.REACT_APP_BACK_URL;

    // console.log(orderId)

    useEffect(() => {
        axios
            .get(`${bkURL}/admin/order/detail/${orderId}`)
            .then((res) => {
                // console.log('갔다옴 : ', res.data.order,res.data.customer)
                setOrder(res.data.order);
                setCustomer(res.data.customer);
            })
            .catch((err) => {
                console.error('에러발생 : ', err);
            });
    }, []);

    // 총 수량 계산
    const getTotalQuantity = () => {
        return order.reduce((total, product) => total + product.order_cnt, 0);
    };
    // 총 가격 계산
    const orderTotal = () => {
        return order.reduce((total, product) => total + product.product_price, 0);
    };

    if (!order || order.length === 0) {
        return <div className={styles.load}>로딩중...</div>;
    }
    if (!customer) {
        return <div className={styles.load}>로딩중...</div>;
    }

    return (
        <div className={styles.detail}>
            <div>주문 상세</div>
            <table>
                <tr>
                    <td>번호</td>
                    <td>이미지</td>
                    <td>제품명</td>
                    <td>단가</td>
                    <td>수량</td>
                    <td>제품별 합계</td>
                </tr>
                {order.map((od, i) => {
                    return (
                        <tr key={i}>
                            <td>{i + 1}</td>
                            <td className={styles.imgTag}>
                                <img src={`${bkURL}/imgs/product/${od.product_upSystem}`} />
                            </td>
                            <td>
                                <Link
                                    className={styles.link}
                                    to={`http://localhost:3000/admin/product/detail/${od.product_id}`}
                                >
                                    <div>{od.product_name_kor}</div>
                                    <div>{od.product_name_eng}</div>
                                </Link>
                            </td>
                            <td>{od.unit_price.toLocaleString()}원</td>
                            <td>{od.order_cnt}</td>
                            <td>{od.product_price.toLocaleString()}원</td>
                        </tr>
                    );
                })}
                <tr>
                    <td colSpan={6}>
                        <div className={styles.price}>총 수량 : {getTotalQuantity()}</div>
                        <div className={styles.price}>총 가격 : {orderTotal().toLocaleString()}원</div>
                    </td>
                </tr>
            </table>
            <div>주문자/배송지 정보</div>
            <table>
                <tr>
                    <th>주문자</th>
                    <td>
                        {customer.status === '탈퇴' ? (
                            <Link className={styles.link} to={`http://localhost:3000/admin/member/deletedmember`}>
                                {customer.customer_name} (탈퇴 회원)
                            </Link>
                        ) : (
                            <Link
                                className={styles.link}
                                to={`http://localhost:3000/admin/member/detail/${customer.customer_id}`}
                            >
                                {customer.customer_name}
                            </Link>
                        )}
                    </td>
                </tr>
                <tr>
                    <th>주문자 전화번호</th>
                    <td>{customer.contact_number}</td>
                </tr>
                <tr>
                    <th>수령인</th>
                    <td>{order[0].order_name}</td>
                </tr>
                <tr>
                    <th>수령인 전화번호</th>
                    <td>{order[0].order_tel}</td>
                </tr>
                <tr>
                    <th>배송지</th>
                    <td>
                        <div>{order[0].order_zip}</div>
                        <div>{order[0].order_roadname}</div>
                        <div>{order[0].order_buildname}</div>
                        <div>{order[0].order_addredetail}</div>
                    </td>
                </tr>
                <tr>
                    <th>배송 요청사항</th>
                    <td>{order[0].order_msg}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <div className={styles.price}>
                            <Link className={styles.color} to="/admin/order">
                                목록으로
                            </Link>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    );
}

export default OrderDetail;
