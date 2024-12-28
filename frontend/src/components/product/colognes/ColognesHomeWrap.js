import React from 'react';
import { Outlet } from 'react-router-dom';
import ColognesHomeTop from './ColognesHomeTop';

const ColognesHomeWrap = () => {
    return (
        <div>
            <ColognesHomeTop />
            <Outlet />
        </div>
    );
};

export default ColognesHomeWrap;
