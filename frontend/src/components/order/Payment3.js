import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from '../../scss/order/payment3.module.scss';
import PayHead from './PayHead';

function Payment3(props) {
    const location = useLocation();
    const [data, setData] = useState();
    const navigate = useNavigate();
    const email = sessionStorage.getItem('email');

    if (!email) {
        navigate('/signIn');
    }

    useEffect(() => {
        const { orderId } = location.state;
        setData(orderId);
    }, []);

    return (
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
                            주문하신 제품은 결제완료 시점으로부터 영업일 기준 3일 내에 받아보실 수 있습니다.
                            <br />
                            단, 도서 지역 및 섬 지역은 지연 될 수 있으며 명절 및 연말이나 주문 폭주 시 또한 지연 될 수
                            있습니다.
                            <br />
                            <br />
                            주문이 완료되었다고 해도 재고부족 등의 이유로 주문 취소가 될 수 있으니 이점 양해
                            부탁드립니다.
                            <br />조 말론 런던 온라인 부티크에서는 이용자가 구매 신청한 제품 등이 품절 등의 사유로
                            <br />
                            인도 또는 제공을 할 수 없을 때에는 그 사유를 이용자에게 통지하고
                            <br />
                            사전에 제품 등의 대금을 받은 경우에는 환급하거나 환급에 필요한 조치를 취합니다.
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
    );
}

export default Payment3;
