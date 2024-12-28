const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = () => {
    // 휴면 고객 조회
    router.get('/unactivemember', async (req, res) => {
        console.log(`/ 휴면고객 진입 확인`); // 정상작동 확인
        try {
            const [ret] = await db.query('SELECT * FROM customers WHERE status = ?', ['휴면']);
            console.log('휴면 고객 데이터:', ret); // 쿼리 결과 확인
            res.json(ret);
        } catch (err) {
            console.error('SQL 실패:', err.message);
            res.status(500).send('DB 오류');
        }
    });

    // 휴면 고객 상태 변경
    router.post('/updateunactive', async (req, res) => {
        const { customer_ids, status } = req.body;
        try {
            const placeholders = customer_ids.map(() => '?').join(',');
            const query = `UPDATE customers SET status = ? WHERE customer_id IN (${placeholders})`;
            await db.query(query, [status, ...customer_ids]);
            res.status(200).send('상태 변경 완료');
        } catch (err) {
            console.error('SQL 실패:', err.message);
            res.status(500).send('DB 오류');
        }
    });

    return router;
};
