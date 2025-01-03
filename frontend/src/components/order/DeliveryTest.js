import axios from "axios";
import React, { useEffect, useState } from "react";

const apiKEY = process.env.DELIVERY_API_KEY;

const DeliveryTest = ({ invoice }) => {
    const apiUrl = "https://info.sweettracker.co.kr/api/v1/trackingInfo";
    // Define the parameters
    const [formData] = useState({
        t_code: "04", // Delivery company code (e.g., CJ Logistics)
        t_key: apiKEY,
        t_invoice: `${invoice}`, // Invoice number
    });

    // const [responseTemplate, setResponseTemplate] = useState(""); // Store server response

    // const getDelivery = async () => {
    //     try {
    //         const response = await axios.post(
    //             "https://info.sweettracker.co.kr/tracking/5",
    //             new URLSearchParams(formData), // Convert formData to URL-encoded format
    //             {
    //                 headers: {
    //                     "Content-Type": "application/x-www-form-urlencoded",
    //                 },
    //             }
    //         );

    //         // Set response data (e.g., HTML template) to state
    //         setResponseTemplate(response.data);
    //     } catch (error) {
    //         console.error("Request failed:", error);
    //         setResponseTemplate(
    //             `<p style="color: red;">Request failed. Please try again later.</p>`
    //         );
    //     }
    // };

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
        <div>
            <button onClick={getDelivery}>배송 조회</button>
            {/* Render server response */}
            <div dangerouslySetInnerHTML={{ __html: responseTemplate }} />
            <form
                action="https://info.sweettracker.co.kr/tracking/5"
                method="post"
            >
                <div class="form-group">
                    <label for="t_key">API key</label>
                    <input
                        type="text"
                        class="form-control"
                        id="t_key"
                        name="t_key"
                        placeholder="제공받은 APIKEY"
                    />
                </div>
                <div class="form-group">
                    <label for="t_code">택배사 코드</label>
                    <input
                        type="text"
                        class="form-control"
                        name="t_code"
                        id="t_code"
                        placeholder="택배사 코드"
                    />
                </div>
                <div class="form-group">
                    <label for="t_invoice">운송장 번호</label>
                    <input
                        type="text"
                        class="form-control"
                        name="t_invoice"
                        id="t_invoice"
                        placeholder="운송장 번호"
                    />
                </div>
                <button type="submit" class="btn btn-default">
                    조회하기
                </button>
            </form>
        </div>
    );
};

export default DeliveryTest;
