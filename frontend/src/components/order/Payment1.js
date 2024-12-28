import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PayHead from './PayHead';
import PayModal1 from './PayModal1';
import axios from 'axios';
import styles from '../../scss/order/payment1.module.scss';

function Payment1(props) {
    const email = sessionStorage.getItem('email');
    const [ordersData, setOrder] = useState();
    const [isModal, setModal] = useState(false);
    const navigate = useNavigate();

    const bkURL = process.env.REACT_APP_BACK_URL;

    if (!email) {
        navigate('/signIn');
    }

    // 기본 회원 정보 가져오기
    function pageLoad() {
        axios
            .get(`${bkURL}/payment1/${email}`)
            .then((res) => {
                setOrder(res.data);
            })
            .catch((err) => {
                console.error('에러발생 : ', err);
            });
    }

    useEffect(() => {
        pageLoad();
    }, []);

    const handleOpenModal = (e) => {
        e.preventDefault();
        setModal(true);
    };

    const handleCloseModal = () => {
        setModal(false);
    };

    // 모달창에 입력한 값 저장해서 화면에 적용
    const handleSave = (updatedData) => {
        setOrder(updatedData);
    };

    function payment2GO() {
        if (!fullAddress) {
            alert('배송지를 등록해주세요');
            return;
        }
        const myData = Object.fromEntries(new FormData(document.myFrm));
        navigate('/payment2', {
            state: { myData: myData, ordersData: ordersData },
        });
    }

    if (!ordersData) {
        return <div>로딩중...</div>;
    }

    const fullAddress =
        ordersData.zip && ordersData.roadname_address && ordersData.building_name && ordersData.detail_address;

    return (
        <div className={styles.wrap}>
            <PayHead activeStep={0} />
            <form name="myFrm" className={styles.frmData}>
                <div className={styles.shoppingHead}>배송지 정보</div>
                <div className={styles.orderInfo}>
                    <div>주문자명 : {ordersData.customer_name}</div>
                    {fullAddress ? (
                        <>
                            <div>우편번호 : {ordersData.zip}</div>
                            <div>
                                주소 : {ordersData.roadname_address} &nbsp;
                                {ordersData.building_name} &nbsp;
                                {ordersData.detail_address}
                            </div>
                        </>
                    ) : (
                        '배송지를 등록해주세요.'
                    )}

                    <div>전화번호 : {ordersData.contact_number}</div>
                </div>

                <div className={styles.btnGroup}>
                    {fullAddress ? (
                        <button onClick={handleOpenModal}>배송지 수정</button>
                    ) : (
                        <button onClick={handleOpenModal}>배송지 추가</button>
                    )}
                </div>

                {isModal && (
                    <PayModal1 onClose={handleCloseModal} onSave={handleSave} btnData={ordersData} email={email} />
                )}

                <div className={styles.deliveryRequest}>
                    <label>
                        <span>배송요청사항</span>
                        <textarea name="order_msg"></textarea>
                    </label>
                </div>

                <input type="button" onClick={payment2GO} value="주문검토" className={styles.submitBtn} />
            </form>
        </div>
    );
}

export default Payment1;
