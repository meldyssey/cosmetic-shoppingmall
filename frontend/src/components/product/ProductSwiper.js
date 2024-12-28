import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/scss';
import 'swiper/scss/pagination';
import 'swiper/scss/navigation';
import '../../scss/product/swiperStyles.scss';
// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

const bkURL = process.env.REACT_APP_BACK_URL;

export default function ProductSwiper({ product }) {
    const [curProduct, setCurProduct] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        console.log('ProductSwiper 동작');
        if (!product) {
            console.log(`상품이 없습니다`);
            return;
        }

        setCurProduct(product);
    }, [product]);
    const fileGo = (file) => {
        if (file) {
            return <img src={`${bkURL}/imgs/product/${file}`} />;
        }
        return null;
    };

    return (
        <div className="product">
            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
                breakpoints={{
                    480: {
                        slidesPerView: 2,
                    },
                    800: {
                        slidesPerView: 4,
                    },
                }}
            >
                {curProduct.map((prod, i) => {
                    return (
                        <SwiperSlide key={i}>
                            <div
                                onClick={() => {
                                    navigate(`/product/${prod.product_opt_id}`);
                                }}
                            >
                                {fileGo(prod.product_upSystem)}
                                <div className="product_special">{prod.product_special}</div>
                                <div>{prod.product_name_eng}</div>
                                <div>{prod.product_name_kor}</div>
                                <div>{prod.product_volume}</div>
                                <div>₩ {prod.product_price.toLocaleString()}</div>
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
