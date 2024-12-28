import { Routes, Route } from 'react-router-dom';

//고객 서비스 및 이용약관 
import Faq from './components/service/service/Faq';
import MyProfile from './components/service/service/MyProfile';
import MyOrder from './components/service/service/MyOrder';
import Delivery from './components/service/service/Delivery';
import ExchangeRefund from './components/service/service/ExchangeRefund';
import OnlineShopping from './components/service/service/OnlineShopping';
import Terms from './components/service/service/Terms';
import Temp from './components/service/service/Temp';

//스토리
import StoryMain from './components/service/story/StoryMain';
import CharityMission from './components/service/story/CharityMission';
import Sustainable from './components/service/story/Sustainable';
import PeopleWorkplace from './components/service/story/PeopleWorkplace';

//일대일문의
import OneToOne from './components/service/IldaeIl/OneToOne';
import OneToOneMain from './components/service/IldaeIl/OneToOneMain';

//리뷰
import Review from './components/service/review/Review';
import ReviewList from './components/service/review/ReviewList';

//관리자 페이제 리뷰
import AReviewList from './components/admin/service/AReviewList';
import AReviewDetail from './components/admin/service/AReviewDetail';

function Services() {
    return (
        <Routes>
            <Route path="/info" element={<Temp />}>
                <Route path="faq" element={<Faq />} />
                <Route path="myprofile" element={<MyProfile />} />
                <Route path="myorder" element={<MyOrder />} />
                <Route path="delivery" element={<Delivery />} />
                <Route path="excahngerefund" element={<ExchangeRefund />} />
                <Route path="onlineshopping" element={<OnlineShopping />} />
                <Route path="terms" element={<Terms />} />
            </Route>

            {/* Story 관련 라우트 */}
            <Route path="/storymain" element={<StoryMain />} />
            <Route path="/chartiymission" element={<CharityMission />} />
            <Route path="/sustainable" element={<Sustainable />} />
            <Route path="/peopleworkplace" element={<PeopleWorkplace />} />

            {/* 일대일문의 */}
            <Route path="/onetoone" element={<OneToOne />} />
            <Route path="/onetoonelist" element={<OneToOneMain />} />
         
            {/* 리뷰 */}
            <Route path="/review/:product_opt_id" element={<Review />} />
            <Route path="/review/:product_opt_id" element={<ReviewList />} />
            <Route path="/areviewlist" element={<AReviewList />} />
            <Route path="/areviewdetail/:id" element={<AReviewDetail />} />
        </Routes>
    );
}

export default Services;
