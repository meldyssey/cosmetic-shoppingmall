const express = require("express");
const router = express.Router();
const con = require("../db");
require("dotenv").config();

module.exports = () => {
    // 주문 조회
    router.get("/", async (req, res) => {
        try {
            const [ret] = await con.execute(
                "SELECT * FROM orders WHERE order_status IN ('주문완료', '배송중', '배송완료') ORDER BY order_id DESC"
            );
            res.json(ret);
        } catch (err) {
            res.status(500).send("db 오류");
        }
    });

    // 주문 상세보기
    router.get("/detail/:id", async (req, res) => {
        try {
            const [ret] = await con.execute(
                "SELECT o.*, od.*, vpo.product_id, vpo.product_name_kor, vpo.product_name_eng, vpo.product_price AS unit_price, vpo.product_upSystem FROM orders o JOIN orders_detail od ON o.order_id = od.order_id JOIN  view_product_info_opt vpo ON od.product_id = vpo.product_opt_id WHERE o.order_id = ?",
                [req.params.id]
            );
            const [cust] = await con.execute(
                `
                SELECT * FROM customers WHERE email = ?
                UNION
                SELECT * FROM deleted_customers WHERE email = ?
              `,
                [ret[0].email, ret[0].email]
            );

            const responseData = {
                order: ret,
                customer: cust[0],
            };
            res.json(responseData);
        } catch (err) {
            res.status(500).send("db 오류");
        }
    });

    // 주문 상태 및 운송장 번호 업데이트
    router.post("/update", async (req, res) => {
        const orders = req.body;
        console.log("관리자 상태변경 처리 요청");
        try {
            for (let order of orders) {
                await con.execute(
                    `UPDATE orders SET order_status =  ?, invoice = ?, status_date = SYSDATE() WHERE order_id = ?`,
                    [order.status, order.invoice, order.order_id]
                );
                // 토스환불처리
                if (order.status === "환불접수") {
                    const [ret] = await con.execute(
                        "select payment_key from payment where order_id = ?",
                        [order.order_id]
                    );
                    if (!ret.length) {
                        console.log("payment_key 없음", order.order_id);
                    } else {
                        const paymentKey = ret[0].payment_key;

                        const response = await fetch(
                            `https://api.tosspayments.com/v1/payments/${paymentKey}/cancel`,
                            {
                                method: "POST",
                                headers: {
                                    Authorization: `Basic ${Buffer.from(
                                        process.env.TOSS_SECRET_KEY + ":"
                                    ).toString("base64")}`,
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    cancelReason: "관리자환불처리",
                                }),
                            }
                        );

                        const result = await response.json();

                        if (!response.ok) {
                            console.error("Toss api 오류:", result);
                        }
                    }

                    const [stateupdate] = await con.execute(
                        "UPDATE orders SET order_status = '환불완료' WHERE order_id = ? ",
                        [order.order_id]
                    );

                    await con.execute(
                        "UPDATE payment SET refund = 1, refund_date = SYSDATE() WHERE order_id = ?",
                        [order.order_id]
                    );
                    console.log("토스환불취소성공");
                }
            }
            res.status(200).json({
                message: "환불 완료 처리 성공",
                status: "환불완료",
            });
        } catch (err) {
            console.error("수정 처리 오류:", err.message);
            res.status(500).json({
                message: "서버 오류 발생",
                error: err.message,
            });
        }
    });

    // 취소/반품/환불 조회
    router.get("/status", async (req, res) => {
        try {
            const [ret] = await con.execute(
                'select * from orders WHERE order_status IN ("취소", "반품접수", "반품완료", "환불접수", "환불완료") ORDER BY order_id DESC'
            );
            res.json(ret);
        } catch (err) {
            res.status(500).send("db 오류");
        }
    });

    // 키워드 검색
    router.post("/search", async (req, res) => {
        let sql = "";
        let data = [];

        const { orderCate, text } = req.body;

        if (orderCate && text) {
            switch (orderCate) {
                case "orderNum":
                    sql =
                        "SELECT * FROM orders WHERE order_id = ? ORDER BY order_id DESC";
                    data = [text];
                    break;
                case "status":
                    sql =
                        "SELECT * FROM orders WHERE order_status LIKE ? ORDER BY order_id DESC";
                    data = [`%${text}%`];
                    break;
                case "payment":
                    sql =
                        "SELECT * FROM orders WHERE pay_to LIKE ? ORDER BY order_id DESC";
                    data = [`%${text}%`];
                    break;
                case "orderTo":
                    sql =
                        "SELECT * FROM orders WHERE order_name LIKE ? ORDER BY order_id DESC";
                    data = [`%${text}%`];
                    break;
                case "invoice":
                    sql =
                        "SELECT * FROM orders WHERE invoice LIKE ? ORDER BY order_id DESC";
                    data = [`%${text}%`];
                    break;
                default:
                    sql = "SELECT * FROM orders ORDER BY order_id DESC";
                    break;
            }
        } else {
            sql = "SELECT * FROM orders ORDER BY order_id DESC";
        }

        try {
            const [ret] = await con.execute(sql, data);
            res.json(ret);
        } catch (err) {
            res.status(500).send("DB 오류");
        }
    });

    return router;
};
