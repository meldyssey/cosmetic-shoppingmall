import React, { useEffect, useState } from "react";
import styles from "../../../scss/product/prodTotal.module.scss";
import ProductSwiper from "../ProductSwiper";
import { Link } from "react-router-dom";
import HomeScentsHomeTop from "./HomeScentsHomeTop";
// import axios from "axios";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const HomeSecntsTotal = () => {
    const [candle, setCandle] = useState([]);
    const [diffuser, setDiffuser] = useState([]);
    const prod = useSelector((state) => state.prod.data);
    useEffect(() => {
        setCandle(prod.filter((item) => item.product_category_two == `candle`));
        setDiffuser(
            prod.filter((item) => item.product_category_two == `diffuser`)
        );
    }, [prod]);
    return (
        <div className={styles.prodTotal}>
            <HomeScentsHomeTop />
            <div className={styles.content}>
                <p>우리의 가장 사랑받는 제품을 만나 보세요.</p>
                <p>
                    베스트셀러부터 신제품까지 다양한 조 말론 런던의 컬렉션이
                    있습니다.
                </p>
            </div>
            <div className={styles.category}>
                <div className={styles.subTitle}>캔들</div>
                <ProductSwiper product={candle} />
                <Link to="/home-scents/candles">전체보기</Link>
            </div>
            <div className={styles.category}>
                <div className={styles.subTitle}>디퓨저</div>
                <ProductSwiper product={diffuser} />
                <Link to="/home-scents/diffusers">전체보기</Link>
            </div>
        </div>
    );
};

export default HomeSecntsTotal;
