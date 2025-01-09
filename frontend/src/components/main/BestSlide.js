import React, { useState, useEffect } from "react";
import ProductSwiper from "../product/ProductSwiper";
import styles from "../../scss/product/prodTotal.module.scss";
import { useSelector } from "react-redux";

function BestSlide(props) {
    const [product, setProduct] = useState([]);
    const bkURL = process.env.REACT_APP_BACK_URL;
    const prod = useSelector((state) => state.prod.data);

    useEffect(() => {
        setProduct(
            prod.filter((item) => item.product_special == "Best Seller")
        );
    }, [prod]);
    return (
        <div className={styles.bestSlide}>
            <div>베스트셀러</div>
            <ProductSwiper product={product} />
        </div>
    );
}

export default BestSlide;
