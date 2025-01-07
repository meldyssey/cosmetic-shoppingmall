import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../scss/dup/header.module.scss";

function Header({ ham, setHam }) {
    const navigate = useNavigate();

    // 세션토큰 사용
    const Loginchk = sessionStorage.getItem("sessionToken");
    const email = sessionStorage.getItem("email");

    const Loginbtn = () => {
        if (Loginchk) {
            navigate("/myPage"); // 로그인 상태면 마이페이지로 이동
        } else {
            navigate("/signIn"); // 아니면 로그인 페이지로 이동
        }
    };

    const LoginBsk = () => {
        if (Loginchk) {
            navigate("/basket"); // 로그인 상태면 장바구니로 이동
        } else {
            navigate("/signIn"); // 아니면 로그인 페이지로 이동
        }
    };

    const Adminbtn = () => {
        navigate("/admin"); // 관리자 페이지로 이동
    };

    const showHamMenu = (e) => {
        e.stopPropagation();
        setHam(!ham);
    };

    const url = "/imgs/main/";

    return (
        <header>
            <div className={styles.wrap}>
                <div className={styles.lefticonbox}>
                    <div className={styles.hamIcon} onClick={showHamMenu}>
                        <img src={`${url}menuIcon.svg`} alt="" />
                    </div>
                    <div
                        className={styles.searchIcon}
                        onClick={() => {
                            navigate("/search");
                        }}
                    >
                        <img src={`${url}searchIcon.svg`} alt="" />
                    </div>
                    <div className={styles.mapIcon}>
                        <Link to="/map">
                            <img src={`${url}mapIcon.svg`} alt="" />
                        </Link>
                    </div>
                </div>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={`${url}jomalonelogo.svg`} alt="" />
                    </Link>
                </div>
                <div className={styles.righticonbox}>
                    {/* 로그인 혹은 마이페이지 버튼 */}
                    {email ? (
                        email === "admin@jomalone.kr" ? (
                            <div className={styles.userLink} onClick={Adminbtn}>
                                <i className="fa-solid fa-user"></i>
                            </div>
                        ) : (
                            <div className={styles.userLink} onClick={Loginbtn}>
                                <i className="fa-solid fa-user"></i>
                            </div>
                        )
                    ) : (
                        <div className={styles.userLink} onClick={Loginbtn}>
                            <i className="fa-regular fa-user"></i>
                        </div>
                    )}
                    <div className={styles.basketIcon} onClick={LoginBsk}>
                        <img src={`${url}basketIcon.svg`} alt="" />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
