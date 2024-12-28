import Home from "./components/main/Home";
import Header from "./components/dup/Header";
import Nav from "./components/dup/Nav";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import Product from "./Product";
import Services from "./Services";
import Map from "./components/dup/Map";
import Basket from "./components/order/Basket";
import Payment1 from "./components/order/Payment1";
import Payment2 from "./components/order/Payment2";
import Payment3 from "./components/order/Payment3";
import Mypage from "./Mypage";
import Footer from "./components/dup/Footer";
import Admin from "./components/admin/Admin";
import ScrollToTop from "./components/dup/ScrollToTop";

function AdminChk() {
    const email = sessionStorage.getItem("email");
    const customerName = sessionStorage.getItem("customerName");
    // 홈으로 이동
    if (email === "admin@jomalone.kr" && customerName === "관리자") {
        return <Admin />;
    } else {
        console.log("일반 고객이므로 어드민 접근불가");
        return <></>;
    }
}
function AppContent() {
    const [ham, setHam] = useState(0);

    // 현재 경로를 확인하여 `/admin` 경로일 때만 헤더와 푸터를 숨김 처리
    const location = useLocation();
    const isAdminPath = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdminPath && (
                <>
                    <Header ham={ham} setHam={setHam} />
                    <Nav ham={ham} setHam={setHam} />
                </>
            )}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/payment1" element={<Payment1 />} />
                <Route path="/payment2" element={<Payment2 />} />
                <Route path="/payment3" element={<Payment3 />} />
            </Routes>
            <Product />
            <Services />
            <Mypage />

            {!isAdminPath && <Footer />}
            <AdminChk />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AppContent />
        </BrowserRouter>
    );
}

export default App;
