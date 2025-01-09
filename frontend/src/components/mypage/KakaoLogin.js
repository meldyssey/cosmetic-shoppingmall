import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function KakaoLoginHandler() {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URL(window.location.href);
        const code = urlParams.searchParams.get('code');
        const state = urlParams.searchParams.get('state'); // login 또는 signup

        if (code) {
            axios
                .post(`${process.env.REACT_APP_BACK_URL}/auth/kakao`, { code })
                .then(response => {
                    const { email, sessionToken, customer_name } = response.data;

                    if (!email || !customer_name) {// db에 해당 이메일이 없는 경우
                        if (state !== 'signup') {
                            // state가 signup이 아닌 경우에만 알림 표시
                            alert('가입되지 않은 계정입니다. 계정을 생성해 주세요.');
                        }
                        navigate('/signUp', { state: { email } });
                        return;
                    }

                    if (state === 'signup') {
                        // 회원가입으로 이동
                        navigate('/signUp', { state: { email } });
                    } else {
                        // 로그인 처리
                        sessionStorage.setItem('sessionToken', sessionToken);
                        sessionStorage.setItem('email', email);
                        sessionStorage.setItem('customerName', customer_name);

                        alert(`${customer_name || '사용자'}님 로그인되었습니다.`);
                        navigate('/');
                    }
                })
                .catch(error => {
                    console.error('카카오 인증 실패:', error.response?.data || error.message);
                    alert('카카오 인증에 실패했습니다. 다시 시도해 주세요.');
                });
        }
    }, [navigate]);

}

export default KakaoLoginHandler;
