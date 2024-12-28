import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/service/IldaeIl/OneToOneMain.module.scss';

// 환경 변수에서 백엔드 URL 가져오기
const bkURL = process.env.REACT_APP_BACK_URL;

const OneToOneMain = () => {
    const [onetoone, setOnetoone] = useState([]);
    const navigate = useNavigate(); // 페이지 이동에 사용
    const email = sessionStorage.getItem('email');  // 현재 로그인한 사용자의 이메일 가져오기

     // "작성하기" 버튼 클릭 시 실행 (문의 작성 페이지로 이동)
    const handleCreateInquiry = () => {
        navigate('/onetoone'); // 문의 작성 페이지 경로로 이동
    };
    // 서버에서 1:1 문의 데이터를 가져오는 함수
    const fetchOnetoone = async () => {
        try {
            //백엔드에서 데이터 가져오기
            const response = await axios.get(`${bkURL}/onetoone`);
            console.log('응답 데이터:', response.data); // 가져온 데이터 확인

            console.log(email); //현재 사용자 이메일 확인

            //서버에서 가져온 데이터
            let data = response.data.inquiries;
            console.log(data);  //전체 데이터 확인

            // 현재 로그인한 사용자의 문의 데이터만 필터링
            let filterdata = data.filter(item => item.email === email);
            console.log(filterdata);

             // 필터링된 데이터를 상태에 저장
            setOnetoone(filterdata); // 서버에서 받은 데이터를 onetoone에 저장
        } catch (error) {
            console.error('Error fetching onetoone:', error); // 에러 발생 시 로그 출력
        }
    };

    // 날짜 형식을 'YYYY-MM-DD'로 변환하는 함수
    const formatDate = dateString => {
        if (!dateString) return '-';    // 날짜가 없으면 '-' 반환
        const date = new Date(dateString); // 문자열을 Date 객체로 변환 
        return date.toISOString().split('T')[0];    // 날짜만 추출해서 반환
    };

    // 컴포넌트가 처음 렌더링될 때 fetchOnetoone 실행
    useEffect(() => {
        fetchOnetoone(); 
    }, []); // 빈 배열로 설정하여 처음 렌더링 시 한 번만 실행

    return (
        <div className={styles.list}>
            <div className={styles.rtitle}>1:1 문의 목록</div>

            <table border="1">
                <tr>
                    <td>제목</td>
                    <td>내용</td>
                    <td>작성일</td>
                    <td>처리 상태</td>
                </tr>

                {Array.isArray(onetoone) && onetoone.length > 0 ? (
                    onetoone.map(item => (
                        <tr key={item.post_no}>
                            <td className={styles.post1}>{item.post_title}</td>
                            <td className={styles.post2}>{item.post_detail}</td>
                            <td className={styles.post3}>{formatDate(item.post_date)}</td>
                            <td className={styles.post4}>{item.reply_status}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4">문의 목록이 없습니다.</td>
                    </tr>
                )}
            </table>
            <button className={styles.createButton} onClick={handleCreateInquiry}>
                작성하기
            </button>
        </div>
    );
};
export default OneToOneMain;
