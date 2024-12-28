import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../../scss/member/MemberDetail.module.scss';

function MemberDetail() {
    const { id } = useParams(); // URL에서 id 추출
    const [mm, setMM] = useState(null);
    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        axios
            .get(`${bkURL}/admin/member/detail/${id}`)
            .then(res => {
                setMM(res.data[0]);
            })
            .catch(err => {
                console.error('에러발생 : ', err);
            });
    }, [id]);

    // 날짜 포맷팅 함수
    const formatdate = dateString => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    if (!mm) {
        return <div>회원 정보를 찾을 수 없습니다.</div>;
    }

    return (
        <div className={styles.memberdetailcontainer}>
            <div className={styles.memberlist}>
                <div className={styles.memberlistheader}>
                    <div>고객번호</div>
                    <div>고객명</div>
                    <div>이메일</div>
                    <div>연락처</div>
                    <div>가입일</div>
                    <div>성별</div>
                    <div>생일</div>
                    <div>마케팅 수신여부</div>
                    <div>도로명주소</div>
                    <div>상세주소</div>
                </div>
                <div className={styles.memberlistitem}>
                    <div>{mm.customer_id}</div>
                    <div>{mm.customer_name}</div>
                    <div>{mm.email}</div>
                    <div>{mm.contact_number}</div>
                    <div>{formatdate(mm.join_date)}</div>
                    <div>{mm.gender}</div>
                    <div>{formatdate(mm.birthdate)}</div>
                    <div>{mm.optional_agree === 1 ? '동의' : '미동의'}</div>
                    <div>
                        {mm.roadname_address}
                        {mm.building_name}
                    </div>
                    <div>{mm.detail_address}</div>
                </div>
            </div>
        </div>
    );
}

export default MemberDetail;
