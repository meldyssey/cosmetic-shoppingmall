import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductSwiper from '../product/ProductSwiper';
import styles from '../../scss/product/prodTotal.module.scss';

function BestSlide(props) {
    const [product, setProduct] = useState([]);
    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        axios
            .get(`${bkURL}/product/`)
            .then((res) => {
                console.log('서버 다녀옴', res.data);
                let curProduct = res.data.filter((item) => item.product_special == 'Best Seller');
                console.log(curProduct);
                setProduct(curProduct);
            })
            .catch((err) => {
                console.error('에러발생 ; ', err);
            });
    }, []);
    return (
        <div className={styles.bestSlide}>
            <div>베스트셀러</div>
            <ProductSwiper product={product} />
        </div>
    );
}

export default BestSlide;
