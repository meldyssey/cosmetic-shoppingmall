import React, { useEffect, useState } from 'react';
import styles from '../../scss/product/productCard.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const bkURL = process.env.REACT_APP_BACK_URL;

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const [curProduct, setCurProduct] = useState([]);
    const email = sessionStorage.getItem('email');

    useEffect(() => {
        console.log('ProductCard 동작');

        if (!product) {
            console.log(`상품이 없습니다`);
            return;
        }

        setCurProduct(product);

        window.scrollTo(0, 0);
    }, [product]);

    const naviGo = (route) => {
        navigate(route);
    };

    const basketGo = (product_opt_id) => {
        console.log(email);
        if (!email) {
            navigate('/signIn');
        } else {
            const params = { bs_email: email, bs_product_id: product_opt_id };
            console.log(params);
            axios
                .get(`${bkURL}/product/basket`, { params })
                .then((res) => {
                    console.log(res.data);
                    const basketItem = res.data.find((item) => item.bs_product_id == product_opt_id);
                    console.log(basketItem);
                    if (basketItem) {
                        const useConfirm = window.confirm(
                            '이미 장바구니에 추가된 상품입니다. 장바구니에서 제품을 확인하시겠습니까?'
                        );
                        if (useConfirm) {
                            navigate(`/basket`);
                        }
                    } else {
                        const data = params;
                        axios
                            .post(`${bkURL}/product/basket`, data)

                            .then((res) => {
                                console.log('게시물 등록 완료', res.data);
                                const useConfirm = window.confirm(
                                    '장바구니에 제품이 담겼습니다. 장바구니에서 제품을 확인하시겠습니까?'
                                );
                                if (useConfirm) {
                                    navigate(`/basket`);
                                }
                            })
                            .catch((err) => {
                                console.error('에러발생 ; ', err);
                            });
                    }
                })
                .catch((err) => console.error('axios 에러', err));
        }
    };

    const fileGo = (file) => {
        if (file) {
            return <img src={`${bkURL}/imgs/product/${file}`} />;
        }
        return null;
    };
    if (!product) {
        return <div>제품이 없습니다.</div>;
    }
    if (!curProduct) {
        return <div>제품이 없습니다.</div>;
    }

    return (
        <div className={styles.cardTotal}>
            {curProduct.map((prod, i) => {
                return (
                    <div className={styles.card} key={prod.product_opt_id}>
                        <div
                            className={styles.cardContent}
                            onClick={() => {
                                naviGo(`/product/${prod.product_opt_id}`);
                            }}
                        >
                            {fileGo(prod.product_upSystem)}
                            <div>
                                {prod.product_special ? (
                                    <div className={styles.special}>{prod.product_special}</div>
                                ) : (
                                    <div className={styles.special}></div>
                                )}
                                <div>{prod.product_name_eng}</div>
                                <div>{prod.product_name_kor}</div>
                                <div>{prod.product_volume}</div>
                                <div>₩ {prod.product_price.toLocaleString()}</div>
                            </div>
                        </div>
                        <button onClick={() => basketGo(prod.product_opt_id)}>장바구니 담기</button>
                    </div>
                );
            })}
        </div>
    );
};

export default ProductCard;
