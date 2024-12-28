import React, { useState } from 'react';
import styles from '../../../scss/service/Accordion.module.scss';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

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

const MyProfile = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>나의 프로필</div>
            <Accordion title="이메일 뉴스레터 구독 취소">
                <div>
                    조 말론 런던 회원이라면 나의 계정의 '계정 정보'를 클릭하신 후 페이지 하단의 '조 말론 런던 뉴스레터'
                    체크 표시를 해제하세요.
                </div>
            </Accordion>
            <Accordion title="가입하기">
                <div>회원가입을 클릭하여 회원 가입 후 계정을 만들어보세요.</div>
            </Accordion>
            <Accordion title="멤버쉽 혜택">
                <div>
                    회원 가입 후 더 빠르고 쉽게 조 말론 런던 온라인 매장에서의 쇼핑을 즐겨보세요. 월드 오브 조 말론
                    런던™이 전해드리는 각종 최신 소식을 가장 먼저 접해보세요.
                    <br />
                    조 말론 런던의 회원만이 누릴 수 있는 혜택:
                    <br />
                    <br />
                    <div>
                        <b>최신 소식을 누구보다 먼저 받아보세요</b>
                        <p>
                            한정판 컬렉션부터 신제품, 독특한 선물 제안 소식까지. 월드 오브 조 말론 런던™이 전해드리는
                            각종 최신 소식을 가장 먼저 접해보세요.
                        </p>
                    </div>
                    <div>
                        <br />
                        <b>간편한 결제</b>
                        <p>저장해 둔 배송지 정보를 이용해 더 빠르고 간편한 온라인 쇼핑을 즐기실 수 있습니다.</p>
                        <br />
                    </div>
                    <div>
                        <b>배송 상태 조회</b>
                        <p>배송 상태 조회 및 수령 가능일 관련 정보를 확인하실 수 있습니다.</p>
                        <br />
                    </div>
                    <p>
                        <b>주문 내역</b>
                        <br />
                        과거 주문 내역을 참고해 구매 결정을 내릴 수 있습니다.
                    </p>
                    <p>
                        jomalone.co.kr는 고객님의 개인정보를 소중히 여기고 있습니다. 고객의 동의를 얻은 경우 또는
                        개인정보취급방침 제5조에 해당하는 경우 이외에 제 삼자에게 고객의 개인정보를 제공하지 않습니다.
                    </p>
                </div>
            </Accordion>
        </div>
    );
};

export default MyProfile;
