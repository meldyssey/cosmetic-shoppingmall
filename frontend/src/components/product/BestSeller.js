import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import styles from "../../scss/product/homeTop.module.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const BestSeller = () => {
    const prod = useSelector((state) => state.prod.data);

    const [product, setProduct] = useState([]);

    useEffect(() => {
        setProduct(
            prod.filter((item) => item.product_special == "Best Seller")
        );
    }, []);
    return (
        <div>
            <div className={styles.homeTop}>
                <div className={styles.breadCrum}>
                    <Link to="/">홈</Link>
                    <span> &gt; </span>
                    <Link to="/best-seller">베스트셀러</Link>
                </div>
                <div>
                    <div className={styles.title}>베스트셀러</div>
                    <div className={styles.content}>
                        <p>하루의 시작과 끝을 향기롭게 보내세요.</p>
                    </div>
                </div>
            </div>
            <ProductCard product={product} />
        </div>
    );
};

export default BestSeller;
