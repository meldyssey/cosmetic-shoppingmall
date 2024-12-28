import React, { useState } from 'react';
import styles from '../../../scss/service/Accordion.module.scss';

const Accordion = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        // <div className={`accordion ${isOpen ? 'open' : ''}`}>
        <div className={isOpen ? `${styles.accordion} ${styles.open}` : `${styles.accordion}`}>
            <h2 className={styles['accordion-title']} onClick={toggleAccordion}>
                {title}
            </h2>

            {isOpen && <div className={styles['accorion-content']}>{children}</div>}
        </div>
    );
};

const OnlineShopping = () => {
    return (
        <div className={styles.onlinewrapper}>
            <div className={styles.title}>온라인 쇼핑하기</div>
            <Accordion title="온라인 쇼핑 방법">
                <br />
                <p className={styles.bold}>
                    조 말론 런던 온라인 부티크에 온라인에 오신 것을 환영합니다. 쉽고, 편리하고 안전한 쇼핑을 즐기실 수
                    있습니다. 구매를 원하시는 제품을 선택하신 후 아래의 순서에 따라 진행해 주세요 :
                </p>
                <br />
                <b className={styles.bold}>1. 원하는 제품 찾기 및 장바구니에 담기</b>
                <ul>
                    <li className={styles.listyle}>
                        각 카테고리를 참고하거나 사이트 내 검색창을 이용해 원하는 제품을 찾아보세요.
                    </li>
                    <li className={styles.listyle}>
                        원하는 제품을 찾으셨다면 용량을 선택하고 '장바구니에 담기' 버튼을 클릭하세요.
                    </li>
                    <li className={styles.listyle}>
                        제품 이미지 참고 후 '미리보기' 버튼을 클릭하고 '장바구니에 담기' 버튼을 클릭하시거나, 제품 상세
                        정보를 원하시면 제품명 또는 '자세히 보기'를 클릭하세요. 자세히 보기 페이지에서 원하는 제품을
                        장바구니에 담으실 수 있습니다.
                    </li>
                    <li className={styles.listyle}>장바구니 페이지에서 주문수량을 조정하실 수 있습니다.</li>
                </ul>
                <b className={styles.bold}>2. 장바구니</b> <br /> <br />
                <p>
                    쇼핑을 마치셨다면 각 페이지의 장바구니 아이콘을 클릭하세요. 장바구니 페이지에서 쇼핑 정보를 확인하고
                    주문 수량를 조정하실 수 있습니다. 결제를 진행하시려면 결제 버튼을 클릭하세요.
                </p>
                <br />
                <b className={styles.bold}>3. 주문 상세 정보</b> <br /> <br />
                <p>
                    아직 로그인을 하지 않으셨다면 로그인 페이지로 넘어가게 됩니다. 로그인 후 결제 밎 배송지 정보를
                    입력하세요. 계정 정보에 저장해 둔 결제 및 배송지 정보가 있다면 재입력하지 않으셔도 됩니다.
                </p>
                <br />
                <b className={styles.bold}>4. 확인</b> <br /> <br />
                <p>
                    주문 확인이 끝나면, 주문 확인 번호 및 결제 금액이 주문 확인 페이지에 나타납니다. 이 페이지를 즉시
                    출력 후 보관하실 수 있으며 고객님의 이메일로도 주문 확인서가 발송됩니다. 이메일에는 주문하신 제품
                    정보, 배송지 주소, 배송 방법, 포장 관련 모든 정보가 포함되어 있습니다. 문의사항이 있으시면 언제든지
                    조 말론 런던 고객관리지원팀(1644-3753)으로 연락 바랍니다.
                    <br /> <br />
                    <b className={styles.bold}>장바구니 보기</b>
                    <br />
                    장바구니 아이콘을 클릭하시면 선택하신 제품의 종류, 수량 및 가격 정보를 확인하실 수 있습니다.
                    장바구니 페이지에서 주문하고자 하는 제품의 삭제, 수량 조정이 가능합니다.
                    <br /> <br />
                    <b className={styles.bold}>장바구니에서 삭제하기</b>
                    <br />
                    선택한 제품을 장바구니에서 삭제하시려면 '장바구니 보기'를 클릭하신 후 제품 명 하단에 있는 '삭제하기'
                    버튼을 클릭하시면 됩니다.
                </p>
            </Accordion>

            <Accordion title="권장 모니터 설정">
                <p className={styles.onlinep}>
                    Internet Explorer 7.0 또는 그 이상을 권장하며 최소 모니터 해상도는 1024 x 768 입니다.
                </p>
                <br />
                <p>설정에 따라 모니터 상 색상이 다르게 보일 수 있음을 유념해 주시기 바랍니다.</p>
            </Accordion>
            <Accordion title="인터넷 브라우저 권장 사양">
                <p className={styles.onlinep}>
                    본 웹사이트에서 최적의 서비스 이용을 위해 Internet Explorer 7.0 또는 그 이상(PC)을 권장합니다.
                </p>
                <br />

                <p>
                    본 웹사이트는 Google Chrome, PC 및 MAC에선 Firefox 3 또는 그 이상, MAC에 한하여 Safari 2.0.4를
                    지원합니다.
                </p>
            </Accordion>
            <Accordion title="온라인 보안">
                <p className={styles.onlinep}>
                    조 말론 런던 온라인 부티크는 온라인 보안의 중요성을 인지하고 고객님이 안전한 온라인 쇼핑을 즐기실 수
                    있도록 최선이 노력을 다하고 있습니다. 본 웹사이트 내의 모든 결제 및 개인정보 수집 과정의 안전성을
                    보장합니다.
                    <br />
                    jomalone.co.kr에서의 주문 과정에서 수집되는 모든 정보는 온라인 보안 관련 최신 암호화 기술인 Secure
                    Socket Layer (SSL)을 이용하여 암호화 됩니다.
                </p>
                <p>
                    암호화 기능이 작동하기 위해서는 SSL프로토콜을 사용할 수 있는 브라우저가 필요합니다. SSL프로토콜이
                    사용 가능한 브라우저는 다음과 같습니다 :
                </p>
                <ul>
                    <li className={styles.listyle}>Internet Explorer 6.0 또는 그 이상</li>
                    <li className={styles.listyle}>Mozilla Firefox 2.0.4 또는 그 이상</li>
                    <li className={styles.listyle}>Safari 2.0.4 또는 그 이상</li>
                </ul>
                <b className={styles.bold}>ISIS & IDIS 인증</b>
                <p>
                    jomalone.co.kr는 ISIS & IDIS 인증을 받은 웹사이트입니다. 웹사이트 내에 ISIS & IDIS 로고가 보이면
                    안심하고 쇼핑하셔도 됩니다. 로고가 의미하는 바는 다음과 같습니다 :
                </p>
                <ul>
                    <li className={styles.listyle}>
                        ISIS 프로그램이 설치되어 있으며 적법한, 정직한, 진실된, 공정한 방법으로 거래할 것을 약속함.
                    </li>
                    <li>웹사이트에서 제공하는 서비스를 IMRG가 검토한 바 있음.</li>
                    <li className={styles.listyle}>
                        웹사이트 내 사업, VAT, 정보보호등록 관련 사항을 IMRG가 검토한 바 있음.
                    </li>
                    <li className={styles.listyle}>온라인 주문 시 명료하고 간결한 배송 정보를 제공함.</li>
                    <li className={styles.listyle}>약속된 일정에 맞추어 편리하고 믿을 수 있는 배송 서비스를 제공함.</li>
                    <li className={styles.listyle}>
                        명료한 환불 절차를 가지고 있으며, 관련된 모든 제한 사항은 구매 이전에 고지가 됨.
                    </li>
                </ul>
            </Accordion>
            <Accordion title="제품 구매 가능 여부">
                <p className={styles.onlinep}>
                    일시적 재고 소진
                    <br />
                    기초 재고가 소진된 경우 jomalone.co.kr는 재고가 소진되었음을 표시합니다.
                </p>
            </Accordion>
            <Accordion title="온라인 부티크 구매 가능 수량 안내">
                <p className={styles.onlinep}>
                    동일 제품 당 최대 8개까지 가능 (총 구매 가능 제품 수량: 총 14개까지 가능)
                    <br />
                    <br />
                    ID당 1일 최대 3개의 주문까지 생성 가능
                </p>
            </Accordion>

            <Accordion title="무료 선물 포장 서비스">
                <p className={styles.onlinep}>
                    본인을 위해, 또는 사랑하는 이를 위해 조 말론 런던의 상징적인 크림색 상자와 블랙 리본을 이용한 선물
                    포장 서비스를 제공합니다.{' '}
                </p>
            </Accordion>
            <Accordion title="가능 결제 수단">
                <p className={styles.onlinep}>다음과 같은 신용카드/체크카드로 결제하실 수 있습니다</p>
                <ul>
                    <li className={styles.listyle}>신용카드</li>
                    <li className={styles.listyle}>무통장 입금</li>
                    <li className={styles.listyle}>휴대폰 소액 결제</li>
                    <p>
                        5만원 이상의 현금으로 물품 거래 시 구매자의 피해보호를 위해 전자결제서비스 사업자인 이니시스를
                        통해 결제대금을 예치하는 에스크로 서비스를 시행하고 있습니다.
                    </p>
                    <br />
                    <a className={styles.linkto} href="https://www.inicis.com/blog/archives/470">
                        결제정보 및 플러그인 설치 방법 자세히 보기
                    </a>
                </ul>
                <p className={styles.watch}>주의사항:</p>
                <p className={styles.onlinep}>
                    안전한 거래 및 사기성 거래 방지를 위해 고객님의 이름 및 주소가 결제 시 사용하는 신용카드 상 이름 및
                    주소와 일치해야 합니다. 조 말론 런던은 이와 같은 조건이 만족되지 않는 거래를 취소할 권리를 가지고
                    있습니다.
                </p>
            </Accordion>
        </div>
    );
};

export default OnlineShopping;
