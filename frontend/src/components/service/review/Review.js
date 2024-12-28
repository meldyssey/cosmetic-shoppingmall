import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../../../scss/service/review/Review.module.scss';
import { useNavigate, useParams } from 'react-router-dom';

const bkURL = process.env.REACT_APP_BACK_URL;   // 백엔드 URL

// 이미지 파일 경로를 생성하는 함수
function fileGo(file) {
    if (file) {
        return <img src={`${bkURL}/imgs/product/${file}`} alt="Product" />; // 이미지가 있으면 해당 경로 반환
    }
    return <img src={`${bkURL}/imgs/product/default.jpg`} alt="Default Product" />;
}

const Review = () => {
    // 상태 관리: 폼 데이터
    const { product_opt_id } = useParams(); // URL에서 옵션 ID 가져오기
    //유효성 검사
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');
    //별점
    const [rating, setRating] = useState(0);
    const [ratingError, setRatingError] = useState('');
    //제목
    const [title, setTitle] = useState('');
    const [titleError, setTitleError] = useState('');
    //내용
    const [content, setContent] = useState('');
    const [contentError, setContentError] = useState('');
    //지역
    const [region, setRegion] = useState('');
    //향수 계열
    const [fragranceType, setFragranceType] = useState('');
    //잘어울리는 시간대
    const [timeOfDay, setTimeOfDay] = useState('');
    //선물여부
    const [gift, setGift] = useState('');
    //제품 정보 상태 
    const [product, setProduct] = useState('');

    const email = sessionStorage.getItem('email');  //세션에서 사용자 이메일 가져오기
    const navigate = useNavigate();

     //이메일이 없으면 로그인 페이지로 이동
    if (!email) {
        navigate('/signIn');   
    }   

    // 제품 데이터 가져오기
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `${bkURL}/review/reviewWrite?product_opt_id=${product_opt_id}`
                );
                console.log(response.data);
                setProduct(response.data);
            } catch (err) {
                console.error('호출 실패:', err);
            }
        };
        fetchReviews();
    }, [product_opt_id]);

    //폼 제출 처리
    const handleSubmit = async (e) => {
        e.preventDefault(); //기본 폼 제출 동작 막기

        const formData = new FormData(document.myFrm);

        //필수 데이터 추가
        formData.append('product_opt_id', product.product_opt_id);
        formData.append('product_id', product.product_id);
        formData.append('email', email);
        formData.append('review_rate', rating || 0);

        //별점 유효성검사
        if (rating === 0) {
            setRatingError('별점을 선택해 주세요.');
            return;
        }
        setRatingError('');

        //닉네임 유효성 검사
        const nicknameRegex = /^[가-힣a-zA-Z0-9]{2,10}$/;
        if (!nicknameRegex.test(nickname)) {
            setError('닉네임은 2~10자의 한글, 영문, 숫자만 허용됩니다.');
            return;
        }
        setError('');

        //제목 유효성 검사
        const titleRegex = /^.{2,50}$/;
        if (!titleRegex.test(title)) {
            setTitleError('제목은 2~50자 이내로 입력해 주세요.');
            return;
        }
        setTitleError('');

        //후기 내용 유효성 검사
        const contentRegex = /^.{10,500}$/;
        if (!contentRegex.test(content)) {
            setContentError('상품 후기는 10자 이상 500자 이하로 입력해 주세요.');
            return;
        }
        setContentError('');

        //파일추가(선택사항)
        const fileInput = document.querySelector('input[name="review_file"]');
        if (fileInput.files.length > 0) {
            formData.append('review_file', fileInput.files[0]);
        }

        console.log('FormData 확인:', Object.fromEntries(formData));

       
        const data = Object.fromEntries(formData);
        // console.log("data:",data) // 보내는 값 확인

        //서버로 데이터 전송
        try {
            const response = await axios.post(`${bkURL}/review`, data, {
                headers: {
                    'Content-Type': 'multipart/form-data', // 파일업로드를 위해 타입을 이렇게 씀
                },
            });
            console.log('리뷰 저장 성공:', response.data);
            alert('리뷰가 성공적으로 저장되었습니다!');
            navigate(`/product/${product_opt_id}`);
        } catch (err) {
            console.error('리뷰 저장 실패:', err);
            alert('리뷰 저장에 실패했습니다.');
        }
    };

    return (
        <div>
            <div className={styles.rwrapper}>
                <div className={styles.rimgbox}>{fileGo(product.product_upSystem)}</div>

                <div className={styles.content}>
                    <div className={styles.rtext}>
                        <h2>{product.product_name_kor}</h2>
                        <div>{product.product_intro}</div>
                    </div>

                    <form name="myFrm" onSubmit={handleSubmit}>
                        {/* 별점 평가 */}
                        <fieldset className={styles.rating}>
                            <legend>고객 평점*</legend>
                            <div className={styles.labelbox}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <label key={value} onClick={() => setRating(value)}>
                                        <input type="radio" name="rating" value={value} style={{ display: 'none' }} />
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
                            {ratingError && <p style={{ color: 'red' }}>{ratingError}</p>}
                        </fieldset>

                        {/* 닉네임 입력 */}
                        <div className={styles.name}>
                            <label htmlFor="pname">
                                <div>닉네임*</div>
                            </label>
                            <input
                                className={styles.rinput}
                                type="text"
                                id="pname"
                                placeholder="예) A람"
                                name="review_nick"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                            />
                            {error && <p style={{ color: 'red' }}>{error}</p>}
                        </div>

                        {/* 제목 입력 */}
                        <div className={styles.rtitle}>
                            <label htmlFor="ptitle">
                                <div>제목*</div>
                            </label>
                            <input
                                className={styles.rinput}
                                type="text"
                                id="ptitle"
                                name="review_title"
                                placeholder="예) 저는 이 상품을 또 구매할 의향이 있습니다."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                        </div>

                        {/* 상품후기 입력 */}
                        <div className={styles.rreview}>
                            <label htmlFor="rreview">
                                <div>상품후기*</div>
                            </label>
                            <textarea
                                className={styles.rtextarea}
                                name="review_detail"
                                value={content}
                                placeholder="상품에 대한 후기를 작성해 주세요. (10자 이상)"
                                onChange={(e) => setContent(e.target.value)}
                                rows="5" // 여러 줄 입력을 위한 기본 높이 설정
                            />
                            {contentError && <p style={{ color: 'red' }}>{contentError}</p>}
                        </div>
                        {/* 거주지역 입력 */}
                        <div className={styles.seoul}>
                            <label for="ptitle">
                                <div>거주지역</div>
                            </label>
                            <input
                                className={styles.rseoul}
                                type="text"
                                name="review_region"
                                id="ptitle"
                                placeholder="예) 서울"
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                            />
                        </div>

                        {/* 향수 계열 선택 */}
                        <div className={styles.rtitle}>
                            <label className={styles.type}>
                                <div>평소 사용하는 향수 계열</div>
                            </label>
                            <select
                                className={styles.rselect}
                                name="review_scent"
                                value={fragranceType} //선택된 값이 상태에 반영됨
                                onChange={(e) => setFragranceType(e.target.value)}
                            >
                                <option value="시트러스">시트러스</option>
                                <option value="프루티">프루티</option>
                                <option value="라이트 플로럴">라이트 플로럴</option>
                                <option value="플로럴">플로럴</option>
                                <option value="스파이시">스파이시</option>
                                <option value="우디">우디</option>
                            </select>
                        </div>

                        {/* 잘 어울리는 시간대 선택 */}
                        <div className={styles.rtitle}>
                            <label className={styles.time}>
                                <div>이 제품이 잘 어울리는 시간대</div>
                            </label>
                            <select
                                name="review_time"
                                className={styles.rselect}
                                value={timeOfDay}
                                onChange={(e) => setTimeOfDay(e.target.value)}
                            >
                                <option value="낮">낮</option>
                                <option value="밤">밤</option>
                                <option value="낮과 밤">낮과 밤</option>
                            </select>
                        </div>

                        <div className={styles.rtitle}>
                            <label className={styles.gift}>
                                <div>선물여부</div>
                            </label>
                            <select
                                className={styles.rselect}
                                name="review_gift"
                                value={gift}
                                onChange={(e) => setGift(e.target.value)}
                            >
                                <option value="누군가를 위한">누군가를 위한</option>
                                <option value="나를 위한">나를 위한</option>
                            </select>
                        </div>

                        {/* review_upload_file */}
                        <div className={styles.load}>
                            <label for="imgLoad">
                                <div>이미지 첨부</div>
                            </label>
                            <input type="file" name="review_file" className={styles.imgLoad} />
                        </div>

                        <button type="submit" className={styles.btnsubmit}>
                            제출
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Review;
