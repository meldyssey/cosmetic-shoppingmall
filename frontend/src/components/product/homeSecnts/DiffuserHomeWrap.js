import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNav from "../ProductNav";
import axios from "axios";
import ProductCard from "../ProductCard";
import DiffuserHomeTop from "./DiffuserHomeTop";
import Citrus from "../Citrus";
import Floral from "../Floral";
import Fruity from "../Fruity";
import LightFloral from "../LightFloral";
import Woody from "../Woody";
import DiffuserTotal from "./DiffuserTotal";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const DiffuserHomeWrap = () => {
    const { product_scent } = useParams();

    const [comp, setComp] = useState(null);
    const [diffusers, setDiffusers] = useState([]);
    const prod = useSelector((state) => state.prod.data);
    useEffect(() => {
        if (!product_scent) {
            setComp(<DiffuserTotal />);
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
        setDiffusers(
            prod.filter((item) => {
                if (product_scent) {
                    return (
                        item.product_category_two == `diffuser` &&
                        item.product_scent == `${product_scent}`
                    );
                } else {
                    return item.product_category_two == `diffuser`;
                }
            })
        );
    }, [product_scent]);
    return (
        <div>
            <DiffuserHomeTop />
            <ProductNav
                navInfo={[
                    { url: "/home-scents/diffusers", title: "전체" },
                    { url: "/home-scents/diffusers/citrus", title: "시트러스" },
                    { url: "/home-scents/diffusers/fruity", title: "프루티" },
                    {
                        url: "/home-scents/diffusers/light-floral",
                        title: "라이트 플로랄",
                    },
                    { url: "/home-scents/diffusers/floral", title: "플로랄" },
                    { url: "/home-scents/diffusers/woody", title: "우디" },
                ]}
            />
            {comp}
            <ProductCard product={diffusers} />
        </div>
    );
};

export default DiffuserHomeWrap;
