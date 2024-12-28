import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/admin/AdminDetailOpt.module.scss';

const bkURL = process.env.REACT_APP_BACK_URL;

const AProductDetailOpt = () => {
    const { product_id } = useParams();
    const [productOpt, setProductOpt] = useState([]);

    const productListGetAxios = () => {
        axios
            .get(`${bkURL}/admin/product/detail/option/${product_id}`)
            .then((res) => {
                console.log('서버 다녀옴', res.data);
                setProductOpt(res.data);
            })
            .catch((err) => {
                console.error('에러발생 ; ', err);
            });
    };
    useEffect(() => {
        if (!product_id) {
            console.log('id 없음');
            return;
        }
        productListGetAxios();
    }, []);
    if (!productOpt) {
        return <div>id 없음</div>;
    }
    function fileGo(file) {
        if (file) {
            return <img src={`${bkURL}/imgs/product/${file}`} />;
        }
        return null;
    }
    return (
        <div>
            <div className={styles.detail}>
                <div className={styles.title}>
                    제품 옵션
                    <Link to={`/admin/product/option/${product_id}`}>수정하기</Link>
                </div>
                <table>
                    <tr>
                        <td>제품 용량</td>
                        <td>제품 가격</td>
                        <td>제품 이미지</td>
                    </tr>
                    {productOpt.map((st, i) => {
                        return (
                            <tr>
                                <td>{st.product_volume}</td>
                                <td>₩ {st.product_price.toLocaleString()}</td>
                                <td>{fileGo(st.product_upSystem)}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

export default AProductDetailOpt;
