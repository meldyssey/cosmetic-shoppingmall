import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNav from "../ProductNav";
// import axios from "axios";
import ProductCard from "../ProductCard";
import BodyCareTotal from "./BodyCareTotal";
import BodyCareHomeTop from "./BodyCareHomeTop";
import BodyCream from "./BodyCream";
import BodyHandLotion from "./BodyHandLotion";
import BodyMist from "./BodyMist";
import HandCream from "./HandCream";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const BodyCareHomeWrap = () => {
    const { product_category_thr } = useParams();

    const [comp, setComp] = useState(null);
    const [bodyCare, setBodyCare] = useState([]);
    const prod = useSelector((state) => state.prod.data);

    
    useEffect(() => {
        console.log(comp);
        if (!product_category_thr) {
            setComp(<BodyCareTotal />);
        }
        if (product_category_thr == `body-cream`) {
            setComp(<BodyCream />);
        }
        if (product_category_thr == `body-hand-lotion`) {
            setComp(<BodyHandLotion />);
        }
        if (product_category_thr == `body-mist`) {
            setComp(<BodyMist />);
        }
        if (product_category_thr == `hand-cream`) {
            setComp(<HandCream />);
        }
        setBodyCare(
            prod.filter((item) => {
                if (product_category_thr) {
                    return (
                        item.product_category_two == `body-care` &&
                        item.product_category_thr == `${product_category_thr}`
                    );
                } else {
                    return item.product_category_two == `body-care`;
                }
            })
        );
    }, [product_category_thr]);
    return (
        <div>
            <BodyCareHomeTop />
            <ProductNav
                navInfo={[
                    { url: "/bath-body/body-care", title: "전체" },
                    {
                        url: "/bath-body/body-care/body-cream",
                        title: "바디 크림",
                    },
                    {
                        url: "/bath-body/body-care/body-hand-lotion",
                        title: "바디 앤 핸드 로션",
                    },
                    {
                        url: "/bath-body/body-care/body-mist",
                        title: "바디 미스트",
                    },
                    {
                        url: "/bath-body/body-care/hand-cream",
                        title: "핸드 크림",
                    },
                ]}
            />
            {comp}
            <ProductCard product={bodyCare} />
        </div>
    );
};

export default BodyCareHomeWrap;
