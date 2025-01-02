const express = require('express');
const router = express.Router();
const db = require('../db');

// 비밀번호 찾기
router.post('/findPw', async (req, res) => {
    const { email, contact_number } = req.body;

    if (!email || !contact_number) {
        return res.json({ success: false, message: '이메일과 연락처를 입력해주세요.' });
    }

    try {
        // 이메일과 연락처 확인
        const [rows] = await db.query(`SELECT email FROM customers WHERE email = ? AND contact_number = ?`, [email, contact_number]);

        if (rows.length === 0) {
            return res.json({ success: false, message: '일치하는 정보를 찾을 수 없습니다. 입력하신 정보를 재확인 해주세요.' });
        }

        res.json({ success: true, message: '비밀번호 재설정이 필요합니다.' });
    } catch (err) {
        res.json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
});

// 비밀번호 재설정
router.post('/resetPw', async (req, res) => {
    const { email, newPassword, newPassword2 } = req.body;

    if (!email || !newPassword) {
        return res.json({ success: false, message: '입력하신 정보를 재확인 해주세요.' });
    }
    if (newPassword !== newPassword2) {
        return res.json({ success: false, message: '비밀번호가 서로 일치하지 않습니다.' });
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%~]).{12,16}$/.test(newPassword)) {
        return res.json({ success: false, message: '비밀번호는 12~16자 이내로 반드시 특수문자(!,@,#,$,%,~)가 들어가야 합니다.' });
    }
    if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%~]).{12,16}$/.test(newPassword2)) {
        return res.json({ success: false, message: '비밀번호는 12~16자 이내로 반드시 특수문자(!,@,#,$,%,~)가 들어가야 합니다.' });
    }

    try {
        // 기존 비밀번호 확인
        const [rows] = await db.query(`SELECT password FROM auth WHERE email = ?`, [email]);
        if (rows.length === 0) {
            return res.json({ success: false, message: '해당 이메일로 가입된 정보가 없습니다.' });
        }

        const currentPassword = rows[0].password.trim(); // 공백 제거한 뒤 비교해야 정확함

        // 기존 비밀번호와 동일한지 확인
        if (currentPassword === newPassword.trim()) {
            return res.json({ success: false, message: '기존 비밀번호와 동일한 비밀번호로 변경할 수 없습니다.' });
        }

        // 비밀번호 업데이트
        const [result] = await db.query(`UPDATE auth SET password = ? WHERE email = ?`, [newPassword, email]);

        if (result.affectedRows === 0) {
            return res.json({ success: false, message: '해당 이메일로 가입된 정보가 없습니다.' });
        }

        res.json({ success: true, message: '비밀번호 변경이 완료되었습니다. 로그인 페이지로 이동합니다.' });
    } catch (err) {
        res.json({ success: false, message: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;
