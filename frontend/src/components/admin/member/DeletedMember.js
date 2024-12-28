import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import Pagination from '../../dup/Pagination';
import styles from '../../../scss/member/MemberList.module.scss';

function DeletedMember() {
    const [arr, setArr] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState([]); // 필터링된 고객 데이터
    const [searchType, setSearchType] = useState(''); // 검색 기준
    const [searchValue, setSearchValue] = useState(''); // 검색 값
    const [sortOrder, setSortOrder] = useState('asc'); // 탈퇴일 오름차순/내림차순 정렬

    const searchOptions = [
        { value: 'customer_name', label: '이름으로 조회' },
        { value: 'contact_number', label: '연락처로 조회' },
        { value: 'deleted_date', label: '탈퇴일로 정렬/조회' },
    ];

    // pagination 추가
    const [curPage, setCurPage] = useState(1); // Current page
    const [itemsPerPage] = useState(10); // Items per page
    // Calculate the products for the current page
    const indexOfLastItem = curPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const curfilteredCustomers = filteredCustomers.slice(indexOfFirstItem, indexOfLastItem);

    const bkURL = process.env.REACT_APP_BACK_URL;

    // 데이터 가져오기
    useEffect(() => {
        axios
            .get(`${bkURL}/admin/member/deletedmember`)
            .then(res => {
                setArr(res.data);
                setFilteredCustomers(res.data); //전체 탈퇴고객 표시
            })
            .catch(err => {
                console.error('에러발생 : ', err);
            });
    }, []);

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

    // 탈퇴일로 정렬할 경우 셀렉트 변경될 때마다 탈퇴일 기준으로 정렬
    useEffect(() => {
        if (searchType === 'deleted_date') {
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

    return (
        <div className={styles.memberlist}>
            <SearchBar
                searchType={searchType}
                setSearchType={setSearchType}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
                onSearch={handleSearch}
                onReset={resetSearch}
                options={searchOptions} // 검색 기준 옵션 전달
            />
            <table>
                <tr>
                    <td>No.</td>
                    <td>고객번호</td>
                    <td>고객명</td>
                    <td>연락처</td>
                    <td>이메일</td>
                    <td>탈퇴일</td>
                    <td>상태</td>
                </tr>
                {curfilteredCustomers.map((customer, index) => (
                    <tr key={customer.customer_id}>
                        <td>{index + 1}</td>
                        <td>{customer.customer_id}</td>
                        <td>{customer.customer_name}</td>
                        <td>{customer.contact_number}</td>
                        <td>{customer.email}</td>
                        <td>{formatDate(customer.deleted_date)}</td>
                        <td>{customer.status}</td>
                    </tr>
                ))}
            </table>
            <Pagination totalItems={filteredCustomers.length} itemsPerPage={itemsPerPage} pagesPerGroup={5} curPage={curPage} setCurPage={setCurPage} />
        </div>
    );
}

export default DeletedMember;
