const express = require('express');
const axios = require('axios');
const db = require('../db'); // DB 연결 모듈 임포트
const router = express.Router();

router.post('/kakao', async (req, res) => {
    // 프론트엔드에서 전달된 키와 URI
    const { code, kakaoRestApiKey, kakaoRedirectUri } = req.body;

    console.log('인가 코드:', code);
    console.log('KAKAO_REST_API_KEY:', kakaoRestApiKey);
    console.log('KAKAO_REDIRECT_URI:', kakaoRedirectUri);

    try {
        // 카카오 토큰 발급 요청
        const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            params: {
                grant_type: 'authorization_code',
                client_id: kakaoRestApiKey,
                redirect_uri: kakaoRedirectUri,
                code: code,
            },
        });

        const { access_token } = tokenResponse.data;
        console.log('액세스 토큰:', access_token);

        // 카카오 사용자 정보 요청
        const userResponse = await axios.get('https://kapi.kakao.com/v2/user/me', {
            headers: { Authorization: `Bearer ${access_token}` },
        });

        const userData = userResponse.data;
        console.log('카카오 사용자 정보ggd:', userData);
        

        // 사용자 정보를 클라이언트에 전달
        res.json({ success: true, user: userData });
    } catch (error) {
        console.error('카카오 API 요청 오류:', error.response?.data || error.message);
        res.status(500).json({ success: false, message: '카카오 로그인 실패' });
    }
});

module.exports = router;
