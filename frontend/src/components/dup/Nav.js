import React, { useState } from 'react';
import HamburgerMenu from './menu/HamburgerMenu';
import DefaultMenu from './menu/DefaultMenu';

function Nav({ ham, setHam }) {
    const [subMenu, setSubmenu] = useState([]);

    const hideMenu = () => {
        setHam(0);
        setSubmenu([]); // 모든 서브 메뉴 닫힘 상태로 초기화
    };

    const toggleSubMenu = (index, e) => {
        e.stopPropagation();
        setSubmenu((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    return (
        <div>
            {/* 햄버거 메뉴 */}
            <HamburgerMenu ham={ham} hideMenu={hideMenu} subMenu={subMenu} toggleSubMenu={toggleSubMenu} />
            {/* 기본 메뉴 */}
            <DefaultMenu />
        </div>
    );
}

export default Nav;
