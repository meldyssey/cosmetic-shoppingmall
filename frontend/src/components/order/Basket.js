import React, { useState, useEffect } from 'react';
import styles from '../../scss/order/basket.module.scss';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Basket(props) {
    const [prod, setProd] = useState([]);
    const navigate = useNavigate();

    const email = sessionStorage.getItem('email');
    const bkURL = process.env.REACT_APP_BACK_URL;

    // 장바구니 내역 불러오기
    function dataInit() {
        axios
            .get(`${bkURL}/basket/${email}`)
            .then((res) => {
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
        dataInit();
    }, []);

    // 수량 변경
    const handleQuantityChange = (id, quantity) => {
        const updatedProd = prod.map((item) =>
            item.bs_product_id === id ? { ...item, quantity: parseInt(quantity, 10) } : item
        );
        setProd(updatedProd);
    };

    // 총합계 계산
    const getTotal = () => {
        return prod.reduce((sum, product) => sum + product.product_price * product.quantity, 0);
    };

    // 장바구니 정보 삭제
    function delBasket(id) {
        axios
            .delete(`${bkURL}/basket/delete/${id}`)
            .then((res) => {
                alert('삭제되었습니다.');
                dataInit();
            })
            .catch((err) => {
                console.log('삭제오류 : ', err);
            });
    }

    function paymentGo() {
        navigate('/payment1');
    }

    return (
        <div className={styles.wrap}>
            {prod.length > 0 ? (
                <>
                    <h2 className={styles.shoppingHead}>장바구니</h2>
                    <div className={styles.shoppingHead2}>({prod.length} 개의 제품 / 장바구니에 담긴 제품 개수)</div>

                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>제품명</th>
                                <th>가격</th>
                                <th>수량</th>
                                <th>합계</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prod.map((pp) => {
                                // 각 합계 계산
                                const totalPrice = pp.product_price * pp.quantity;

                                return (
                                    <tr key={pp.bs_product_id}>
                                        <td>
                                            <div>{pp.product_name_kor}</div>
                                            <div className={styles.productEng}>{pp.product_name_eng}</div>
                                            <div>{pp.product_volume}</div>
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
                                        <td>
                                            <button onClick={() => delBasket(pp.bs_id)} className={styles.deleteBtn}>
                                                삭제
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    <div className={styles.footer}>
                        <div className={styles.total}>총합계: ₩ {getTotal().toLocaleString()}</div>
                        <button onClick={paymentGo} className={styles.paymentBtn}>
                            주문서 작성
                        </button>
                    </div>
                </>
            ) : (
                <div className={styles.zero}>
                    <div>장바구니가 비어 있습니다.</div>
                    <Link to="/">쇼핑 계속하기</Link>
                </div>
            )}
        </div>
    );
}

export default Basket;
