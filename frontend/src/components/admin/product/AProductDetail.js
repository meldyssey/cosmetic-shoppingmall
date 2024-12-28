import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import AProductDetailOpt from './AProductDetailOpt';
import styles from '../../../scss/admin/AdminDetail.module.scss';

const bkURL = process.env.REACT_APP_BACK_URL;

const AProductDetail = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);

    const productListGetAxios = () => {
        axios
            .get(`${bkURL}/admin/product/detail/${product_id}`)
            .then((res) => {
                console.log('서버 다녀옴', res.data);
                setProduct(res.data);
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
    if (!product) {
        return <div>id 없음</div>;
    }

    return (
        <div className={styles.detailWrap}>
            <div className={styles.detail}>
                <div className={styles.title}>
                    제품 상세 정보
                    <Link to={`/admin/product/modify/${product.product_id}`}>수정하기</Link>
                </div>
                <table>
                    <tr>
                        <td>제품 국문명</td>
                        <td>{product.product_name_kor}</td>
                    </tr>
                    <tr>
                        <td>제품 영문명</td>
                        <td>{product.product_name_eng}</td>
                    </tr>
                    <tr>
                        <td>제품 스페셜</td>
                        <td>{product.product_special}</td>
                    </tr>
                    <tr>
                        <td>제품 카테고리1</td>
                        <td>{product.product_category_one ? product.product_category_one : '없음'}</td>
                    </tr>
                    <tr>
                        <td>제품 카테고리2</td>
                        <td>{product.product_category_two ? product.product_category_two : '없음'}</td>
                    </tr>
                    <tr>
                        <td>제품 카테고리3</td>
                        <td>{product.product_category_three ? product.product_category_three : '없음'}</td>
                    </tr>
                    <tr>
                        <td>제품 향</td>
                        <td>{product.product_scent}</td>
                    </tr>
                    <tr>
                        <td>제품 성분</td>
                        <td>{product.product_ingredient}</td>
                    </tr>
                    <tr>
                        <td>탑노트</td>
                        <td>{product.nt_name} </td>
                    </tr>
                    <tr>
                        <td>하트노트</td>
                        <td>{product.nh_name} </td>
                    </tr>
                    <tr>
                        <td>베이스노트</td>
                        <td>{product.nb_name} </td>
                    </tr>
                    <tr>
                        <td>제품설명</td>
                        <td>{product.product_intro} </td>
                    </tr>
                    <tr>
                        <td>공개여부</td>
                        <td>{product.product_status == 1 ? '공개' : '비공개'} </td>
                    </tr>
                </table>
            </div>
            <AProductDetailOpt />
            <Link className={styles.Link} to={`/admin/product`}>
                목록으로
            </Link>
        </div>
    );
};

export default AProductDetail;
