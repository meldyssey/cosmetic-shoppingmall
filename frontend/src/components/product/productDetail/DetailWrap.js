import React, { useEffect, useState } from "react";
import DetailTop from "./DetailTop";
import DetailAcor from "./DetailAcor";
import DetailTasting from "./DetailTasting";
import ReviewList from "../../service/review/ReviewList";
import ColognesUse from "./ColognesUse";
import { useParams } from "react-router-dom";
import axios from "axios";
import CandleUse from "./CandleUse";
import ProductSwiper from "../ProductSwiper";
import DiffuserUse from "./DiffuserUse";
import styles from "../../../scss/product/detailWrap.module.scss";

const bkURL = process.env.REACT_APP_BACK_URL;

const DetailWrap = () => {
    const { product_opt_id } = useParams();
    const [comp, setComp] = useState(null);
    const [product, setProduct] = useState(null);

    // console.log(product_opt_id);

    const [best, setBest] = useState([]);

    const productGetAxios = () => {
        // console.log("product_scent : ", product_scent);

        axios
            .get(`${bkURL}/product/detail/${product_opt_id}`)
            .then((res) => {
                if (res.data) {
                    setProduct(res.data);
                } else {
                    console.warn("No product data found");
                }
            })
            .catch((err) => {
                console.error("에러발생 ; ", err);
            });
    };
    const bestGetAxios = () => {
        axios
            .get(`${bkURL}/product/`)
            .then((res) => {
                // console.log('서버 다녀옴', res.data);
                let curProduct = res.data.filter(
                    (item) =>
                        item.product_special == "Best Seller" &&
                        item.product_opt_id != product_opt_id
                );
                // console.log(curProduct);
                setBest(curProduct);
            })
            .catch((err) => {
                console.error("에러발생 ; ", err);
            });
    };

    useEffect(() => {
        if (!product_opt_id) {
            console.log("데이터 없음");
            return;
        }
        productGetAxios();
        bestGetAxios();
        window.scrollTo(0, 0);

        // console.log(product.product_category_id);
    }, [product_opt_id]);

    useEffect(() => {
        if (product && product.product_category_id == 1) {
            setComp(
                <>
                    <DetailTasting /> <ColognesUse />
                </>
            );
            // console.log(product);
        } else if (product && product.product_category_id == 2) {
            setComp(<CandleUse />);
        } else {
            setComp(<DiffuserUse />);
        }
    }, [product]);

    // console.log(comp);

    return (
        <div>
            <DetailTop />
            <DetailAcor />
            {comp}
            <div className={styles.recommendTitle}>추천상품</div>
            <ProductSwiper product={best} />
            {product ? (
                <ReviewList product_id={product.product_id} />
            ) : (
                <p>로딩중</p> // 로딩 중 메시지 추가
            )}
        </div>
    );
};

export default DetailWrap;
