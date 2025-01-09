import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../../../scss/product/detailVolume.module.scss";
import { useSelector } from "react-redux";

const bkURL = process.env.REACT_APP_BACK_URL;

const DetailVolume = ({ product_id }) => {
    const navigate = useNavigate();
    const [volume, setVolume] = useState([]);
    const { product_opt_id } = useParams();

    // console.log(product_opt_id);

    const volumeGetAxios = () => {
        // console.log("product_scent : ", product_scent);

        if (!product_id) {
            console.log("데이터 없음");
            return;
        }
        axios
            .get(`${bkURL}/product/volume/${product_id}`)
            .then((res) => {
                console.log(res.data);
                setVolume(res.data);
            })
            .catch((err) => {
                console.error("에러발생 ; ", err);
            });
    };

    useEffect(() => {
        volumeGetAxios();
    }, [product_id]);

    const ccc = styles.acitve1;

    return (
        <div className={styles.volumeWrap}>
            {volume.map((volume, i) => {
                // className={
                //     volume.product_opt_id == product_opt_id
                //         ? styles.active1
                //         : ""
                // }

                // console.log(
                //     volume.product_opt_id,
                //     volume.product_opt_id == product_opt_id
                // );

                return (
                    <button
                        key={volume.product_opt_id}
                        className={
                            volume.product_opt_id == product_opt_id ? ccc : ""
                        }
                        onClick={() => {
                            navigate(`/product/${volume.product_opt_id}`);
                        }}
                    >
                        {volume.product_volume}
                    </button>
                );
            })}
        </div>
    );
};

export default DetailVolume;
