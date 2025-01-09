import styles from '../../scss/dup/map.module.scss';

import React, { useState, useEffect } from 'react';
import Pagination from "../dup/Pagination";
import { Link } from 'react-router-dom';
import { Map, MapMarker, useMap, MapTypeControl, ZoomControl, useKakaoLoader, MarkerClusterer, CustomOverlayMap } from "react-kakao-maps-sdk";

function KakaoMap() {
    useKakaoLoader();

    const [positions, setPositions] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(13);
    const [map, setMap] = useState(null);
    
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

    const locationData = [
        {
            local: "강남구",
            store: "강남구 갤러리아점",
            address: "압구정로 343 1층, 강남구, 서울특별시 , 6008",
            guide: "보기",
        },
        {
            local: "강남구",
            store: "강남구 현대무역점",
            address: "테헤란로 517 1층, 강남구, 서울특별시 , 6164",
            guide: "보기",
        },
        {
            local: "강동구",
            store: "현대 천호점",
            address: "천호대로 1005 현대 백화점 천호점 1층, 강동구, 서울특별시, 5328",
            guide: "보기",
        },
        {
            local: "경기 고양시",
            store: "현대 킨텍스점",
            address: "일산서구 호수로 817, 1층, 고양시, 경기도, 10391",
            guide: "보기",
        },
        {
            local: "울산 남구",
            store: "현대 울산점",
            address: "삼산로 261 1층, 남구, 울산광역시, 44705",
            guide: "보기",
        },
        {
            local: "서울",
            store: "롯데 노원점",
            address: "동일로 1414 1층, 노원구, 서울특별시, 1695",
            guide: "보기",
        },
        {
            local: "대구 동구",
            store: "신세계 대구점",
            address: "동부로 149번지 1층, 동구, 대구광역시, 41229",
            guide: "보기",
        },
        {
            local: "인천",
            store: "롯데 인천 터미널점",
            address: "연남로 35 1층, 미추홀구 , 인천광역시, 22242",
            guide: "보기",
        },
    ]
    
    const locations = [
        { name: '서울', lat: 37.5665, lng: 126.978 },
        { name: '부산', lat: 35.1796, lng: 129.0756 },
        { name: '대구', lat: 35.8722, lng: 128.6025 },
    ];

    const handleClick = (lat, lng) => {
        if (map) {
            map.panTo({ lat, lng });
        }
    };

    const EventMarkerContainer = ({ position, content }) => {
        const map = useMap();
        const [isVisible, setIsVisible] = useState(false);

        useEffect ( () => {
            const handleZoomChange = () => {
                const currentZoomLevel = map.getLevel();
                setZoomLevel(currentZoomLevel);
            }

            kakao.maps.event.addListener(map, "zoom_changed", handleZoomChange);
            return () => {
                kakao.maps.event.removeListener(map, "zoom_changed", handleZoomChange);
            }
        }, [map]);

        return (
            (zoomLevel <= 10 && (
                <MapMarker
                    position={position}
                    onClick={(marker) => map.panTo(marker.getPosition())}
                    onMouseOver={() => setIsVisible(true)}
                    onMouseOut={() => setIsVisible(false)}
                >
                    {isVisible && content}
                </MapMarker>
            ))
        );
    };

    const locationTable = ({ locationData }) => {
        return (
            <table>
                <colgroup>
                    <col style={{width: "20%" }} />
                    <col style={{width: "20%" }} />
                    <col style={{width: "auto" }} />
                    <col style={{width: "15%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th>지역</th>
                        <th>지점명</th>
                        <th>주소</th>
                        <th>지도</th>
                    </tr>
                </thead>
                <tbody>
                    {locationData.map((item, index) => (
                        <tr key={`${item.local}-${index}`}>
                            <td>{item.local}</td>
                            <td>{item.store}</td>
                            <td>{item.address}</td>
                            <td>{item.guide}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    const LocationProd = ({ locationData }) => {
        const [curPage, setCurPage] = useState(1);
        const [itemsPerPage] = useState(5);
        const indexOfLastItem = curPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const curLocations = locationData.slice(indexOfFirstItem, indexOfLastItem);
        
        return (
            <div>
                <div className={styles.table}>
                    {locationTable({ locationData: curLocations })}
                </div>
                <Pagination
                    totalItems={locationData.length}
                    itemsPerPage={itemsPerPage}
                    pagesPerGroup={5}
                    curPage={curPage}
                    setCurPage={setCurPage}
                />
            </div>
        );
    };

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
            <div className={styles.topDirTitle}>매장 안내</div>

            <div>
                {locations.map((location, index) => (
                    <button key={index} onClick={() => handleClick(location.lat, location.lng)}>
                        {location.name} 지도 보기 (수리중)
                    </button>
                ))}
            </div>

            <Map
                center={{
                    lat: 36.4897036279608,
                    lng: 127.729748179994,
                }}
                style={{
                    width: "90%",
                    height: "450px",
                    margin: "20px auto",
                }}
                level={13}
                onCreate={setMap} // Map이 생성될 때 map 상태를 설정합니다.
            >

                <MarkerClusterer
                    averageCenter={true}
                    minLevel={11}
                >
                    {positions.map((pos) => (
                        <CustomOverlayMap
                            key={`${pos.lat}-${pos.lng}`}
                            position={pos}
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

            <LocationProd locationData={locationData} />
        </div>
    );
}

export default KakaoMap;


