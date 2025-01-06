const express = require("express");
const router = express.Router();
const conn = require("../db");
const axios = require("axios"); // Add this line to import axios

module.exports = () => {
    const apiUrl = "https://info.sweettracker.co.kr/api/v1/trackingInfo";

    const getTrackingInfo = async (invoice) => {
        const params = {
            t_code: "04", // Delivery company code (e.g., CJ Logistics)
            t_invoice: invoice, // Invoice number
            t_key: process.env.DELIVERY_API_KEY,
        };
        try {
            // Make the GET request
            const response = await axios.get(apiUrl, { params });

            // Parse the response
            const trackingInfo = response.data;
            console.log("Tracking Info:", trackingInfo);

            // Handle response data
            if (trackingInfo.complete) {
                let sql = "";
                let data = [];
                sql = "update orders set order_status=?";
                data = [`배송완료`];
                const [ret] = await conn.execute(sql, data);
                console.log("배송완료 수정 성공", ret);
            } else {
                console.log("Error or 상태 변화 없음:", trackingInfo.msg);
            }
        } catch (error) {
            console.error("Error fetching tracking info:", error.message);
        }
    };

    router.get("/update", async (req, res) => {
        let sql = "";

        sql = "SELECT invoice FROM orders WHERE order_status = '배송중'";

        try {
            const [ret] = await conn.execute(sql);
            console.log(ret);
            {
                ret.map((value, i) => {
                    console.log(value);
                    getTrackingInfo(value.invoice);
                });
            }

            res.send(ret);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });

    router.post("/update", async (req, res) => {
        // console.log(req.body);
        const email = req.body.email;

        console.log(`/update 진입확인`, email); //정상작동 확인

        // 세션 토큰 검증
        if (!email) {
            return res.json({ error: "이메일이 필요합니다." });
        }
        let sql = "";
        let data = [];

        sql =
            "SELECT invoice FROM orders WHERE order_status = '배송중' and email = ?";
        data = [`${email}`];

        try {
            const [ret] = await conn.execute(sql, data);
            console.log(ret);
            {
                ret.map((value, i) => {
                    console.log(value);
                    getTrackingInfo(value.invoice);
                });
            }

            res.send(ret);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });

    return router;
};
