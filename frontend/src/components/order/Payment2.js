import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PayHead from './PayHead';
import styles from '../../scss/order/payment2.module.scss';
import axios from 'axios';

function Payment2(props) {
    const location = useLocation();
    const navigate = useNavigate();

    const email = sessionStorage.getItem('email');
    const [ordersData, setOrder] = useState();
    const [data, setData] = useState();
    const [prod, setProd] = useState();
    const [isLoading, setIsLoading] = useState();

    const bkURL = process.env.REACT_APP_BACK_URL;

    if (!email) {
        navigate('/signIn');
    }

    function dataInit() {
        // 해당 고객의 장바구니 접근
        axios
            .get(`${bkURL}/payment2/${email}`)
            .then((res) => {
                // console.log(res.data)
                const updatedProd = res.data.map((item) => ({
                    ...item,
                    quantity: 1,
                }));
                setProd(updatedProd);
            })
            .catch((err) => {
                console.error('에러발생 : ', err);
            });
    }

    useEffect(() => {
        const { myData, ordersData } = location.state;
        if (myData.order_msg === '') {
            myData.order_msg = '없음';
        }
        setData(myData);
        setOrder(ordersData);
        console.log('myData', myData.order_msg);
        dataInit();
    }, []);

    // 데이터 가져온 후 페이지 동작
    if (!ordersData) {
        return <div>로딩중...</div>;
    }
    if (!prod) {
        return <div>로딩중...</div>;
    }
    if (!data) {
        return <div>로딩중...</div>;
    }

    const handleQuantityChange = (id, quantity) => {
        const updatedProd = prod.map((item) =>
            item.bs_product_id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
        );
        setProd(updatedProd);
    };

    const getTotal = () => {
        // console.log(prod)
        return prod.reduce((sum, product) => sum + product.product_price * product.quantity, 0);
    };

    // 결제 정보 넘기기
    function orderFin(e) {
        e.preventDefault();
        const myData = Object.fromEntries(new FormData(document.myFrm));

        if (!myData.payment) {
            alert('결제수단을 정해주세요');
            return;
        }

        const orderPayload = {
            email: email,
            pay_to: myData.payment,
            order_to: ordersData.customer_name,
            order_total: getTotal(),
            order_tel: ordersData.contact_number,
            zip: ordersData.zip,
            roadname_address: ordersData.roadname_address,
            building_name: ordersData.building_name,
            detail_address: ordersData.detail_address,
            order_msg: data.order_msg || null,
            products: prod.map((item) => ({
                product_id: item.bs_product_id,
                order_cnt: item.quantity,
                product_price: item.product_price * item.quantity,
            })),
            status: '주문완료',
        };
        console.log(orderPayload);

        axios
            .post(`${bkURL}/payment2/join/${email}`, orderPayload)
            .then((res) => {
                alert('결제되었습니다.');
                // navigate('/payment3')
                setIsLoading(true);
                // console.log(res.data)

                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/payment3', { state: { orderId: res.data } });
                }, 3000);
            })
            .catch((err) => {
                console.log('삭제오류 : ', err);
            });

        axios
            .delete(`${bkURL}/payment2/delete/${email}`)
            .then((res) => {})
            .catch((err) => {
                console.log('삭제오류 : ', err);
            });
    }

    return (
        <div className={styles.wrap}>
            <PayHead activeStep={1} />
            <form name="myFrm" className={styles.myform}>
                <div className={styles.payments}>
                    <div>결제방법</div>
                    <label>
                        <input type="radio" name="payment" value="card" />
                        신용카드
                    </label>
                    <label>
                        <input type="radio" name="payment" value="kakao" />
                        Kakaopay
                    </label>
                    <label>
                        <input type="radio" name="payment" value="payco" />
                        Payco
                    </label>
                    <label>
                        <input type="radio" name="payment" value="naver" />
                        네이버페이
                    </label>
                </div>
                <div className={styles.addressinfo}>
                    <div>배송지정보</div>
                    <div>{ordersData.customer_name}</div>
                    <div>{ordersData.zip}</div>
                    <div>
                        {ordersData.roadname_address} &nbsp;
                        {ordersData.building_name} &nbsp;
                        {ordersData.detail_address}
                    </div>
                    <div>{ordersData.contact_number}</div>
                </div>
                <div>
                    <div className={styles.requirement}>배송요청사항</div>
                    <div className={styles.requirementdetail}>{data.order_msg}</div>
                </div>
                <div>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>제품</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>합계</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prod.map((pp, i) => {
                                const totalPrice = pp.product_price * pp.quantity;
                                return (
                                    <tr key={i}>
                                        <td className={styles.productInfo}>
                                            <div>
                                                <div>{pp.product_name_kor}</div>
                                                <div>{pp.product_name_eng}</div>
                                                <div>{pp.product_volume}</div>
                                            </div>
                                        </td>
                                        <td>₩ {pp.product_price.toLocaleString()}</td>
                                        <td>
                                            <select
                                                value={pp.quantity}
                                                onChange={(e) => handleQuantityChange(pp.bs_product_id, e.target.value)}
                                            >
                                                {Array.from({ length: 8 }, (_, i) => i + 1).map((qty) => (
                                                    <option key={qty} value={qty}>
                                                        {qty}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>₩ {totalPrice.toLocaleString()}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td></td>
                                <td></td>
                                <td className={styles.totalLabel}>총합계</td>
                                <td className={styles.totalAmount}>₩ {getTotal().toLocaleString()}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <input type="submit" onClick={orderFin} value="결제하기" className={styles.submit} />
                    {isLoading && <div>로딩중...</div>}
                </div>
            </form>
        </div>
    );
}

export default Payment2;
