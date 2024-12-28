import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/admin/AdminList.module.scss';

const bkURL = process.env.REACT_APP_BACK_URL;

const ReviewDetail = () => {
    const { id } = useParams(); // URL에서 ID 가져오기
    const navigate = useNavigate();
    const [review, setReview] = useState(null); //리뷰 데이터 상태
    const [loading, setLoading] = useState(true); //로딩 상태
    const [error, setError] = useState(null); //에러 상태

    useEffect(() => {
        const fetchReviewDetail = async () => {
            try {
                const response = await axios.get(`${bkURL}/review/${id}`);
                setReview(response.data); //상태 업데이트
            } catch (err) {
                setError('리뷰 세부 정보를 가져오는 데 실패했습니다.');
                console.error('에러 발생:', err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReviewDetail(); //데이터 요청
    }, [id]);

    const handleBack = () => {
        navigate('/admin/areviewlist'); // 목록 페이지로 이동
    };

    if (loading) return <div className="spinner">로딩 중...</div>;
    if (error) return <p>{error}</p>;
    if (!review) return <p>리뷰를 찾을 수 없습니다.</p>;

    return (
        <div className={styles.list}>
            <h2 className={styles.title}>리뷰 상세 정보</h2>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td><strong>제목</strong></td>
                        <td>{review.review_title}</td>
                    </tr>
                    <tr>
                        <td><strong>닉네임</strong></td>
                        <td>{review.review_nick}</td>
                    </tr>
                    <tr>
                        <td><strong>내용</strong></td>
                        <td>{review.review_detail}</td>
                    </tr>
                    <tr>
                        <td><strong>작성일</strong></td>
                        <td>{new Date(review.review_date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td><strong>별점</strong></td>
                        <td>{review.review_rate}</td>
                    </tr>
                    <tr>
                        <td><strong>추천 여부</strong></td>
                        <td>{review.review_recommend === 1 ? '추천' : '비추천'}</td>
                    </tr>
                    <tr>
                        <td><strong>지역</strong></td>
                        <td>{review.review_region}</td>
                    </tr>
                    <tr>
                        <td><strong>향수 계열</strong></td>
                        <td>{review.review_scent}</td>
                    </tr>
                    <tr>
                        <td><strong>처리상태</strong></td>
                        <td>{review.is_visible === 1 ? '활성화' : '비활성화'}</td>
                    </tr>
                </tbody>
            </table>
            <button className={styles.changebutton} 
            onClick={handleBack} 
            style={{ marginTop: '20px' }}>
                뒤로가기
            </button>
        </div>
    );
};

export default ReviewDetail;
