import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CandleHomeTop from "./CandleHomeTop";
import ProductNav from "../ProductNav";
// import axios from "axios";
import ProductCard from "../ProductCard";
import CandleTotal from "./CandleTotal";
import Citrus from "../Citrus";
import Floral from "../Floral";
import Fruity from "../Fruity";
import LightFloral from "../LightFloral";
import Woody from "../Woody";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const CandleHomeWrap = () => {
    const { product_scent } = useParams();

    const [comp, setComp] = useState(null);
    const [candles, setCandles] = useState([]);
    const prod = useSelector((state) => state.prod.data);

    useEffect(() => {
        if (!product_scent) {
            setComp(<CandleTotal />);
        }
        if (product_scent == `citrus`) {
            setComp(<Citrus />);
        }
        if (product_scent == `floral`) {
            setComp(<Floral />);
        }
        if (product_scent == `fruity`) {
            setComp(<Fruity />);
        }
        if (product_scent == `light-floral`) {
            setComp(<LightFloral />);
        }
        if (product_scent == `woody`) {
            setComp(<Woody />);
        }

        setCandles(
            prod.filter((item) => {
                if (product_scent) {
                    return (
                        item.product_category_two == `candle` &&
                        item.product_scent == `${product_scent}`
                    );
                } else {
                    return item.product_category_two == `candle`;
                }
            })
        );
    }, [product_scent]);

    return (
        <div>
            <CandleHomeTop />
            <ProductNav
                navInfo={[
                    { url: "/home-scents/candles", title: "전체" },
                    { url: "/home-scents/candles/citrus", title: "시트러스" },
                    { url: "/home-scents/candles/fruity", title: "프루티" },
                    {
                        url: "/home-scents/candles/light-floral",
                        title: "라이트 플로랄",
                    },
                    { url: "/home-scents/candles/floral", title: "플로랄" },
                    { url: "/home-scents/candles/woody", title: "우디" },
                ]}
            />
            {comp}
            <ProductCard product={candles} />
        </div>
    );
};

export default CandleHomeWrap;
