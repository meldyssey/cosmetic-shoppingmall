const express = require("express");
const app = express();
const db = require("mysql2");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config(); // .env 파일을 로드

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "imgs/");
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

// CORS 설정
const corsOptions = {
    origin: [
        process.env.SERVER_ADDRESS,
        process.env.SERVICE_ADDRESS,
        "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/imgs", express.static(path.join(__dirname, "imgs")));

const adminCount = require("./controller/AdminMain.js");
app.use("/", adminCount());

//관리자페이지 - 회원정보조회
const memberListRouter = require("./controller/MemberList.js");
app.use("/admin/member", memberListRouter());

const productRouter = require("./controller/product.js");
app.use("/admin/product", productRouter());

const productHomeRouter = require("./controller/productHome.js");
app.use("/product/", productHomeRouter());

const basketRouter = require("./controller/Basket.js");
app.use("/basket/", basketRouter());

const payment1Router = require("./controller/Payment1.js");
app.use("/payment1/", payment1Router());

const payment2Router = require("./controller/Payment2.js");
app.use("/payment2/", payment2Router());

const adminOrderRouter = require("./controller/adminOrder.js");
app.use("/admin/order", adminOrderRouter());

// 일대일문의
const onetooneRouter = require("./controller/one_to_one.js");
app.use("/onetoone/", onetooneRouter());

//리뷰
const reviewRouter = require("./controller/review.js");
app.use("/review/", reviewRouter());
//리뷰신고
const reportRouter = require("./controller/report.js");
app.use("/reports/", reportRouter);

//회원가입 라우터
const signUpRouter = require("./controller/SignUp.js");
app.use("/signUp", signUpRouter);

//중복확인 라우터
const emailChkRouter = require("./controller/SignUp.js");
app.use("/signUp", emailChkRouter);

//로그인 라우터
const signInRouter = require("./controller/SignIn.js");
app.use("/signIn", signInRouter);

const kakaoLoginRouter = require("./controller/KakaoLogin.js");
app.use("/auth", kakaoLoginRouter);

//마이페이지 라우터
const myinfoRouter = require("./controller/MyInfo.js");
app.use("/myPage/", myinfoRouter());

//회원정보 수정 라우터
const myinfoeditRouter = require("./controller/MyInfo.js");
app.use("/myPage/myinfoEdit", myinfoeditRouter());

//배송주소록 라우터
const addressListRouter = require("./controller/MyInfo.js");
app.use("/myPage/addressList", addressListRouter());

//비밀번호찾기 라우터
const findPwRouter = require("./controller/FindPw.js");
app.use("/", findPwRouter);

//주문내역보기 라우터
const ordersRouter = require("./controller/MyInfo.js");
app.use("/myPage/viewOrders", ordersRouter());

//주문상세보기 라우터
const orderDetailRouter = require("./controller/OrderDetail.js");
app.use("/myPage/orderDetail", orderDetailRouter());

const analysisRouter = require("./controller/analysis.js");
app.use("/analysis", analysisRouter());

const deliveryRouter = require("./controller/delivery.js");
app.use("/delivery", deliveryRouter());

const emailRouter = require("./controller/email.js");
app.use("/email", emailRouter());

app.get("/", (req, res) => {
    console.log("백엔드 서버 진입"); //정상작동 확인
    res.send("백엔드 서버 진입");
});

app.get("*", (req, res) => {
    res.send("404에러");
});

app.listen(5001, () => {
    console.log("서버 실행");
});
