import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function KakaoLoginHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URL(window.location.href);
    const code = urlParams.searchParams.get('code');
    const state = urlParams.searchParams.get('state'); 

    if (code) {
      axios.post(`${process.env.REACT_APP_BACK_URL}/auth/kakao`, { code })
    .then(response => {
        const { sessionToken, customer_name, email } = response.data;

        // 세션 저장
        sessionStorage.setItem('sessionToken', sessionToken);
        sessionStorage.setItem('customerName', customer_name);
        sessionStorage.setItem('email', email);

        console.log('세션 저장 확인:', {
            sessionToken: sessionStorage.getItem('sessionToken'),
            customerName: sessionStorage.getItem('customerName'),
            email: sessionStorage.getItem('email'),
        });

        navigate('/'); // 메인 페이지로 이동
    })
    .catch(error => {
        console.error('카카오 로그인 실패:', error);
        alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
    });

    }
  }, [navigate]);

  return (
    <div>
      <p>카카오 로그인 처리 중...</p>
    </div>
  );
}

export default KakaoLoginHandler;
