import { useEffect, useState } from "react";
import styles from "../../../scss/product/detailAcor.module.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

const bkURL = process.env.REACT_APP_BACK_URL;

const DetailAcor = () => {
    const { product_opt_id } = useParams();
    const [infoOpen, setInfoOpen] = useState([false, false, false]);
    const [product, setProduct] = useState(null);
    const infoOnOff = (index) => {
        let tempInfo = [...infoOpen];
        tempInfo[index] = !infoOpen[index];
        setInfoOpen(tempInfo);
    };
    const productGetAxios = () => {
        if (!product_opt_id) {
            console.log("데이터 없음");
            return;
        }
        axios
            .get(`${bkURL}/product/detail/${product_opt_id}`)
            .then((res) => {
                // console.log(res.data);
                setProduct(res.data);
            })
            .catch((err) => {
                console.error("에러발생 ; ", err);
            });
    };

    useEffect(() => {
        productGetAxios();
    }, [product_opt_id]);

    if (!product) {
        return <div> id 없음</div>;
    }

    return (
        <div className={styles.infoTotal}>
            <div className={styles.infoWrap}>
                <div
                    className={styles.infoTitle}
                    onClick={() => {
                        infoOnOff(0);
                    }}
                >
                    <div>성분</div>
                </div>
                <div
                    className={
                        infoOpen[0]
                            ? `${styles.infoContent}`
                            : `${styles.infoContent} ${styles.infoNone}`
                    }
                >
                    <div>{product.product_ingredient}</div>
                    <div>
                        *제공된 성분은 동일 제품이라도 경우에 따라 변경될 수
                        있습니다. 최신정보는 제품 포장의 성분을 참고하시거나
                        본사 고객관리지원팀으로 연락 부탁 드립니다.
                    </div>
                    <div>
                        *조 말론 런던의 제품을 구성하는 성분은 변경될 수 있음을
                        알려드립니다. 제품 뒷면의 성분 목록을 확인하시면 가장
                        최신 성분표를 확인하실 수 있습니다.
                    </div>
                </div>
            </div>
            <div className={styles.infoWrap}>
                <div
                    className={styles.infoTitle}
                    onClick={() => {
                        infoOnOff(1);
                    }}
                >
                    <div>사용할 때의 주의사항</div>
                </div>
                <ul
                    className={
                        infoOpen[1]
                            ? `${styles.infoContent}`
                            : `${styles.infoContent} ${styles.infoNone}`
                    }
                >
                    <li>
                        1. 화장품 사용 시 또는 사용 후 직사광선에 의하여
                        사용부위가 붉은 반점, 부어오름 또는 가려움증 등의 이상
                    </li>
                    <li>2. 상처가 있는 부위 등에는 사용을 자제할 것</li>
                    <li>3. 눈에 들어가지 않도록 주의할 것</li>
                    <li>4. 보관 및 취급 시 주의사항</li>
                    <li>* 어린이의 손이 닿지 않는 곳에 보관할 것</li>
                    <li>* 직사광선을 피해서 보관할 것</li>
                    <li>* 기타 제품 특이적인 주의사항은 제품 포장 참조</li>
                </ul>
            </div>
            <div className={styles.infoWrap}>
                <div
                    className={styles.infoTitle}
                    onClick={() => {
                        infoOnOff(2);
                    }}
                >
                    <div>추가 정보</div>
                </div>
                <ul
                    className={
                        infoOpen[2]
                            ? `${styles.infoContent}`
                            : `${styles.infoContent} ${styles.infoNone}`
                    }
                >
                    <li>
                        사용기한 : 제품 별도표기 (출고일 기준 사용기한이 1년
                        이상 남은 제품을 배송해드립니다)
                    </li>
                    <li>책임판매업자 : 이엘씨에이한국(유)</li>
                    <li>
                        품질 보증 기준 : 이엘씨에이한국(유)를 통해 공식 수입,
                        판매되는 제품에 한해서, 상품에 이상이 있을 경우
                        공정거래위원회고시 품목별 소비자 분쟁 해결 기준에 의거한
                        보상 및 제품관련 서비스를 받으실 수 있습니다.
                    </li>
                    <li>제조국 : 영국</li>
                </ul>
            </div>
        </div>
    );
};

export default DetailAcor;
