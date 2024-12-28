import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../scss/product/productNav.module.scss';

const ProductNav = ({ navInfo }) => {
    console.log(navInfo);
    console.log(window.location.pathname);

    return (
        <ul className={styles.productNav}>
            {navInfo.map((info, i) => {
                return (
                    <li>
                        <Link className={window.location.pathname == info.url ? styles.active : ''} to={info.url}>
                            {info.title}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default ProductNav;
