import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/admin/productOptDetail.module.scss';

const bkURL = process.env.REACT_APP_BACK_URL;

const AProductRegisterOpt = () => {
    const navigate = useNavigate();
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);
    const [options, setOptions] = useState([]); // 추가된 옵션 리스트
    const formRef = useRef(null);

    const productAxiosGet = () => {
        if (!product_id) {
            console.log('id 없음');
            return;
        }
        axios
            .get(`${bkURL}/admin/product/register/option/${product_id}`)
            .then((res) => {
                console.log(res.data);
                console.log(res.data.option);
                setOptions(res.data.option);
                setProduct(res.data.product[0]);
            })
            .catch((err) => console.error('axios 에러', err));
    };

    useEffect(() => {
        productAxiosGet();
    }, []);

    const submitGo = (me) => {
        me.preventDefault();
        // console.log("submitGo 진입");
        const frmData = new FormData(document.myFrm);
        // console.log(frmData);
        const data = Object.fromEntries(frmData);
        console.log(data);
        if (!data.product_volume) {
            alert('제품 용량은 반드시 작성해야 합니다.');
            return;
        }
        if (!data.product_price) {
            alert('제품 가격은 반드시 작성해야 합니다.');
            return;
        }
        if (!data.product_upfile.name) {
            alert('제품 이미지는 반드시 등록해야 합니다.');
            return;
        }

        axios
            .post(`${bkURL}/admin/product/register/option/${product_id}`, frmData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                console.log('옵션 추가 완료', res.data);
                alert('옵션추가가 완료되었습니다.');
                // 옵션 데이터 추가
                const newOption = Object.fromEntries(frmData);
                console.log(newOption);
                productAxiosGet();
                formRef.current.reset();
            })
            .catch((err) => {
                console.error('에러발생 ; ', err);
            });
    };

    const delGo = (product_opt_id) => {
        console.log('delGo() 진입');
        console.log(options);

        axios
            .delete(`${bkURL}/admin/product/register/option/${product_opt_id}`, {
                data: { delUPfile: options.upSystem },
            })
            .then((res) => {
                console.log('삭제완료 ', res.data);
                alert('삭제되었습니다.');
                productAxiosGet();
            })
            .catch((err) => {
                console.error('삭제 오류 ', err);
            });
    };
    function fileGo(file) {
        if (file) {
            return <img src={`${bkURL}/imgs/product/${file}`} width="100px" />;
        }
        return null;
    }

    if (!product) {
        return <div>id 없음</div>;
    }

    const saveGo = () => {
        if (!options.length) {
            alert('1개의 제품 옵션은 반드시 등록해야 합니다.');
            return;
        }
        alert('제품 옵션 수정 완료했습니다.');
        navigate(`/admin/product/detail/${product_id}`);
    };

    return (
        <div className={styles.detailWrap}>
            <div className={styles.detail}>
                <div className={styles.title}>제품 옵션 추가</div>
                <form name="myFrm" ref={formRef}>
                    <table>
                        <tr>
                            <td>제품명</td>
                            <td colSpan={4}>
                                <input type="hidden" name="product_id" value={product_id} />
                                {product.product_name_kor}
                            </td>
                        </tr>
                        <tr>
                            <td rowSpan={2}>옵션</td>
                            <td>
                                제품 용량 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                제품 가격 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                제품 이미지 <span className={styles.red}>*</span>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="number" step="0.1" name="product_volume" />
                                <input type="radio" name="unit" value="ml" checked />
                                ml
                                <input type="radio" name="unit" value="g" />g
                                <input type="radio" name="unit" value="kg" />
                                kg
                            </td>
                            <td>
                                <input type="number" name="product_price" />원
                            </td>
                            <td>
                                <input type="file" name="product_upfile" />
                            </td>
                        </tr>
                    </table>
                    <div>
                        <button onClick={submitGo}>옵션 추가</button>
                    </div>
                </form>

                <div className={styles.title}>추가된 옵션</div>
                <table className={styles.option}>
                    <tr>
                        <td>제품 용량</td>
                        <td>제품 가격</td>
                        <td>제품 이미지</td>
                        <td>구분</td>
                    </tr>
                    {options.map((opt, index) => (
                        <tr key={index}>
                            <td>{opt.product_volume}</td>
                            <td>₩ {opt.product_price.toLocaleString()}</td>
                            <td>{fileGo(opt.product_upSystem)}</td>
                            <td>
                                <button
                                    onClick={() => {
                                        delGo(opt.product_opt_id);
                                    }}
                                >
                                    삭제
                                </button>
                            </td>
                        </tr>
                    ))}
                </table>
                <button onClick={saveGo}>저장</button>
            </div>
        </div>
    );
};

export default AProductRegisterOpt;
