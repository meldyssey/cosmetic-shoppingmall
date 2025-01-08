import axios from "axios";
import React, { useState } from "react";
const apiKEY = process.env.REACT_APP_DELIVERY_API_KEY;
const bkURL = process.env.REACT_APP_BACK_URL;

const Delivery = ({ invoice }) => {
    const apiUrl = "https://info.sweettracker.co.kr/api/v1/trackingInfo";
    console.log(apiKEY);
    console.log(bkURL);

    // Define the parameters
    const [formData, setFormData] = useState({
        t_key: apiKEY, // API Key
        t_code: "04", // 택배사 코드
        t_invoice: invoice, // 운송장 번호
    });

    // Function to fetch tracking info
    // const getTrackingInfo = async () => {
    //     try {
    //         // Make the GET request
    //         const response = await axios.get(apiUrl, { params });

    //         // Parse the response
    //         const trackingInfo = response.data;
    //         console.log("Tracking Info:", trackingInfo);

    //         // Handle response data
    //         if (trackingInfo.status) {
    //             console.log("Parcel Status:", trackingInfo.trackingDetails);
    //             setInfo(trackingInfo.trackingDetails);
    //         } else {
    //             console.log("Error:", trackingInfo.msg);
    //             setInfo([trackingInfo.msg]);
    //         }
    //     } catch (error) {
    //         // Handle errors
    //         console.error("Error fetching tracking info:", error.message);
    //     }
    // };

    // useEffect(() => {
    //     getTrackingInfo();
    // }, []);
    return (
        <form action="https://info.sweettracker.co.kr/tracking/5" method="post">
            <div class="form-group">
                <input
                    type="hidden"
                    class="form-control"
                    id="t_key"
                    name="t_key"
                    value={formData.t_key}
                />
            </div>
            <div class="form-group">
                <input
                    type="hidden"
                    class="form-control"
                    name="t_code"
                    id="t_code"
                    value={formData.t_code}
                />
            </div>
            <div class="form-group">
                <input
                    type="hidden"
                    class="form-control"
                    name="t_invoice"
                    id="t_invoice"
                    value={formData.t_invoice}
                />
            </div>
            <button type="submit" class="btn btn-default">
                조회하기
            </button>
        </form>
    );
};

export default Delivery;
