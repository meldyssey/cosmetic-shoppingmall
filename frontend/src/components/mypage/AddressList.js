import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../scss/mypage/AddressList.module.scss";
import axios from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";

function AddressList() {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null); // 사용자 정보
    const [address, setAddress] = useState([]); // 기본 배송지 데이터
    const [editAddress, setEditAddress] = useState(null); // 수정할 주소 데이터
    const [modalOpenChk, setModalOpenChk] = useState(false); // 모달 열림/닫힘 상태
    const bkURL = process.env.REACT_APP_BACK_URL;

    useEffect(() => {
        const sessionToken = sessionStorage.getItem("sessionToken");

        if (!sessionToken) {
            navigate("/signIn"); // 세션 토큰 없으면 로그인 페이지로 이동
        } else {
            axios
                .post(
                    `${bkURL}/myPage`, // 세션 토큰을 확인할 수 있는 경로
                    {
                        action: "getAddressInfo",
                        email: sessionStorage.getItem("email"),
                    },
                    {
                        headers: {
                            Authorization: sessionToken,
                        },
                    }
                )

                .then((response) => {
                    setUserInfo(response.data); // 사용자 정보 설정
                    // 주소 데이터 설정
                    setAddress([
                        {
                            id: 1,
                            customer_name: response.data.customer_name,
                            zip: response.data.zip,
                            roadname_address: response.data.roadname_address,
                            building_name: response.data.building_name,
                            detail_address: response.data.detail_address,
                            contact_number: response.data.contact_number,
                        },
                    ]);
                })
                .catch((error) => {
                    console.error("데이터 가져오기 실패:", error);
                    navigate("/signIn"); // 실패 시 로그인 페이지로 이동
                });
        }
    }, [navigate]);

    // 모달 열기 함수 (수정할 데이터를 설정)
    const openModal = (address) => {
        setEditAddress({ ...address }); // 수정할 주소 데이터를 복사하여 상태에 설정
        setModalOpenChk(true); // 모달 열림 상태로 설정
    };

    // 모달 닫기 함수
    const closeModal = () => {
        setEditAddress(null); // 수정 데이터 초기화
        setModalOpenChk(false); // 모달 닫기
    };

    // Daum Postcode API
    const open = useDaumPostcodePopup();

    const handleComplete = (data) => {
        let extraAddress = "";

        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress +=
                    extraAddress !== ""
                        ? `, ${data.buildingName}`
                        : data.buildingName;
            }
        }

        console.log(extraAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
        console.log(data);

        if (extraAddress == "") {
            setEditAddress({
                ...editAddress,
                zip: data.zonecode,
                roadname_address: data.roadAddress,
                building_name: ``,
            });
        } else {
            setEditAddress({
                ...editAddress,
                zip: data.zonecode,
                roadname_address: data.roadAddress,
                building_name: `(${extraAddress})`,
            });
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        open({
            onComplete: handleComplete,
        });
    };

    // 주소 저장 함수
    const saveAddress = () => {
        const sessionToken = sessionStorage.getItem("sessionToken");

        //입력값 유효성 검사
        //값이 입력되어있으면 trim 처리 값이 없으면 '' 공백 처리
        const trimmedZip = editAddress.zip ? editAddress.zip.trim() : "";
        const trimmedRoadnameAddress = editAddress.roadname_address
            ? editAddress.roadname_address.trim()
            : "";
        const trimmedBuildingName = editAddress.building_name
            ? editAddress.building_name.trim()
            : "";
        const trimmedDetailAddress = editAddress.detail_address
            ? editAddress.detail_address.trim()
            : "";

        if (!trimmedZip || !trimmedRoadnameAddress || !trimmedDetailAddress) {
            alert("우편번호, 주소를 입력해주세요.");
            return;
        }

        // 수정된 데이터 서버로 전송
        axios
            .post(
                `${bkURL}/myPage`,
                {
                    action: "updateAddressInfo",
                    email: sessionStorage.getItem("email"),
                    zip: trimmedZip,
                    roadname_address: trimmedRoadnameAddress,
                    building_name: trimmedBuildingName,
                    detail_address: trimmedDetailAddress,
                },
                {
                    headers: {
                        Authorization: sessionToken,
                    },
                }
            )
            .then((response) => {
                if (response.data.success) {
                    alert("주소가 수정되었습니다!");
                    setAddress((prev) =>
                        prev.map((addr) =>
                            addr.id === editAddress.id
                                ? { ...editAddress }
                                : addr
                        )
                    );
                    closeModal();
                } else {
                    alert("수정 실패: " + response.data.error);
                }
            })
            .catch((error) => {
                console.error("주소 수정 실패:", error);
                alert("서버 오류로 인해 수정할 수 없습니다.");
            });
    };

    // userInfo가 null일 때 로딩 메시지 표시
    if (!userInfo) {
        return <p>로딩 중...</p>;
    }

    return (
        <div className={styles.main}>
            {/* 주소 리스트 표시 */}
            {address.map((address) => (
                <div className={styles.block} key={address.id}>
                    <div className={styles.headerFont}>기본 배송지</div>
                    <div id={styles.blockBtnList}>
                        {/* 수정 버튼 */}
                        <button
                            className={styles.editmodal}
                            onClick={() => openModal(address)}
                        >
                            수정
                        </button>
                    </div>
                    {/* 주소 정보 표시 */}
                    <p className={styles.blockName}>
                        이름 : {address.customer_name}
                    </p>
                    <p className={styles.blockAd1}>
                        우편번호 : {address.zip ? address.zip : ""}
                    </p>
                    <p className={styles.blockAd2}>
                        도로명주소 : {address.roadname_address}{" "}
                        {address.building_name}
                    </p>
                    <p className={styles.blockAd2}>
                        상세주소 : {address.detail_address}
                    </p>
                    <p className={styles.blockCall1}>
                        휴대전화 : {address.contact_number}
                    </p>
                </div>
            ))}

            {/* 모달 */}
            {modalOpenChk && (
                <div className={styles.modal}>
                    <div id={styles.modalOverF}>
                        <div id={styles.newAddress}>
                            <div className={styles.modalHeader}>
                                <h4>주소 수정</h4>
                                {/* 닫기 버튼 */}
                                <button
                                    id={styles.deleteModal}
                                    onClick={closeModal}
                                >
                                    &times;
                                </button>
                            </div>
                            <div className={styles.modalBody}>
                                <button
                                    className={styles.searchAddress}
                                    onClick={handleClick}
                                >
                                    주소 검색
                                </button>
                                {/* 주소록 수정 */}
                                <div>
                                    우편번호{" "}
                                    <input
                                        type="text"
                                        placeholder="우편번호"
                                        value={editAddress.zip}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    도로명주소{" "}
                                    <input
                                        type="text"
                                        placeholder="도로명주소"
                                        value={editAddress.roadname_address}
                                        readOnly
                                    />
                                    <input
                                        type="text"
                                        placeholder="건물명"
                                        value={editAddress.building_name}
                                        readOnly
                                    />
                                </div>
                                <div>
                                    상세 주소{" "}
                                    <input
                                        type="text"
                                        placeholder="상세주소"
                                        value={editAddress.detail_address}
                                        onChange={(e) =>
                                            setEditAddress({
                                                ...editAddress,
                                                detail_address: e.target.value,
                                            })
                                        }
                                    />
                                </div>

                                <button
                                    className={styles.saveAddress}
                                    onClick={saveAddress}
                                >
                                    저장
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddressList;
