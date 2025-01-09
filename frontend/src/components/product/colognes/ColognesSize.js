import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import ProductNav from "../ProductNav";
import ProductCard from "../ProductCard";
// import axios from "axios";
import ColognesAll from "./ColognesAll";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const ColognesSize = () => {
    const { product_volume } = useParams();

    const curPath = window.location.pathname;
    const [colognes, setColognes] = useState([]);
    const prod = useSelector((state) => state.prod.data);

    useEffect(() => {
        setColognes(
            prod.filter((item) => {
                if (product_volume) {
                    return (
                        item.product_category_one == `cologne` &&
                        item.product_volume == `${product_volume}`
                    );
                } else {
                    return item.product_category_one == `cologne`;
                }
            })
        );
    }, [product_volume]);
    return (
        <div>
            <ProductNav
                navInfo={[
                    { url: "/colognes/size", title: "전체" },
                    { url: "/colognes/size/100ml", title: "100ml" },
                    { url: "/colognes/size/50ml", title: "50ml" },
                    { url: "/colognes/size/30ml", title: "30ml" },
                ]}
            />
            <ColognesAll />
            <Outlet />
            <ProductCard product={colognes} />
        </div>
    );
};

export default ColognesSize;
