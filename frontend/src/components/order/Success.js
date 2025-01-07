import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Payment3 from "./Payment3";

import styles from "../../scss/order/payment3.module.scss";
import PayHead from "./PayHead";

const bkURL = process.env.REACT_APP_BACK_URL;

export function SuccessPage() {
    //{ orderPayload, prod, ordersData },
    //console.log(props);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [responseData, setResponseData] = useState(null);

    const [data, setData] = useState();
    const email = sessionStorage.getItem("email");

    if (!email) {
        navigate("/signIn");
    }

    useEffect(() => {
        async function confirm() {
            const requestData = {
                orderId: searchParams.get("orderId"),
                amount: searchParams.get("amount"),
                paymentKey: searchParams.get("paymentKey"),
                // metadata: searchParams.get("metadata"),
            };
            // const metadata = searchParams.get("metadata");
            // if (metadata) {
            //     const parsedMetadata = JSON.parse(decodeURIComponent(metadata));
            //     console.log("메타데이터 파싱 결과:", parsedMetadata);
            // }
            // // console.log("파람", searchParams.get("roadname_address"));
            // console.log("파람", searchParams.get("metadata"));

            console.log("결제창 진입:", {
                paymentKey: requestData.paymentKey,
                orderId: requestData.orderId,
                amount: requestData.amount,
                // metadata: requestData.metadata,
            });

            const response = await fetch(`${bkURL}/payment2/confirm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestData),
            });

            const json = await response.json();

            if (!response.ok) {
                throw { message: json.message, code: json.code };
            }
            console.log("maxOrderId:", json.newOrderId);
            console.log("메타데이터:", json.metadata);
            setResponseData(json);
            setData(json.newOrderId);
        }

        confirm().catch(error => {
            console.error("결제 확인 실패:", error);
            navigate(
                `/payment2/fail?code=${error.code}&message=${error.message}`
            );
        });
    }, [searchParams]);

    return (
        <>
            {responseData ? (
                <div className={styles.wrap}>
                    <PayHead activeStep={3} />
                    <div className={styles.wrapper}>
                        <div className={styles.orderFin}>
                            <div className={styles.orderNum}>
                                <h1>주문완료</h1>
                                <h4>주문번호 : {data}</h4>
                            </div>
                            <div className={styles.notice}>
                                <p>
                                    고객님께 주문확인 이메일 메시지가 전송되며,
                                    <br />
                                    주문하신 제품은 결제완료 시점으로부터 영업일
                                    기준 3일 내에 받아보실 수 있습니다.
                                    <br />
                                    단, 도서 지역 및 섬 지역은 지연 될 수 있으며
                                    명절 및 연말이나 주문 폭주 시 또한 지연 될
                                    수 있습니다.
                                    <br />
                                    <br />
                                    주문이 완료되었다고 해도 재고부족 등의
                                    이유로 주문 취소가 될 수 있으니 이점 양해
                                    부탁드립니다.
                                    <br />조 말론 런던 온라인 부티크에서는
                                    이용자가 구매 신청한 제품 등이 품절 등의
                                    사유로
                                    <br />
                                    인도 또는 제공을 할 수 없을 때에는 그 사유를
                                    이용자에게 통지하고
                                    <br />
                                    사전에 제품 등의 대금을 받은 경우에는
                                    환급하거나 환급에 필요한 조치를 취합니다.
                                </p>
                            </div>
                            <div className={styles.buttonSec}>
                                <button className={styles.goMain}>
                                    <Link to="/">쇼핑 계속하기</Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                // <div className="box_section" style={{ width: "600px" }}>
                //     <img
                //         width="100px"
                //         src="https://static.toss.im/illusts/check-blue-spot-ending-frame.png"
                //     />
                //     <h2>결제를 완료했어요</h2>
                //     <div
                //         className="p-grid typography--p"
                //         style={{ marginTop: "50px" }}
                //     >
                //         <div className="p-grid-col text--left">
                //             <b>결제금액</b>
                //         </div>
                //         <div className="p-grid-col text--right" id="amount">
                //             {`${Number(
                //                 searchParams.get("amount")
                //             ).toLocaleString()}원`}
                //         </div>
                //     </div>
                //     <div
                //         className="p-grid typography--p"
                //         style={{ marginTop: "10px" }}
                //     >
                //         <div className="p-grid-col text--left">
                //             <b>ID</b>
                //         </div>
                //         <div className="p-grid-col text--right" id="orderId">
                //             {responseData.newOrderId}
                //         </div>
                //     </div>
                //     <div
                //         className="p-grid typography--p"
                //         style={{ marginTop: "10px" }}
                //     >
                //         <div className="p-grid-col text--left">
                //             <b>주문번호</b>
                //         </div>
                //         <div className="p-grid-col text--right" id="orderId">
                //             {`${searchParams.get("orderId")}`}
                //         </div>
                //     </div>
                //     <div
                //         className="p-grid typography--p"
                //         style={{ marginTop: "10px" }}
                //     >
                //         <div className="p-grid-col text--left">
                //             <b>paymentKey</b>
                //         </div>
                //         <div
                //             className="p-grid-col text--right"
                //             id="paymentKey"
                //             style={{ whiteSpace: "initial", width: "250px" }}
                //         >
                //             {`${searchParams.get("paymentKey")}`}
                //         </div>
                //     </div>
                //     <div className="p-grid-col">
                //         <Link to="https://docs.tosspayments.com/guides/v2/payment-widget/integration">
                //             <button className="button p-grid-col5">
                //                 연동 문서
                //             </button>
                //         </Link>
                //         <Link to="https://discord.gg/A4fRFXQhRu">
                //             <button
                //                 className="button p-grid-col5"
                //                 style={{
                //                     backgroundColor: "#e8f3ff",
                //                     color: "#1b64da",
                //                 }}
                //             >
                //                 실시간 문의
                //             </button>
                //         </Link>
                //     </div>
                //     <Payment3 />
                // </div>
                <p>Loading...</p>
            )}
            {/* <div
                className="box_section"
                style={{ width: "600px", textAlign: "left" }}
            >
                <b>Response Data :</b>
                <div id="response" style={{ whiteSpace: "initial" }}>
                    {responseData && (
                        <pre>{JSON.stringify(responseData, null, 4)}</pre>
                    )}
                </div>
            </div> */}
        </>
    );
}
