const express = require('express');
const axios = require('axios');
const db = require('../db');
const router = express.Router();

// 카카오 로그인 처리
router.post('/kakao', async (req, res) => {
    const { code } = req.body;

    try {
        // 카카오 토큰 발급 요청
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                grant_type: 'authorization_code',
                client_id: process.env.KAKAO_REST_API_KEY,
                redirect_uri: process.env.KAKAO_REDIRECT_URI,
                code,
            },
        });

        const { access_token } = tokenResponse.data;

        // 카카오 사용자 정보 요청
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const email = userResponse.data.kakao_account.email;

        if (!email) {
            console.log('카카오 로그인: 이메일 정보 없음.');
            return res.status(200).json({
                success: false,
                message: '카카오 계정에 이메일이 없습니다. 회원가입이 필요합니다.',
            });
        }

        // DB에서 이메일로 사용자 정보 조회
        const [user] = await db.query(
            'SELECT email, customer_name, contact_number, join_date FROM customers WHERE email = ?',
            [email]
        );

        if (user.length === 0) {
            console.log('DB 조회: 회원가입 필요.', { email });
            return res.status(200).json({
                success: false,
                message: '회원가입 필요',
                email, // 프론트로 전달
            });
        }

        const sessionToken = `mockSessionToken_${new Date().getTime()}`;
        console.log('로그인 성공:', {
            sessionToken,
            email: user[0].email,
            customer_name: user[0].customer_name,
        });

        // 로그인 성공 시 사용자 정보와 세션 토큰 반환
        res.status(200).json({
            success: true,
            sessionToken,
            email: user[0].email,
            customer_name: user[0].customer_name,
        });
    } catch (error) {
        console.error('카카오 로그인 오류:', error.response?.data || error.message);
        res.status(500).json({ success: false, message: '카카오 로그인 실패' });
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