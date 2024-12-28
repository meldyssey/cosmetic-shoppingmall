import React from 'react';
import styles from '../../../scss/member/SearchBar.module.scss';

function SearchBar({ searchType, setSearchType, searchValue, setSearchValue, sortOrder, setSortOrder, onSearch, onReset, options }) {
    return (
        <div className={styles.searchbar}>
            <select value={searchType} onChange={e => setSearchType(e.target.value)}>
                <option value="">검색 기준 선택</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>

            {/* 검색 타입에 따라 필드 동적으로 렌더링 */}
            {searchType !== 'join_date' && searchType !== 'deleted_date' && <input type="text" placeholder="검색어 입력" value={searchValue} onChange={e => setSearchValue(e.target.value)} />}

            {searchType === 'join_date' && (
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="asc">오래된 가입일 순</option>
                    <option value="desc">최근 가입일 순</option>
                </select>
            )}

            {searchType === 'deleted_date' && (
                <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                    <option value="asc">오래된 탈퇴일 순</option>
                    <option value="desc">최근 탈퇴일 순</option>
                </select>
            )}

            <div className={styles.actionButtons}>
                <button className={styles.searchbutton} onClick={onSearch}>
                    검색
                </button>
                <button className={styles.resetbutton} onClick={onReset}>
                    초기화
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
