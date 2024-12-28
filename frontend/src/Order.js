import { Routes, Route } from 'react-router-dom';
import Basket from './components/order/Basket';

function Order() {
    return (
        <Routes>
            <Route path="/basket/:id" element={<Basket />} />
        </Routes>
    );
}

export default Order;
