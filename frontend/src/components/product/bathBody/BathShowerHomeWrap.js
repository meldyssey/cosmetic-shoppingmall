import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductNav from "../ProductNav";
import axios from "axios";
import ProductCard from "../ProductCard";
import BathShowerTotal from "./BathShowerTotal";
import BathShowerHomeTop from "./BathShowerHomeTop";
import BodyHandWash from "./BodyHandWash";
import ShowerGelOil from "./ShowerGelOil";
import BathOil from "./BathOil";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const BathShowerHomeWrap = () => {
    const { product_category_thr } = useParams();

    const [comp, setComp] = useState(null);
    const [bathShower, setBathShower] = useState([]);
    const prod = useSelector((state) => state.prod.data);

    
    useEffect(() => {
        console.log(product_category_thr);
        if (!product_category_thr) {
            setComp(<BathShowerTotal />);
        }
        if (product_category_thr == `body-hand-wash`) {
            setComp(<BodyHandWash />);
        }
        if (product_category_thr == `shower-gel-oil`) {
            setComp(<ShowerGelOil />);
        }
        if (product_category_thr == `bath-oil`) {
            setComp(<BathOil />);
        }

        setBathShower(
            prod.filter((item) => {
                if (product_category_thr) {
                    return (
                        item.product_category_two == `bath-shower` &&
                        item.product_category_thr == `${product_category_thr}`
                    );
                } else {
                    return item.product_category_two == `bath-shower`;
                }
            })
        );
    }, [product_category_thr]);
    return (
        <div>
            <BathShowerHomeTop />
            <ProductNav
                navInfo={[
                    { url: "/bath-body/bath-shower", title: "전체" },
                    {
                        url: "/bath-body/bath-shower/body-hand-wash",
                        title: "바디 앤 핸드워시",
                    },
                    {
                        url: "/bath-body/bath-shower/shower-gel-oil",
                        title: "샤워 젤 앤 오일",
                    },
                    {
                        url: "/bath-body/bath-shower/bath-oil",
                        title: "배스 오일",
                    },
                ]}
            />
            {comp}
            <ProductCard product={bathShower} />
        </div>
    );
};

export default BathShowerHomeWrap;
