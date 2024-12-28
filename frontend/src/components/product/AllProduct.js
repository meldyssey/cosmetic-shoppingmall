import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../../scss/product/homeTop.module.scss";
import { Link } from "react-router-dom";
import Pagination from "../dup/Pagination";

const bkURL = process.env.REACT_APP_BACK_URL;

const AllProduct = ({ prod, getProd }) => {
    // pagination 추가
    const [curPage, setCurPage] = useState(1); // Current page
    const [itemsPerPage] = useState(12); // Items per page
    // Calculate the products for the current page
    const indexOfLastItem = curPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const curProducts = prod.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        getProd();
    }, [getProd]);
    return (
        <div>
            <div className={styles.homeTop}>
                <div className={styles.breadCrum}>
                    <Link to="/">홈</Link>
                    <span> &gt; </span>
                    <Link to="/all-product">전체 제품</Link>
                </div>
                <div>
                    <div className={styles.title}>전체 제품</div>
                    <div className={styles.content}>
                        <p>하루의 시작과 끝을 향기롭게 보내세요.</p>
                    </div>
                </div>
            </div>
            <ProductCard product={curProducts} />
            <Pagination
                totalItems={prod.length}
                itemsPerPage={itemsPerPage}
                pagesPerGroup={5}
                curPage={curPage}
                setCurPage={setCurPage}
            />
        </div>
    );
};

export default AllProduct;
