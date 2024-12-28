import React from 'react';
import styles from '../../../scss/product/detailRecommend.module.scss';

const bkURL = process.env.REACT_APP_BACK_URL;

const DetailRecommend = () => {
    const [product, setProduct] = useState([]);

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
        <div className={styles.detailRecommend}>
            <div className={styles.recommendTitle}>당신을 위한 추천 상품</div>
            <ProductSwiper product={product} />
        </div>
    );
};

export default DetailRecommend;
