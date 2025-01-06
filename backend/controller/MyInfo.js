const express = require('express');
const router = express.Router();
const db = require('../db');

//회원정보 수정의 경우는 하나의 엔드포인트로 여러 액션을 구분하여 저장과 수정이 가능함.
module.exports = () => {
    router.post('/', async (req, res) => {
        const { action, email } = req.body;
        console.log('myPage 요청 수신:', { action, email });
    
        if (!email) {
            return res.status(400).json({ error: '이메일이 필요합니다.' });
        }
    
        try {
            if (action === 'getUserInfo') {
                const [user] = await db.query('SELECT * FROM customers WHERE email = ?', [email]);
                if (user.length === 0) {
                    return res.status(404).json({ error: '사용자 정보를 찾을 수 없습니다.' });
                }
                return res.json(user[0]); // 사용자 정보 반환
            } else if (action === 'getOrders') {
                const [orders] = await db.query(
                    'SELECT order_id, order_date, order_status, order_name FROM orders WHERE email = ? ORDER BY order_date DESC',
                    [email]
                );
                return res.json({ orders }); // 주문 내역 반환
            } else {
                return res.status(400).json({ error: '유효하지 않은 action 값입니다.' });
            }
        } catch (error) {
            console.error('DB 처리 오류:', error);
            return res.status(500).json({ error: '서버 오류' });
        }
    });
    

    router.post('/cancelOrder/:orderId', async (req, res) => {
        const { orderId } = req.params;

        try {
            // 주문 상태를 '취소됨'으로 업데이트
            const [result] = await db.execute('UPDATE orders SET status_date = sysdate(), order_status = ? WHERE order_id = ?', ['취소', orderId]);

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: '주문을 찾을 수 없습니다.' });
            }

            res.status(200).json({ message: '주문이 취소되었습니다.' });
        } catch (err) {
            res.status(500).json({ message: '서버 오류로 주문을 취소할 수 없습니다.' });
        }
    });

    return router;
};
