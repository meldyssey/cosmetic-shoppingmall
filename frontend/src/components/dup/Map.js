import React, { useState, useEffect } from 'react';
import styles from '../../scss/dup/map.module.scss';
import { Link } from 'react-router-dom';
import { Map, MapMarker, useMap, MapTypeControl, ZoomControl, useKakaoLoader, MarkerClusterer, CustomOverlayMap } from "react-kakao-maps-sdk";

export function KakaoMap() {
    useKakaoLoader();

    const [positions, setPositions] = useState([]);

    useEffect(() => {
        setPositions(data.map(item => item.latlng));
    },[])

    const data = [
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>강남구 갤러리아점</div>,
            latlng: { lat: 37.5284754434309, lng: 127.040052671773 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>강남구 현대 무역점</div>,
            latlng: { lat: 37.5086151302204, lng: 127.059765116537 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>강동구 현대 천호점</div>,
            latlng: { lat: 37.5389750482546, lng: 127.124440988259 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>고양 현대 킨텍스점</div>,
            latlng: { lat: 37.6679852145335, lng: 126.751647571454 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>남구 현대 울산점</div>,
            latlng: { lat: 34.9851453035827, lng: 127.503359561051 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 노원점</div>,
            latlng: { lat: 37.6552787315469, lng: 127.061391730931 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 대구점</div>,
            latlng: { lat: 35.8779406718693, lng: 128.629190024219 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 인천 터미널점</div>,
            latlng: { lat: 37.5626957260034, lng: 126.921362029118 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 부산본점</div>,
            latlng: { lat: 35.156789983664, lng: 129.056416218143 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>현대 중동점</div>,
            latlng: { lat: 37.5043163132049, lng: 126.76208267382 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 대구점</div>,
            latlng: { lat: 37.5620236926189, lng: 126.974972002131 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>대전 갤러리아 타임월드점</div>,
            latlng: { lat: 36.3519543043064, lng: 127.378167047167 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 광주점</div>,
            latlng: { lat: 35.1596771668701, lng: 126.882630869031 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>현대 신촌점</div>,
            latlng: { lat: 37.5560830579515, lng: 126.935844876509 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 강남점</div>,
            latlng: { lat: 37.5039351769908, lng: 127.002413006799 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>성남 AK 분당점</div>,
            latlng: { lat: 37.3851022326251, lng: 127.122703082975 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>성남 현대 판교점</div>,
            latlng: { lat: 37.39279369494, lng: 127.112017130086 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 월드 타워점</div>,
            latlng: { lat: 37.5137129859207, lng: 127.104301829165 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>송파 롯데 잠실점</div>,
            latlng: { lat: 37.5113096112036, lng: 127.098141751177 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>갤러리아 광교점</div>,
            latlng: { lat: 37.2845590569979, lng: 127.05753004948 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 수원점</div>,
            latlng: { lat: 37.264162726921, lng: 126.997385539043 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>AK 수원점</div>,
            latlng: { lat: 37.2655920786365, lng: 127.000179930083 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 평촌점</div>,
            latlng: { lat: 37.390002179095, lng: 126.950178643649 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>양천구 현대 목동점</div>,
            latlng: { lat: 37.5273217750941, lng: 126.874619136454 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>더현대 서울점</div>,
            latlng: { lat: 37.5251913154781, lng: 126.929112756574 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 타임스퀘어점</div>,
            latlng: { lat: 37.5171899712591, lng: 126.905567071705 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>한남 부티크점</div>,
            latlng: { lat: 37.5384987479277, lng: 127.001133061453 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>용인 신세계 경기점</div>,
            latlng: { lat: 37.3249887152059, lng: 127.108118540886 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 대전점</div>,
            latlng: { lat: 36.3751817693989, lng: 127.381765372066 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 의정부점</div>,
            latlng: { lat: 37.7379901, lng: 127.0458795 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 전주점</div>,
            latlng: { lat: 35.8344588976618, lng: 127.121908184239 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 서울 본점</div>,
            latlng: { lat: 37.5647299033135, lng: 126.981730421825 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 서울 본점</div>,
            latlng: { lat: 37.560919019936, lng: 126.980979034083 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>현대 대구점</div>,
            latlng: { lat: 35.8666296004242, lng: 128.590625718585 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>롯데 창원점</div>,
            latlng: { lat: 35.2245696276926, lng: 128.681839748806 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>갤러리아 센터시티점</div>,
            latlng: { lat: 36.800564020263, lng: 127.104726252319 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 하남점</div>,
            latlng: { lat: 37.5454041231797, lng: 127.223940331575 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>신세계 센텀시티점</div>,
            latlng: { lat: 35.1688178394069, lng: 129.129523260187 },
        },
        {
            content: <div style={{ fontSize: "13px", padding: "5px", }}>화성 롯데 동탄점</div>,
            latlng: { lat: 37.200666359626, lng: 127.098203113972 },
        },
    ]

    // 배율별로 지도 따로 보내는거 적용해야 됨
    
    

    const EventMarkerContainer = ({ position, content }) => {
        const map = useMap()
        const [isVisible, setIsVisible] = useState(false)
    
        return (
            <MapMarker
                position={position}
                onClick={(marker) => map.panTo(marker.getPosition())}
                onMouseOver={() => setIsVisible(true)}
                onMouseOut={() => setIsVisible(false)}
                >
            {isVisible && content}
            </MapMarker>
        )
    }

    return (
        <div className={styles.map}>
            <div className={styles.topDir}>
                <ol>
                    <li>
                        <Link to="/">홈</Link>
                    </li>
                    <p>&gt;</p>
                    <li>
                        <Link to="/map">매장 안내</Link>
                    </li>
                </ol>
            </div>


        <Map
          center={{
            lat: 36.8153810,
            lng: 127.7867040,
          }}
          style={{
            width: "90%",
            height: "450px",
            margin: "0 auto",
          }}
          level={12}
        >

        <MarkerClusterer
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={11} // 클러스터 할 최소 지도 레벨
        >
        {positions.map((pos) => (
            <CustomOverlayMap
                key={`${pos.lat}-${pos.lng}`}
                position={{
                    lat: pos.lat,
                    lng: pos.lng,
                }}
            >
            </CustomOverlayMap>
        ))}
        </MarkerClusterer>

        {data.map((value) => (
            <EventMarkerContainer
                key={`EventMarkerContainer-${value.latlng.lat}-${value.latlng.lng}`}
                position={value.latlng}
                content={value.content}
            />
        ))}
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
        </Map>
        </div>
    )
}

export default KakaoMap;