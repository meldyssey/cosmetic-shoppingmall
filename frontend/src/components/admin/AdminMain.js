import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../scss/admin/AdminMain.module.scss';
import MonthChart from './analysis/MonthChart';

const AdminMain = () => {
    const [Neworder, setOrderCount] = useState(0);
    const [Newask, setaskCount] = useState(0);
    const [Newrefund, setrefundCount] = useState(0);
    const [Newreport, setreportCount] = useState(0);
    const bkURL = process.env.REACT_APP_BACK_URL;

    const DataCount = async () => {
        try {
            // 신규 주문접수건 가져오기
            const orderCnt = await axios.post(`${bkURL}/admin/order`, { action: 'orderCount' });
            setOrderCount(orderCnt.data);

            // 문의접수건 가져오기
            const askCount = await axios.post(`${bkURL}/onetoone`, { action: 'askCount' });
            setaskCount(askCount.data);

            // 반품접수건 가져오기
            const refundCount = await axios.post(`${bkURL}/admin/order`, { action: 'refundCount' });
            setrefundCount(refundCount.data);

            // 신고접수건 가져오기
            const reportCount = await axios.post(`${bkURL}/reports`, { action: 'reportCount' });
            setreportCount(reportCount.data);
        } catch (error) {
            console.error('데이터 가져오다가 에러남', error.message);
        }
    };

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        DataCount();
    }, []);

    return (
        <div className={styles.container}>
            {/* 업무 -- 건수 확인하고 클릭시 해당 게시판으로 넘어감 */}
            <div className={styles.topboard}>
                <Link to="/admin/order">
                    <div>주문접수</div>
                    <div className={styles.title}>{Neworder} 건</div>
                </Link>
                <Link to="/admin/onetoone">
                    <div>문의접수</div>
                    <div className={styles.title}>{Newask} 건</div>
                </Link>
                <Link to="/admin/orderStatus">
                    <div>반품접수</div>
                    <div className={styles.title}>{Newrefund} 건</div>
                </Link>
                <Link to="/admin/reports">
                    <div>신고접수</div>
                    <div className={styles.title}>{Newreport} 건</div>
                </Link>
            </div>

            {/* 차트 영역 */}

            <div className={styles.chartcontainer}>
                <p>월별 매출액 그래프</p>
                <div className={styles.chartbox}>
                    <MonthChart />
                </div>
            </div>
        </div>
    );
};

export default AdminMain;
