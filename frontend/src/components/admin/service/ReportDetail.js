import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/admin/AdminList.module.scss';

const bkURL = process.env.REACT_APP_BACK_URL;


const ReportDetail = () => {
    const { id } = useParams(); // URL에서 ID 가져오기
    console.log(id);
    const [report, setReport] = useState(null); // 신고 상세 데이터
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${bkURL}/reports/${id}`)
            .then((res) => {
                setReport(res.data); // res.data로 데이터 접근
            })
            .catch((err) => {
                console.error('상세 오류:', err);
            });
    }, [id]);


    
    // 리뷰 비공개 처리 함수
    const handleHideReview = async (review_no, report_no) => {
        if (window.confirm('이 리뷰를 비공개 처리하시겠습니까?')) {
            // console.log(review_no, report_no)
            axios
                .put(`${bkURL}/reports/hide/${review_no}/${report_no}`)
                .then((res) => {
                    console.log('정보수정 성공 ', res.data);
                    alert(`신고되었습니다.`);
                    navigate(`/admin/reports`);
                })
                .catch((err) => {
                    console.error('정보수정 실패 ', err);
                });
        }
    };

    if (!report) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className={styles.list}>
            <h2 className={styles.title}>신고 상세</h2>
            <table className={styles.table}>
                <tbody>
                    <tr>
                        <td><strong>구분</strong></td>
                        <td>내용</td>
                    </tr>
                    <tr>
                        <td><strong>번호</strong></td>
                        <td>{report.report_no}</td>
                    </tr>
                    <tr>
                        <td><strong>신고자</strong></td>
                        <td>{report.reporter}</td>
                    </tr>
                    <tr>
                        <td><strong>신고 일자</strong></td>
                        <td>{new Date(report.report_date).toLocaleDateString()}</td>
                    </tr>
                    <tr>
                        <td><strong>내용</strong></td>
                        <td>{report.report_detail}</td>
                    </tr>
                </tbody>
            </table>
            <div className={styles.center}>
                <button
                    className={styles.changebutton}
                    onClick={() => handleHideReview(report.review_no, report.report_no)}
                >
                    리뷰 비공개
                </button>
                <button
                    className={styles.changebutton}
                    onClick={() => navigate('/admin/reports')}
                    style={{ marginLeft: '10px' }}
                >
                    뒤로가기
                </button>
            </div>
        </div>
    );
};
export default ReportDetail;
