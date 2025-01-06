const express = require('express');
const axios = require('axios');
const db = require('../db'); // DB 연결 모듈
const router = express.Router();

router.post('/kakao', async (req, res) => {
    const { code } = req.body;

    try {
        // 카카오 토큰 발급
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

        // 사용자 정보 요청
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const email = userResponse.data.kakao_account.email;
        const nickname = userResponse.data.kakao_account.profile.nickname;

        if (!email) {
            return res.status(400).json({ error: '카카오 계정에 이메일이 없습니다.' });
        }

        // DB에서 이메일 확인
        const [user] = await db.query('SELECT customer_id, customer_name FROM customers WHERE email = ?', [email]);

        if (user.length === 0) {
            // 회원가입 필요
            return res.status(200).json({
                success: false,
                message: '회원가입 필요',
                email,
                nickname, // 카카오에서 가져온 사용자 이름
            });
        } else {
            // 로그인 성공
            const sessionToken = `mockSessionToken_${new Date().getTime()}`;
            console.log('로그인 성공:', {
                sessionToken,
                email: user[0].email,
                customer_name: user[0].customer_name || '이름 없음',
            });
            return res.status(200).json({
                success: true,
                sessionToken,
                email: user[0].email,
                customer_name: user[0].customer_name || '이름 없음', // 이름 기본값 처리
            });
        }
        
    } catch (error) {
        console.error('카카오 로그인 오류:', error.response?.data || error.message);
        res.status(500).json({ error: '카카오 로그인 실패' });
    }
});




module.exports = router;