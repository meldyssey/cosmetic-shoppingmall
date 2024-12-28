import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/admin/AdminList.module.scss';
import Pagination from '../../dup/Pagination';

const bkURL = process.env.REACT_APP_BACK_URL;


const AReviewList = () => {
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    // pagination 추가
    const [curPage, setCurPage] = useState(1); // Current page
    const [itemsPerPage] = useState(10); // Items per page
    // Calculate the products for the current page
    const indexOfLastItem = curPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const curReviewList = reviews.slice(indexOfFirstItem, indexOfLastItem);


    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${bkURL}/review`);
                console.log('응답 데이터:', response.data); // 응답 데이터 확인
                const reviewData = Array.isArray(response.data) ? response.data : [];
                setReviews(reviewData); // 상태 업데이트
            } catch (err) {
                setError('리뷰 데이터를 가져오는 데 실패했습니다.');
                console.error('에러 발생:', err);
            }
        };

        fetchReviews();
    }, []);

    const handleDetailClick = (id) => {
        console.log('전달된 ID:', id); // 클릭한 리뷰의 ID 확인
        navigate(`/admin/areviewdetail/${id}`); // 상세보기 페이지로 이동
    };
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.list}>

            <table>
                <tr>
                    <td>리뷰 번호</td>
                    <td>이메일</td>
                    <td>닉네임</td>
                    <td>제목</td>
                    <td>상세보기</td>
                </tr>

                {reviews.length > 0 ? (
                    curReviewList.map((review,i) => (
                        <tr key={review.review_no}>
                           <td>{(curPage - 1) * itemsPerPage + (i + 1)}</td>
                            <td>{review.email}</td>
                            <td>{review.review_nick}</td>
                            <td>{review.review_title}</td>
                            <td>
                                <button
                                    className={styles.changebutton}
                                    onClick={() => handleDetailClick(review.review_no)}
                                >
                                    상세보기
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="7">리뷰가 없습니다!</td>
                    </tr>
                )}
            </table>

            {error && <p className={styles.error}>{error}</p>}
            <Pagination
                totalItems={reviews.length}
                itemsPerPage={itemsPerPage}
                pagesPerGroup={5}
                curPage={curPage}
                setCurPage={setCurPage}
            />
        </div>
    );
};
export default AReviewList;
