import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../../scss/service/IldaeIl/OneToOne.module.scss';
import axios from 'axios';

const bkURL = process.env.REACT_APP_BACK_URL;

const OneToOne = () => {
    // 폼 데이터 상태 관리
    const [formData, setFormData] = useState({
        category: '', // 문의 유형
        title: '', // 제목
        content: '', // 내용
        file: null, // 첨부 파일
    });

    // 에러 메시지 상태 관리
    const [categoryError, setCategoryError] = useState('');
    const [titleError, setTitleError] = useState('');
    const [contentError, setContentError] = useState('');

    const navigate = useNavigate(); // 페이지 이동에 사용
    const email = sessionStorage.getItem('email');  // 세션에서 이메일 가져오기
    const customerName = sessionStorage.getItem('customerName');  // 세션에서 작성자 이름 가져오기

    // 이메일이 없으면 로그인 페이지로 이동
    if (!email) {
        navigate('/signIn');
    }

    // 입력값이 변경될 때 실행 (입력 필드를 업데이트)
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,    // 기존 데이터 유지
            [name]: value,  // 변경된 필드 업데이트
        });
    };

       // 파일 첨부 시 실행 (첨부 파일을 상태에 저장)
    const handleFileChange = e => {
        setFormData({
            ...formData,
            file: e.target.files[0],     // 첫 번째 선택된 파일 저장
        });
    };

    // 폼 제출 시 실행 (문의 접수)
    const handleSubmit = async e => {
        e.preventDefault(); // 폼 기본 동작 막기

        let isValid = true;

        // 문의 유형 유효성 검사
        if (!formData.category) {
            setCategoryError('문의 유형을 선택해 주세요.');
            isValid = false;
        } else {
            setCategoryError('');   //오류 초기화
        }

        // 제목 유효성 검사 (2~50자)
        const titleRegex = /^.{2,50}$/;
        if (!titleRegex.test(formData.title.trim())) {
            setTitleError('제목은 2~50자 이내로 입력해 주세요.');
            isValid = false;
        } else {
            setTitleError('');
        }

        // 문의 내용 유효성 검사 (10~1000자)
        const contentRegex = /^.{10,1000}$/;
        if (!contentRegex.test(formData.content.trim())) {
            setContentError('문의 내용은 10~1000자 이내로 입력해 주세요.');
            isValid = false;
        } else {
            setContentError('');
        }

        // 유효성 검사 실패 시 제출 중단
        if (!isValid) return;

        // 서버에 전송할 FormData 생성
        const data = new FormData();
        data.append('post_category', formData.category);    //문의 유형
        data.append('email', email);    //작성자 이메일
        data.append('post_title', formData.title);  //제목
        data.append('post_detail', formData.content);   //내용
        if (formData.file) {
            data.append('one_upload_file', formData.file);  //첨부 파일
        }

        //서버에 데이터 전송
        try {
            const response = await axios.post(`${bkURL}/onetoone/register`, data);
            if (response.status === 201) {
                alert('문의가 접수되었습니다!');    //성공 메시지
                navigate('/onetoonelist');  //문의 목록 페이지로 이동
            } else {
                alert(`문의 등록 실패: ${response.data.error}`);    //서버 오류 메시지 표시
            }
        } catch (err) {
            console.error('서버 오류 발생:', err);
            if (err.response) {
                alert(`문의 등록 실패: ${err.response.data.error}`);
            } else {
                alert('서버와 연결할 수 없습니다.');
            }
        }
    };

    // 취소 버튼 클릭 시 이전 페이지로 이동
    const handleCancel = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    return (
        <div className={styles.one}>
            <div className={styles.onetitle}>1:1 문의</div>
            <div className={styles.gray}>※ 문의하신 사항은 성실하게 답변 드리겠습니다. 문의하시기 전에 FAQ를 참고 해주세요.</div>

            <form className={styles.inquiryForm} onSubmit={handleSubmit}>
                <div>
                    <span>
                        작성자: {customerName} ({email})
                    </span>
                </div>

                {/* 문의 유형 선택 */}
                <div>
                    <label htmlFor="category">
                        문의 유형 <span className={styles.red}>*</span>
                    </label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange}>
                        <option value="">선택하세요</option>
                        <option value="information">회원정보</option>
                        <option value="order">주문/배송</option>
                        <option value="refund">반품/환불</option>
                        <option value="product">제품 문의</option>
                        <option value="etc">기타</option>
                    </select>
                    {categoryError && <p style={{ color: 'red' }}>{categoryError}</p>}
                </div>

                {/* 제목 입력 */}
                <div>
                    <label htmlFor="title">
                        제목 <span className={styles.red}>*</span>
                    </label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} placeholder="제목을 입력하세요" />
                    {titleError && <p style={{ color: 'red' }}>{titleError}</p>}
                </div>

                {/* 내용 입력 */}
                <div>
                    <label htmlFor="content">
                        문의 내용 <span className={styles.red}>*</span>
                    </label>
                    <textarea id="content" name="content" value={formData.content} onChange={handleChange} placeholder={formData.category === 'refund' ? '주문번호를 입력하세요' : '문의 내용을 입력하세요'} />
                    {contentError && <p style={{ color: 'red' }}>{contentError}</p>}
                    <p className={styles.gray}>※ 개인정보 보호를 위해 이메일, 주소, 휴대폰 번호 등의 개인정보 입력은 지양하여 주시기 바랍니다.</p>
                </div>

                {/* 파일 첨부 */}
                <div className={styles.filewrap}>
                    <label htmlFor="file" 
                    className={styles.filefile}>
                        파일 첨부</label>
                    <input 
                    type="file" 
                    id="file" 
                    name="file" 
                    onChange={handleFileChange} />
                </div>

                {/* 버튼 그룹 */}
                <div className={styles.buttonGroup}>
                    <button type="submit">문의 접수</button>
                    <button type="button" onClick={handleCancel} className={styles.cbutton}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OneToOne;
