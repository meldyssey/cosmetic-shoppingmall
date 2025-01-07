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
              const { success, email, customer_name, sessionToken } = response.data;
      
              console.log('로그인 응답 데이터:', response.data); // 디버깅용
      
              if (!success) {
                  // 회원가입 필요 시 이메일 전달
                  navigate('/signUp', { state: { email } });
              } else {
                  // 로그인 성공 시 세션 저장 및 페이지 이동
                  sessionStorage.setItem('sessionToken', sessionToken);
                  sessionStorage.setItem('email', email);
                  sessionStorage.setItem('customerName', customer_name);

                  console.log('세션 저장 확인:', {
                    sessionToken: sessionStorage.getItem('sessionToken'),
                    email: sessionStorage.getItem('email'),
                    customerName: sessionStorage.getItem('customerName'),
                });

                  alert(`${customer_name || '이름 없음'}님 로그인되었습니다.`);
                  navigate('/');
              }
          })
          .catch(error => {
              console.error('로그인 실패:', error);
              alert('로그인에 실패했습니다.');
          });
      

      
        }
    }, [navigate]);

}

export default KakaoLoginHandler;
