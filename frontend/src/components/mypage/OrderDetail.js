import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "../../scss/mypage/OrderDetail.module.scss";
import Delivery from "../order/Delivery";

function OrderDetail() {
    const [detailorders, setDetailOrders] = useState([]); // 주문 목록 상태
    const [products, setProducts] = useState([]); // 주문 제품 목록

    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        const OrderDetail = async () => {
            const sessionToken = sessionStorage.getItem("sessionToken");
            const orderId = window.location.pathname.split("/").pop(); // URL에서 order_id 추출

            if (!sessionToken) {
                alert("로그인이 필요합니다.");
                return;
            }

            try {
                const response = await axios.get(
                    `${bkURL}/myPage/orderDetail/${orderId}`,
                    {
                        headers: { Authorization: sessionToken },
                    }
                );

                // console.log('order:',response.data.order)
                setDetailOrders(response.data.order);
                setProducts(response.data.products); // 주문 제품 목록 추가
            } catch (err) {
                console.error("데이터 가져오기 오류:", err);
                alert("데이터를 불러올 수 없습니다.");
                console.error("데이터 가져오기 오류:", err);
                alert("데이터를 불러올 수 없습니다.");
            }
        };

        OrderDetail();
    }, []);

    // 날짜 포맷팅 함수
    const formatDate = dateString => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toISOString().split("T")[0];
    };

    // 주문 취소하기
    const handleCancelOrder = orderId => {
        if (window.confirm("주문을 취소하시겠습니까?")) {
            axios
                .post(`${bkURL}/myPage/cancelOrder/${orderId}`)
                .then(() => {
                    alert("주문이 취소되었습니다.");
                    alert("주문이 취소되었습니다.");
                    // 상태를 갱신하거나 페이지를 새로고침
                    window.location.reload();
                })
                .catch(err => {
                    console.error("주문 취소 실패:", err);
                    alert("주문 취소에 실패했습니다.");
                });
        }
    };

    if (!detailorders) {
        return <div>로딩중...</div>;
    }

    return (
        <div className={styles.orderlistcontainer}>
            <div className={styles.block}>
                <div className={styles.orderheader}>주문 상세 보기</div>

                <div className={styles.orderlist}>
                    <div className={styles.orderlistheader}>
                        <div>주문번호</div>
                        <div>주문제품</div>
                        <div>주문일</div>
                        <div>결제수단</div>
                        <div>결제금액</div>
                        <div>주문상태</div>
                        <div>배송지</div>
                        <div
                            className={styles.headerColumn}
                            style={{
                                color:
                                    detailorders.length > 0 &&
                                    !detailorders[0].invoice
                                        ? "#f5f5f5"
                                        : "inherit",
                            }}
                        >
                            {detailorders.length > 0 && detailorders[0].invoice
                                ? "송장번호"
                                : "취소"}
                        </div>
                    </div>

                    {detailorders.length > 0 ? (
                        detailorders.map((od, index) => (
                            <div className={styles.orderlistitem} key={index}>
                                <div>{od.order_id}</div>
                                <div>
                                    {products.length > 0
                                        ? products.map(product => (
                                              <p
                                                  key={product.product_id}
                                                  className={styles.productItem}
                                              >
                                                  <Link
                                                      to={`/product/${product.product_opt_id}`}
                                                      className={
                                                          styles.productLink
                                                      }
                                                  >
                                                      {product.product_name_kor}{" "}
                                                      &nbsp;
                                                      {product.product_volume} (
                                                      {`${product.order_cnt}개`}
                                                      )
                                                  </Link>
                                              </p>
                                          ))
                                        : "제품 정보 없음"}
                                </div>
                                <div>{formatDate(od.order_date)}</div>
                                <div>{od.pay_to}</div>
                                <div>₩ {od.order_total.toLocaleString()}</div>
                                <div>{od.order_status}</div>
                                <div>
                                    {od.order_roadname} &nbsp;
                                    {od.order_buildname} &nbsp;
                                    {od.order_addredetail}
                                </div>
                                <div>
                                    {od.order_status === "주문완료" ? (
                                        <button
                                            className={styles.cancelButton}
                                            onClick={() =>
                                                handleCancelOrder(od.order_id)
                                            }
                                        >
                                            취소하기
                                        </button>
                                    ) : od.invoice ? (
                                        <Delivery invoice={od.invoice} />
                                    ) : (
                                        "-"
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>주문 내역이 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default OrderDetail;
