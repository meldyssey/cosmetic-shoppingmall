import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../../scss/admin/AdminDetail.module.scss";

const bkURL = process.env.REACT_APP_BACK_URL;

const AProductRegister = () => {
    const [noteOptions, setNoteOptions] = useState([]); // Filtered options for Category 3
    const [korName, setKorName] = useState([]);
    const [engName, setEngName] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${bkURL}/admin/product/register`)
            .then((res) => {
                const uniqueNote = [
                    ...new Map(
                        res.data.note.map((item) => [
                            item.product_note_id,
                            {
                                id: item.product_note_id,
                                name: item.product_note_name,
                            },
                        ])
                    ).values(),
                ];
                const uniqueKor = [
                    ...new Map(
                        res.data.product.map((item) => [
                            item.product_id,
                            item.product_name_kor,
                        ])
                    ).values(),
                ];
                const uniqueEng = [
                    ...new Map(
                        res.data.product.map((item) => [
                            item.product_id,
                            item.product_name_eng,
                        ])
                    ).values(),
                ];
                setNoteOptions(uniqueNote);
                setKorName(uniqueKor);
                setEngName(uniqueEng);
            })
            .catch((err) => console.error("Error fetching categories:", err));
    }, []);

    const submitGo = (me) => {
        me.preventDefault();
        // console.log("submitGo 진입");
        const frmData = new FormData(document.myFrm);
        // console.log(frmData);
        const data = Object.fromEntries(frmData);
        // console.log(data);
        // console.log(korName);

        //없는 값은 data null로 작성
        Object.keys(data).forEach((key) => {
            if (data[key] === "") {
                data[key] = null;
            }
        });
        const koreanRegex = /^[가-힣\s\&\0-9]+$/;
        const englishRegex = /^[a-zA-Z\s\&\0-9]+$/; // English letters and spaces only

        if (!data.product_name_kor) {
            alert("제품 국문명은 반드시 작성해야 합니다.");
            return;
        }

        if (!koreanRegex.test(data.product_name_kor)) {
            alert("제품 국문명은 한글만 입력할 수 있습니다.");
            return;
        }

        if (korName.includes(data.product_name_kor)) {
            alert(
                "제품 국문명이 이미 등록되어 있습니다. 제품명을 확인해주세요."
            );
            return;
        }

        if (!data.product_name_eng) {
            alert("제품 영문명은 반드시 작성해야 합니다.");
            return;
        }

        if (!englishRegex.test(data.product_name_eng)) {
            alert("제품 영문명은 영어만 입력할 수 있습니다.");
            return;
        }

        if (engName.includes(data.product_name_eng)) {
            alert(
                "제품 영문명이 이미 등록되어 있습니다. 제품명을 확인해주세요."
            );
            return;
        }

        if (!data.product_category_id) {
            alert("제품 카테고리는 반드시 선택해야 합니다.");
            return;
        }
        if (!data.product_scent) {
            alert("제품 향은 반드시 선택해야 합니다.");
            return;
        }
        if (!data.product_ingredient) {
            alert("제품 성분은 반드시 작성해야 합니다.");
            return;
        }
        if (!data.product_intro) {
            alert("제품 설명은 반드시 작성해야 합니다.");
            return;
        }

        axios
            .post(`${bkURL}/admin/product/register`, data)
            .then((res) => {
                console.log(
                    "제품 등록 완료했습니다. 해당 제품의 옵션을 등록해주세요.",
                    res.data.newId
                );
                console.log(res.data.newId);

                alert(
                    "제품 등록 완료했습니다. 해당 제품의 옵션을 등록해주세요."
                );
                navigate(`/admin/product/option/${res.data.newId}`);
            })
            .catch((err) => {
                console.error("에러발생 ; ", err);
            });
    };

    return (
        <div className={styles.detailWrap}>
            <div className={styles.detail}>
                <div className={styles.title}>제품 등록</div>
                <form name="myFrm">
                    <table>
                        <tr>
                            <td>
                                제품 국문명{" "}
                                <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <input name="product_name_kor" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                제품 영문명{" "}
                                <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <input name="product_name_eng" type="text" />
                            </td>
                        </tr>
                        <tr>
                            <td>제품 스페셜</td>
                            <td>
                                <select
                                    name="product_special"
                                    id="product_special"
                                >
                                    <option value="">Select</option>
                                    <option value="Best Seller">
                                        Best Seller
                                    </option>
                                    <option value="New">New </option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="product_category_id">
                                    카테고리{" "}
                                    <span className={styles.red}>*</span>
                                </label>
                            </td>
                            <td>
                                <select
                                    name="product_category_id"
                                    id="product_category_id"
                                >
                                    <option value="">Select</option>
                                    <option value="1">코롱</option>
                                    <option value="2">
                                        홈 프레그런스 &gt; 캔들
                                    </option>
                                    <option value="3">
                                        홈 프레그런스 &gt; 디퓨저
                                    </option>
                                    <option value="4">
                                        배스 앤 바디 &gt; 배스 앤 샤워 &gt; 바디
                                        앤 핸드 워시
                                    </option>
                                    <option value="5">
                                        배스 앤 바디 &gt; 배스 앤 샤워 &gt; 샤워
                                        젤 앤 오일
                                    </option>
                                    <option value="6">
                                        배스 앤 바디 &gt; 배스 앤 샤워 &gt; 배스
                                        오일
                                    </option>
                                    <option value="7">
                                        배스 앤 바디 &gt; 바디 케어 &gt;
                                        바디크림
                                    </option>
                                    <option value="8">
                                        배스 앤 바디 &gt; 바디 케어 &gt; 바디 앤
                                        핸드 로션
                                    </option>
                                    <option value="9">
                                        배스 앤 바디 &gt; 바디 케어 &gt;
                                        핸드크림
                                    </option>
                                    <option value="10">
                                        배스 앤 바디 &gt; 바디 케어 &gt; 바디
                                        미스트
                                    </option>
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
                                    <option value="">Select</option>
                                    <option value="citrus">시트러스</option>
                                    <option value="fruity">프루티</option>
                                    <option value="light-floral">
                                        라이트 플로랄
                                    </option>
                                    <option value="floral">플로랄</option>
                                    <option value="woody">우디</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                제품 성분 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <textarea name="product_ingredient" rows="5" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label for="product_top">탑노트</label>
                            </td>
                            <td>
                                <select name="product_top" id="product_top">
                                    <option value="">Select</option>
                                    {noteOptions.map((note) => (
                                        <option key={note.id} value={note.id}>
                                            {note.name}
                                        </option>
                                    ))}
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
                                    {noteOptions.map((note) => (
                                        <option key={note.id} value={note.id}>
                                            {note.name}
                                        </option>
                                    ))}
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
                                    {noteOptions.map((note) => (
                                        <option key={note.id} value={note.id}>
                                            {note.name}
                                        </option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                제품 설명 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <textarea name="product_intro" rows="5" />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                공개여부 <span className={styles.red}>*</span>
                            </td>
                            <td>
                                <input
                                    type="radio"
                                    name="product_status"
                                    value="0"
                                />
                                비공개
                                <input
                                    type="radio"
                                    name="product_status"
                                    value="1"
                                    checked
                                />
                                공개
                            </td>
                        </tr>
                    </table>
                    <div className={styles.actionButtons}>
                        <button
                            type="button"
                            className={styles.resetbutton}
                            onClick={() => {
                                navigate(`/admin/product`);
                            }}
                        >
                            목록으로
                        </button>
                        <button
                            className={styles.searchbutton}
                            onClick={submitGo}
                        >
                            저장
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AProductRegister;
