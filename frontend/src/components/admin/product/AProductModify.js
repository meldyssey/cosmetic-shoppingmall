import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/admin/AdminDetail.module.scss';

const bkURL = process.env.REACT_APP_BACK_URL;

const AProductModify = () => {
    const [noteOptions, setNoteOptions] = useState([]); // Filtered options for Category 3
    const { product_id } = useParams();
    const [product, setProduct] = useState(null);

    const navigate = useNavigate();

    const productGetAxios = () => {
        if (!product_id) {
            console.log('id 없음');
            return;
        }
        axios
            .get(`${bkURL}/admin/product/modify/${product_id}`)
            .then((res) => {
                const uniqueNote = [
                    ...new Map(
                        res.data.note.map((item) => [
                            item.product_note_id,
                            {
                                value: item.product_note_id,
                                title: item.product_note_name,
                            },
                        ])
                    ).values(),
                ];
                const curProduct = res.data.product[0];
                // console.log(curProduct);
                // console.log(uniqueNote);

                setNoteOptions(uniqueNote);
                setProduct(curProduct);
            })
            .catch((err) => console.error('Error fetching categories:', err));
    };

    useEffect(() => {
        productGetAxios();
    }, []);

    const submitGo = (me) => {
        me.preventDefault();
        console.log('submitGo 진입');
        const frmData = new FormData(document.myFrm);
        console.log(frmData);
        const data = Object.fromEntries(frmData);
        console.log(data);

        //없는 값은 data null로 작성
        Object.keys(data).forEach((key) => {
            if (data[key] === '') {
                data[key] = null;
            }
        });
        const koreanRegex = /^[가-힣\s\&]+$/;
        const englishRegex = /^[a-zA-Z\s\&]+$/; // English letters and spaces only

        if (!data.product_name_kor) {
            alert('제품 국문명은 반드시 작성해야 합니다.');
            return;
        }

        if (!koreanRegex.test(data.product_name_kor)) {
            alert('제품 국문명은 한글만 입력할 수 있습니다.');
            return;
        }

        if (!data.product_name_eng) {
            alert('제품 영문명은 반드시 작성해야 합니다.');
            return;
        }

        if (!englishRegex.test(data.product_name_eng)) {
            alert('제품 영문명은 영어만 입력할 수 있습니다.');
            return;
        }

        if (!data.product_category_id) {
            alert('제품 카테고리는 반드시 선택해야 합니다.');
            return;
        }
        if (!data.product_scent) {
            alert('제품 향은 반드시 선택해야 합니다.');
            return;
        }
        if (!data.product_ingredient) {
            alert('제품 성분은 반드시 작성해야 합니다.');
            return;
        }
        if (!data.product_intro) {
            alert('제품 설명은 반드시 작성해야 합니다.');
            return;
        }

        axios
            .put(`${bkURL}/admin/product/modify`, data)
            .then((res) => {
                // console.log("제품 정보 수정 완료했습니다.");

                alert('제품 정보 수정 완료했습니다.');
                navigate(`/admin/product/detail/${product_id}`);
            })
            .catch((err) => {
                console.error('에러발생 ; ', err);
            });
    };
    if (!product) {
        return <div>id 없음</div>;
    }

    const stChange = (bname, me) => {
        // console.log("stChange");
        setProduct({ ...product, [bname]: me.value });
        console.log(product);
    };

    const chkSelectModule = (bname, arr) => {
        const ret = [];
        for (let ee of arr) {
            // console.log(ee);
            ret.push(chkSelect(ee.value, ee.title, product[bname] == ee.value));
        }
        return ret;
    };
    const chkSelect = (vv, tt, chk = false) => {
        return (
            <option value={vv} selected={chk}>
                {tt}
            </option>
        );
    };

    const chkRadioModule = (bname, arr) => {
        const ret = [];
        for (let ee of arr) {
            // console.log(ee);
            ret.push(chkRadio(bname, ee.value, ee.title, product[bname] == ee.value));
        }
        return ret;
    };
    const chkRadio = (bname, vv, tt, chk = false) => {
        return (
            <label>
                <input type="radio" name={bname} value={vv} checked={chk} onChange={(e) => stChange(bname, e.target)} />
                {tt}
            </label>
        );
    };

    return (
        <div className={styles.detailWrap}>
            <div className={styles.detail}>
                <div className={styles.title}>제품 상세 내용</div>
                <form name="myFrm" onSubmit={submitGo}>
                    <table>
                        <tr>
                            <td>
                                제품 국문명 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <input type="hidden" name="product_id" value={product.product_id} />
                                <input
                                    name="product_name_kor"
                                    type="text"
                                    value={product.product_name_kor}
                                    onChange={(e) => stChange('product_name_kor', e.target)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                제품 영문명 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <input
                                    name="product_name_eng"
                                    type="text"
                                    value={product.product_name_eng}
                                    onChange={(e) => stChange('product_name_eng', e.target)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>제품 스페셜</td>
                            <td>
                                <select
                                    name="product_special"
                                    id="product_special"
                                    onChange={(e) => stChange('product_speical', e.target)}
                                >
                                    {chkSelectModule('product_special', [
                                        {
                                            value: '',
                                            title: 'Select',
                                        },
                                        {
                                            value: 'Best Seller',
                                            title: 'Best Seller',
                                        },
                                        { value: 'New', title: 'New' },
                                    ])}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="product_category_id">
                                    카테고리 <span className={styles.red}>*</span>
                                </label>
                            </td>
                            <td>
                                <select
                                    name="product_category_id"
                                    id="product_category_id"
                                    onChange={(e) => stChange('product_category_id', e.target)}
                                >
                                    {chkSelectModule('product_category_id', [
                                        {
                                            value: '',
                                            title: 'Select',
                                        },
                                        {
                                            value: 1,
                                            title: '코롱',
                                        },
                                        {
                                            value: 2,
                                            title: '홈 프레그런스 > 캔들',
                                        },
                                        {
                                            value: 3,
                                            title: '홈 프레그런스 > 디퓨저',
                                        },
                                        {
                                            value: 4,
                                            title: '배스 앤 바디 > 배스 앤 샤워 > 바디 앤 핸드 워시',
                                        },
                                        {
                                            value: 5,
                                            title: '배스 앤 바디 > 배스 앤 샤워 > 샤워 젤 앤 오일',
                                        },
                                        {
                                            value: 6,
                                            title: '배스 앤 바디 > 배스 앤 샤워 > 배스 오일',
                                        },
                                        {
                                            value: 7,
                                            title: '배스 앤 바디 > 바디 케어 > 바디크림',
                                        },
                                        {
                                            value: 8,
                                            title: '배스 앤 바디 > 바디 케어 > 바디 앤 핸드 로션',
                                        },
                                        {
                                            value: 9,
                                            title: '배스 앤 바디 > 바디 케어 > 핸드크림',
                                        },
                                        {
                                            value: 10,
                                            title: '배스 앤 바디 > 바디 케어 > 바디 미스트',
                                        },
                                    ])}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="product_scent">
                                    향 <span className={styles.red}>*</span>
                                </label>
                            </td>
                            <td>
                                <select name="product_scent" id="product_scent">
                                    {chkSelectModule('product_scent', [
                                        {
                                            value: '',
                                            title: 'Select',
                                        },
                                        {
                                            value: 'citrus',
                                            title: '시트러스',
                                        },
                                        {
                                            value: 'fruity',
                                            title: '프루티',
                                        },
                                        {
                                            value: 'light-floral',
                                            title: '라이트 플로랄',
                                        },
                                        {
                                            value: 'floral',
                                            title: '플로랄',
                                        },
                                        {
                                            value: 'woody',
                                            title: '우디',
                                        },
                                    ])}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                제품 성분 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <textarea
                                    rows={5}
                                    name="product_ingredient"
                                    value={product.product_ingredient}
                                    onChange={(e) => stChange('product_ingredient', e.target)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="product_top">탑노트</label>
                            </td>
                            <td>
                                <select
                                    name="product_top"
                                    id="product_top"
                                    onChange={(e) => stChange('product_top', e.target)}
                                >
                                    <option value="">Select</option>
                                    {chkSelectModule('product_top', noteOptions)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="product_heart">하트노트</label>
                            </td>
                            <td>
                                <select name="product_heart" id="product_heart">
                                    <option value="">Select</option>
                                    {chkSelectModule('product_heart', noteOptions)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="product_base">베이스노트</label>
                            </td>
                            <td>
                                <select name="product_base" id="product_base">
                                    <option value="">Select</option>
                                    {chkSelectModule('product_base', noteOptions)}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                제품설명 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <textarea
                                    rows={5}
                                    name="product_intro"
                                    value={product.product_intro}
                                    onChange={(e) => stChange('product_intro', e.target)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                공개여부 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                {chkRadioModule('product_status', [
                                    { value: 0, title: '비공개' },
                                    { value: 1, title: '공개' },
                                ])}
                            </td>
                        </tr>
                    </table>
                    <div className={styles.actionButtons}>
                        <button className={styles.searchbutton} onClick={submitGo}>
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AProductModify;
