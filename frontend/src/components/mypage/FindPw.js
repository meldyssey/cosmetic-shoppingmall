import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../scss/mypage/FindPw.module.scss';

function FindPw() {
    const [email, setEmail] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword2, setNewPassword2] = useState('');
    const [contentOpen, setcontentOpen] = useState(false);
    const navigate = useNavigate();

    const bkURL = process.env.REACT_APP_BACK_URL;

    // 비밀번호 찾기 요청
    const handleFindPassword = async () => {
        if (!email || !contactNumber) {
            alert('이메일과 연락처를 입력해주세요.');
            return;
        }

        try {
            const res = await axios.post(`${bkURL}/findPw`, { email, contact_number: contactNumber });
            if (res.data.success) {
                alert('정보가 확인되었습니다. 비밀번호를 재설정하세요.');
                setcontentOpen(true);
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error('비밀번호 찾기 오류:', err.message); // 에러 메시지만 표시
            alert('서버 오류가 발생했습니다.');
        }
    };

    // 비밀번호 재설정 요청
    const handleResetPassword = async () => {
        if (!newPassword || !newPassword2) {
            alert('새 비밀번호를 모두 입력해주세요.');
            return;
        }
        if (newPassword !== newPassword2) {
            alert('입력한 비밀번호가 서로 일치하지 않습니다.');
            return;
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%~]).{12,16}$/.test(newPassword)) {
            alert('비밀번호는 영문 대소문자, 숫자, 특수문자(!,@,#,$,%,~)를 포함한 12~16자 이내여야 합니다.');
            return;
        }
        try {
            const res = await axios.post(`${bkURL}/resetPw`, { email, newPassword, newPassword2 });
            console.log(email, newPassword, newPassword2);

            if (res.data.success) {
                alert('비밀번호 변경이 완료되었습니다. 로그인 페이지로 이동합니다.');
                setcontentOpen(false);
                navigate('/signIn');
            } else {
                alert(res.data.message);
            }
        } catch (err) {
            console.error('비밀번호 재설정 오류:', err);
            alert('서버 오류가 발생했습니다.');
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1>비밀번호 찾기</h1>
            <div className={styles.form}>
                <input type="email" placeholder="이메일을 입력하세요" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="text" placeholder="연락처를 입력하세요" value={contactNumber} onChange={e => setContactNumber(e.target.value)} />
                <button onClick={handleFindPassword}>확인</button>
            </div>

            {contentOpen && (
                <div className={styles.container}>
                    <div className={styles.pwcontent}>
                        <h1>비밀번호 재설정</h1>
                        <input type="password" placeholder="새 비밀번호를 입력하세요" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                        <input type="password" placeholder="새 비밀번호를 입력하세요" value={newPassword2} onChange={e => setNewPassword2(e.target.value)} />
                        <button onClick={handleResetPassword}>재설정</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FindPw;
