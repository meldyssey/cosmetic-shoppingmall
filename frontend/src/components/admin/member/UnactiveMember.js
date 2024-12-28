import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../scss/member/MemberList.module.scss';

function UnactiveMember() {
    const [arr, setArr] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]); // 필터링된 고객 데이터
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 체크 여부 (전체 선택 체크박스 false상태)
    const [selectedCustomers, setSelectedCustomers] = useState([]); // 개별 체크박스

    const bkURL = process.env.REACT_APP_BACK_URL;

    // 데이터 가져오기
    useEffect(() => {
        axios
            .get(`${bkURL}/admin/member/unactivemember`)
            .then(res => {
                setArr(res.data);
                console.log(res.data);
                setFilteredCustomers(res.data); // 처음에는 전체 데이터 표시
            })
            .catch(err => {
                console.error('에러발생 : ', err);
            });
    }, [selectedCustomers]);

    //정상 상태 변경
    const handleUpdateStatus = async status => {
        try {
            const res = await axios.post(`${bkURL}/admin/member/updateStatus`, { customer_ids: selectedCustomers, status });
            alert(`정상 상태로 변경되었습니다.`);
            setArr(prev => prev.map(member => (selectedCustomers.includes(member.customer_id) ? { ...member, status } : member)));

            setFilteredCustomers(prev => prev.map(member => (selectedCustomers.includes(member.customer_id) ? { ...member, status } : member)));

            setSelectedCustomers([]); // 선택 초기화
        } catch (error) {
            console.error('상태 업데이트 에러: ', error);
        }
    };

    // 체크박스 전체 선택
    const handleSelectAll = () => {
        setSelectAll(!selectAll);

        if (!selectAll) {
            // 전체 선택: 모든 고객이 체크가 됨
            setSelectedCustomers(filteredCustomers.map(member => member.customer_id));
        } else {
            // 전체선택 해제 : 초기화 (아무것도 선택되지 않은 상태)
            setSelectedCustomers([]);
        }
    };

    // 개별 체크박스
    const handleSelectEach = customerId => {
        if (selectedCustomers.includes(customerId)) {
            // 이미 체크가 된 고객이라면
            setSelectedCustomers(selectedCustomers.filter(id => id !== customerId));
            // 체크박스 재클릭 시 체크 해제
        } else {
            // 선택된 고객이 아니면 체크된고객들에다가 해당 고객번호 추가
            setSelectedCustomers([...selectedCustomers, customerId]);
        }
    };

    return (
        <div className={styles.memberlist}>
            <div className={styles.actionButtons}>
                <button className={styles.chgstatus} onClick={() => handleUpdateStatus('정상')} disabled={selectedCustomers.length === 0}>
                    선택고객 정상 변경
                </button>
            </div>
            <table>
                <tr>
                    <td>
                        <input
                            type="checkbox"
                            checked={selectAll} // selectAll 초기값 false
                            onChange={handleSelectAll} // 전체선택 함수로 작동해라
                        />
                        전체 선택
                    </td>
                    <td>고객번호</td>
                    <td>고객명</td>
                    <td>연락처</td>
                    <td>이메일</td>
                    <td>상태</td>
                </tr>
                {filteredCustomers.map(customer => (
                    <tr key={customer.customer_id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedCustomers.includes(customer.customer_id)} // 선택된 고객을 넣어라
                                onChange={() => handleSelectEach(customer.customer_id)} // 체크 상태에 따라 handleSelectEach 작동
                            />
                        </td>
                        <td>{customer.customer_id}</td>
                        <td>{customer.customer_name}</td>
                        <td>{customer.contact_number}</td>
                        <td>{customer.email}</td>
                        <td>{customer.status}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
}

export default UnactiveMember;
