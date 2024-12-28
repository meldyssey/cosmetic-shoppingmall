import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/admin/AdminList.module.scss';
import Pagination from '../../dup/Pagination';

const bkURL = process.env.REACT_APP_BACK_URL;





const OneToOneList = () => {
    const [onetoone, setOnetoone] = useState([]);
    const navigate = useNavigate();

    // pagination 추가
    const [curPage, setCurPage] = useState(1); // Current page
    const [itemsPerPage] = useState(10); // Items per page
    // Calculate the products for the current page
    const indexOfLastItem = curPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const curOneToOne = onetoone.slice(indexOfFirstItem, indexOfLastItem);

    // 서버에서 데이터를 가져오는 함수
    const fetchOnetoone = async () => {
        try {
            const response = await axios.get(`${bkURL}/onetoone`);
            console.log('응답 데이터:', response.data); // 데이터 구조 확인
            setOnetoone(response.data.inquiries); // 서버에서 받은 데이터를 onetoone에 저장
        } catch (error) {
            console.error('Error fetching onetoone:', error);
        }
    };

    useEffect(() => {
        fetchOnetoone(); // 처음에 데이터를 가져옴
    }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

    const handleDetailClick = (id) => {
        navigate(`/admin/onetoone/detail/${id}`); // 상세보기 페이지로 이동 (절대 경로)
    };

    return (
        <div className={styles.list}>

            <table>
                <tr>
                    <td>번호</td>
                    <td>제목</td>
                    <td>작성자 이메일</td>
                    <td>처리 상태</td>
                    <td>상세보기</td>
                </tr>

                {Array.isArray(onetoone) && onetoone.length > 0 ? (
                    curOneToOne.map((item,i) => (
                        <tr key={item.post_no}>
                           <td>{(curPage - 1) * itemsPerPage + (i + 1)}</td>
                            <td>{item.post_title}</td>
                            <td>{item.email}</td>
                            <td>{item.reply_status}</td>
                            <td>
                                <button className={styles.changebutton} onClick={() => handleDetailClick(item.post_no)}>
                                    상세보기
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">문의 목록이 없습니다.</td>
                    </tr>
                )}
            </table>
            <Pagination
                totalItems={onetoone.length}
                itemsPerPage={itemsPerPage}
                pagesPerGroup={5}
                curPage={curPage}
                setCurPage={setCurPage}
            />
        </div>
    );
};
export default OneToOneList;
