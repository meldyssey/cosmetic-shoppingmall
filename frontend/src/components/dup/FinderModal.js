import React, { useEffect, useState } from 'react';
import styles from '../../scss/dup/finderModal.module.scss';
import FinderResult from './FinderResult';

const FinderModal = ({ openModal, setOpenModal, finderData }) => {
    const [curQuestion, setCurQuestion] = useState(0);
    // console.log(finderData);
    const [score, setScore] = useState(0);
    const [finalResult, setFinalResult] = useState(); // Final fragrance result

    const scentResult = (finalScore) => {
        if (finalScore <= 4) {
            return (
                <FinderResult
                    arr={{
                        product_name: '피오니 앤 블러쉬 스웨이드 코롱',
                        product_img: 'peony.jpg',
                        product_intro:
                            '꽃의 귀족, 작약의 화려함을 담은 향. 화려하게 핀 작약에 더해진 붉은 사과의 향기로운 과즙과 순수한 자스민, 장미 그리고 카네이션, 블러쉬 스웨이드의 부드러운 관능미가 여운을 남깁니다.',
                        product_opt_id: 43,
                    }}
                />
            );
        } else if (finalScore <= 9) {
            return (
                <FinderResult
                    arr={{
                        product_name: '히노키 앤 시더우드',
                        product_img: 'hinoki.jpg',
                        product_intro:
                            '삼림욕을 하다 마주친 땅 속 깊이 자리 잡은 오래된 편백나무.깔끔한 느낌의 아로마 노트와 강렬한 우디 노트가 어우러지며 우아한 시더우드(삼나무)와 히노키(편백나무)의 강렬함으로 이어집니다. 매우 신선하고 특별한 향입니다.',
                        product_opt_id: 45,
                    }}
                />
            );
        } else {
            return (
                <FinderResult
                    arr={{
                        product_name: '라임 바질 앤 만다린',
                        product_img: 'lime.jpg',
                        product_intro:
                            '조 말론 런던의 시그니처 향. 카리브해의 산들바람에서 실려온 듯한 라임향에 톡 쏘는 바질과 향기로운 백리향이 더해져 독특한 조합을 만들어 냅니다. 현대적인 감각의 클래식한 향입니다.',
                        product_opt_id: 3,
                    }}
                />
            );
        }
    };
    const nextGo = (i) => {
        const newScore = score + i;
        setScore(newScore);
        if (curQuestion < finderData.length - 1) {
            setCurQuestion((prev) => prev + 1);
        } else {
            setFinalResult(scentResult(newScore));
            setCurQuestion((prev) => prev + 1);
        }
    };

    useEffect(() => {}, [finalResult]);

    console.log(score);

    return (
        <div className={styles.overlay}>
            <div className={styles.container}>
                <div className={styles.modalTitle}>센트파인더</div>
                <div className={styles.content}>
                    <div className={`${styles.textTop} ${curQuestion >= finderData.length ? styles.inactive : ''}`}>
                        <p>'센트 파인더'로 찾는 향기</p>
                        <img src="/imgs/product/scentFinder.jpg" alt="" />
                    </div>
                    {finderData.map((data, index) => {
                        return (
                            <div
                                key={index}
                                className={`${styles.qnaWrap} ${index === curQuestion ? styles.active : ''}`}
                            >
                                <div className={styles.question}>{data.question}</div>
                                <div className={styles.optionWrap}>
                                    {data.options.map((option, i) => {
                                        return (
                                            <div key={i}>
                                                <input
                                                    className={styles.btn}
                                                    type="radio"
                                                    name={`queston-${index}`}
                                                    id={`option-${index}-${i}`}
                                                    value={i}
                                                    checked
                                                />
                                                <label
                                                    className={styles.option}
                                                    for={`option-${index}-${i}`}
                                                    onClick={() => {
                                                        nextGo(i);
                                                    }}
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                    <div className={`${styles.result} ${curQuestion >= finderData.length ? styles.visible : ''}`}>
                        <div className={styles.title}>당신의 추천 향기</div>
                        {finalResult}
                    </div>
                </div>

                <button
                    className="cancle"
                    type="button"
                    onClick={() => {
                        setOpenModal(false);
                    }}
                >
                    취소
                </button>
            </div>
        </div>
    );
};

export default FinderModal;
