import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import MyReducer from "./MyReducer";

// Redux DevTools 활성화를 위한 설정
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const MyStore = createStore(
    MyReducer,
    composeEnhancers(applyMiddleware(thunk))
);

export default MyStore;
