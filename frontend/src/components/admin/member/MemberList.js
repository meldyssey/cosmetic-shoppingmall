import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from '../../dup/Pagination';
import SearchBar from './SearchBar';
import styles from '../../../scss/member/MemberList.module.scss';

function MemberList(props) {
    const [arr, setArr] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]); // 필터링된 고객 데이터
    const [searchType, setSearchType] = useState(''); // 검색 기준
    const [searchValue, setSearchValue] = useState(''); // 검색 값
    const [sortOrder, setSortOrder] = useState('asc'); // 가입일 오름차순/내림차순 정렬
    const [selectAll, setSelectAll] = useState(false); // 전체 선택 체크 여부 (전체 선택 체크박스 false상태)
    const [selectedCustomers, setSelectedCustomers] = useState([]); // 개별 체크박스

    // searchbar 컴포넌트의 셀렉트 옵션 지정
    const searchOptions = [
        { value: 'customer_name', label: '이름으로 조회' },
        { value: 'contact_number', label: '연락처로 조회' },
        { value: 'join_date', label: '가입일로 정렬/조회' },
    ];

    // pagination 추가
    const [curPage, setCurPage] = useState(1); // Current page
    const [itemsPerPage] = useState(10); // Items per page
    // Calculate the products for the current page
    const indexOfLastItem = curPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const curfilteredCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        axios
            .get(`${bkURL}/admin/member`)
            .then(res => {
                setArr(res.data);
                setFilteredCustomers(res.data); // 처음에는 전체 데이터 표시
            })
            .catch(err => {
                console.error('에러발생 : ', err);
            });
    }, [selectedCustomers]);

    //탈퇴처리 핸들러
    const handleMoveToDeleted = async () => {
        if (!selectedCustomers || selectedCustomers.length === 0) {
            alert('선택된 고객이 없습니다.');
            return;
        }
        try {
            console.log('탈퇴회원 아이디 확인:', selectedCustomers);
            const res = await axios.post(`${bkURL}/admin/member/moveToDeleted`, { customer_ids: selectedCustomers });
            console.log(`탈퇴처리`, res.data);

            alert(`탈퇴처리 되었습니다.`, res.data);
            setArr(prev => prev.map(member => (selectedCustomers.includes(member.customer_id) ? { ...member } : member)));

            setFilteredCustomers(prev => prev.map(member => (selectedCustomers.includes(member.customer_id) ? { ...member } : member)));

            setSelectedCustomers([]); // 선택 초기화
        } catch (error) {
            console.error('상태 업데이트 에러: ', error);
        }
    };

    // 검색 이벤트 핸들러
    const handleSearch = () => {
        let member = [...arr];

        // 검색 필터 적용 (검색 조건이 있을 경우)
        if (searchType === 'customer_name') {
            member = member.filter(member => member.customer_name.includes(searchValue));
        } else if (searchType === 'contact_number') {
            member = member.filter(member => member.contact_number.includes(searchValue));
        }

        setFilteredCustomers(member);
    };

    // 가입일로 정렬할 경우 셀렉트 변경될 때마다 가입일 기준으로 정렬
    useEffect(() => {
        if (searchType === 'join_date') {
            const sorted = [...filteredCustomers].sort((a, b) => {
                const dateA = new Date(a.join_date);
                const dateB = new Date(b.join_date);
                return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            });
            setFilteredCustomers(sorted); // 정렬된 데이터 업데이트
        }
    }, [sortOrder]);

    // 초기화 버튼 이벤트 핸들러
    const resetSearch = () => {
        setSearchType(''); // 검색 기준 초기화
        setSearchValue(''); // 검색 값 초기화
        setFilteredCustomers(arr); // 전체 고객 데이터로 복원
    };

    // 날짜 포맷팅 함수
    const formatDate = dateString => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
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
    const handleSelectEach = customer_id => {
        if (selectedCustomers.includes(customer_id)) {
            // 이미 체크가 된 고객이라면
            setSelectedCustomers(selectedCustomers.filter(id => id !== customer_id));
            // 체크박스 재클릭 시 체크 해제
        } else {
            // 선택된 고객이 아니면 체크된고객들에다가 해당 고객번호 추가
            setSelectedCustomers([...selectedCustomers, customer_id]);
        }
    };

    // 전체 선택 상태 동기화
    useEffect(() => {
        if (selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0) {
            setSelectAll(true); // 모두 선택된 상태
        } else {
            setSelectAll(false); // 일부만 선택되거나 선택 없음
        }
    }, [selectedCustomers, filteredCustomers]); // `selectedCustomers`나 `filteredCustomers` 변경 시 실행

    return (
        <div className={styles.memberlist}>
            <div className={styles.searchcontainer}>
                <SearchBar searchType={searchType} setSearchType={setSearchType} searchValue={searchValue} setSearchValue={setSearchValue} sortOrder={sortOrder} setSortOrder={setSortOrder} onSearch={handleSearch} onReset={resetSearch} options={searchOptions} />
                <button className={styles.deletebutton} disabled={selectedCustomers.length === 0} onClick={handleMoveToDeleted}>
                    탈퇴 처리
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
                    <td>가입일</td>
                    <td>마지막 접속일</td>
                    <td>상태</td>
                </tr>
                {curfilteredCustomers.map(mm => (
                    <tr key={mm.customer_id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={selectedCustomers.includes(mm.customer_id)} // 선택된 고객을 넣어라
                                onChange={() => handleSelectEach(mm.customer_id)} // 체크 상태에 따라 handleSelectEach 작동
                            />
                        </td>
                        <td>
                            <Link className={styles.link} to={`/admin/member/detail/${mm.customer_id}`}>
                                {mm.customer_id}
                            </Link>
                        </td>
                        <td>{mm.customer_name}</td>
                        <td>{mm.contact_number}</td>
                        <td>{mm.email}</td>
                        <td>{formatDate(mm.join_date)}</td>
                        <td>{formatDate(mm.last_login_date)}</td>
                        <td>{mm.status}</td>
                    </tr>
                ))}
            </table>
            <Pagination totalItems={filteredCustomers.length} itemsPerPage={itemsPerPage} pagesPerGroup={5} curPage={curPage} setCurPage={setCurPage} />
        </div>
    );
}

export default MemberList;
