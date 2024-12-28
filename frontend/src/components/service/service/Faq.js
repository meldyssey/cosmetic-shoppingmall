import React, { useState } from 'react';
import '../../../scss/service/TopMenu.scss';
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

const Faq = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>자주 묻는 질문</div>
            <p>
                주문 취소나 주소 변경 등 신속한 처리가 필요한 사항은 조 말론 런던 온라인 부티크 고객관리지원팀
                (1644-3753)로 문의해주세요.
            </p>
            <p className={styles.faqtitle}>자주 묻는 질문과 답변 :</p>
            <div>
                <Accordion title="나의 주문 내역은 어디서 확인하나요?">
                    <p>
                        온라인으로 고객님의 주문 상태를 확인하실 수 있습니다. 또는 조 말론 런던 고객관리지원팀
                        (1644-3753) 로 전화 문의, consumercare-kr@jomalone.com. 으로 이메일 문의도 가능합니다. 문의 시
                        고객님의 주문 확인 번호를 함께 알려주세요.
                    </p>
                </Accordion>
            </div>

            <div>
                <Accordion title="해외 주문도 가능한가요??">
                    <p>
                        조 말론 런던 온라인 부티크에서 주문하신 제품은 한국 내로만 배송이 가능하며, 해외 배송이
                        불가능합니다.
                    </p>
                </Accordion>
            </div>
            <div>
                <Accordion title="결제 시 신용카드를 사용해도 안전한가요?">
                    <p>
                        jomalone.co.kr에서의 주문 과정에서 수집되는 모든 정보는 온라인 보안 관련 최신 암호화 기술인
                        Secure Socket Layer (SSL)을 이용하여 암호화 됩니다. <br />
                        사이트 내에서는 안심하고 결제하셔도 좋습니다.
                        <br />
                        암호화 기능이 작동하기 위해서는 SSL프로토콜을 사용할 수 있는 브라우저가 필요합니다.
                        <br /> SSL프로토콜이 사용 가능한 브라우저는 다음과 같습니다 :
                        <br />
                        • Internet Explorer 6.0 또는 그 이상
                        <br />
                        • Mozilla Firefox 2.0.4 또는 그 이상
                        <br />
                        • Safari 2.0.4 또는 그 이상
                        <br />
                        jomalone.co.kr는 ISIS & IDIS 인증을 받은 웹사이트입니다.
                        <br />
                        웹사이트 내에 ISIS & IDIS 로고가 보이면 안심하고 쇼핑하셔도 됩니다.
                    </p>
                </Accordion>
            </div>
            <div>
                <Accordion title="뉴스레터 수신 변경은 어떻게 하나요?">
                    <p>
                        조 말론 런던 온라인 부티크의 회원이시라면 마이페이지를 클릭하시어 뉴스레터 수신 여부를 변경하실
                        수 있습니다.
                    </p>
                </Accordion>
            </div>
            <div>
                <Accordion title="조 말론 런던 샘플 제품은 어떻게 받을 수 있나요?">
                    <p>
                        샘플 재고가 있는 경우, 고객관리지원팀에 요청하실 필요 없이 제품 주문 시 제공받으실 수 있습니다.
                        어떤 향을 선택해야할 지 고민이라면 조 말론 런던 고객관리지원팀 (1644-3753)로 문의하세요. 무료
                        프레그런스 컴바이닝 상담 서비스를 통해 스페셜리스트의 조언을 받으실 수 있습니다.
                    </p>
                </Accordion>
            </div>
            <div>
                <Accordion title="조 말론 런던에 제공한 정보를 다른 사람이 볼 수 있나요?">
                    <p>
                        조 말론 런던은 고객님의 개인정보를 소중히 여기고 있습니다. 고객의 동의없이 제 3자에게 정보를
                        제공하지 않습니다. 더 자세한 사항은 개인정보취급방침을 참고하세요.
                    </p>
                </Accordion>
            </div>

            <div>
                <Accordion title="교환 및 환불 정책에 대해 알고 싶습니다.">
                    <p>
                        조 말론 런던은 고객 만족도를 높이기 위하여 최선의 노력을 다하고 있습니다. 하지만 어떤 이유에서든
                        주문하신 제품이 만족스럽지 않거나, 주문을 취소하고자 하시는 고객께서는 제품 수령일로부터 영업일
                        기준 7일 이내에 원 상태의 제품을 반품하실 수 있습니다.
                    </p>
                </Accordion>
            </div>
            <div>
                <Accordion title="조 말론 런던 제품은 어디서 구매할 수 있나요?">
                    <p>
                        조 말론 런던 제품은 한국 내, 전 세계 지정된 상점에서 구매하실 수 있습니다. 한국 내 가까운 조
                        말론 런던 부티크를 알아보시려면 부티크 찾기를 이용해보세요.
                    </p>
                </Accordion>
            </div>
            <div>
                <Accordion title="요청을 통해 샘플을 받아볼 수 있나요?">
                    <p>
                        따로 요청을 통한 샘플 제공 서비스는 없습니다.
                        <br />
                        샘플 용량의 제품은 따로 유통되지 않으며 구매가 불가능합니다. 온라인 구매 시 결제 과정에서 원하는
                        샘플을 선택하실 수 있으며, 또는 홍보 행사 시 소매점에서 제공받으실 수 있습니다.
                        <br />
                        직접 매장을 방문하셔서 고객님께 어울리는 향수를 추천받아보세요. 매장 찾기 서비스를 이용하시려면
                        이 링크를 클릭하세요 : https://www.jomalone.co.kr/stores 조 말론 런던 제품을 홍보하고자 하는
                        블로그 운영자께서는 조 말론 런던 고객관리지원팀(1644-3753)으로 연락주시면 관계 부서로
                        연결해드리겠습니다.
                    </p>
                </Accordion>
            </div>
            <div>
                <Accordion title="제가 즐겨 사용하는 제품이 왜 단종되었나요? 구매할 수 있는 방법은 없나요?">
                    <p>
                        제품 및 사이즈의 단종 여부는 다양한 소비자 분들의 구매 패턴과 제품 선호도 등의 여러 가지 요인을
                        종합적으로 고려해 결정됩니다.
                        <br />
                        조 말론 런던 고객관리지원팀으로 연락 주시면 고객님께 맞는 대체제품 추천 및 보다 자세한 안내를
                        도와드리겠습니다.
                        <br />
                        전화문의: 조 말론 런던 고객관리지원팀 1644-3753
                        <br />
                        이메일문의: www.jomalone.co.kr 고객관리지원팀 이메일 문의
                        <br />
                        consumercare-kr@jomalone.com
                        <br />
                        공휴일 및 기타 휴무일에는 배송이 이루어지지 않으며, 해외 지역은 배송이 불가합니다.
                        <br />
                        <br />
                        <b>불만 사항은 어디에 접수하나요?</b>
                        <br />조 말론 런던 고객관리지원팀 (1644-3753) 또는 consumercare-kr@jomalone.com로 문의 바랍니다.
                    </p>
                </Accordion>
            </div>
        </div>
    );
};

export default Faq;
