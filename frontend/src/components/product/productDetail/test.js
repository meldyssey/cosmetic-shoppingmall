{
    /* 별점 평가 */
}
<fieldset className={styles.rating}>
    <legend>고객 평점*</legend>
    <div className={styles.labelbox}>
        {[1, 2, 3, 4, 5].map((value) => (
            <label key={value} onClick={() => setRating(value)}>
                <input
                    type="radio"
                    name="rating"
                    value={value}
                    style={{ display: 'none' }} // 숨김 처리
                />
                <span className={styles.checkbox}>
                    <i
                        className={
                            value <= rating
                                ? `${styles['fa-star']} ${styles['fa-solid']}`
                                : `${styles['fa-star']} ${styles['fa-regular']}`
                        }
                    ></i>
                </span>
            </label>
        ))}
    </div>
</fieldset>;

{
    infoOpen[0] ? `${styles.infoContent}` : `${styles.infoContent} ${styles.infoNone}`;
}
