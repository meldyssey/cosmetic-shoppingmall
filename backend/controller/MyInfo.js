const express = require("express");
const router = express.Router();
const db = require("../db");

// 공통 유효성 검사 함수
const validateEmail = async (email) => {
    if (!email) {
        throw new Error("이메일이 필요합니다.");
    }
    const [user] = await db.query("SELECT * FROM customers WHERE email = ?", [
        email,
    ]);
    if (user.length === 0) {
        throw new Error("사용자를 찾을 수 없습니다.");
    }
    return user[0];
};

// 회원정보 라우터
module.exports = () => {
    router.post("/", async (req, res) => {
        const { action, email, optional_agree, gender, contact_number } =
            req.body;
        const sessionToken = req.headers["authorization"];

        // 세션 토큰 검증
        if (!sessionToken) {
            return res.status(401).json({ error: "세션 토큰이 없습니다." });
        }

        console.log("요청 받은 데이터:", { action, email, sessionToken });

        try {
            if (action === "getUserInfo") {
                // 사용자 정보 조회
                const user = await validateEmail(email);
                if (user.birthdate) {
                    user.birthdate = user.birthdate.toISOString().split("T")[0]; // 날짜 포맷 변환
                }
                return res.json(user);
            } else if (action === "updateChkbox") {
                // 선택 동의 상태 업데이트
                if (optional_agree !== 0 && optional_agree !== 1) {
                    throw new Error("optional_agree 값이 유효하지 않습니다.");
                }
                const [result] = await db.query(
                    "UPDATE customers SET optional_agree = ? WHERE email = ?",
                    [optional_agree, email]
                );
                if (result.affectedRows === 0) {
                    throw new Error("사용자 정보를 업데이트할 수 없습니다.");
                }
                return res.json({
                    success: true,
                    message: "optional_agree가 성공적으로 업데이트되었습니다.",
                });
            } else if (action === "updateUserInfo") {
                // 사용자 정보 수정
                if (!/^01[0-9]-\d{3,4}-\d{4}$/.test(contact_number)) {
                    throw new Error("핸드폰 번호 형식이 올바르지 않습니다.");
                }
                const [result] = await db.query(
                    "UPDATE customers SET contact_number = ?, optional_agree = ? WHERE email = ?",
                    [contact_number, optional_agree, email]
                );
                if (result.affectedRows === 0) {
                    throw new Error("사용자 정보를 업데이트할 수 없습니다.");
                }
                return res.json({
                    success: true,
                    message: "사용자 정보가 성공적으로 업데이트되었습니다.",
                });
            } else if (action === "updateGender") {
                // 성별 업데이트
                const [result] = await db.query(
                    "UPDATE customers SET gender = ? WHERE email = ?",
                    [gender, email]
                );
                if (result.affectedRows === 0) {
                    throw new Error("성별 정보를 업데이트할 수 없습니다.");
                }
                return res.json({
                    success: true,
                    message: "성별이 성공적으로 업데이트되었습니다.",
                });
            } else if (action === "getAddressInfo") {
                // 배송지 정보 조회 추가
                if (!email) {
                    return res.json({ error: "이메일이 필요합니다." });
                }

                try {
                    const [address] = await db.query(
                        `SELECT customer_name, zip, roadname_address, building_name, detail_address, contact_number 
                        FROM customers WHERE email = ?`,
                        [email]
                    );

                    return res.json(
                        address[0] || { error: "배송지 정보가 없습니다." }
                    );
                } catch (err) {
                    return res.json({ error: "DB 조회 오류" });
                }
            } else if (action === "updateAddressInfo") {
                // 배송지 정보 수정 추가
                const { zip, roadname_address, building_name, detail_address } =
                    req.body;

                if (!email || !zip || !roadname_address || !detail_address) {
                    return res.json({
                        error: "입력된 정보가 유효하지 않습니다.",
                    });
                }

                try {
                    const [result] = await db.query(
                        `UPDATE customers SET zip = ?, roadname_address = ?, building_name = ?, detail_address = ?
                        WHERE email = ?`,
                        [
                            zip,
                            roadname_address,
                            building_name,
                            detail_address,
                            email,
                        ]
                    );

                    if (result.affectedRows === 0) {
                        return res.json({
                            error: "배송지 정보를 찾을 수 없습니다.",
                        });
                    }

                    return res.json({
                        success: true,
                        message: "배송지 정보가 성공적으로 업데이트되었습니다.",
                    });
                } catch (err) {
                    return res.json({ error: "DB 업데이트 오류" });
                }
            } else if (action === "getOrders") {
                // 주문 내역 조회
                const [orders] = await db.query(
                    "SELECT order_id, order_date, order_status, order_name FROM orders WHERE email = ? ORDER BY order_id DESC",
                    [email]
                );
                return res.json({ orders });
            } else if (action === "deleteMember") {
                try {
                    const { email } = req.body;
                    if (!email) {
                        return res
                            .status(400)
                            .json({ error: "탈퇴 처리할 이메일이 없습니다." });
                    }

                    console.log(`탈퇴 요청 이메일: ${email}`); // 디버깅 로그

                    // 고객 ID 조회
                    const [customer] = await db.query(
                        "SELECT customer_id FROM customers WHERE email = ?",
                        [email]
                    );
                    if (!customer.length) {
                        return res.status(404).json({
                            error: "해당 이메일의 회원 정보를 찾을 수 없습니다.",
                        });
                    }

                    const customer_id = customer[0].customer_id;
                    console.log(`고객 ID 확인: ${customer_id}`); // 디버깅 로그

                    // 고객 정보 이동 -- 탈퇴 고객 DB로 복사
                    const insertQuery = `
                        INSERT INTO deleted_customers (
                            customer_id, customer_name, email, contact_number, gender, birthdate, 
                            required_agree, optional_agree, zip, roadname_address, 
                            building_name, detail_address, join_date, deleted_date, status
                        )
                        SELECT customer_id, customer_name, email, contact_number, gender, birthdate, 
                               required_agree, optional_agree, zip, roadname_address, 
                               building_name, detail_address, join_date, NOW(), '탈퇴'
                        FROM customers
                        WHERE customer_id = ?`;
                    const [insertResult] = await db.query(insertQuery, [
                        customer_id,
                    ]);
                    console.log(
                        `deleted_customers 삽입 결과: ${insertResult.affectedRows}`
                    ); // 디버깅 로그

                    if (insertResult.affectedRows === 0) {
                        return res
                            .status(500)
                            .json({ error: "탈퇴 고객 데이터 이동 실패." });
                    }

                    // auth 테이블에서 삭제
                    const deleteAuthQuery =
                        "DELETE FROM auth WHERE customer_id = ?";
                    const [deleteAuthResult] = await db.query(deleteAuthQuery, [
                        customer_id,
                    ]);
                    console.log(
                        `auth 삭제 결과: ${deleteAuthResult.affectedRows}`
                    ); // 디버깅 로그

                    // customer 테이블에서 삭제
                    const deleteCustomerQuery =
                        "DELETE FROM customers WHERE customer_id = ?";
                    const [deleteCustomerResult] = await db.query(
                        deleteCustomerQuery,
                        [customer_id]
                    );
                    console.log(
                        `customers 삭제 결과: ${deleteCustomerResult.affectedRows}`
                    ); // 디버깅 로그

                    if (
                        deleteAuthResult.affectedRows === 0 ||
                        deleteCustomerResult.affectedRows === 0
                    ) {
                        return res
                            .status(500)
                            .json({ error: "회원 데이터 삭제 실패." });
                    }

                    res.json({
                        success: true,
                        message: "회원 탈퇴가 완료되었습니다.",
                    });
                } catch (err) {
                    console.error("회원 탈퇴 오류:", err); // 에러 로그
                    return res.status(500).json({
                        error: "탈퇴 진행 중 서버 오류가 발생했습니다.",
                    });
                }
            } else {
                return res
                    .status(400)
                    .json({ error: "유효하지 않은 action 값입니다." });
            }
        } catch (error) {
            console.error("오류 발생:", error.message);
            return res.status(500).json({ error: error.message });
        }
    });

    router.post("/cancelOrder/:orderId", async (req, res) => {
        const { orderId } = req.params;

        try {
            // 주문 상태를 '취소됨'으로 업데이트
            const [result] = await db.execute(
                "UPDATE orders SET status_date = sysdate(), order_status = ? WHERE order_id = ?",
                ["취소", orderId]
            );

            if (result.affectedRows === 0) {
                return res
                    .status(404)
                    .json({ message: "주문을 찾을 수 없습니다." });
            }

            res.status(200).json({ message: "주문이 취소되었습니다." });
        } catch (err) {
            res.status(500).json({
                message: "서버 오류로 주문을 취소할 수 없습니다.",
            });
        }
    });

    return router;
};
