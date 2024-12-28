const express = require('express');
const router = express.Router();
const conn = require('../db'); // DB 연결 파일 import

/*
 * 신고 목록 가져오기 (GET /)
 * 모든 신고 데이터를 최신순으로 조회
 */
router.get('/', async (req, res) => {
    try {
        // 신고 목록 조회 쿼리
        const [reports] = await conn.query(`
            SELECT 
                report_no,
                review_no,
                email AS reporter,
                report_date,
                report_detail,
                check_status
            FROM review_reports
            ORDER BY report_date DESC
        `);
        res.json(reports);  //결과 반환
    } catch (error) {
        console.error('신고 목록 조회 오류:', error.message);
        res.status(500).json({ error: '목록 불러오기 실패' });
    }
});

/*
 * 특정 신고 가져오기 (GET /:id)
 * 신고 번호를 기준으로 상세 정보 조회
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;  // URL 파라미터에서 신고 ID 가져오기
        const [report] = await conn.query(
            `
            SELECT 
                report_no,
                review_no,
                email AS reporter,
                report_date,
                report_detail,
                check_status
            FROM review_reports
            WHERE report_no = ?
        `,
            [id]
        );
        // 신고가 존재하지 않는 경우
        if (!report.length) {
            return res.status(404).json({ error: '신고를 찾을 수 없음' });
        }

        res.json(report[0]);    // 첫 번째 데이터 반환
    } catch (error) {
        console.error('신고 상세 조회 오류:', error.message);
        res.status(500).json({ error: '상세 불러오기 실패' });
    }
});

/*
 * 새로운 신고 등록하기 (POST /register)
 * 신고 데이터와 이유를 받아 새로운 신고를 DB에 추가
 */
router.post('/register', async (req, res) => {
    console.log('report 진입');
    try {
        let { review_no, reason, content, email } = req.body;

        console.log(email)

        review_no = parseInt(review_no, 10); // 리뷰 번호를 정수로 변환
        const report_detail = `${reason}: ${content}`;  //신고 이유와 내용을 조합

        console.log('받은 데이터:', { review_no, email, report_detail });

        if (!review_no || !reason || !content) {
            return res.status(400).json({ error: '모든 필드를 입력해 주세요.' });
        }

        // 신고 등록 SQL 쿼리
        const sql = `
            INSERT INTO review_reports (review_no, email, report_detail, report_date, check_status)
            VALUES (?, ?, ?, NOW(), 0)
        `;
        const [result] = await conn.execute(sql, [review_no, email, report_detail]);

        res.status(201).json({ message: '신고가 성공적으로 접수되었습니다.', report_no: result.insertId });
    } catch (error) {
        console.error('신고 등록 오류:', error.message);
        res.status(500).json({ error: '신고 등록 실패' });
    }
});


/*
 * 신고 상태 변경하기 (PUT /:id/status)
 * 특정 신고의 상태를 업데이트
 */
router.put('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;  //신고 번호
        const { check_status } = req.body;  //요청 본문에서 새로운 상태 값 가져오기

        //상태 업데이트 SQL 쿼리
        const sql = `UPDATE review_reports SET check_status = ? WHERE report_no = ?`;
        const [result] = await conn.execute(sql, [check_status, id]);

        //업데이트된 행이 없는 경우
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: '신고를 찾을 수 없음' });
        }

        res.json({ message: '상태가 성공적으로 변경되었습니다.' });
    } catch (error) {
        console.error('상태 변경 오류:', error.message);
        res.status(500).json({ error: '상태 변경 실패' });
    }
});

/*
 * 리뷰 비공개 처리 (PUT /hide/:review_no/:report_no)
 * 특정 리뷰를 비공개로 설정하고 신고 상태를 처리 완료로 업데이트
 */
router.put('/hide/:review_no/:report_no', async (req, res) => {
    console.log('리뷰 비공개 백 진입')
    const { review_no, report_no } = req.params;    // URL 파라미터에서 리뷰 번호와 신고 번호 가져오기
    console.log(review_no, report_no)

    try {
        // 신고 상태 업데이트: 처리 완료로 설정
        await conn.execute(`
            UPDATE review_reports
            SET check_status = 1, check_datetime = NOW(), check_detail = '비공개 처리됨'
            WHERE report_no = ?`, [report_no]);

        // 리뷰 상태 업데이트: 비공개로 설정
        await conn.execute(
            `UPDATE review_management
            SET is_visible = 0
            WHERE review_no = ?`,
            [review_no]
        );

        res.json({ message: '리뷰가 비공개 처리되었습니다.' });
    } catch (error) {
        console.error('리뷰 비공개 처리 오류:', error.message);
        res.status(500).json({ error: '리뷰 비공개 처리 실패' });
    }
});

module.exports = router;
