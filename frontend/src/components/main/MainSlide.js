// import Swiper core and required modules
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import '../../scss/main/mainslide.scss';
import { Link } from 'react-router-dom';

function MainSlide(props) {
    return (
        <div className="mainSlide">
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 3000, // 3초마다 슬라이드 전환
                    disableOnInteraction: false, // 사용자 상호작용 후에도 자동재생 계속
                }}
                loop={true} // 슬라이드를 무한 반복
                onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide>
                    <Link to={'/bath-body'}>
                        <div className="slide-ftitle">행복한 홀리데이를 위해</div>
                        <div className="slide-ftext">배스 앤 바디 보기</div>
                        <img src={`/imgs/main/main_slide2.jpg`} alt="Slide 2" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/product/45'}>
                        <div className="slide-title">히노키 앤 시더우드</div>
                        <div className="slide-text">더 알아보기</div>
                        <img src={`/imgs/main/main_slide1.avif`} alt="Slide 1" />
                    </Link>
                </SwiperSlide>
                <SwiperSlide>
                    <Link to={'/best-seller'}>
                        <div className="slide-title">베스트셀러</div>
                        <div className="slide-text">자세히 보기</div>
                        <img src={`/imgs/main/main_slide3.jpg`} alt="Slide 3" />
                    </Link>
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default MainSlide;
