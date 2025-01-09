import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadTossPayments } from "@tosspayments/tosspayments-sdk";
import axios from "axios";
import "../../scss/order/tossStyle.scss";
import PayHead from "./PayHead";

// ------  SDK 초기화 ------
// TODO: clientKey는 개발자센터의 API 개별 연동 키 > 결제창 연동에 사용하려할 MID > 클라이언트 키로 바꾸세요.
// TODO: server.js 의 secretKey 또한 결제위젯 연동 키가 아닌 API 개별 연동 키의 시크릿 키로 변경해야 합니다.
// TODO: 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요. 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
// @docs https://docs.tosspayments.com/sdk/v2/js#토스페이먼츠-초기화
const clientKey = "test_ck_5OWRapdA8djX0X2qzkARVo1zEqZK";
const customerKey = generateRandomString();
const bkURL = process.env.REACT_APP_BACK_URL;

export function CheckoutPage() {
    const [payment, setPayment] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

    /////////////////////////////////payment2에서 데이터 가져오기
    const { state } = useLocation();
    if (!state) {
        return <div>잘못된 접근입니다.</div>;
    }
    const { orderPayload, prod, ordersData } = state;
    console.log("orderPayload입니다", orderPayload);
    // console.log("이름", orderPayload.);
    console.log("가격", orderPayload.order_total);
    console.log("ordersData", ordersData);
    const amount = {
        currency: "KRW",
        value: orderPayload.order_total,
        // value: 200,
    };
    let orderName;
    if (prod.length == 1) {
        orderName = prod[0].product_name_kor;
    } else orderName = `${prod[0].product_name_kor} 외 ${prod.length - 1}개`;

    // const orderName = `${prod[0].product_name_kor} 외 ${prod.length - 1}개`;
    console.log("이름", orderName);
    const customerEmail = orderPayload.email;
    const customerName = ordersData.customer_name;

    const [isLoading, setIsLoading] = useState();

    // const orderPayloadString = JSON.stringify(orderPayload);
    // const prodString = JSON.stringify(prod);
    // const ordersDataString = JSON.stringify(ordersData);

    ////////////////////////////////여기까지

    function selectPaymentMethod(method) {
        setSelectedPaymentMethod(method);
    }

    useEffect(() => {
        async function fetchPayment() {
            try {
                const tossPayments = await loadTossPayments(clientKey);

                // 회원 결제
                // @docs https://docs.tosspayments.com/sdk/v2/js#tosspaymentspayment
                const payment = tossPayments.payment({
                    customerKey,
                });
                // 비회원 결제
                // const payment = tossPayments.payment({ customerKey: ANONYMOUS });

                setPayment(payment);
            } catch (error) {
                console.error("Error fetching payment:", error);
            }
        }

        fetchPayment();
    }, [clientKey, customerKey]);

    // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
    // @docs https://docs.tosspayments.com/sdk/v2/js#paymentrequestpayment
    async function requestPayment() {
        // payment2 페이지에서 데이터 받아오기
        if (!selectedPaymentMethod) {
            alert("결제 수단을 선택해주세요."); // 새로 추가함
            return;
        }
        if (!prod || prod.length === 0) {
            alert("주문 데이터가 없습니다."); // 주문 데이터 확인
            return;
        }
        // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
        // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
        try {
            console.log("진입");
            console.log("페이로드", JSON.stringify(orderPayload));
            console.log("프로드", JSON.stringify(prod));
            console.log("오더스데이터", JSON.stringify(ordersData));
            switch (selectedPaymentMethod) {
                case "CARD":
                    await payment.requestPayment({
                        method: "CARD", // 카드 및 간편결제
                        amount,
                        orderId: generateRandomString(), // 고유 주문번호
                        orderName,
                        successUrl:
                            window.location.origin + "/payment2/success",
                        failUrl: window.location.origin + "/payment2/fail",
                        customerEmail,
                        customerName,
                        card: {
                            useEscrow: false,
                            flowMode: "DEFAULT",
                            useCardPoint: false,
                            useAppCardOnly: false,
                        },
                        metadata: {
                            orderPayload: JSON.stringify(orderPayload),
                            prod: JSON.stringify(prod),
                            ordersData: JSON.stringify(ordersData),
                            method: "카드",
                        },
                    });
                    break; // 추가함

                case "TRANSFER":
                    await payment.requestPayment({
                        method: "TRANSFER", // 계좌이체 결제
                        amount,
                        orderId: generateRandomString(),
                        orderName,
                        successUrl:
                            window.location.origin + "/payment2/success",
                        failUrl: window.location.origin + "/payment2/fail",
                        customerEmail,
                        customerName,
                        // 가상계좌 안내, 퀵계좌이체 휴대폰 번호 자동 완성에 사용되는 값입니다. 필요하다면 주석을 해제해 주세요.
                        // customerMobilePhone: "01012341234",
                        transfer: {
                            cashReceipt: {
                                type: "소득공제",
                            },
                            useEscrow: false,
                        },
                        metadata: {
                            orderPayload: JSON.stringify(orderPayload),
                            prod: JSON.stringify(prod),
                            ordersData: JSON.stringify(ordersData),
                            method: "계좌이체",
                        },
                    });
                    break;
                default:
                    alert("유효하지 않은 결제 방식입니다."); /// 왜 필요?
            }
        } catch (error) {
            console.error("결제 실패:", error);
            alert("결제를 취소하였습니다.");
        }
    }

    return (
        <div className="toss">
            <div className="wrap">
                <PayHead activeStep={2} />
                <div className="myform">
                    <div className="max-w-540 w-100">
                        <div className="addressinfo">
                            <div>
                                <h1>결제수단</h1>
                                <div
                                    id="payment-method"
                                    style={{
                                        margin: "10px 0",
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <span className="pay">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="CARD"
                                            id="CARD"
                                            checked={
                                                selectedPaymentMethod === "CARD"
                                            }
                                            onChange={() =>
                                                selectPaymentMethod("CARD")
                                            }
                                        />
                                        <label
                                            htmlFor="CARD"
                                            className="label-text"
                                        >
                                            카드결제
                                        </label>
                                    </span>
                                    <span className="pay">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="TRANSFER"
                                            id="TRANSFER"
                                            checked={
                                                selectedPaymentMethod ===
                                                "TRANSFER"
                                            }
                                            onChange={() =>
                                                selectPaymentMethod("TRANSFER")
                                            }
                                        />

                                        <label
                                            htmlFor="TRANSFER"
                                            className="label-text"
                                        >
                                            계좌이체
                                        </label>
                                    </span>
                                </div>
                                <button
                                    className="submit"
                                    onClick={() => requestPayment()}
                                >
                                    {orderPayload.order_total.toLocaleString()}
                                    원 결제하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        // </div>
    );
}

function generateRandomString() {
    return window.btoa(Math.random().toString()).slice(0, 20);
}
