import React, { useEffect, useState } from "react";
import styles from "../../../scss/product/detailTop.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import DetailVolume from "./DetailVolume";

const bkURL = process.env.REACT_APP_BACK_URL;

const DetailTop = () => {
    const { product_opt_id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    const email = sessionStorage.getItem("email");
    // console.log(product_opt_id);

    const productGetAxios = () => {
        // console.log("product_scent : ", product_scent);
        if (!product_opt_id) {
            console.log("데이터 없음");
            return;
        }
        axios
            .get(`${bkURL}/product/detail/${product_opt_id}`)
            .then((res) => {
                // console.log(res.data);
                setProduct(res.data);
            })
            .catch((err) => {
                console.error("에러발생 ; ", err);
            });
    };

    useEffect(() => {
        productGetAxios();
    }, [product_opt_id]);

    const basketGo = (product_opt_id) => {
        // console.log(email);
        if (!email) {
            navigate("/signIn");
        } else {
            const params = { bs_email: email, bs_product_id: product_opt_id };
            // console.log(params);
            axios
                .get(`${bkURL}/product/basket`, { params })
                .then((res) => {
                    // console.log(res.data);
                    const basketItem = res.data.find(
                        (item) => item.bs_product_id == product_opt_id
                    );
                    // console.log(basketItem);
                    if (basketItem) {
                        const useConfirm = window.confirm(
                            "이미 장바구니에 추가된 상품입니다. 장바구니에서 제품을 확인하시겠습니까?"
                        );
                        if (useConfirm) {
                            navigate(`/basket`);
                        }
                    } else {
                        const data = params;
                        axios
                            .post(`${bkURL}/product/basket`, data)

                            .then((res) => {
                                // console.log("게시물 등록 완료", res.data);
                                const useConfirm = window.confirm(
                                    "장바구니에 제품이 담겼습니다. 장바구니에서 제품을 확인하시겠습니까?"
                                );
                                if (useConfirm) {
                                    navigate(`/basket`);
                                }
                            })
                            .catch((err) => {
                                console.error("에러발생 ; ", err);
                            });
                    }
                })
                .catch((err) => console.error("axios 에러", err));
        }
    };

    function fileGo(file) {
        if (file) {
            return <img src={`${bkURL}/imgs/product/${file}`} />;
        }
        return null;
    }

    if (!product) {
        return <div> id 없음</div>;
    }
    return (
        <div className={styles.detailTop}>
            <div className={styles.imgWrap}>
                {fileGo(product.product_upSystem)}
            </div>
            <div className={styles.contentWrap}>
                <div className={styles.textWrap}>
                    <div className={styles.tag}>{product.product_special}</div>
                    <div className={styles.prodName}>
                        <div>{product.product_name_eng}</div>
                        <div>{product.product_name_kor}</div>
                    </div>
                    <div className={styles.price}>{product.product_volume}</div>
                    <div className={styles.price}>
                        ₩ {product.product_price.toLocaleString()}
                    </div>
                    <div className={styles.prodInfo}>
                        {product.product_intro}
                    </div>
                </div>
                <DetailVolume product_id={product.product_id} />
                <div className={styles.btnWrap}>
                    <button onClick={() => basketGo(product_opt_id)}>
                        장바구니 담기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetailTop;
