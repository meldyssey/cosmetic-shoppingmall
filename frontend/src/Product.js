import { Routes, Route } from "react-router-dom";

import ColognesHomeWrap from "./components/product/colognes/ColognesHomeWrap";
import DetailWrap from "./components/product/productDetail/DetailWrap";

import HomeSecntsHomeWrap from "./components/product/homeSecnts/HomeSecntsHomeWrap";
import HomeSecntsTotal from "./components/product/homeSecnts/HomeSecntsTotal";
import CandleHomeWrap from "./components/product/homeSecnts/CandleHomeWrap";

import ColognesScent from "./components/product/colognes/ColognesScent";
import ColognesSize from "./components/product/colognes/ColognesSize";
import DiffuserHomeWrap from "./components/product/homeSecnts/DiffuserHomeWrap";
import BathBodyHomeWrap from "./components/product/bathBody/BathBodyHomeWrap";
import BathBodyTotal from "./components/product/bathBody/BathBodyTotal";
import BathShowerHomeWrap from "./components/product/bathBody/BathShowerHomeWrap";
import BodyCareHomeWrap from "./components/product/bathBody/BodyCareHomeWrap";
import Search from "./components/dup/Search";
import BestSeller from "./components/product/BestSeller";
import AllProduct from "./components/product/AllProduct";
import ScentFinder from "./components/dup/ScentFinder";
import ProdListContainer from "./components/product/ProdListContainer";

function Product() {
    return (
        <Routes>
            <Route path="/colognes" element={<ColognesHomeWrap />}>
                <Route path="" element={<ColognesScent />} />
                <Route path=":product_scent" element={<ColognesScent />} />
                <Route path="size" element={<ColognesSize />} />
                <Route path="size/:product_volume" element={<ColognesSize />} />
            </Route>
            <Route path="/home-scents" element={<HomeSecntsHomeWrap />}>
                <Route path="" element={<HomeSecntsTotal />} />
                <Route path="candles" element={<CandleHomeWrap />} />
                <Route
                    path="candles/:product_scent"
                    element={<CandleHomeWrap />}
                />
                <Route path="diffusers" element={<DiffuserHomeWrap />} />
                <Route
                    path="diffusers/:product_scent"
                    element={<DiffuserHomeWrap />}
                />
            </Route>
            <Route path="/bath-body" element={<BathBodyHomeWrap />}>
                <Route path="" element={<BathBodyTotal />} />
                <Route path="bath-shower" element={<BathShowerHomeWrap />} />
                <Route
                    path="bath-shower/:product_category_thr"
                    element={<BathShowerHomeWrap />}
                />
                <Route path="body-care" element={<BodyCareHomeWrap />} />
                <Route
                    path="body-care/:product_category_thr"
                    element={<BodyCareHomeWrap />}
                />
            </Route>
            <Route path="/product/:product_opt_id" element={<DetailWrap />} />
            <Route path="/search" element={<Search />} />
            <Route path="/best-seller" element={<BestSeller />} />
            <Route path="/all-product" element={<ProdListContainer />} />
            <Route path="/scent-finder" element={<ScentFinder />} />
        </Routes>
    );
}

export default Product;
