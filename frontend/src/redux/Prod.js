import { GET_PROD_FAIL, GET_PROD_START, GET_PROD_SUCCESS } from "./MyAction";

// prod
const initialState = {
    loading: false,
    data: [],
    error: null,
};

export default function prod(state = initialState, action) {
    switch (action.type) {
        case GET_PROD_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case GET_PROD_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.data,
            };

        case GET_PROD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
}
