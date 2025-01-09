import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from '../../scss/dup/map.module.scss';

function Map(props) {
    const [text, setText] = useState('');
    const [showMap, setShowMap] = useState(false);

    const handleCurrentLocation = () => {
        const location = '서울특별시 강남구';
        setText(location);
    };

    const handleSearch = () => {
        if (text.trim() === '') {
            alert('검색어를 입력해 주세요!');
        } else {
            setShowMap(true);
        }
    };

    const handleChange = (e) => {
        setText(e.target.value);
        setShowMap(false);
    };

    useEffect(() => {}, []);
    return (
        <div className={styles.map}>
            <div className={styles.topDir}>
                <ol>
                    <li>
                        <Link to="/">홈</Link>
                    </li>
                    <p>&gt;</p>
                    <li>
                        <Link to="/map">매장 안내</Link>
                    </li>
                </ol>
            </div>
            <main>
                <form onSubmit={(e) => e.preventDefault()}>
                    <button type="button" className="place" onClick={handleCurrentLocation}>
                        현재 위치에서 찾기
                    </button>
                    <input
                        type="search"
                        placeholder="현재 위치에서 찾기 클릭 또는 도로명으로 검색"
                        value={text}
                        onChange={handleChange}
                    />
                    <button type="button" className={styles.searchBtn} onClick={handleSearch}>
                        검색
                    </button>
                </form>
                {showMap && (
                    <div className={styles.mapImg}>
                        <img src="/imgs/main/map.png" alt="매장 위치 지도" />
                    </div>
                )}
            </main>
        </div>
    );
}

export default Map;
