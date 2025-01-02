//주문 상세보기 백엔드
const express = require('express');
const router = express.Router();
const db = require('../db');

module.exports = () => {
    router.get('/:id', async (req, res) => {
        try {
            // 주문 정보 조회
            const [orderRows] = await db.query('SELECT * FROM orders WHERE order_id = ?', [req.params.id]);

            if (orderRows.length === 0) {
                return res.json({ message: '주문 정보를 찾을 수 없습니다.' });
            }

            // 주문 제품 정보 조회
            const [productRows] = await db.query(
                `
    SELECT v.product_opt_id, v.product_name_kor, v.product_volume, od.order_cnt
    FROM orders o
    JOIN orders_detail od ON o.order_id = od.order_id
    JOIN view_product_info_opt v ON od.product_id = v.product_opt_id
    WHERE o.order_id = ?
    `,
                [req.params.id]
            );

            // 응답 데이터: 주문 정보 + 제품 목록
            res.json({ order: orderRows, products: productRows });
        } catch (err) {
            res.json({ message: '서버 오류가 발생했습니다.' });
        }
    });

    return router;
};
