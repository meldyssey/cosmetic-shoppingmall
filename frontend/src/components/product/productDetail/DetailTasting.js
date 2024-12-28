import React, { useEffect, useState } from "react";
import styles from "../../../scss/product/detailTasting.module.scss";
import { useParams } from "react-router-dom";
import axios from "axios";

const bkURL = process.env.REACT_APP_BACK_URL;

const DetailTasting = () => {
    const { product_opt_id } = useParams();
    const [product, setProduct] = useState(null);
    const productGetAxios = () => {
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

    function fileGo(file) {
        if (file) {
            return <img src={`/imgs/product/${file}`} />;
        }
        return null;
    }

    if (!product) {
        return <div> id 없음</div>;
    }
    return (
        <div className={styles.note}>
            <div className={styles.noteTitle}>테이스팅 노트</div>
            <div className={styles.noteWrap}>
                <div className={styles.infoWrap}>
                    <div className={styles.noteImg}>
                        {fileGo(product.nt_upSystem)}
                    </div>
                    <div className={styles.noteName}>{product.nt_name}</div>
                    <div className={styles.noteIntro}>{product.nt_intro}</div>
                </div>
                <div className={styles.infoWrap}>
                    <div className={styles.noteImg}>
                        {fileGo(product.nh_upSystem)}
                    </div>
                    <div className={styles.noteName}>{product.nh_name}</div>
                    <div className={styles.noteIntro}>{product.nh_intro}</div>
                </div>
                <div className={styles.infoWrap}>
                    <div className={styles.noteImg}>
                        {fileGo(product.nb_upSystem)}
                    </div>
                    <div className={styles.noteName}>{product.nb_name}</div>
                    <div className={styles.noteIntro}>{product.nb_intro}</div>
                </div>
            </div>
        </div>
    );
};

export default DetailTasting;
