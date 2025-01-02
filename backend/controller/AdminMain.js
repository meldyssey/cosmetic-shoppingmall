const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = () => {
    router.post('/onetoone', async (req, res) => {
        const { action } = req.body;
        // 요청 액션에 따라서 같은 post 엔드포인트로 작업 가능
        if (action === 'askCount') {
            try {
                // onetoone에서 reply_status 대기인거
                const [ret] = await db.query(`SELECT COUNT(*) AS count FROM one_to_one WHERE reply_status = ?`, ['대기']);
                if (ret[0].count === 0) {
                    return res.json('0');
                }
                return res.json(ret[0].count);
            } catch (err) {
                return res.json({ error: 'DB 조회 오류' });
            }
        }
    });

    router.post('/reports', async (req, res) => {
        const { action } = req.body;
        // 요청 액션에 따라서 같은 post 엔드포인트로 작업 가능
        if (action === 'reportCount') {
            try {
                //review_reports 에서 check 상태가 0인거
                const [ret] = await db.query(`SELECT COUNT(*) AS count FROM review_reports WHERE check_status = ?`, [0]);
                if (ret[0].count === 0) {
                    return res.json('0');
                }
                return res.json(ret[0].count);
            } catch (err) {
                return res.json({ error: 'DB 조회 오류' });
            }
        }
    });

    router.post('/admin/order', async (req, res) => {
        const { action } = req.body;
        // 요청 액션에 따라서 같은 post 엔드포인트로 작업 가능
        if (action === 'orderCount') {
            try {
                //오더 테이블에서 order_status 가 주문완료인 건들 카운트
                const [ret] = await db.query(`SELECT COUNT(*) AS count FROM orders WHERE order_status = ?`, ['주문완료']);
                if (ret[0].count === 0) {
                    return res.json('0');
                }
                return res.json(ret[0].count); // 숫자만 반환
            } catch (err) {
                return res.json({ error: 'DB 조회 오류' });
            }
        } else if (action === 'refundCount') {
            try {
                //order 테이블에서 order_status 반품접수인거
                const [ret] = await db.query(`SELECT COUNT(*) AS count FROM orders WHERE order_status = ?`, ['반품접수']);
                if (ret[0].count === 0) {
                    return res.json('0');
                }
                return res.json(ret[0].count);
            } catch (err) {
                return res.json({ error: 'DB 조회 오류' });
            }
        }
    });

    return router;
};
