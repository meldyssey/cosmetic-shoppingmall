import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductNav from '../ProductNav';
import axios from 'axios';
import ProductCard from '../ProductCard';
import DiffuserHomeTop from './DiffuserHomeTop';
import Citrus from '../Citrus';
import Floral from '../Floral';
import Fruity from '../Fruity';
import LightFloral from '../LightFloral';
import Woody from '../Woody';
import DiffuserTotal from './DiffuserTotal';

const bkURL = process.env.REACT_APP_BACK_URL;

const DiffuserHomeWrap = () => {
    const { product_scent } = useParams();

    const [comp, setComp] = useState(null);
    const [diffusers, setDiffusers] = useState([]);

    const colognesGetAxios = () => {
        console.log('product_scent : ', product_scent);

        axios
            .get(`${bkURL}/product/home-scents/diffusers`)
            .then((res) => {
                // console.log("서버 다녀옴", res.data);
                // console.log(product_scent);
                // console.log(curPath); // "/path"

                // console.log(
                //     res.data.filter((item) => {
                //         item.product_volume == "100ml";
                //         item.product_scent == `${product_scent}`;
                //     })
                // );
                let curProduct = res.data;
                console.log(curProduct);

                if (product_scent) {
                    curProduct = res.data.filter((item) => item.product_scent == `${product_scent}`);
                }
                setDiffusers(curProduct);
            })
            .catch((err) => {
                console.error('에러발생 ; ', err);
            });
    };
    useEffect(() => {
        colognesGetAxios();
        console.log(diffusers);
    }, [product_scent]);

    console.log(product_scent);
    useEffect(() => {
        console.log(comp);
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
    }, [product_scent]);
    return (
        <div>
            <DiffuserHomeTop />
            <ProductNav
                navInfo={[
                    { url: '/home-scents/diffusers', title: '전체' },
                    { url: '/home-scents/diffusers/citrus', title: '시트러스' },
                    { url: '/home-scents/diffusers/fruity', title: '프루티' },
                    {
                        url: '/home-scents/diffusers/light-floral',
                        title: '라이트 플로랄',
                    },
                    { url: '/home-scents/diffusers/floral', title: '플로랄' },
                    { url: '/home-scents/diffusers/woody', title: '우디' },
                ]}
            />
            {comp}
            <ProductCard product={diffusers} />
        </div>
    );
};

export default DiffuserHomeWrap;
