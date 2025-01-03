import React, { useState } from "react";
import styles from "../../scss/mypage/Delivery.module.scss";
const apiKEY = process.env.REACT_APP_DELIVERY_API_KEY;

const Delivery = ({ invoice }) => {
    // 폼데이터 저장
    const [formData, setFormData] = useState({
        t_key: apiKEY, // API Key
        t_code: "04", // 택배사 코드
        t_invoice: invoice, // 운송장 번호
    });

    // 배송 조회
    const postSubmit = (e) => {
        // Open a new small window
        // Define the size of the pop-up window
        const popupWidth = 600;
        const popupHeight = 800;

        // Calculate the position for centering the pop-up window
        const left = window.screenX + (window.outerWidth - popupWidth) / 2;
        const top = window.screenY + (window.outerHeight - popupHeight) / 2;

        // Open the pop-up window
        const popupWindow = window.open(
            "",
            "trackingPopup",
            `width=${popupWidth},height=${popupHeight},top=${top},left=${left},resizable=yes,scrollbars=yes`
        );

        // Dynamically create a form
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://info.sweettracker.co.kr/tracking/5";
        form.target = "trackingPopup"; // Target the new window

        // Append form fields dynamically
        Object.entries(formData).forEach(([key, value]) => {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value;
            form.appendChild(input);
        });

        // Append the form to the new window's document and submit it
        popupWindow.document.body.appendChild(form);
        form.submit();
    };

    return (
        <div className={styles.delivery}>
            <div>{invoice}</div>
            <button className={styles.btn} type="button" onClick={postSubmit}>
                조회하기
            </button>
        </div>
    );
};

export default Delivery;
