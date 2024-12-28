import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'chart.js/auto';
import MonthChart from './MonthChart';
import YearChart from './YearChart';
import DayChart from './DayChart';

const Analysis = () => {
    const [timePeriod, setTimePeriod] = useState('day');
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Orders',
                data: [],
                backgroundColor: 'rgba(28, 28, 28, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            },
        ],
    });

    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        fetchData(timePeriod);
        console.log('최종 chartData:', chartData);
    }, [timePeriod]);

    const formatDate = (dateString, period) => {
        if (!dateString) return '';

        const date = new Date(dateString);

        if (period === 'day') {
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });
        }
        return '';
    };

    const fetchData = async (period) => {
        try {
            const response = await axios.get(`${bkURL}/analysis/${period}`);
            const data = response.data;
            console.log('data:', data);
            const dateData = data.map((item) => item.order_date);
            console.log('dateData:', dateData);

            let labels = [];
            let amount = [];

            if (period === 'day') {
                labels = data.map((item) => formatDate(item.order_date, period));
                amount = data.map((item) => item.total_amount);
            }

            // console.log('labels,counts:',labels,counts)

            setChartData({
                labels,
                datasets: [
                    {
                        label: 'Orders',
                        data: amount,
                        backgroundColor: 'rgba(28, 28, 28, 0.2)',
                        borderColor: 'rgba(0, 0, 0, 1)',
                        borderWidth: 1,
                    },
                ],
            });

            console.log('chartData: ', chartData);
        } catch (err) {
            console.error('데이터 가져오기 실패: ', err);
        }
    };

    return (
        <div>
            <div className="timePeriodSales" style={{ justifyContent: 'center' }}>
                <div style={{ margin: '10px', display: 'inline-block' }}>기간별 매출액 조회</div>
                <select onChange={(e) => setTimePeriod(e.target.value)} value={timePeriod}>
                    <option value="day">일별</option>
                    <option value="month">월별</option>
                    <option value="year">연별</option>
                </select>
            </div>
            {timePeriod === 'day' && <DayChart />}
            {timePeriod === 'month' && <MonthChart />}
            {timePeriod === 'year' && <YearChart />}
        </div>
    );
};

export default Analysis;
