const express = require('express');
const router = express.Router();
const con = require('../db');

module.exports = () => {
    // 장바구니 목록 가져오기
    router.get('/:id', async (req, res) => {
        console.log('basket_view_product접근');

        try {
            const [ret] = await con.execute(
                'select bs_id, bs_product_id, product_upSystem, product_name_kor, product_name_eng, product_volume, product_price from view_product_info_opt join basket on basket.bs_product_id = view_product_info_opt.product_opt_id where bs_email = ?',
                [req.params.id]
            );

            res.json(ret);
        } catch (err) {
            console.log('sql 실패 : ', err.message);
            res.status(500).send('db 오류');
        }
    });

    // 장바구니 내역 삭제
    router.delete('/delete/:id', async (req, res) => {
        // console.log('진입', req.params.id)

        try {
            const [ret] = await con.execute('delete from basket where bs_id = ?', [req.params.id]);
            res.send('삭제 성공:' + req.params.id);
        } catch (err) {
            console.log('삭제 실패 : ', err.message);
            res.status(500).send('db 오류');
        }
    });

    return router;
};
