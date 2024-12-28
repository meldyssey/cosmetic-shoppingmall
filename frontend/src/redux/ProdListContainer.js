import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProdFail, getProdStart, getProdSuccess } from "./MyAction";
import AllProductNew from "../components/product/AllProductNew";
import axios from "axios";

const bkURL = process.env.REACT_APP_BACK_URL;

export default function ProdListContainer() {
    // store에서 데이터를 가져오는 경우
    const prod = useSelector((state) => state.prod.data);

    // store에 데이터를 넣거나, 수정
    const dispatch = useDispatch();

    const getProd = useCallback(async () => {
        dispatch(getProdStart());
        try {
            const res = await axios.get(`${bkURL}/product`);
            console.log("서버 다녀옴", res.data);
            dispatch(getProdSuccess(res.data));
        } catch (error) {
            console.error("Axios 에러 발생:", error);
            dispatch(getProdFail(error));
        }
    }, [dispatch]);

    // console.log("Fail is a function:", typeof fail);

    // 컴포넌트 출력, props 전달
    return <AllProductNew prod={prod} getProd={getProd} />;
}
