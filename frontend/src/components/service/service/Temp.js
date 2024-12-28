import React from 'react';
import { Outlet } from 'react-router-dom';
import TopMenu from './TopMenu';

const Temp = () => {
    return (
        <div>
            <TopMenu />
            <Outlet />
        </div>
    );
};

export default Temp;
