const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const path = require('path'); // path 모듈 추가
const db = require('../db'); // DB 연결 모듈 임포트
const router = express.Router(); // 라우터 객체 생성

// 고객번호 생성 함수
function generateCustomerId() {
    const year = new Date().getFullYear(); //연도 추출
    const randomNum = Math.floor(100000 + Math.random() * 90000); // 6자리 랜덤 숫자(난수번호)
    return `${year.toString().slice(-2)}${randomNum}`; // 고객번호 생성
}

// 회원가입 API
router.post('/', async (req, res) => {
    console.log('회원가입 요청 수신:', req.body);

    const { name, email, phone, password, password2, gender, birthdate, requiredAgree, optionalAgree } = req.body;

    // 유효성 검사
    if (!/^[가-힣]{2,5}$/.test(name)) {
        console.log('이름 유효성 검사 통과 못함');
        return res.json({ message: '이름 형식이 올바르지 않습니다.' });
    }

    if (!/^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
        console.log('이메일 유효성 검사 통과 못함');
        return res.json({ message: '이메일 형식이 올바르지 않습니다.' });
    }

    if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(phone)) {
        console.log('핸드폰 번호 유효성 검사 통과 못함');
        return res.json({ message: '핸드폰 번호 형식이 올바르지 않습니다.' });
    }

    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%~]).{12,16}$/.test(password)) {
        console.log('비밀번호 유효성 검사 통과 못함');
        return res.json({ message: '비밀번호는 12~16자 이내로 반드시 특수문자(!,@,#,$,%,~)가 들어가야 합니다.' });
    }

    if (password !== password2) {
        console.log('비밀번호 확인 유효성 검사 통과 못함');
        return res.json({ message: '비밀번호가 일치하지 않습니다.' });
    }

    if (!requiredAgree) {
        console.log('필수 약관 동의 유효성 검사 통과 못함');
        return res.json({ message: '필수 약관에 동의해야 회원가입이 가능합니다.' });
    }

    try {
        // 탈퇴 회원 테이블에서 이메일 확인
        const [deletedUser] = await db.query('SELECT * FROM deleted_customers WHERE email = ?', [email]);

        if (deletedUser.length > 0) {
            console.log('탈퇴 회원 발견, 삭제 진행:', email);

            // 탈퇴 회원 테이블에서 해당 이메일 삭제
            await db.query('DELETE FROM deleted_customers WHERE email = ?', [email]);
            console.log('탈퇴 회원 삭제 완료');
        }

        // 기존 회원 테이블에서 이메일 중복 확인
        const [existingUser] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);

        if (existingUser.length > 0) {
            console.log('이미 가입된 회원 발견:', email);
            return res.status(400).json({ status: 'fail', message: '이미 가입된 회원입니다' });
        }

        // 고객번호 생성
        const customerId = generateCustomerId();

        // `customers` 테이블에 데이터 저장
        await db.query(
            `INSERT INTO customers 
            (customer_id, customer_name, email, contact_number, gender, birthdate, required_agree, optional_agree, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, '정상')`,
            [customerId, name, email, phone, gender, birthdate, requiredAgree, optionalAgree]
        );

        // `auth` 테이블에 데이터 저장
        await db.query(`INSERT INTO auth (email, password, customer_id) VALUES (?, ?, ?)`, [email, password, customerId]);

        console.log('회원가입 성공:', email);
        res.json({ message: '회원가입 성공!' });
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.json({ message: '회원가입 실패!' });
    }
});

module.exports = router;