const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
const path = require('path'); // path 모듈 추가
const db = require('../db'); // DB 연결 모듈 임포트
const router = express.Router(); // 라우터 객체 생성
const cors = require('cors');

app.use(cors());

router.post('/', async (req, res) => {
    const { email, password } = req.body; //프론트에서 보낸 이메일과 비번
    const sessionToken = 'mockSessionToken'; // 임시 토큰

    try {
        // 탈퇴 회원 여부 확인
        const [deletedUser] = await db.query(`SELECT * FROM deleted_customers WHERE email = ?`, [email]);

        if (deletedUser.length > 0) {
            return res.json({ error: '탈퇴한 회원입니다.' });
        }

        // 데이터베이스에서 사용자 정보 조회
        const [userInfo] = await db.query(
            `SELECT auth.auth_id, auth.email, customers.customer_name 
            FROM auth JOIN customers ON auth.email = customers.email
            WHERE auth.email = ? AND auth.password = ?`,
            [email, password]

            //auth와 customers의 이메일 기준으로 조인
            //auth에 email과 password가 있을 것
            //auth 테이블에서 auth_id, email을 가져오고 customers 테이블에서 customer_name을 가져옴
        );

        if (userInfo.length === 0) {
            return res.json({ message: '이메일 또는 비밀번호를 확인해주세요.' });
        }

        // 로그인 시 마지막접속일 업데이트
        await db.query(`UPDATE customers SET last_login_date = NOW() WHERE email = ?`, [email]);

        // 조인한 DB 결과를 보냄 -- 프론트에서 받아서 처리
        res.json({
            sessionToken,
            email: userInfo[0].email,
            customer_name: userInfo[0].customer_name,
        });
    } catch (error) {
        // 서버 오류 처리
        console.error('로그인 오류 :', error);
        res.json({ message: '서버 오류 발생' });
    }
});

module.exports = router;
