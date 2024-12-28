import React, { useState, useEffect } from 'react';
import '../../../scss/service/TopMenu.scss';
import { Link, useLocation } from 'react-router-dom';  // 현재 경로 확인(useLocation), 페이지 이동 버튼(Link)

const TopMenu = () => {
    const location = useLocation(); // 현재 경로 가져오기

    // 클릭된 메뉴를 저장하는 상태 (초기값은 빈 문자열)
    const [activeMenu, setActiveMenu] = useState(''); 

    // 메뉴를 클릭했을 때 실행되는 함수
    const handleMenuClick = (menuName) => {
        setActiveMenu(menuName); // 클릭된 메뉴 이름을 activeMenu에 저장
    };

    // URL이 변경될 때마다 active 상태를 자동으로 업데이트
    useEffect(() => {
        const path = location.pathname.replace(urlInfo, '');//// '/info/' 제거 후 남은 경로 저장
        setActiveMenu(path); // activeMenu를 현재 URL 경로로 업데이트
    }, [location.pathname]); // location.pathname이 바뀔 때마다 실행
 
 
    // URL에서 공통으로 제거할 경로
    const urlInfo = '/info/';




    return (
        <div className="wrapper">
            <div className="swrapper1">
                <div className={activeMenu === 'faq' ? 'active' : ''}
                    onClick={() => handleMenuClick('faq')}>
                    <Link to={`${urlInfo}faq`}>자주 묻는 질문</Link>
                </div>
                <div
                    className={activeMenu === 'myprofile' ? 'active' : ''}
                    onClick={() => handleMenuClick('myprofile')}
                >
                    <Link to={`${urlInfo}myprofile`}>나의 프로필</Link>
                </div>
                <div className={activeMenu === 'myorder' ? 'active' : ''}
                    onClick={() => handleMenuClick('myorder')}>
                    <Link to={`${urlInfo}myorder`}>나의 오더</Link>
                </div>
                <div className={activeMenu === 'delivery' ? 'active' : ''}
                    onClick={() => handleMenuClick('delivery')}>
                    <Link to={`${urlInfo}delivery`}>배송관련</Link>
                </div>

                <div
                    className={activeMenu === 'excahngerefund' ? 'active' : ''}
                    onClick={() => handleMenuClick('excahngerefund')}
                >
                    <Link to={`${urlInfo}excahngerefund`}>교환&환불</Link>
                </div>
                <div
                    className={activeMenu === 'onlineshopping' ? 'active' : ''}
                    onClick={() => handleMenuClick('onlineshopping')}
                >
                    <Link to={`${urlInfo}onlineshopping`}>온라인 쇼핑하기</Link>
                </div>
                <div className={activeMenu === 'terms' ? 'active' : ''}
                    onClick={() => handleMenuClick('terms')}>
                    <Link to={`${urlInfo}terms`}>이용약관 및 개인정보 처리방침</Link>
                </div>
            </div>
        </div>
    );
};

export default TopMenu;
