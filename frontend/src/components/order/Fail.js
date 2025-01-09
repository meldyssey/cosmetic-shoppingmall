// import { useSearchParams } from "react-router-dom";

// export function FailPage() {
//     const [searchParams] = useSearchParams();
//     const errorCode = searchParams.get("code");
//     const errorMessage = searchParams.get("message");

//     return (
//         <div className="wrapper w-100">
//             <div className="flex-column align-center w-100 max-w-540">
//                 <img
//                     src="https://static.toss.im/lotties/error-spot-apng.png"
//                     width="120"
//                     height="120"
//                 />
//                 <h2 className="title">결제를 실패했어요</h2>
//                 <div className="response-section w-100">
//                     <div className="flex justify-between">
//                         <span className="response-label">code</span>
//                         <span id="error-code" className="response-text">
//                             {errorCode}
//                         </span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="response-label">message</span>
//                         <span id="error-message" className="response-text">
//                             {errorMessage}
//                         </span>
//                     </div>
//                 </div>

//                 <div className="w-100 button-group">
//                     <a
//                         className="btn"
//                         href="https://developers.tosspayments.com/sandbox"
//                         target="_blank"
//                         rel="noreferrer noopener"
//                     >
//                         다시 테스트하기
//                     </a>
//                     <div className="flex" style={{ gap: "16px" }}>
//                         <a
//                             className="btn w-100"
//                             href="https://docs.tosspayments.com/reference/error-codes"
//                             target="_blank"
//                             rel="noreferrer noopener"
//                         >
//                             에러코드 문서보기
//                         </a>
//                         <a
//                             className="btn w-100"
//                             href="https://techchat.tosspayments.com"
//                             target="_blank"
//                             rel="noreferrer noopener"
//                         >
//                             실시간 문의하기
//                         </a>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import { Link, useSearchParams } from "react-router-dom";
import styles from "../../scss/order/payment3.module.scss";

export function FailPage() {
    const [searchParams] = useSearchParams();

    return (
        <div className={styles.wrap} style={{ marginTop: "50px" }}>
            <div className={styles.wrapper}>
                <div className={styles.orderFin}>
                    <div className={styles.orderNum}>
                        <img
                            width="100px"
                            src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
                            alt="에러 이미지"
                        />
                        <div
                            className={styles.notice}
                            style={{ marginBottom: "100px" }}
                        >
                            <h1>결제오류</h1>
                            <h4>{`${searchParams.get("message")}`}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        // <div
        //     id="info"
        //     className="box_section"
        //     style={{ width: "100%", textAlign: "center" }}
        // >
        //     <img
        //         width="100px"
        //         src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png"
        //         alt="에러 이미지"
        //     />
        //     <h2>결제를 실패했어요</h2>
        //     <div
        //         className="p-grid typography--p"
        //         style={{
        //             margin: "50px",
        //             // width: "300px",
        //             // border: "1px solid #000",
        //         }}
        //     >
        //         <div
        //             className="p-grid-col text--right"
        //             id="message"
        //         >{`${searchParams.get("message")}`}</div>
        //     </div>
        // </div>
    );
}
