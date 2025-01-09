import React, { useEffect, useState } from "react";
import styles from "../../../scss/product/prodTotal.module.scss";
import ProductSwiper from "../ProductSwiper";
import { Link } from "react-router-dom";
import BathBodyHomeTop from "./BathBodyHomeTop";
// import axios from "axios";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const BathBodyTotal = () => {
    const [bathShower, setBathShower] = useState([]);
    const [bodyCare, setBodyCare] = useState([]);
    const prod = useSelector((state) => state.prod.data);

    // const candleGetAxios = () => {
    //     axios
    //         .get(`${bkURL}/product/bath-body/bath-shower`)
    //         .then((res) => {
    //             let curProduct = res.data;
    //             console.log(curProduct);

    //             setBathShower(curProduct);
    //         })
    //         .catch((err) => {
    //             console.error("에러발생 ; ", err);
    //         });
    // };
    // const diffuserGetAxios = () => {
    //     axios
    //         .get(`${bkURL}/product/bath-body/body-care`)
    //         .then((res) => {
    //             let curProduct = res.data;
    //             console.log(curProduct);

    //             setBodyCare(curProduct);
    //         })
    //         .catch((err) => {
    //             console.error("에러발생 ; ", err);
    //         });
    // };
    useEffect(() => {
        // candleGetAxios();
        // diffuserGetAxios();
        setBathShower(
            prod.filter((item) => item.product_category_two == `bath-shower`)
        );
        setBodyCare(
            prod.filter((item) => item.product_category_two == `body-care`)
        );
    }, []);
    return (
        <div className={styles.prodTotal}>
            <BathBodyHomeTop />
            <div className={styles.content}>
                <p>나만을 위한 일상의 호화로움.</p>
            </div>
            <div className={styles.category}>
                <div className={styles.subTitle}>배스 앤 샤워</div>
                <ProductSwiper product={bathShower} />
                <Link to="/bath-body/bath-shower">전체보기</Link>
            </div>
            <div className={styles.category}>
                <div className={styles.subTitle}>바디케어</div>
                <ProductSwiper product={bodyCare} />
                <Link to="/bath-body/body-care">전체보기</Link>
            </div>
        </div>
    );
};

export default BathBodyTotal;
