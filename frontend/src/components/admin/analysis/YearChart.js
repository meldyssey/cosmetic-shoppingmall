import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import ChartDataLabels from 'chartjs-plugin-datalabels'; // 플러그인 import

const YearChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Yearly Sales',
                data: [],
                backgroundColor: 'rgba(28, 28, 28, 0.2)',
                borderColor: 'rgba(0, 0, 0, 1)',
                borderWidth: 1,
            },
        ],
    });

    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${bkURL}/analysis/year`);
                const data = response.data;

                const labels = data.map((item) => `${new Date(item.order_date).getFullYear()}년`);
                const amount = data.map((item) => Number(item.total_amount)); // 값을 숫자로 변환

                setChartData({
                    labels, // x축 라벨
                    datasets: [
                        {
                            label: 'Orders',
                            data: amount,
                            backgroundColor: amount.map(
                                (value) =>
                                    value === Math.max(...amount)
                                        ? '#ffe59b' // 최대값 색상
                                        : '#fff2cd' // 기본 색상
                            ),
                            borderColor: amount.map(
                                (value) =>
                                    value === Math.max(...amount)
                                        ? '#ffe59b' // 최대값 색상
                                        : '#fff2cd' // 기본 색상
                            ),
                            borderWidth: 2, // 테두리 두께
                        },
                    ],
                });
            } catch (err) {
                console.error('연별 데이터 가져오기 실패: ', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="chart-container" style={{ height: '600px', width: '100%' }}>
            <Bar
                data={chartData}
                options={{
                    responsive: true,
                    maintainAspectRatio: false, // 반응형으로 높이 비율 조정
                    plugins: {
                        legend: {
                            display: false, // 범례 숨김
                        },
                        datalabels: {
                            anchor: 'end', // 레이블 위치
                            align: 'bottom', // 레이블 정렬
                            formatter: (value) => `${Number(value).toLocaleString()} 원`,
                            font: {
                                size: 14,
                                weight: 'bold',
                            },
                            color: '#000', // 레이블 색상
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: '#555', // x축 텍스트 색상
                                font: {
                                    size: 12,
                                },
                            },
                            grid: {
                                color: 'rgba(200, 200, 200, 0.1)', // x축 그리드 색상
                            },
                        },
                        y: {
                            ticks: {
                                color: '#555', // y축 텍스트 색상
                                font: {
                                    size: 12,
                                },
                            },
                            grid: {
                                color: 'rgba(200, 200, 200, 0.1)', // y축 그리드 색상
                            },
                        },
                    },

                    scales: {
                        y: { beginAtZero: true },
                    },
                }}
                plugins={[ChartDataLabels]} // 플러그인 연결
            />
        </div>
    );
};

export default YearChart;
