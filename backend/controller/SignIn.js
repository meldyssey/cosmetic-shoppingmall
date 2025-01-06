const express = require('express');
const axios = require('axios');
const db = require('../db');
const router = express.Router();

// 카카오 로그인 처리
router.post('/kakao', async (req, res) => {
    const { code } = req.body;
    try {
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_REST_API_KEY,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code,
            },
        });

        const accessToken = tokenResponse.data.access_token;

        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        console.log('카카오 사용자 정보:', userResponse.data); 
        const email = userResponse.data.kakao_account.email;
        if (!email) {
            return res.status(400).json({ error: '카카오 계정에 이메일이 없습니다.' });
        }

        const [user] = await db.query('SELECT customer_name FROM customers WHERE email = ?', [email]);

        if (user.length === 0) {
            return res.status(404).json({ error: '회원가입된 계정이 없습니다.' });
        }

        const sessionToken = 'mockSessionToken_' + new Date().getTime();
        res.json({ sessionToken, customer_name: user[0].customer_name });
    } catch (error) {
        console.error('카카오 로그인 오류:', error);
        res.status(500).json({ error: '카카오 로그인 실패' });
    }
});

// 기존 로그인 처리
router.post(['/login', '/login/'], async (req, res) => {
    const { email, password } = req.body;

    try {
        const [user] = await db.query(
            `SELECT auth.auth_id, auth.email, customers.customer_name, customers.contact_number, customers.join_date, customers.optional_agree 
             FROM auth 
             JOIN customers ON auth.email = customers.email
             WHERE auth.email = ? AND auth.password = ?`,
            [email, password]
        );

        if (user.length === 0) {
            return res.status(404).json({ error: '이메일 또는 비밀번호를 확인해주세요.' });
        }

        // 세션 토큰 생성
        const sessionToken = `mockSessionToken_${new Date().getTime()}`;
        console.log('생성된 sessionToken:', sessionToken); // 디버깅용

        // 사용자 정보와 세션 토큰 반환
        res.json({
            sessionToken,
            email: user[0].email,
            customer_name: user[0].customer_name,
            contact_number: user[0].contact_number,
            join_date: user[0].join_date,
            optional_agree: user[0].optional_agree,
        });
    } catch (error) {
        console.error('로그인 오류:', error);
        res.status(500).json({ error: '서버 오류 발생' });
    }
});



module.exports = router;