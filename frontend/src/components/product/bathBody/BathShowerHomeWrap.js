import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductNav from '../ProductNav';
import axios from 'axios';
import ProductCard from '../ProductCard';
import BathShowerTotal from './BathShowerTotal';
import BathShowerHomeTop from './BathShowerHomeTop';
import BodyHandWash from './BodyHandWash';
import ShowerGelOil from './ShowerGelOil';
import BathOil from './BathOil';

const bkURL = process.env.REACT_APP_BACK_URL;

const BathShowerHomeWrap = () => {
    const { product_category_thr } = useParams();

    const [comp, setComp] = useState(null);
    const [bathShower, setBathShower] = useState([]);

    const colognesGetAxios = () => {
        console.log('product_category_thr : ', product_category_thr);

        axios
            .get(`${bkURL}/product/bath-body/bath-shower`)
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

                if (product_category_thr) {
                    curProduct = res.data.filter((item) => item.product_category_thr == `${product_category_thr}`);
                }
                setBathShower(curProduct);
            })
            .catch((err) => {
                console.error('에러발생 ; ', err);
            });
    };
    useEffect(() => {
        colognesGetAxios();
        console.log(bathShower);
        window.scrollTo(0, 0);
    }, [product_category_thr]);

    console.log(product_category_thr);
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
    }, [product_category_thr]);
    return (
        <div>
            <BathShowerHomeTop />
            <ProductNav
                navInfo={[
                    { url: '/bath-body/bath-shower', title: '전체' },
                    {
                        url: '/bath-body/bath-shower/body-hand-wash',
                        title: '바디 앤 핸드워시',
                    },
                    {
                        url: '/bath-body/bath-shower/shower-gel-oil',
                        title: '샤워 젤 앤 오일',
                    },
                    {
                        url: '/bath-body/bath-shower/bath-oil',
                        title: '배스 오일',
                    },
                ]}
            />
            {comp}
            <ProductCard product={bathShower} />
        </div>
    );
};

export default BathShowerHomeWrap;
