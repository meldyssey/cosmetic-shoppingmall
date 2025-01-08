const express = require("express");
const router = express.Router();
const conn = require("../db");
const nodemailer = require("nodemailer");

module.exports = () => {
    // Naver SMTP 서버 설정
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587, // TLS를 사용할 때
        secure: false, // TLS를 사용하면 false, SSL을 사용하면 true
        auth: {
            user: process.env.EMAIL_USER, // .env 파일에서 가져옴
            pass: process.env.EMAIL_PASS, // .env 파일에서 가져옴
        },
    });

    // 메일 전송 API
    router.post("/send", async (req, res) => {
        console.log(req.body);

        try {
            //const { to, subject, text } = req.body;
            const to = `notify.jomalone@gmail.com`;
            const subject = "[Jomalone] 남겨주신 1:1 문의에 답변 드립니다.";
            const text = `
작성해주신 문의 : ${req.body.post_detail}
답변 : ${req.body.reply}
`;

            let data = [req.body.reply, req.body.post_no];

            // 이메일 내용 설정
            const mailOptions = {
                from: process.env.EMAIL_USER, // 보내는 사람
                to: to, // 받는 사람
                subject: subject, // 이메일 제목
                text: text, // 이메일 본문
            };
            const info = await transporter.sendMail(mailOptions);

            const [ret] = await conn.execute(
                "update one_to_one set reply_status = '답변완료', reply_date = sysdate(), reply_detail = ? where post_no = ?",
                data
            );
            console.log("수정완료", ret);
            res.status(200).send({
                message: `이메일 전송 성공`,
                response: info.response,
            });
        } catch (error) {
            console.error("이메일 전송 실패:", error.message);
            res.status(500).send({ message: "Error 실패: " + error.message });
        }
    });

    return router;
};
