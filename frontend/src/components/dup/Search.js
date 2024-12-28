import React, { useEffect, useState } from 'react';
import styles from '../../scss/dup/search.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../product/ProductCard.js';

const Search = () => {
    const [product, setProduct] = useState([]);
    const [text, setText] = useState('');
    const searchGo = (me) => {
        me.preventDefault();
        console.log('submitGo 진입');
        const frmData = new FormData(document.myFrm);
        console.log(frmData);
        const data = Object.fromEntries(frmData);
        console.log(data);

        Object.keys(data).forEach((key) => {
            if (data[key] === '') {
                data[key] = null;
            }
        });

        if (!data.text) {
            alert('검색할 단어를 입력해 주세요.');
            return;
        }

        axios
            .post(`http://localhost:5001/product/search`, data)
            .then((res) => {
                console.log('검색 완료');

                setProduct(res.data);
                setText('해당하는 제품이 존재하지 않습니다.');
            })
            .catch((err) => {
                console.error('에러발생 ; ', err);
            });
    };
    useEffect(() => {
        console.log('ProductCard 동작');
    }, [product]);

    return (
        <div className={styles.search}>
            <form name="myFrm">
                <select name="product_category_one" id="category">
                    <option value="">전체</option>
                    <option value="cologne">코롱</option>
                    <option value="home-scents">홈 프레그런스</option>
                    <option value="bath-body">배스 앤 바디</option>
                </select>
                <input type="text" placeholder="찾으시는 상품을 입력하여 주세요." name="text" />
                <button onClick={searchGo}>검색</button>
            </form>
            <div className={styles.defContent}>
                <p>도움이 필요하세요?</p>
                <Link to="/best-seller">베스트 셀러</Link>
                <Link to="/colognes">코롱</Link>
                <Link to="/home-scents">홈 프레그런스</Link>
                <Link to="/bath-body">배스 앤 바디</Link>
            </div>
            {product[0] ? <ProductCard product={product} /> : <div className={styles.notice}>{text}</div>}
        </div>
    );
};

export default Search;
