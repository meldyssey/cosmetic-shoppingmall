import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddressList from './components/mypage/AddressList';
import MyInfoTemp from './components/mypage/MyInfoTemp';
import MyInfo from './components/mypage/MyInfo';
import MyinfoEdit from './components/mypage/MyinfoEdit';
import ViewOrders from './components/mypage/ViewOrders';
import SignIn from './components/mypage/SignIn';
import SignUp from './components/mypage/SignUp';
import FindPw from './components/mypage/FindPw';
import OrderDetail from './components/mypage/OrderDetail';

function MyPage() {
    return (
        <Routes>
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/findPw" element={<FindPw />} />
            <Route path="/myPage" element={<MyInfoTemp />}>
                <Route path="" element={<MyInfo />} />
                <Route path="addressList" element={<AddressList />} />
                <Route path="myinfoEdit" element={<MyinfoEdit />} />
                <Route path="viewOrders" element={<ViewOrders />} />
                <Route path="orderDetail/:id" element={<OrderDetail />} />
            </Route>
        </Routes>
    );
}

export default MyPage;
