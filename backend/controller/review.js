const express = require("express");
const router = express.Router();
const conn = require("../db");  //DB 연결객체
const multer = require("multer");   //파일 업로드 처리 미들웨어
const path = require("path");

// Multer 설정 - 파일 저장 경로 및 파일명 정의
const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            // 업로드된 파일이 저장될 폴더 경로 설정
            cb(null, "imgs/review/");
        },
        filename: (req, file, cb) => {
            // 업로드된 파일명 설정 (기존 이름 + 현재 시간 + 확장자)
            const ext = path.extname(file.originalname);
            let fName =
                path.basename(file.originalname, ext) + Date.now() + ext;
            //한글인코딩
            let newFName = Buffer.from(fName, "latin1").toString("utf8");

            cb(null, newFName);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한: 5MB
});

// 라우터 모듈 내보내기
module.exports = () => {
    /*
     * 특정 제품 리뷰 조회 (GET /productReview)
     * product_id를 기준으로 해당 제품에 대한 리뷰를 조회
     */
    router.get("/productReview", async (req, res) => {
        console.log("review 보기");
        const { product_id } = req.query; // 쿼리 파라미터에서 product_id 가져오기
        try {
            let query = `
                SELECT review_management.*, view_product_info.*
                FROM review_management
                LEFT OUTER JOIN view_product_info on review_management.product_id = view_product_info.product_id
                WHERE review_management.product_id = ? and review_management.is_visible = 1
            `;
            const values = [];
            if (product_id) {
                values.push(product_id); // product_id가 있는 경우 조건에 추가
            }
            const [rows] = await conn.execute(query, values);
            // console.log(rows);

            res.json(rows);      // 조회된 리뷰 반환
        } catch (err) {
            console.error("리뷰 목록 조회 실패:", err.message);
            res.status(500).send("DB 오류");
        }
    });

    /*
     * 리뷰 작성 페이지 데이터 조회 (GET /reviewWrite)
     * product_opt_id를 기준으로 해당 제품 옵션 정보 조회
     */
    router.get("/reviewWrite", async (req, res) => {
        const { product_opt_id } = req.query; // 쿼리 파라미터에서 product_opt_id 가져오기
        try {
            let query = `
                SELECT *
                FROM view_product_info_opt
                WHERE product_opt_id = ?
            `;
            const values = [];
            if (product_opt_id) {
                values.push(product_opt_id);
            }
            const [rows] = await conn.execute(query, values);
          

            res.json(rows[0]);  // 첫 번째 결과 반환
        } catch (err) {
            console.error("리뷰 목록 조회 실패:", err.message);
            res.status(500).send("DB 오류");
        }
    });

    /*
     * 모든 리뷰 목록 조회 (GET /)
     * is_visible이 1인 리뷰를 최신순으로 정렬하여 반환
     */
    router.get("/", async (req, res) => {
        console.log("리뷰 목록 요청");
        try {
            const [rows] = await conn.execute(
                "SELECT * FROM review_management WHERE is_visible = 1 ORDER BY review_date DESC"
            );
            // console.log("리뷰 목록:", rows); // 디버깅용 로그
            res.json(rows); //조회된 리뷰 목록 반환
        } catch (err) {
            console.error("리뷰 목록 조회 실패:", err.message);
            res.status(500).send("DB 오류");
        }
    });
   

    /*
     * 특정 리뷰 상세 조회 (GET /:id)
     * 리뷰 번호를 기준으로 상세 데이터 조회
     */
    // 특정 리뷰 상세 정보 가져오기
    router.get("/:id", async (req, res) => {
        const { id } = req.params;
        console.log(`리뷰 상세 요청 ID: ${id}`); // 요청 ID 확인
        try {
            const [rows] = await conn.execute(
                "SELECT * FROM review_management WHERE review_no = ?",
                [id]
            );
            if (rows.length > 0) {
                // console.log("리뷰 데이터 : ", rows[0]);
                res.json(rows[0]); // 첫 번째 데이터 반환
            } else {
                res.status(404).json({
                    error: "해당 리뷰를 찾을 수 없습니다.",
                });
            }
        } catch (err) {
            console.error("리뷰 상세 조회 실패:", err.message);
            res.status(500).send("DB 오류");
        }
    });


    /*
     * 리뷰 등록 (POST /)
     * 요청 본문과 파일 데이터를 기반으로 리뷰 등록
     */
    router.post("/", upload.single("review_file"), async (req, res) => {
        console.log("review post 진입");
        console.log(req.file);

        try {
            const query = `
                INSERT INTO review_management (
                    product_opt_id, product_id, email, review_date, review_rate,
                    review_nick, review_title, review_detail, review_region, review_scent,
                    review_time, review_gift, review_upload_file, review_status, is_visible
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;

            // 이미지 파일이 있을 경우 파일명, 없으면 null로 설정
            const reviewUploadFile = req.file ? req.file.filename : null;

            // 요청 본문에서 데이터 추출
            const values = [
                req.body.product_opt_id,
                req.body.product_id,
                req.body.email,
                new Date(), // 리뷰 작성 날짜
                req.body.review_rate,
                req.body.review_nick || "익명",
                req.body.review_title || "제목 없음",
                req.body.review_detail || "내용 없음",
                req.body.review_region || "지역 미지정",
                req.body.review_scent || "향 미지정",
                req.body.review_time,
                req.body.review_gift,
                reviewUploadFile, // 이미지 파일이 없으면 null
                1, // 기본 상태값 (예: 승인 대기)
                1, // `is_visible` 기본값 (공개)
            ];

            // DB에 데이터 삽입
            const [result] = await conn.execute(query, values);
            res.status(201).json({
                message: "리뷰가 성공적으로 등록되었습니다.",
                review_no: result.insertId,
            });
        } catch (error) {
            console.error("리뷰 등록 오류:", error.message);
            res.status(500).json({ error: "리뷰 등록 실패" });
        }
    });

    /*
     * 고객 정보 조회 (POST /areviewlist)
     * 이메일을 기반으로 고객 정보를 조회
     */
    // 고객 정보 조회 라우트
    router.post("/areviewlist", async (req, res) => {
        const { email } = req.body; // 바디에서 이메일 가져와서
        const sessionToken = req.headers["authorization"]; // 세션 토큰 확인

        // 세션 토큰 검증
        if (!sessionToken || sessionToken !== "mockSessionToken") {
            // 세션토큰이 없거나 저장된 세션토큰과 일치 하지 않으면
            return res
                .status(401)
                .json({ error: "세션 토큰이 유효하지 않습니다." });
        }

        try {
            // 이메일로 DB 조회
            const [ret] = await db.query(
                `SELECT * FROM customers WHERE email = ?`,
                [email]
            );
            if (ret.length === 0) {
                // 조회된 결과가 없으면
                return res
                    .status(404)
                    .json({ error: "고객 정보를 찾을 수 없습니다." });
            }

            // 조회된 결과가 있다면
            res.json(ret[0]); // 첫 번째 결과 반환
        } catch (err) {
            console.error("DB 조회 실패:", err.message);
            res.status(500).send("서버 오류");
        }
    });

    return router;
};
