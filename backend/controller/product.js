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
            const [ret] = await conn.execute("select * from view_product_info");
            res.json(ret);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });
    router.get("/detail/:product_id", async (req, res) => {
        console.log("/admin/detail 진입 확인");
        // console.log(req.params.product_id);
        try {
            const [ret] = await conn.execute(
                "select * from view_product_info where product_id = ?",
                [req.params.product_id]
            );
            res.json(ret[0]);
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });

    router.get("/detail/option/:product_id", async (req, res) => {
        console.log("/admin/detail 진입 확인");
        // console.log(req.params.product_id);
        try {
            const [ret] = await conn.execute(
                "select * from view_product_info_opt where product_id = ?",
                [req.params.product_id]
            );
            res.json(ret);
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });

    router.get("/register", async (req, res) => {
        console.log("/product/admin/register 진입 확인");
        try {
            const [categories] = await conn.execute(
                "select * from  product_category"
            );
            const [product] = await conn.execute("select * from product");
            const [note] = await conn.execute("select * from  product_note");

            const combinedData = {
                categories,
                product,
                note,
            };
            // console.log(combinedData);
            res.json(combinedData);
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });

    router.get("/modify/:product_id", async (req, res) => {
        console.log("/admin/modify/:product_id 진입 확인");
        try {
            const [product] = await conn.execute(
                "select * from view_product_info where product_id = ?",
                [req.params.product_id]
            );
            const [note] = await conn.execute("select * from  product_note");
            const [allProduct] = await conn.execute("select * from product");

            const combinedData = {
                product,
                note,
                allProduct,
            };
            // console.log(combinedData);
            res.json(combinedData);
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });
    router.get("/register/option/:product_id", async (req, res) => {
        console.log("/admin/register/option/ 진입 확인");
        // console.log(req.params.product_id);

        try {
            const [product] = await conn.execute(
                "select * from product where product_id = ?",
                [req.params.product_id]
            );
            const [option] = await conn.execute(
                "select * from product_opt where product_id = ?",
                [req.params.product_id]
            );
            const combinedData = {
                product,
                option,
            };
            console.log(combinedData);
            res.json(combinedData);
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });

    router.post("/register", async (req, res) => {
        console.log("register 정상진입확인");
        // console.log(req);

        let sql =
            "insert into product (product_name_kor,product_name_eng,product_category_id,product_scent,product_ingredient,product_top,product_heart,product_base,product_intro,product_status,product_reg_date)";
        sql += " values (?,?,?,?,?,?,?,?,?,?,sysdate())";

        let data = [
            req.body.product_name_kor,
            req.body.product_name_eng,
            req.body.product_category_id,
            req.body.product_scent,
            req.body.product_ingredient,
            req.body.product_top,
            req.body.product_heart,
            req.body.product_base,
            req.body.product_intro,
            req.body.product_status,
        ];
        console.log(data);

        try {
            const [ret] = await conn.execute(sql, data);
            const newId = ret.insertId;
            console.log(ret);
            console.log(ret.insertId);
            console.log(newId);
            // res.send("쓰기 완료");
            res.json({ newId });
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });

    router.post(
        "/register/option/:product_id",
        upload.single("product_upfile"),
        async (req, res) => {
            console.log("/admin/register/option/ 정상진입확인");
            // console.log(req.file);

            let sql =
                "insert into product_opt (product_id,product_volume,product_price,product_upSystem,product_upOri)";
            sql += " values (?,?,?,?,?)";

            let newFName = Buffer.from(
                req.file.originalname,
                "latin1"
            ).toString("utf8");

            let data = [
                req.body.product_id,
                req.body.product_volume + req.body.unit,
                req.body.product_price,
                req.file.filename,
                newFName,
            ];
            console.log(data);

            try {
                const ret = await conn.execute(sql, data);
                const newId = ret.insertId;
                // console.log("쓰기 완료", ret);
                // res.send("쓰기 완료");
                res.json({ newId });
            } catch (err) {
                console.error("db 불러오기 실패 : ", err.message);
                res.status(500).send("db오류");
            }
        }
    );

    router.post("/search", async (req, res) => {
        console.log(`/search 진입확인`); //정상작동 확인
        // console.log(req.body);
        let sql = "";
        let data = [];
        if (req.body.product_category_one && req.body.text) {
            sql =
                "select * from view_product_info where product_category_one = ? and (product_name_eng like ? or product_name_kor like ?)";
            data = [
                `${req.body.product_category_one}`,
                `%${req.body.text}%`,
                `%${req.body.text}%`,
            ];
        } else if (req.body.product_category_one) {
            sql =
                "select * from view_product_info where product_category_one = ?";
            data = [`${req.body.product_category_one}`];
        } else if (req.body.text) {
            sql =
                "select * from view_product_info where product_name_eng like ? or product_name_kor like ?";
            data = [`%${req.body.text}%`, `%${req.body.text}%`];
        } else {
            sql = "select * from view_product_info";
        }

        try {
            const [ret] = await conn.execute(sql, data);
            res.json(ret);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });

    router.delete("/register/option/:product_opt_id", async (req, res) => {
        console.log("삭제 진입:" + req.params.product_opt_id);
        // console.log(req.body);

        //파일삭제
        //파일에 작성한 내용이 있다면
        if (req.body.delUPfile) {
            //파일이 존재한다면
            fs.access(
                "imgs/product/" + req.body.delUPfile,
                fs.constants.F_OK,
                (err) => {
                    if (!err) {
                        fs.unlink(
                            "imgs/product/" + req.body.delUPfile,
                            (err) => {
                                if (!err) {
                                    console.log(req.body.delUPfile + " 삭제");
                                }
                            }
                        );
                    }
                }
            );
        }

        try {
            const [ret] = await conn.execute(
                "delete from product_opt where product_opt_id = ?",
                [req.params.product_opt_id]
            );

            console.log("삭제 완료", ret);
            res.send("삭제 성공:" + req.params.product_opt_id);
        } catch (err) {
            console.error("sql 실패 : ", err.message);
            res.status(500).send("db 오류");
        }
    });

    router.put("/modify", async (req, res) => {
        // console.log(req.body);
        let data = [
            req.body.product_name_kor,
            req.body.product_name_eng,
            req.body.product_special,
            parseInt(req.body.product_category_id),
            req.body.product_scent,
            req.body.product_ingredient,
            parseInt(req.body.product_top),
            parseInt(req.body.product_heart),
            parseInt(req.body.product_base),
            req.body.product_intro,
            parseInt(req.body.product_status),
            parseInt(req.body.product_id),
        ];
        console.log(data);

        try {
            const [ret] = await conn.execute(
                "update product set product_name_kor=?, product_name_eng=?,product_special=?, product_category_id=?, product_scent=?, product_ingredient=?,  product_top=?, product_heart=?, product_base=?, product_intro=?, product_status=? where product_id = ?",
                data
            );
            console.log("수정완료", ret);
            res.send("수정 성공");
        } catch (err) {
            console.error("db 불러오기 실패 : ", err.message);
            res.status(500).send("db오류");
        }
    });

    return router;
};
