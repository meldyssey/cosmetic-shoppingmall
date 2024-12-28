import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../../../scss/admin/AdminList.module.scss";
import Pagination from "../../dup/Pagination";

const bkURL = process.env.REACT_APP_BACK_URL;

const AProductList = () => {
    const [product, setProduct] = useState([]);
    const [text, setText] = useState("");

    // pagination 추가
    const [curPage, setCurPage] = useState(1); // Current page
    const [itemsPerPage] = useState(10); // Items per page
    // Calculate the products for the current page
    const indexOfLastItem = curPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const curProducts = product.slice(indexOfFirstItem, indexOfLastItem);

    const productListGetAxios = () => {
        axios
            .get(`${bkURL}/admin/product/`)
            .then((res) => {
                console.log("서버 다녀옴", res.data);
                setProduct(res.data);
            })
            .catch((err) => {
                console.error("에러발생 ; ", err);
            });
    };

    useEffect(() => {
        productListGetAxios();
    }, []);

    const searchGo = (me) => {
        me.preventDefault();
        console.log("submitGo 진입");
        const frmData = new FormData(document.myFrm);
        console.log(frmData);
        const data = Object.fromEntries(frmData);
        console.log(data);

        Object.keys(data).forEach((key) => {
            if (data[key] === "") {
                data[key] = null;
            }
        });

        // if (!data.text) {
        //     alert("검색할 단어를 입력해 주세요.");
        //     return;
        // }

        axios
            .post(`${bkURL}/admin/product/search`, data)
            .then((res) => {
                console.log("검색 완료");
                setProduct(res.data);
                setText("해당하는 제품이 존재하지 않습니다.");
            })
            .catch((err) => {
                console.error("에러발생 ; ", err);
            });
    };

    return (
        <div className={styles.list}>
            <form name="myFrm" className={styles.searchbar}>
                <select name="product_category_one" id="category">
                    <option value="">카테고리 선택</option>
                    <option value="cologne">코롱</option>
                    <option value="home-scents">홈 프레그런스</option>
                    <option value="bath-body">배스 앤 바디</option>
                </select>

                <input type="text" placeholder="검색어 입력" name="text" />

                <div className={styles.actionButtons}>
                    <button className={styles.searchbutton} onClick={searchGo}>
                        검색
                    </button>
                </div>
            </form>
            <table>
                <tr>
                    <td>번호</td>
                    <td>제품 카테고리</td>
                    <td>제품명</td>
                    <td>향</td>
                    <td>공개상태</td>
                </tr>
                {curProducts.map((st, i) => {
                    return (
                        <tr>
                            <td>{(curPage - 1) * itemsPerPage + (i + 1)}</td>
                            <td>{st.product_category_one}</td>
                            <td>
                                <Link
                                    className={styles.link}
                                    to={`/admin/product/detail/${st.product_id}`}
                                >
                                    {st.product_name_kor}
                                </Link>
                            </td>
                            <td>{st.product_scent}</td>
                            <td>
                                {st.product_status == 1 ? "공개" : "비공개"}
                            </td>
                        </tr>
                    );
                })}
            </table>

            <Pagination
                totalItems={product.length}
                itemsPerPage={itemsPerPage}
                pagesPerGroup={5}
                curPage={curPage}
                setCurPage={setCurPage}
            />
        </div>
    );
};

export default AProductList;
