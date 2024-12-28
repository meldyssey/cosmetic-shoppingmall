// Types
export const GET_PROD_START = "GET_PROD_START"; // 호출 시작
export const GET_PROD_SUCCESS = "GET_PROD_SUCCESS"; // 추출 성공
export const GET_PROD_FAIL = "GET_PROD_FAIL"; // 추출 실패

// ActionCreator
// Success와 Fail의 경우 액션생성시 data, error를 받아 Action을 생성하고 reducer로 넣어 prod라는 묶음으로 묶어 store의 state를 변경함
export function getProdStart() {
    return {
        type: GET_PROD_START,
    };
}

export function getProdSuccess(data) {
    return {
        type: GET_PROD_SUCCESS,
        data,
    };
}

export function getProdFail(error) {
    return {
        type: GET_PROD_FAIL,
        error,
    };
}
