import React, { useState, useEffect  } from 'react';
import FinderModal from './FinderModal';
import styles from '../../scss/dup/scentFinder.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const finderData = [
    {
        question: '선물하고 싶은 사람은?',
        options: ['당신을 위한', '누군가를 위한'],
    },
    {
        question: '누구를 위한 건가요?',
        options: ['남성', '여성', '모두'],
    },
    {
        question: '언제 사용할 예정인가요?',
        options: ['평범한 일상에서', '특별한 저녁 모임 혹은 파티', '나른한 오후 시간에'],
    },
    {
        question: '당신을 가장 매료시키는 단어는?',
        options: ['신선한', '생동감 있는', '섬세한', '깊은', '풍부한'],
    },
    {
        question: '당신을 가장 매료시키는 단어는?',
        options: ['관용적인', '편안한', '고급스러운', '우아한', '활기찬'],
    },
];

const ScentFinder = () => {
    const [openModal, setOpenModal] = useState(false);

    // 카카오 SDK 초기화
    useEffect(() => {
        if (!window.Kakao) {
            console.error('Kakao SDK가 로드되지 않았습니다.');
            return;
        }
    
        if (!window.Kakao.isInitialized()) {
            window.Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
            console.log('Kakao SDK 초기화 완료');
        } else {
            console.log('Kakao SDK는 이미 초기화되었습니다.');
        }
    
        console.log('현재 Kakao 상태:', window.Kakao);
    }, []);
    
    const shareToKakao = () => {
        if (!window.Kakao || !window.Kakao.Share) {
            console.error('Kakao SDK가 초기화되지 않았거나 Share 모듈이 없습니다.');
            alert('카카오톡 공유를 사용할 수 없습니다.');
            return;
        }
    
        console.log('Kakao.Share.sendScrap 호출 준비');
    
        try {
            window.Kakao.Share.sendScrap({
                requestUrl: 'http://localhost:3000/scent-finder',
                templateId: 116083, // 템플릿 ID
                templateArgs: {
                    title: '나만의 시그니처 향을 찾아보세요!',
                    description: '조 말론 런던의 센트 파인더와 함께 특별한 향기를 찾아보세요.',
                },
            });
    
            // 성공 메시지를 표시합니다.
            console.log('공유 요청 전송');
        } catch (error) {
            console.error('공유 실행 오류:', error);
        }
    };
    
    return (
        <>
        <div className={styles.scentFinder}>
            <div className={styles.title}>센트파인더</div>
            <div className={styles.content}>
                <p>당신 만의 시그니처 향을 찾고 계시나요?</p>
                <p>아니면 특별한 누군가에게 줄 선물이 고민되시나요?</p>
                <p>지금부터 조 말론 런던이 제안하는 완벽한 향을 만나보세요.</p>
            </div>
            <button
                className={styles.startBtn}
                onClick={() => {
                    setOpenModal(true);
                }}
            >
                시작하기
            </button>
            <img src="/imgs/product/scentFinderBanner.jpg" alt="" />
            <div className={styles.content}>
                <div>
                    <FontAwesomeIcon icon={faQuoteLeft} size="2x" />
                    <p>탑, 하트, 베이스 노트에 대해 아는 것도 도움이 됩니다.</p>
                    <p>하지만 원료 하나 하나에 신경쓸 필요는 없어요. </p>
                    <p>끌리는 향을 찾다보면 나도 모르게 새로운 발견을 하게 되실거에요</p>
                    <FontAwesomeIcon icon={faQuoteRight} size="2x" />
                </div>
                <div className={styles.small}>
                    <p>셀린 루</p>
                    <p>글로벌 프레그런스 헤드 디렉터</p>
                </div>
                <button className={styles.kakaoShareBtn} onClick={shareToKakao}>
                    카카오톡으로 공유하기
                </button>
            </div>

            {openModal ? (
                <FinderModal openModal={openModal} setOpenModal={setOpenModal} finderData={finderData} />
            ) : null}
        </div>
        </>
    );
};

export default ScentFinder;
