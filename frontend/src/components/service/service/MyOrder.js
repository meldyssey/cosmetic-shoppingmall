import React, { useState } from 'react';
import styles from '../../../scss/service/Accordion.module.scss';

//Accordion 컴포넌트 : 제목 (title)과 내용 (children)을 받아서 펼치기/접기 구현
const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false); // 아코디언 열림 상태 관리 (true: 열림, false: 닫힘)

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={isOpen ? `${styles.accordion} ${styles.open}` : `${styles.accordion}`}>
            {/* 아코디언 제목 */}
            <h2 className={styles['accordion-title']} onClick={toggleAccordion}>
                {title}
            </h2>

            {/* 아코디언 내용 */}
            {isOpen && <div className={styles['accordion-content']}>{children}</div>}
        </div>
    );
};

const MyOrder = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>나의 주문</div>
            <Accordion title="주문 프로세스">
                <ul>
                    <li className={styles.orderli}>주문하신 제품은 택배 서비스를 통해 배송될 예정입니다.</li>
                    <li className={styles.orderli}>
                        조 말론 런던 온라인 부티크 주문 제품의 배송은 평일에 이루어집니다. (주말, 공휴일은 제외) 제품의
                        재고 유무에 따라 결제 완료 후 영업일 기준으로 3일정도 소요됩니다.
                    </li>
                    <li className={styles.orderli}>
                        무통장 입금(가상계좌)으로 구매 시, 주문일자 당일 23시 59분까지 입금해야 결제가 완료됩니다. 입금
                        완료 후 부터 상품 포장 및 배송이 진행되는 점 참고 부탁드립니다.
                    </li>
                    <li className={styles.orderli}>
                        조 말론 런던 온라인 부티크 주문 제품의 배송지 설정은 국내 주소만 가능함을 알려드립니다.
                    </li>
                </ul>
            </Accordion>

            <Accordion title="주문 관련 문의사항">
                <p>
                    최근 주문 관련 정보를 확인하시려면 ‘마이페이지’의 ‘주문내역을 참고하시거나 여기를 클릭해주세요. 조
                    말론 런던의 온라인 부티크의 주문 관련 최신 정보를 확인할 수 있는 가장 빠른 방법입니다.
                </p>
                <br />
                <p>
                    '나의 주문' 클릭 후, 이메일 주소와 비밀번호를 입력해 로그인 하시면, 주문 요약 페이지에서 최근 및
                    과거 주문 내역 정보를 확인하실 수 있습니다.
                </p>
                <br />
                <p>
                    주문 제품이 출고된 후에는 ‘주문정보’의 운송장 번호를 클릭하여 온라인 주문 제품의 현재 배송 상태를 알
                    수 있습니다.
                </p>
                <br />
                <p>
                    주문 제품 출고 후 24시간 이내에는 택배사 측에서 제품의 배송 상태 관련 정보를 업데이트 하지 않을 수
                    있음을 유념해주십시오.
                </p>
            </Accordion>

            <Accordion title="주문 취소">
                <p>주문 제품 전체 또는 일부가 아래와 같은 이유로 주문이 취소되는 경우가 있습니다 :</p>
                <ul>
                    <li className={styles.orderli}>주문 불가한 제품의 경우.</li>
                    <li className={styles.orderli}>결제 정보 처리에 문제가 있는 경우</li>
                    <li className={styles.orderli}>입력하신 배송지 주소로 배송이 불가한 경우</li>
                    <li className={styles.orderli}>이중 주문 처리된 경우</li>
                </ul>
                <p>
                    상기와 같은 이유로 주문이 취소된 경우, 주문 취소 사유를 알려드리기 위한 이메일이 발송됩니다.
                    결제하신 금액은 환불처리됩니다.
                </p>
                <p>
                    주문 제품 출고 이전에 주문을 취소하고자 하시는 고객께서는 조 말론 런던 고객관리지원팀
                    (1644-3753)에서 상담이 가능합니다. 주문 처리 속도가 빨라 통상 주문 후 1-2일 내에 제품이 출고되어,
                    출고 전 조치가 어려울 수 있습니다. 이 경우 제품 수령 후 조 말론 런던의 환불 정책에 따라 반품/환불
                    처리해주시기 바랍니다.
                </p>
            </Accordion>
        </div>
    );
};

export default MyOrder;
