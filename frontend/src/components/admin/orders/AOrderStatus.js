import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../../scss/admin/AdminList.module.scss";
import Pagination from "../../dup/Pagination";

function AOrderStatus(props) {
    const [isEditable, setIsEditable] = useState(false);
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    const orderStatuses = [
        "취소",
        "반품접수",
        "반품완료",
        "환불접수",
        // "환불완료",
    ];

    // pagination 추가
    const [curPage, setCurPage] = useState(1); // Current page
    const [itemsPerPage] = useState(10); // Items per page
    // Calculate the products for the current page
    const indexOfLastItem = curPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const curOrders = order.slice(indexOfFirstItem, indexOfLastItem);

    const bkURL = process.env.REACT_APP_BACK_URL;

    const orderStatusAxios = () => {
        axios
            .get(`${bkURL}/admin/order/status`)
            .then(res => {
                const updatedData = res.data.map(item => ({
                    ...item,
                    status: item.order_status,
                    invoice: item.invoice || "",
                }));
                setOrder(updatedData);
                console.log("updatedData", updatedData);
            })
            .catch(err => {
                console.error("에러발생 : ", err);
            });
    };
    useEffect(() => {
        orderStatusAxios();
    }, []);

    const handleInvoiceChange = (id, newInvoice) => {
        const updatedArr = order.map(item =>
            item.order_id === id
                ? {
                      ...item,
                      invoice: newInvoice || "",
                      status: item.status,
                  }
                : item
        );
        setOrder(updatedArr);
    };

    // 상태 변경 핸들러
    const handleStatusChange = (id, newStatus) => {
        const updatedArr = order.map(item => {
            return item.order_id === id
                ? { ...item, order_status: newStatus, status: newStatus } // 상태 값을 일관되게 업데이트
                : item;
        });

        setOrder(updatedArr);
    };

    // 수정 완료 핸들러 (DB에 업데이트)
    const handleSaveChanges = async e => {
        e.preventDefault();

        const modifyOrder = order.map(item => ({
            ...item,
            invoice: item.invoice || "",
            status: item.status || item.order_status,
        }));

        console.log("modifyOrder", modifyOrder);

        try {
            const response = await axios.post(
                `${bkURL}/admin/order/update`,
                modifyOrder
            );
            if (response.status === 200) {
                alert("수정이 완료되었습니다.");
                setIsEditable(false); // 수정하기 버튼 표시
                window.location.reload();
                // navigate("/admin/orderStatus");
            }
        } catch (error) {
            console.error("수정 실패 :", error);
            alert("수정에 실패했습니다.");
        }
    };

    const formatDate = dateString => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
        }); // 한국 로컬 시간대에 맞게 변환
    };

    const searchGo = me => {
        me.preventDefault();
        console.log("submitGo 진입");
        const frmData = new FormData(document.myFrm);
        // console.log(frmData);
        const data = Object.fromEntries(frmData);
        console.log("order 검색:", data);

        Object.keys(data).forEach(key => {
            if (data[key] === "") {
                data[key] = null;
            }
        });

        // 검색어+검색기준 없으면
        if (!data.text) {
            alert("검색할 단어를 입력해 주세요.");
            return;
        }

        axios
            .post(`${bkURL}/admin/order/search`, data)
            .then(res => {
                console.log("검색 완료", res.data);

                const dataText = [
                    "취소",
                    "반품접수",
                    "반품완료",
                    "환불접수",
                    "환불완료",
                ];

                const validOrders = res.data.filter(od =>
                    od.order_status.includes(dataText)
                );

                setOrder(validOrders);
            })
            .catch(err => {
                console.error("에러발생 ; ", err);
            });
    };
    const resetSearch = e => {
        e.preventDefault(); // 기본 동작 방지
        // 검색 필드 초기화
        const form = document.myFrm;
        form.orderCate.value = ""; // 검색 기준 초기화
        form.text.value = ""; // 검색어 초기화

        // 데이터를 원래 상태로 복원
        axios
            .get(`${bkURL}/admin/order/status`)
            .then(res => {
                const updatedData = res.data.map(item => ({
                    ...item,
                    status: item.order_status,
                    invoice: item.invoice || "",
                }));
                setOrder(updatedData); // 초기 상태 데이터로 복원
            })
            .catch(err => {
                console.error("초기화 중 에러 발생:", err);
            });
        orderStatusAxios();
    };

    return (
        <div className={styles.list}>
            <form name="myFrm" className={styles.searchbar}>
                <select name="orderCate" id="category">
                    <option value="">검색기준 선택</option>
                    <option value="orderNum">주문번호</option>
                    <option value="status">주문상태</option>
                    <option value="payment">결제방법</option>
                    <option value="orderTo">수령자명</option>
                    <option value="invoice">운송장번호</option>
                </select>

                <input type="text" placeholder="검색어 입력" name="text" />

                <div className={styles.actionButtons}>
                    <button className={styles.searchbutton} onClick={searchGo}>
                        검색
                    </button>
                    <button
                        className={styles.resetbutton}
                        onClick={resetSearch}
                    >
                        초기화
                    </button>
                    {!isEditable && (
                        <button
                            className={styles.modifybutton}
                            onClick={() => setIsEditable(true)}
                        >
                            수정하기
                        </button>
                    )}
                    {isEditable && (
                        <button
                            className={styles.modiclearbutton}
                            onClick={handleSaveChanges}
                        >
                            수정완료
                        </button>
                    )}
                </div>
            </form>
            <table>
                <tr>
                    <td>번호</td>
                    <td>주문번호</td>
                    <td>주문일시</td>
                    <td>상태 변경 일시</td>
                    <td>주문상태</td>
                    <td>결제방법</td>
                    <td>수령자</td>
                    <td>총주문액</td>
                    <td>운송장번호</td>
                </tr>
                {curOrders.length > 0 &&
                    curOrders.map(
                        (mm, i) =>
                            mm?.order_id && (
                                <tr key={mm.order_id}>
                                    <td>
                                        {(curPage - 1) * itemsPerPage + (i + 1)}
                                    </td>
                                    <td>
                                        <Link
                                            className={styles.link}
                                            to={`detail/${mm.order_id}`}
                                        >
                                            {mm.order_id}
                                        </Link>
                                    </td>
                                    <td>{formatDate(mm.order_date)}</td>
                                    <td>{formatDate(mm.status_date)}</td>
                                    <td>
                                        {mm.status === "환불완료" ? (
                                            <span className={styles.refund}>
                                                환불완료
                                            </span>
                                        ) : (
                                            <select
                                                value={mm.status}
                                                onChange={e =>
                                                    handleStatusChange(
                                                        mm.order_id,
                                                        e.target.value
                                                    )
                                                }
                                                disabled={!isEditable}
                                            >
                                                {orderStatuses.map(status => (
                                                    <option
                                                        key={status}
                                                        value={status}
                                                    >
                                                        {status}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    </td>
                                    <td>{mm.pay_to}</td>
                                    <td>{mm.order_name}</td>
                                    <td>₩ {mm.order_total.toLocaleString()}</td>
                                    <td>
                                        <input
                                            className={styles.invoicebar}
                                            type="text"
                                            value={mm.invoice}
                                            readOnly={!isEditable}
                                            maxLength={14}
                                            onChange={e =>
                                                handleInvoiceChange(
                                                    mm.order_id,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </td>
                                </tr>
                            )
                    )}
            </table>
            <Pagination
                totalItems={order.length}
                itemsPerPage={itemsPerPage}
                pagesPerGroup={5}
                curPage={curPage}
                setCurPage={setCurPage}
            />
        </div>
    );
}

export default AOrderStatus;
