const express = require("express");
const router = express.Router();
const conn = require("../db");
const fs = require("fs");
const multer = require("multer");
const path = require("path");

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "imgs/product");
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            let fName =
                path.basename(file.originalname, ext) + Date.now() + ext;
            //한글인코딩
            let newFName = Buffer.from(fName, "latin1").toString("utf8");

            cb(null, newFName);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = () => {
    router.get("/", async (req, res) => {
        console.log(`/ 진입 확인`); //정상작동 확인

        try {
            const [ret] = await conn.execute(
                "select * from view_product_info_opt"
            );
            res.json(ret);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });

    router.get("/volume/:product_id", async (req, res) => {
        console.log(`/ 진입 확인`); //정상작동 확인
        // console.log(req.query.product_id);

        try {
            const [ret] = await conn.execute(
                "select * from view_product_info_opt where product_status = 1 and product_id = ?",
                [req.params.product_id]
            );
            res.json(ret);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });

    router.get("/detail/:product_opt_id", async (req, res) => {
        console.log(`/:product_opt_id`); //정상작동 확인
        // console.log(req.query.product_opt_id);

        try {
            const [ret] = await conn.execute(
                "select * from view_product_info_opt where product_status = 1 and product_opt_id = ?",
                [req.params.product_opt_id]
            );
            res.json(ret[0]);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });
    router.get("/basket", async (req, res) => {
        console.log("/product/basket 진입 확인");
        console.log(req.query.bs_email);

        try {
            const [ret] = await conn.execute(
                "select * from basket where bs_email = ?",
                [req.query.bs_email]
            );
            res.json(ret);
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });
    router.post("/basket", async (req, res) => {
        console.log("product/basket 진입 확인");
        // console.log(req.body);

        let sql = "insert into basket (bs_email, bs_product_id)";
        sql += " values (?,?)";

        let data = [req.body.bs_email, req.body.bs_product_id];
        console.log(data);

        try {
            const [ret] = await conn.execute(sql, data);
            const newId = ret.insertId;
            // res.send("쓰기 완료");
            res.json(ret);
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });

    router.post("/search", async (req, res) => {
        console.log(`/search 진입확인`); //정상작동 확인
        // console.log(req.body);
        let sql = "";
        let data = [];
        if (req.body.product_category_one) {
            sql =
                "select * from view_product_info_opt where product_status = 1 and product_category_one = ? and (product_name_eng like ? or product_name_kor like ?)";
            data = [
                `${req.body.product_category_one}`,
                `%${req.body.text}%`,
                `%${req.body.text}%`,
            ];
        } else {
            sql =
                "select * from view_product_info_opt where product_status = 1 and (product_name_eng like ? or product_name_kor like ?)";
            data = [`%${req.body.text}%`, `%${req.body.text}%`];
        }

        try {
            const [ret] = await conn.execute(sql, data);
            res.json(ret);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });

    return router;
};
