import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/admin/AdminList.module.scss';
import Pagination from '../../dup/Pagination';

const bkURL = process.env.REACT_APP_BACK_URL;


const ReportList = () => {
    const [reports, setReports] = useState([]); // 신고 목록 상태
    const navigate = useNavigate(); // 페이지 이동 함수

 // pagination 추가
    const [curPage, setCurPage] = useState(1); // Current page
    const [itemsPerPage] = useState(10); // Items per page
    // Calculate the products for the current page
    const indexOfLastItem = curPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const curReportList = reports.slice(indexOfFirstItem, indexOfLastItem);

    // 신고 목록 가져오기
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get(`${bkURL}/reports`);
                setReports(response.data); // 데이터 저장
            } catch (err) {
                // console.error('신고 목록 불러오기 실패:', err);
                // alert('신고 목록을 불러오는 데 실패했습니다.');
                return <div>신고 목록 불러오기 실패</div>;
            }
        };

        fetchReports(); // 함수 호출
    }, []); // 컴포넌트가 처음 렌더링될 때 실행

    // 상세보기로 이동
    const handleDetail = (id) => {
        navigate(`/admin/reports/detail/${id}`); // URL 이동
    };

    return (
        <div className={styles.list}>
            <table>
                <tr className={styles.headerRow}>
                    <td>번호</td>
                    <td>신고자</td>
                    <td>신고 일자</td>
                    <td>처리 상태</td>
                    <td>상세보기</td>
                </tr>

                {reports.length > 0 ? (
                    curReportList.map((report,i) => (
                        <tr key={report.report_no} className={styles.dataRow}>
                            <td>{(curPage - 1) * itemsPerPage + (i + 1)}</td>
                            <td>{report.reporter}</td>
                            <td>{new Date(report.report_date).toLocaleDateString()}</td>
                            <td>{report.check_status ? '처리 완료' : '미처리'}</td>
                            <td>
                                <button className={styles.changebutton} onClick={() => handleDetail(report.report_no)}>
                                    보기
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" className={styles.noData}>
                            신고 목록이 없습니다!
                        </td>
                    </tr>
                )}
            </table>
            <Pagination
                totalItems={reports.length}
                itemsPerPage={itemsPerPage}
                pagesPerGroup={5}
                curPage={curPage}
                setCurPage={setCurPage}
            />
        </div>
    );
};
export default ReportList;
