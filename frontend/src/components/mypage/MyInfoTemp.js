import React from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function MyInfoTemp(props) {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default MyInfoTemp;
