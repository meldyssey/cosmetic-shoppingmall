import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../scss/mypage/SignIn.module.scss';
import axios from 'axios';

function SignIn() {
    const [email, setEmail] = useState(''); // 이메일 상태
    const [password, setPassword] = useState(''); // 비밀번호 상태
    const [showPassword, setshowPassword] = useState(false);
    const bkURL = process.env.REACT_APP_BACK_URL;
    const navigate = useNavigate();

    // 카카오 로그인 버튼
    const handleLogin = () => {
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&state=login`;
        window.location.href = KAKAO_AUTH_URL;
    };

    // 카카오 회원가입 버튼
    const handleSignUp = () => {
        const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&state=signup`;
        window.location.href = KAKAO_AUTH_URL;
    };

    // 비밀번호 숨기기 토글
    const passwordHide = () => {
        setshowPassword((prevState) => !prevState);
    };

    // 로그인 요청 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            alert('이메일과 비밀번호를 입력해주세요.');
            return;
        }
    
        try {
            const res = await axios.post(`${bkURL}/signIn/login`, { email, password });
    
            console.log('로그인 응답 데이터:', res.data); // 응답 확인
            const { sessionToken, email: returnedEmail, customer_name } = res.data;
    
            if (!sessionToken || !returnedEmail || !customer_name) {
                alert('로그인에 실패하였습니다.');
                return;
            }
    
            // 세션 저장
            sessionStorage.setItem('sessionToken', sessionToken);
            sessionStorage.setItem('email', returnedEmail);
            sessionStorage.setItem('customerName', customer_name);
    
            console.log('세션 저장 확인:', {
                sessionToken: sessionStorage.getItem('sessionToken'),
                email: sessionStorage.getItem('email'),
                customerName: sessionStorage.getItem('customerName'),
            });
            // 관리자 계정 여부 확인 및 페이지 이동
            if (email === 'admin@jomalone.kr' && customer_name === '관리자') {
                location.href = '/admin';
            } else {
                alert(`${customer_name}님 로그인 되었습니다.`);
                location.href = '/';
            }     
        } catch (err) {
            console.error('로그인 요청 오류:', err.response?.data || err.message);
            alert('정확한 정보를 입력해주세요.');
        }
    };
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.wrap}>
                <div className={styles.loginContainer}>
                    <div className={styles.topBtn}>
                        <button className={styles.signIn}>
                            <Link to="/signIn">로그인</Link>
                        </button>
                        <button className={styles.signUp} onClick={handleSignUp}>
                            <Link to="/signUp">계정 생성하기</Link>
                        </button>
                    </div>
                    <div className={styles.bottomCnt}>
                        <div>
                            <div className={styles.kakao}>
                                <a onClick={handleLogin}>
                                    <img src="/imgs/sign/kakao.svg" alt="카카오 로그인" />
                                </a>
                            </div>
                        </div>
                        <div className={styles.or}>또는</div>
                        <form onSubmit={handleSubmit} className={styles.loginForm}>
                            <input
                                type="text"
                                className={styles.email}
                                placeholder="*이메일"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 업데이트
                            />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={styles.pw}
                                value={password}
                                placeholder="*비밀번호"
                                onChange={(e) => setPassword(e.target.value)} // 비밀번호 입력값 업데이트
                            />
                            <div className={styles.pwIcon} onClick={passwordHide}>
                                {showPassword ? (
                                    <img className={styles.crossed} src="/imgs/sign/pwIcon.svg" alt="숨김" />
                                ) : (
                                    <img className={styles.notCrossed} src="/imgs/sign/pwIcon_cross.svg" alt="보임" />
                                )}
                            </div>
                            <div className={styles.pwfind}>
                                <Link to="/findPw">비밀번호 찾기</Link>
                            </div>
                            <button type="submit" className={styles.login}>
                                로그인
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;