const express = require('express');
const router = express.Router();
const db = require('../db');

//회원정보 수정의 경우는 하나의 엔드포인트로 여러 액션을 구분하여 저장과 수정이 가능함.
module.exports = () => {
    router.post('/', async (req, res) => {
        const { action, email, optional_agree, gender, contact_number } = req.body;
        const sessionToken = req.headers['authorization'];

        // 세션 토큰 검증
        if (!sessionToken || sessionToken !== 'mockSessionToken') {
            return res.json({ error: '세션 토큰이 유효하지 않습니다.' });
        }

        // 요청 액션에 따라서 같은 post 엔드포인트로 작업 가능
        if (action === 'getUserInfo') {
            // 고객 정보 조회
            if (!email) {
                return res.json({ error: '이메일이 필요합니다.' });
            }

            try {
                //이메일로 고객 조회를 해서 고객정보를 프론트에 보내는 구간
                const [ret] = await db.query(`SELECT * FROM customers WHERE email = ?`, [email]);
                if (ret.length === 0) {
                    return res.json({ error: '고객 정보를 찾을 수 없습니다.' });
                }

                if (ret[0].birthdate) {
                    ret[0].birthdate = ret[0].birthdate.toISOString().split('T')[0];
                }

                return res.json(ret[0]);
            } catch (err) {
                return res.json({ error: 'DB 조회 오류' });
            }
        } else if (action === 'updateChkbox') {
            // 고객정보 조회를 한 뒤에 선택동의 체크여부를 확인하고 프론트에 보내는 구간
            if (!email) {
                return res.json({ error: '이메일이 필요합니다.' });
            }

            if (optional_agree !== 0 && optional_agree !== 1) {
                return res.json({ error: 'optional_agree 값이 유효하지 않습니다.' });
            }

            try {
                const [result] = await db.query(
                    `UPDATE customers SET optional_agree = ?
                    WHERE email = ?`,
                    [optional_agree, email]
                );

                if (result.affectedRows === 0) {
                    return res.json({ error: '해당 이메일의 사용자를 찾을 수 없습니다.' });
                }

                return res.json({ success: true, message: 'optional_agree가 성공적으로 업데이트되었습니다.' });
            } catch (err) {
                return res.json({ error: 'DB 업데이트 오류' });
            }
        } else if (action === 'updateUserInfo') {
            //회원정보 수정 후 수정된 정보를 DB에 저장하는 구간
            const { email, contact_number, optional_agree } = req.body;

            if (!email) return res.json({ error: '이메일이 필요합니다.' });

            const phonetype = /^01[0-9]-\d{3,4}-\d{4}$/;

            if (!phonetype.test(contact_number)) {
                return res.json({ message: '핸드폰 번호 형식이 올바르지 않습니다.' });
            }

            try {
                const [result] = await db.query(
                    `UPDATE customers SET contact_number = ?, optional_agree = ?
                    WHERE email = ?`,
                    [contact_number, optional_agree, email]
                );

                if (result.affectedRows === 0) {
                    return res.json({ error: '해당 이메일의 사용자를 찾을 수 없습니다.' });
                }

                return res.json({ success: true, message: '사용자 정보가 성공적으로 업데이트되었습니다.' });
            } catch (err) {
                return res.json({ error: 'DB 업데이트 오류' });
            }
        } else if (action === 'updateGender') {
            // 성별 업데이트 구간
            if (!email) {
                return res.json({ error: '이메일이 필요합니다.' });
            }

            try {
                const [result] = await db.query(`UPDATE customers SET gender = ? WHERE email = ?`, [gender, email]);

                if (result.affectedRows === 0) {
                    return res.json({ error: '해당 이메일의 사용자를 찾을 수 없습니다.' });
                }

                return res.json({ success: true, message: '성별이 성공적으로 업데이트되었습니다.' });
            } catch (err) {
                return res.json({ error: 'DB 업데이트 오류' });
            }
        } else if (action === 'getAddressInfo') {
            // 배송지 정보 조회 추가
            if (!email) {
                return res.json({ error: '이메일이 필요합니다.' });
            }

            try {
                const [address] = await db.query(
                    `SELECT customer_name, zip, roadname_address, building_name, detail_address, contact_number 
                    FROM customers WHERE email = ?`,
                    [email]
                );

                return res.json(address[0] || { error: '배송지 정보가 없습니다.' });
            } catch (err) {
                return res.json({ error: 'DB 조회 오류' });
            }
        } else if (action === 'updateAddressInfo') {
            // 배송지 정보 수정 추가
            const { zip, roadname_address, building_name, detail_address } = req.body;

            if (!email || !zip || !roadname_address || !detail_address) {
                return res.json({ error: '입력된 정보가 유효하지 않습니다.' });
            }

            try {
                const [result] = await db.query(
                    `UPDATE customers SET zip = ?, roadname_address = ?, building_name = ?, detail_address = ?
                    WHERE email = ?`,
                    [zip, roadname_address, building_name, detail_address, email]
                );

                if (result.affectedRows === 0) {
                    return res.json({ error: '배송지 정보를 찾을 수 없습니다.' });
                }

                return res.json({ success: true, message: '배송지 정보가 성공적으로 업데이트되었습니다.' });
            } catch (err) {
                return res.json({ error: 'DB 업데이트 오류' });
            }
        } else if (action === 'getOrders') {
            // 주문 데이터 조회
            const [orders] = await db.query(
                `SELECT order_id, order_date, order_status, order_name
                FROM orders WHERE email = ? ORDER BY order_id DESC;`,
                [email]
            );
            return res.json({ orders });
        } else if (action === 'deleteMember') {
            try {
                const { email } = req.body;
                if (!email) {
                    return res.status(400).send('탈퇴 처리할 이메일이 없습니다.');
                }

                // 고객 ID 조회
                const [customer] = await db.query(`SELECT customer_id FROM customers WHERE email = ?`, [email]);
                if (!customer.length) {
                    return res.status(404).send('해당 이메일의 회원 정보를 찾을 수 없습니다.');
                }

                const customer_id = customer[0].customer_id;

                // 고객 정보 이동 -- 탈퇴 고객 DB로
                const insertQuery = `
            INSERT INTO deleted_customers (
                customer_id,
                customer_name,
                email,
                contact_number,
                gender,
                birthdate,
                required_agree,
                optional_agree,
                zip,
                roadname_address,
                building_name,
                detail_address,
                join_date,
                deleted_date,
                status
            )
            SELECT customer_id,
                customer_name,
                email,
                contact_number,
                gender,
                birthdate,
                required_agree,
                optional_agree,
                zip,
                roadname_address,
                building_name,
                detail_address,
                join_date,
                NOW() as deleted_date,
                '탈퇴' as status
            FROM customers
            WHERE customer_id = ?`;

                await db.query(insertQuery, [customer_id]);

                // auth 테이블에서 삭제
                const deleteAuth = `DELETE FROM auth WHERE customer_id = ?`;
                await db.query(deleteAuth, [customer_id]);

                // customer 테이블에서 삭제
                const deleteCustomer = `DELETE FROM customers WHERE customer_id = ?`;
                await db.query(deleteCustomer, [customer_id]);

                res.send('회원 탈퇴 처리가 완료되었습니다.');
            } catch (err) {
                return res.json({ error: '탈퇴 진행 중 오류' });
            }
        } else {
            return res.status(400).json({ error: '유효하지 않은 action 값입니다.' });
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
