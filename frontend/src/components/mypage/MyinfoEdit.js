import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../scss/mypage/MyinfoEdit.module.scss';
import axios from 'axios';

const MyinfoEdit = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보
    const [phoneNumber, setPhoneNumber] = useState(''); //사용자 핸드폰번호
    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        const sessionToken = sessionStorage.getItem('sessionToken');

        if (!sessionToken) {
            navigate('/signIn'); // 세션 토큰 없으면 로그인 페이지로 이동
        } else {
            // Axios로 사용자 정보 가져오기
            axios
                .post(
                    `${bkURL}/myPage`, //index.js의 라우트경로랑 일치시킴
                    { action: 'getUserInfo', email: sessionStorage.getItem('email') }, // 요청 본문
                    {
                        headers: {
                            Authorization: sessionToken, // 세션 토큰 포함
                        },
                    }
                )
                .then(response => {
                    setUserInfo(response.data); // 세션토큰 콘솔에서 확인
                    const data = response.data;

                    // 서버에서 받은 날짜에 하루를 더함
                    const correctedDate = new Date(data.birthdate);
                    correctedDate.setDate(correctedDate.getDate() + 1); // 날짜 하루 추가

                    if (data.birthdate) {
                        const correctedDate = new Date(data.birthdate);
                        correctedDate.setDate(correctedDate.getDate() + 1);
                        setUserInfo({
                            ...data,
                            birthdate: correctedDate.toISOString().split('T')[0],
                        });
                    } else {
                        setUserInfo({ ...data, birthdate: '' }); // birthdate가 없으면 빈 값으로 설정
                    }
                    console.log('세션 토큰 :', sessionStorage.getItem('sessionToken'));
                    console.log('이메일 :', sessionStorage.getItem('email'));
                })
                .catch(error => {
                    console.error('세션 토큰 확인불가', error);
                    navigate('/signIn'); // 실패 시 로그인 페이지로 이동
                });
        }
    }, [navigate]);

    // 선택동의사항 체크여부 적용 -- 선택사항 변경시 DB에 수정 저장
    const optionalAgreeChange = value => {
        const sessionToken = sessionStorage.getItem('sessionToken');

        // 상태 업데이트
        setUserInfo(chkbox => ({ ...chkbox, optional_agree: value }));

        // 서버에 업데이트 요청
        axios
            .post(
                `${bkURL}/myPage`, //같은 라우트 경로 사용
                { action: 'updateChkbox', email: userInfo.email, optional_agree: value },
                { headers: { Authorization: sessionStorage.getItem('sessionToken') } }
            )
            .then(response => {
                if (response.data.success) {
                    setUserInfo(prev => ({ ...prev, optional_agree: value }));
                } else {
                    console.error('선택 사항 업데이트 실패:', response.data.error);
                }
            })
            .catch(error => {
                console.error('선택 사항 업데이트 오류:', error);
            });
    };

    // 성별 변경시 DB에 수정 저장
    const genderChange = value => {
        const sessionToken = sessionStorage.getItem('sessionToken');

        // 상태 업데이트
        setUserInfo(chkbox => ({ ...chkbox, gender: value }));

        // 서버에 업데이트 요청
        axios
            .post(
                `${bkURL}/myPage`, //같은 라우트 경로 사용
                { action: 'updateGender', email: userInfo.email, gender: value },
                { headers: { Authorization: sessionStorage.getItem('sessionToken') } }
            )
            .then(response => {
                if (response.data.success) {
                    setUserInfo(prev => ({ ...prev, gender: value }));
                } else {
                    console.error('성별 업데이트 실패:', response.data.error);
                }
            })
            .catch(error => {
                console.error('성별 업데이트 오류:', error);
            });
    };

    // 핸드폰 번호 변경 함수
    const phoneNumChange = e => {
        setPhoneNumber(e.target.value);
    };

    // 확인 버튼 클릭시 작동 함수
    const handleSubmit = () => {
        const sessionToken = sessionStorage.getItem('sessionToken');

        if (!sessionToken || !userInfo.email) {
            alert('로그인 상태를 확인해주세요.');
            return;
        }

        if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(phoneNumber)) {
            alert('연락처를 다시 확인해주세요.');
            return;
        }

        // 변경된 정보 서버로 전송
        axios
            .post(
                `${bkURL}/myPage`,
                {
                    action: 'updateUserInfo',
                    email: userInfo.email,
                    contact_number: phoneNumber || userInfo.contact_number,
                    optional_agree: userInfo.optional_agree,
                    gender: userInfo.gender,
                },
                {
                    headers: { Authorization: sessionToken },
                }
            )
            .then(response => {
                if (response.data.success) {
                    alert('회원정보 수정이 완료되었습니다.');
                    setUserInfo(prev => ({
                        ...prev,
                        contact_number: phoneNumber || prev.contact_number,
                    }));
                } else {
                    alert('정보 업데이트에 실패했습니다: ' + response.data.error);
                }
            })
            .catch(error => {
                console.error('정보 업데이트 오류:', error);
                alert('서버 오류가 발생했습니다.');
            });
    };

    // userInfo가 null일 때 로딩 메시지 표시
    if (!userInfo) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className={styles.main}>
            {/* 상단 제목 및 안내 */}
            <p className={styles.infomessage}>
                회원가입이 완료되었습니다.
                <br />
                추가 선택 정보를 기입하시려면 아래 배송지 및 생일 등 선택 정보를 업데이트 하여 주십시오.
            </p>

            <div className={styles.block}>
                {/* 개인정보 관리 */}
                <h3>개인정보 관리</h3>
                <div className={styles.requiredinfo}>*는 필수 입력 정보입니다.</div>

                <fieldset className={styles.infoinput}>
                    <div className={styles.inputgroup}>
                        <label>*이름</label>
                        <input defaultValue={userInfo.customer_name} className={styles.inputname} readOnly />

                        <label>*이메일</label>
                        <input defaultValue={userInfo.email} className={styles.inputemail} readOnly />

                        <label>*휴대전화 번호</label>
                        <div>
                            <input defaultValue={userInfo.contact_number} onChange={phoneNumChange} className={styles.inputphone} />
                        </div>
                    </div>
                </fieldset>
            </div>
            <div className={styles.block}>
                {/* 뉴스레터 정보 */}
                <div className={styles.newsletter}>
                    <h4>조 말론 런던 뉴스레터</h4>
                    <p>온라인 부티크 뉴스레터 및 문자 수신에 동의하시면 조 말론 런던의 신제품 선출시 소식과 이벤트, 혜택 등 다양한 최신 정보를 받아보실 수 있습니다.</p>
                </div>

                <div className={styles.newslettersettings}>
                    <div className={styles.checkboxgroup}>
                        <div className={styles.label}>뉴스레터/MMS/DM 수신여부</div>
                        {/* 선택동의 1이면 수신함 체크, 선택동의 0이면 수신안함 체크 -- 이하 동일 */}
                        <div className={styles.radiobox}>
                            <input type="radio" checked={userInfo.optional_agree === 1} onChange={() => optionalAgreeChange(1)} />
                            <span>수신함</span>
                            <input type="radio" checked={userInfo.optional_agree === 0} onChange={() => optionalAgreeChange(0)} />
                            <span>수신안함</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.block}>
                {/* 추가 정보 */}
                <div className={styles.additionalinfo}>
                    <h4>추가정보(선택)</h4>
                    <p>고객님의 생일은 언제입니까?</p>
                    <div className={styles.birthinputgroup}>
                        <input type="date" value={userInfo.birthdate} className={styles.birthinput} />
                    </div>
                    <div className={styles.gender}>
                        <div className={styles.checkboxgroup}>
                            <div className={styles.label}>성별</div>
                            <div className={styles.radiobox}>
                                <input type="radio" checked={userInfo.gender === '남자'} onChange={() => genderChange('남자')} />
                                <span>남자</span>
                                <input type="radio" checked={userInfo.gender === '여자'} onChange={() => genderChange('여자')} />
                                <span>여자</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 확인 버튼 */}
            <button className={styles.btnsubmit} onClick={handleSubmit}>
                확인
            </button>
        </div>
    );
};

export default MyinfoEdit;
