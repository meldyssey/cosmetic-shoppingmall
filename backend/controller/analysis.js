const express = require("express");
const router = express.Router();
const conn = require("../db");

module.exports = () => {
    router.get("/day", async (req, res) => {
        try {
            const [ret] = await conn.execute(
                `SELECT 
          DATE(order_date) AS order_date, 
          SUM(CAST(order_total AS UNSIGNED)) AS total_amount
        FROM orders
        WHERE 
          order_status in ('주문완료','배송중','배송완료')
          AND order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY 
          DATE(order_date)
        ORDER BY 
          order_date`
            );
            res.json(ret);
        } catch (err) {
            res.status(500).send("DB 오류");
        }
    });

    router.get("/month", async (req, res) => {
        try {
            const [ret] = await conn.execute(
                `SELECT 
          *, DATE_FORMAT(order_date, '%Y-%m') AS order_month,
          SUM(CAST(order_total AS UNSIGNED)) AS total_amount
        FROM orders
        WHERE 
          order_status = '배송완료'
          AND YEAR(order_date) = YEAR(CURDATE())
          AND MONTH(order_date) < MONTH(CURDATE())
        GROUP BY 
          DATE_FORMAT(order_date, '%Y-%m')
        ORDER BY 
          order_month`
            );
            res.json(ret);
        } catch (err) {
            res.status(500).send("DB 오류");
        }
    });

    router.get("/year", async (req, res) => {
        try {
            const [ret] = await conn.execute(
                `SELECT 
            *, YEAR(order_date) AS order_year,
            SUM(CAST(order_total AS UNSIGNED)) AS total_amount
          FROM orders
          WHERE 
            order_status = '배송완료'
            AND YEAR(order_date) >= YEAR(CURDATE()) - 3
          GROUP BY 
            YEAR(order_date)
          ORDER BY 
            order_year`
            );
            res.json(ret);
        } catch (err) {
            res.status(500).send("DB 오류");
        }
    });

    return router;
};
