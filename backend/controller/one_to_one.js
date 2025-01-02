const express = require('express');
const router = express.Router();
const conn = require('../db'); // DB 연결 객체
const multer = require('multer'); // 파일 업로드 처리 미들웨어
const path = require('path');

// Multer 설정 - 파일 저장 경로 및 파일명 정의
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imgs/onetoone/'); //업로드된 파일이 저장될 폴더
    },
    filename: (req, file, cb) => {
        // 업로드된 파일명 설정 (현재 시간 + 확장자)
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

// Multer 인스턴스 생성
const upload = multer({ storage });

// 라우터 모듈 내보내기
module.exports = () => {
    /*
     * 1:1 문의 목록 조회 (GET /)
     * 모든 1:1 문의 데이터를 가져오고, 날짜순으로 정렬하여 반환
     */
    router.get('/', async (req, res) => {
        try {
            // DB에서 모든 1:1 문의 데이터 조회
            const [results] = await conn.execute(`
                SELECT 
                    post_no,
                    post_category,
                    email,
                    post_date,
                    post_title,
                    post_detail,
                    reply_detail,
                    reply_date,
                    reply_status,
                    one_upload_file
                FROM 
                    one_to_one
                ORDER BY 
                    post_date DESC
            `);

            // 문의가 없는 경우 빈 배열과 메시지 반환
            if (results.length === 0) {
                return res.json({
                    inquiries: [],
                    message: 'No inquiries found',
                });
            }

            // 문의 데이터 반환
            res.json({ inquiries: results });
        } catch (err) {
            res.status(500).json({ error: 'DB 에러' });
        }
    });

    /*
     * 특정 1:1 문의 상세 조회 (GET /:id)
     * 게시글 번호를 기반으로 1:1 문의 데이터를 반환
     */
    router.get('/:id', async (req, res) => {
        try {
            const [results] = await conn.execute(
                `
                SELECT 
                    post_no,           -- 게시글 번호
                    post_category,     -- 카테고리
                    email,             -- 작성자 이메일
                    post_date,         -- 작성 날짜
                    post_title,        -- 제목
                    post_detail,       -- 문의 내용
                    reply_detail,      -- 답변 내용
                    reply_date,        -- 답변 날짜
                    reply_status,       -- 답변 상태
                    one_upload_file    -- 파일 첨부
                FROM 
                    one_to_one

                Where post_no = ?
            `,
                [req.params.id]
            );

            // 결과 반환 (첫 번째 항목만)
            res.json(results[0]);
        } catch (err) {
            res.status(500).json({ error: 'DB 에러' });
        }
    });

    /*
     * 1:1 문의 등록 (POST /register)
     * 요청 본문과 파일 데이터를 기반으로 1:1 문의 등록
     */
    router.post(
        '/register',
        upload.single('one_upload_file'), // 파일 업로드 처리
        async (req, res) => {
            const { post_category, email, post_title, post_detail } = req.body; // 요청 본문에서 데이터 추출
            const one_upload_file = req.file ? req.file.filename : null; //업로드된 파일명 (있다면~)

            //필수 데이터 검증(email은 null 허용)
            if (!post_category || typeof post_category !== 'string' || !post_title || !post_detail) {
                return res.status(400).json({
                    error: '필수 입력 데이터가 누락되었거나 잘못되었습니다.',
                });
            }
            try {
                // DB에 데이터 삽입
                const sql = `
        INSERT INTO one_to_one 
        (post_category, email, post_title, post_detail, post_date, reply_status, one_upload_file)
        VALUES (?, ?, ?, ?, NOW(), '대기', ?)
    `;
                const [result] = await conn.execute(sql, [post_category, email || null, post_title, post_detail, one_upload_file]);

                // 삽입 성공 시 응답
                res.status(201).json({
                    post_no: result.insertId,
                    post_category,
                    email: email || null,
                    post_title,
                    post_detail,
                    reply_status: '대기',
                    one_upload_file, // 업로드된 파일명도 응답에 포함
                });
            } catch (err) {
                res.status(500).json({ error: 'DB 삽입 실패' });
            }
        }
    );
    /*
     * 고객 정보 조회 (POST /myPage)
     * 이메일을 기반으로 고객 정보를 조회
     */
    // 고객 정보 조회 라우트
    router.post('/myPage', async (req, res) => {
        const { email } = req.body; // 바디에서 이메일 가져와서
        const sessionToken = req.headers['authorization']; // 세션 토큰 확인

        // 세션 토큰 검증
        if (!sessionToken || sessionToken !== 'mockSessionToken') {
            // 세션토큰이 없거나 저장된 세션토큰과 일치 하지 않으면
            return res.status(401).json({ error: '세션 토큰이 유효하지 않습니다.' });
        }

        try {
            // 이메일로 DB 조회
            const [ret] = await db.query(`SELECT * FROM customers WHERE email = ?`, [email]);
            if (ret.length === 0) {
                // 조회된 결과가 없으면
                return res.status(404).json({ error: '고객 정보를 찾을 수 없습니다.' });
            }

            // 조회된 결과가 있다면
            res.json(ret[0]); // 첫 번째 결과 반환
        } catch (err) {
            res.status(500).send('서버 오류');
        }
    });

    /*
     * 특정 1:1 문의 답변 상태 수정 (PUT /:id)
     * 게시글 번호를 기반으로 답변 상태를 수정
     */

    router.put('/:id', async (req, res) => {
        let data = [req.body.reply_status, parseInt(req.params.id)];

        try {
            // DB 업데이트
            const [ret] = await conn.execute('update one_to_one set reply_status=? where post_no = ?', data);
            // 성공 응답
            res.send('수정 성공');
        } catch (err) {
            res.status(500).send('db오류');
        }
    });

    return router;
};
