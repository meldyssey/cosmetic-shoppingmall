import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import styles from '../../scss/mypage/SignUp.module.scss';
import axios from 'axios';

function SignUp() {
    const location = useLocation();
    const navigator = useNavigate();
    const bkURL = process.env.REACT_APP_BACK_URL;

    const kakaoEmail = location.state?.email || '';


    const [formData, setFormData] = useState({
        name: '',      // 닉네임은 사용자가 직접 입력
        email: kakaoEmail, // 전달받은 이메일을 기본값으로 설정
        phone: '',
        password: '',
        gender: '',
        requiredAgree: true,
        optionalAgree: false,
    });

    const [emailChkFinish, setemailChkFinish] = useState(false); // 중복 확인 여부 상태
    const [editChk, seteditChk] = useState(false); //readOnly 초기값 false
    const [errors, setErrors] = useState({}); // 유효성 검사 에러 메시지 -- 각 인풋 필드마다 에러메시지 표기
    const [showErrors, setShowErrors] = useState(false); // 에러 메시지 표시 여부 상태 추가

    useEffect(() => {
        if (kakaoEmail) {
            // 카카오 이메일이 있는 경우 상태 업데이트
            setFormData((prev) => ({ ...prev, email: kakaoEmail }));
        } else {
            // 카카오 이메일이 없는 경우 로그인 페이지로 리다이렉트
            navigator('/signin'); 
        }
    }, [kakaoEmail, navigator]);

    const handleChange = async e => {
        //각 요소 이름, 값, 종류, 체크여부 데이터 저장(폼데이터 바꾸기)
        const { name, value, type, checked } = e.target;
        // requiredAgree 체크박스는 항상 true 유지
        if (name === 'requiredAgree') {
            setFormData(prev => ({
                ...prev,
                [name]: true, // 항상 true로 강제 설정
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }
        if (name === 'birthdate') {
            setFormData(prev => ({
                ...prev,
                [name]: value, // 생일 입력값이 DB 저장될때 바뀌지 않도록 그대로 값을 저장해버리기
            }));
            return;
        }
        // 각 필드의 유효성 검사 결과 업데이트
        const error = ValueChk(name, type === 'checkbox' ? checked : value);

        // 에러 메시지 업데이트
        setErrors(prev => ({
            ...prev,
            [name]: error, // 에러메시지가 바뀌면 업데이트 해야함
        }));
    };

    const ValueChk = (name, value) => {
        // 각 필드별 에러메시지 스위치문으로 구분(각 필드별 에러 발생시에만 에러 호출)
        switch (name) {
            case 'name':
                if (!/^[가-힣]{2,5}$/.test(value)) return '이름을 정확히 입력해주세요.';
                break;
            case 'email':
                if (!/^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)) return '카카오 로그인이 필요합니다.';
                break;
            case 'phone':
                if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(value)) return '연락처를 정확히 입력해주세요.';
                break;
            case 'password':
                if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%~]).{12,16}$/.test(value)) return '비밀번호는 영문, 숫자, 특수문자를 포함하여 12~16자 이내여야 합니다.';
                break;
            case 'password2':
                if (value !== formData.password) return '입력하신 비밀번호가 서로 일치하지 않습니다.';
                break;
            default:
                break;
        }
        return ''; // 에러가 없으면 빈 문자열 반환
    };

    // 회원가입 요청 처리 함수
    const handleSubmit = async e => {
        e.preventDefault(); // 기본 동작 방지
        setShowErrors(true); // 에러 메시지 표시
    
        const errorsChk = {}; // 에러 메시지를 수집할 객체
    
        // 각 필드의 유효성 검사 결과 수집
        for (const field in formData) {
            const error = ValueChk(field, formData[field]);
            if (error) {
                errorsChk[field] = error; // 에러가 있을 경우 저장
            }
        }
    
        setErrors(errorsChk); // 상태 업데이트
    
        if (Object.keys(errorsChk).length > 0) {
            alert('입력 내용을 다시 확인해주세요.');
            return; // 에러가 있으면 요청 중단
        }
    
        const { email } = formData;
    
        try {
            // 이메일 중복 확인 요청
            const emailCheckResponse = await axios.get(`${bkURL}/signUp/checkEmail`, {
                params: { email },
            });
    
            if (emailCheckResponse.data.exists) {
                alert('이미 가입된 회원입니다.');
                return; // 중복된 이메일이 있으면 요청 중단
            }
    
            // 회원가입 요청 전송
            const res = await axios.post(`${bkURL}/signUp/`, formData);
    
            if (res.data.error) {
                alert(res.data.message); // 서버에서 에러 응답 시 메시지 표시
                return;
            }
    
            alert(`${formData.name}님 가입을 환영합니다.`);
            navigator('/signIn'); // 로그인 페이지로 이동
        } catch (err) {
            console.error('회원가입 요청 오류:', err);
            alert('서버와 통신 중 오류가 발생했습니다.');
        }
    };
    
    
    
    const emailChk = async () => {
        const { email } = formData;
        const emailtype = /^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

        if (!email) {
            alert('이메일을 입력해주세요.');
            return;
        }
        if (!emailtype.test(email)) {
            alert('유효한 이메일을 입력해주세요.');
            return;
        }

        try {
            const res = await axios.get(`${bkURL}/signUp/checkEmail`, {
                params: { email }, // GET 요청에서 데이터를 전달할 때는 params 사용
            });
            console.log('Axios 요청 전송:', { email });

            if (res.data.exists) {
                setemailChkFinish(false); // 중복 확인 실패 시 false로 설정
                alert('이미 사용 중인 이메일입니다. 다시 입력해주세요.');
            } else {
                setemailChkFinish(true);
                seteditChk(true); // readOnly 설정
                alert('사용 가능한 이메일입니다.');
            }
        } catch (err) {
            console.error('이메일 확인 오류:', err);
            alert('서버와 통신 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.wrap}>
                <div className={styles.joinContainer}>
                    <div className={styles.topBtn}>
                        <button className={styles.signIn}>
                            <Link to="/signIn">로그인</Link>
                        </button>
                        <button className={styles.signUp}>
                            <Link to="/signUp">계정 생성하기</Link>
                        </button>
                    </div>
                    <div className={styles.bottomCnt}>
                        {/* <div>
                            <div className={styles.kakao}>
                                <a href="#">
                                    <img src="/imgs/sign/kakao.svg" alt="카카오" />
                                </a>
                            </div>
                            <div className={styles.naver}>
                                <a href="#">
                                    <img src="/imgs/sign/naver.png" alt="네이버" />
                                </a>
                            </div>
                        </div>
                        <div className={styles.or}>또는</div> */}

                        <form className={styles.inform}>
                            <div className={styles.inputWrapper}>
                                <input type="text" name="name" placeholder="*이름" className={styles.input} required onChange={handleChange} />
                                {showErrors && errors.name && <div className={styles.error}>{errors.name}</div>}
                            </div>

                            <div className={styles.inputWrapper}>
                                <input type="email" name="email" placeholder="※먼저 카카오 로그인이 필요합니다." className={styles.input} required value={formData.email} onChange={handleChange} readOnly={true} />
                                {showErrors && errors.email && <div className={styles.error}>{errors.email}</div>}
                            </div>
                            {/* <button className={styles.chkbtn} onClick={emailChk}>
                                이메일 중복확인
                            </button> */}

                            <div className={styles.inputWrapper}>
                                <input type="text" name="phone" placeholder="*핸드폰 번호 (하이픈(-)포함하여 기재해주세요.)" className={styles.input} required onChange={handleChange} />
                                {showErrors && errors.phone && <div className={styles.error}>{errors.phone}</div>}
                            </div>

                            <div className={styles.inputWrapper}>
                                <input type="password" name="password" placeholder="*비밀번호 (영문대소문자, 숫자, 특수기호 (!,@,#,$,%,~) 필수 12-16자)" className={styles.input} required onChange={handleChange} />
                                {showErrors && errors.password && <div className={styles.error}>{errors.password}</div>}
                            </div>

                            <div className={styles.inputWrapper}>
                                <input type="password" name="password2" placeholder="*비밀번호확인 (영문대소문자, 숫자, 특수기호 (!,@,#,$,%,~) 필수 12-16자)" className={styles.input} required onChange={handleChange} />
                                {showErrors && errors.password2 && <div className={styles.error}>{errors.password2}</div>}
                            </div>

                            <select name="gender" onChange={handleChange} className={styles.gender}>
                                <option value="">성별 (선택)</option>
                                <option value="남자">남자</option>
                                <option value="여자">여자</option>
                            </select>

                            <div class="dateInputWrapper">
                                <input type="date" name="birthdate" onChange={handleChange} />
                            </div>

                            <div className={styles.checkboxgroup}>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="requiredAgree"
                                        className={styles.chk1}
                                        checked={formData.requiredAgree} // 상태를 항상 유지
                                        onChange={() => {}} // 변경 방지 (비활성화)
                                    />
                                    [필수] 이용 약관에 동의하고, 본인은 만 14세 이상입니다.
                                </label>
                                <label>
                                    <input type="checkbox" name="optionalAgree" className={styles.chk2} onChange={handleChange} />
                                    [선택] 마케팅 및 홍보 목적의 개인정보 수집에 동의합니다.
                                </label>
                            </div>

                            <p className={styles.marketing}>
                                마케팅 수신 및 홍보 목적의 개인정보 수집 및 이용에 미동의 시,
                                <br />
                                마케팅 목적의 소식 및 특별 혜택 정보를 받아 보실 수 없습니다.
                            </p>

                            <button type="submit" className={styles.join} onClick={handleSubmit}>
                                계정 생성하기
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;