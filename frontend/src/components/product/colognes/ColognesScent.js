import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import axios from "axios";

import ProductNav from "../ProductNav";
import ColognesTotal from "./ColognesTotal";
import ProductCard from "../ProductCard";
import Citrus from "../Citrus";
import Floral from "../Floral";
import Fruity from "../Fruity";
import LightFloral from "../LightFloral";
import Woody from "../Woody";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const ColognesScent = () => {
    const { product_scent } = useParams();

    const [comp, setComp] = useState(null);
    const [colognes, setColognes] = useState([]);
    const prod = useSelector((state) => state.prod.data);

    useEffect(() => {
        if (!product_scent) {
            setComp(<ColognesTotal />);
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
        setColognes(
            prod.filter((item) => {
                if (product_scent) {
                    return (
                        item.product_category_one == `cologne` &&
                        item.product_scent == `${product_scent}` &&
                        item.product_volume == "100ml"
                    );
                } else {
                    return (
                        item.product_category_one == `cologne` &&
                        item.product_volume == "100ml"
                    );
                }
            })
        );
    }, [product_scent]);
    return (
        <div>
            <ProductNav
                navInfo={[
                    { url: "/colognes", title: "전체" },
                    { url: "/colognes/citrus", title: "시트러스" },
                    { url: "/colognes/fruity", title: "프루티" },
                    { url: "/colognes/light-floral", title: "라이트 플로랄" },
                    { url: "/colognes/floral", title: "플로랄" },
                    { url: "/colognes/woody", title: "우디" },
                ]}
            />
            {comp}
            <ProductCard product={colognes} />
        </div>
    );
};

export default ColognesScent;
