import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function KakaoLoginHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URL(window.location.href);
        const code = urlParams.searchParams.get('code');

        if (code) {
          axios.post(`${process.env.REACT_APP_BACK_URL}/auth/kakao`, { code })
          .then(response => {
              const { success, email, nickname, sessionToken } = response.data; // nickname이 customer_name으로 변경될 수도 있음
      
              console.log('로그인 응답 데이터:', response.data); // 디버깅용
      
              if (!success) {
                  navigate('/signUp', { state: { email, nickname } }); // 회원가입 필요
              } else {
                  sessionStorage.setItem('sessionToken', sessionToken);
                  sessionStorage.setItem('email', email);
                  sessionStorage.setItem('customerName', nickname); // 이름 저장
                  alert(`${nickname || '이름 없음'}님 로그인되었습니다.`);
                  navigate('/');
              }
          })
          .catch(error => {
              console.error('로그인 실패:', error);
              alert('로그인에 실패했습니다.');
          });
      
        }
    }, [navigate]);

    return <p>카카오 로그인 처리 중...</p>;
}

export default KakaoLoginHandler;
