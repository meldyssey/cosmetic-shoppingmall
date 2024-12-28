import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../scss/service/review/ReportList.module.scss';

const bkURL = process.env.REACT_APP_BACK_URL;

// 신고 목록 컴포넌트
const ReportList = () => {
  const [reports, setReports] = useState([]); // 신고 데이터를 저장하는 상태

  // 컴포넌트가 마운트되었을 때 신고 목록 데이터를 가져오기 위한 useEffect
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`${bkURL}/reports`);
        setReports(response.data); // 가져온 데이터를 상태에 저장
      } catch (error) {
        // 요청 실패 시 콘솔에 오류 출력
        console.error('신고 목록 불러오기 실패:', error);
      }
    };

    fetchReports(); //신고 데이터 요청 함수 호출
  }, []);   //의존성 배열이 비어 있으므로 컴포넌트가 처음 렌더링될 때 한 번 실행

  return (
    <div className={styles.reportListWrapper}>
      <h2>신고 목록</h2>
      {reports.length === 0 ? (
        <p>신고된 리뷰가 없습니다.</p>
      ) : (
        <ul>
          {reports.map((report) => (
            <li key={report.report_no}>
              <p><strong>리뷰 번호:</strong> {report.review_no}</p>
              <p><strong>신고자:</strong> {report.reporter}</p>
              <p><strong>신고 내용:</strong> {report.report_detail}</p>
              <p><strong>신고 날짜:</strong> {new Date(report.report_date).toLocaleDateString()}</p>
              <p><strong>상태:</strong> {report.check_status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReportList;
