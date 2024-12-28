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

// 이메일 중복확인 함수
router.get('/checkEmail', async (req, res) => {
    const { email } = req.query;

    if (!email || email.trim() === '') {
        return res.json({ message: '유효한 이메일을 입력해주세요.' });
    }

    try {
        // 이메일 존재 여부 확인
        const [result] = await db.query('SELECT email FROM auth WHERE email = ?', [email]);
        const [del_result] = await db.query('SELECT email FROM deleted_customers WHERE email = ?', [email]);

        if (result.length > 0 || del_result.length > 0) {
            return res.json({ exists: true });
        } else {
            return res.json({ exists: false });
        }
    } catch (err) {
        console.error('이메일 중복 확인 오류:', err);
        return res.json({ message: '서버 오류 발생' });
    }
});

// 회원가입 API
router.post('/', async (req, res) => {
    console.log('회원가입 요청 수신:', req.body);

    const { name, email, phone, password, password2, gender, birthdate, requiredAgree, optionalAgree } = req.body;
    //req.body에 있는 각 요소들 이름 정의

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
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%~]).{12,16}$/.test(password2)) {
        console.log('비밀번호 유효성 검사 통과 못함');
        return res.json({ message: '비밀번호는 12~16자 이내로 반드시 특수문자(!,@,#,$,%,~)가 들어가야 합니다.' });
    }

    if (!requiredAgree) {
        console.log('필수 약관 동의 유효성 검사 통과 못함');
        return res.json({ message: '필수 약관에 동의해야 회원가입이 가능합니다.' });
    }

    try {
        // 고객번호 생성
        const customerId = generateCustomerId();

        // `customers` 테이블에 데이터 저장
        await db.query(
            `INSERT INTO customers 
    (customer_id, customer_name, email, contact_number, gender, birthdate, required_agree, optional_agree, status) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, '정상')`, //테이블에서 정의한 column명에 맞춰
            [customerId, name, email, phone, gender, birthdate, requiredAgree, optionalAgree] //회원가입시 입력한 값 배열형태로 저장
        );

        // `auth` 테이블에 데이터 저장
        await db.query(`INSERT INTO auth (email, password, customer_id) VALUES (?, ?, ?)`, [email, password, customerId]);
        //가입 시 입력한 이메일과 패스워드는 별도의 테이블에 저장

        res.json({ message: '회원가입 성공!' });
    } catch (error) {
        console.error('회원가입 오류:', error);
        res.json({ message: '회원가입 실패!' });
    }
});

module.exports = router;
