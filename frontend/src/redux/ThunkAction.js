import axios from "axios";
import { getProdFail, getProdStart, getProdSuccess } from "./MyAction";

const bkURL = process.env.REACT_APP_BACK_URL;

export function getProdThunk() {
    return async (dispatch) => {
        console.log("Thunk 실행");

        try {
            dispatch(getProdStart());
            const res = await axios.get(`${bkURL}/product`);
            console.log("서버 다녀옴", res.data);
            dispatch(getProdSuccess(res.data));
        } catch (error) {
            console.error("Axios 에러 발생:", error);
            dispatch(getProdFail(error));
        }
    };
}
