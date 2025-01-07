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
        try {
            const num = parseInt(Math.random() * 100 + 1);

            //const { to, subject, text } = req.body;
            const to = "meldyssey15@gmail.com";
            const subject = "express 가 보낸다";
            const text = `내용이지 : ${num}`;

            //이메일 - db 테이블에 저장해두고, 가장 큰 번호 기준으로 매칭시킴
            //sms 인증 -

            // 이메일 내용 설정
            const mailOptions = {
                from: process.env.EMAIL_USER, // 보내는 사람
                to: to, // 받는 사람
                subject: subject, // 이메일 제목
                text: text, // 이메일 본문
            };
            const info = await transporter.sendMail(mailOptions);
            res.status(200).send({
                message: `이메일 전송 성공: ${num}`,
                response: info.response,
            });
        } catch (error) {
            console.error("이메일 전송 실패:", error.message);
            res.status(500).send({ message: "Error 실패: " + error.message });
        }
    });

    return router;
};
