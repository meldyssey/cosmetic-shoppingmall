const express = require("express");
const router = express.Router();
const con = require("../db");
require("dotenv").config();

// const apiSecretKey = "test_sk_jExPeJWYVQeAoYOYALPqV49R5gvN";
// const encryptedApiSecretKey =
//     "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");

module.exports = () => {
    router.get("/:id", async (req, res) => {
        try {
            const [ret] = await con.execute(
                "select bs_id, bs_product_id, product_upSystem, product_name_kor, product_name_eng, product_volume, product_price from view_product_info_opt join basket on basket.bs_product_id = view_product_info_opt.product_opt_id where bs_email = ?",
                [req.params.id]
            );

            res.json(ret);
        } catch (err) {
            res.status(500).send("db 오류");
        }
    });

    // 결제정보입력
    router.post("/join/:id", async (req, res) => {
        const [ret] = await con.execute(
            "SELECT MAX(order_id) AS max_order_id FROM orders"
        );
        console.log("기존결제오나");
        const maxOrderId = ret[0].max_order_id + 1;

        try {
            // 기본 주문 insert
            let sql = `INSERT INTO orders (order_id, email, pay_to, order_name, order_total, order_tel, order_zip, order_roadname, order_buildname, order_addredetail, order_msg, order_status, order_date, invoice) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, SYSDATE(), null)`;
            let data = [
                maxOrderId,
                req.body.email,
                req.body.pay_to,
                req.body.order_to,
                req.body.order_total,
                req.body.order_tel,
                req.body.zip,
                req.body.roadname_address,
                req.body.building_name,
                req.body.detail_address,
                req.body.order_msg,
                req.body.status,
            ];
            await con.execute(sql, data);

            // detail insert
            let sql2 = `INSERT INTO orders_detail (order_id, product_id, order_cnt, product_price) VALUES (?, ?, ?, ?)`;

            for (let prod of req.body.products) {
                let data2 = [
                    maxOrderId,
                    prod.product_id,
                    prod.order_cnt,
                    prod.product_price,
                ];

                await con.execute(sql2, data2);
            }

            res.json(maxOrderId);
            console.log("추가오더아이디", maxOrderId);
            // 결제 insert
            let sql3 =
                "INSERT INTO payment (payment_id, order_id, price, pay_date) VALUES (?, ?, ?, SYSDATE())";
            let data3 = [orderId, maxOrderId, amount];
            await con.execute(sql3, data3);
        } catch (err) {
            console.log("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });

    //////////////// 토스결제창
    router.post("/confirm", async function (req, res) {
        const { paymentKey, orderId, amount } = req.body;
        const payData = {
            orderId: orderId,
            amount: amount,
            paymentKey: paymentKey,
        };

        try {
            console.log("토스오나22", payData);
            const response = await fetch(
                "https://api.tosspayments.com/v1/payments/confirm",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Basic ${Buffer.from(
                            process.env.TOSS_SECRET_KEY + ":"
                        ).toString("base64")}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payData),
                }
            );

            const result = await response.json();

            if (!response.ok) {
                console.error("결제 승인 실패:", result);
                res.status(response.status).json(result);
                return;
            }
            console.log("메타데이터", result.metadata);

            const metadata = result.metadata;
            const orderPayload = JSON.parse(metadata.orderPayload);
            const prod = JSON.parse(metadata.prod);
            console.log("결제방법", metadata.method);

            //order_id 가져오기
            const [ret] = await con.execute(
                "SELECT MAX(order_id) AS max_order_id FROM orders"
            );
            console.log("토스오나23", ret);

            const maxOrderId = ret[0].max_order_id + 1;
            console.log("토스오나24", maxOrderId);

            //orders 테이블저장
            const sql1 = `INSERT INTO orders (order_id, email, pay_to, order_name, order_total, order_tel, order_zip, order_roadname, order_buildname, order_addredetail, order_msg, order_status, order_date, invoice) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, SYSDATE(), null)`;
            const data1 = [
                maxOrderId,
                orderPayload.email,
                // method,
                // orderPayload.pay_to,
                metadata.method,
                orderPayload.order_to,
                orderPayload.order_total,
                orderPayload.order_tel,
                orderPayload.zip,
                orderPayload.roadname_address,
                orderPayload.building_name,
                orderPayload.detail_address,
                orderPayload.order_msg,
                orderPayload.status,
            ];

            console.log("데이터1", data1);
            await con.execute(sql1, data1);

            // //orders_detail저장
            const sql2 = `INSERT INTO orders_detail (order_id, product_id, order_cnt, product_price) VALUES (?, ?, ?, ?)`;
            for (let product of prod) {
                const data2 = [
                    maxOrderId,
                    product.bs_product_id,
                    product.quantity,
                    product.quantity * product.product_price,
                ];
                console.log("데이터2", data2);
                await con.execute(sql2, data2);
            }

            //payment저장
            const sql3 = `INSERT INTO payment (payment_id, order_id, price, payment_key, pay_date) VALUES (?, ?, ?, ?, SYSDATE())`;
            const data3 = [orderId, maxOrderId, amount, paymentKey];
            console.log("결제테이블", data3);
            await con.execute(sql3, data3);

            // TODO: 결제 완료 비즈니스 로직을 구현하세요.
            res.status(response.status).json({
                result,
                newOrderId: maxOrderId,
                metadata: result.metadata,
            });
            console.log("결제 및 주문 저장 성공");

            const email = orderPayload.email;
            console.log("장바구니 삭제:", email);
            await con.execute("DELETE FROM basket WHERE bs_email = ?", [email]);
        } catch (err) {
            console.error("결제승인오류:", err.message);
            res.status(500).send("db오류");
        }
    });
    ////////////////////////

    return router;
};
