import styles from '../../scss/dup/map.module.scss';
import React, { useState, useEffect } from 'react';
import Pagination from "../dup/Pagination";
import { Link } from 'react-router-dom';
import { Map, MapMarker, MapTypeControl, ZoomControl, MarkerClusterer, CustomOverlayMap, useMap } from "react-kakao-maps-sdk";

function KakaoMap() {
    const [positions, setPositions] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(10);
    const [map, setMap] = useState(null);
    const [selectedMarker, setSelectedMarker] = useState(null);
    const [center, setCenter] = useState({
        // 클러스터 쓸 때
        lat: 37.5654385176408,
        lng: 126.976983237511, 

        // 클러스터 안 쓸 때
        // lat: 36.4897036279608,
        // lng: 127.729748179994,
    });

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
            latlng: { lat: 37.5284754434309, lng: 127.040052671773 },
        },
        {
            local: "강남구",
            store: "강남구 현대무역점",
            address: "테헤란로 517 1층, 강남구, 서울특별시 , 6164",
            guide: "보기",
            latlng: { lat: 37.5086151302204, lng: 127.059765116537 },
        },
        {
            local: "강동구",
            store: "현대 천호점",
            address: "천호대로 1005 현대 백화점 천호점 1층, 강동구, 서울특별시, 5328",
            guide: "보기",
            latlng: { lat: 37.5389750482546, lng: 127.124440988259 },
        },
        {
            local: "경기 고양시",
            store: "현대 킨텍스점",
            address: "일산서구 호수로 817, 1층, 고양시, 경기도, 10391",
            guide: "보기",
            latlng: { lat: 37.6679852145335, lng: 126.751647571454 },
        },
        {
            local: "울산 남구",
            store: "현대 울산점",
            address: "삼산로 261 1층, 남구, 울산광역시, 44705",
            guide: "보기",
            latlng: { lat: 34.9851453035827, lng: 127.503359561051 },
        },
        {
            local: "서울",
            store: "롯데 노원점",
            address: "동일로 1414 1층, 노원구, 서울특별시, 1695",
            guide: "보기",
            latlng: { lat: 37.6552787315469, lng: 127.061391730931 },
        },
        {
            local: "대구 동구",
            store: "신세계 대구점",
            address: "동부로 149번지 1층, 동구, 대구광역시, 41229",
            guide: "보기",
            latlng: { lat: 35.8779406718693, lng: 128.629190024219 },
        },
        {
            local: "인천",
            store: "롯데 인천 터미널점",
            address: "연남로 35 1층, 미추홀구 , 인천광역시, 22242",
            guide: "보기",
            latlng: { lat: 37.5626957260034, lng: 126.921362029118 },
        },
        {
            local: "부산진구",
            store: "롯데 부산본점",
            address: "가야대로 772 1층, 부산진구 , 부산광역시 , 47285",
            guide: "보기",
            latlng: { lat: 35.156789983664, lng: 129.056416218143 },
        },
        {
            local: "부천시",
            store: "현대 중동점",
            address: "길주로 180 1층, 부천시 , 경기도, 14546",
            guide: "보기",
            latlng: { lat: 37.5043163132049, lng: 126.76208267382 },
        },
        {
            local: "대구",
            store: "롯데 대구점",
            address: "태평로 161 지하 1층, 북구, 대구광역시 , 41581",
            guide: "보기",
            latlng: { lat: 37.5620236926189, lng: 126.974972002131 },
        },
        {
            local: "대전",
            store: "갤러리아 타임월드점",
            address: "대덕대로 211 1층, 서구, 대전광역시 , 35229",
            guide: "보기",
            latlng: { lat: 36.3519543043064, lng: 127.378167047167 },
        },
        {
            local: "광주 서구",
            store: "신세계 광주점",
            address: "무진대로 932 2층, 서구, 광주광역시, 61937",
            guide: "보기",
            latlng: { lat: 35.1596771668701, lng: 126.882630869031 },
        },
        {
            local: "서울",
            store: "현대 신촌점",
            address: "신촌로 83 1층, 서대문구, 서울특별시, 3789",
            guide: "보기",
            latlng: { lat: 37.5560830579515, lng: 126.935844876509 },
        },
        {
            local: "서울",
            store: "신세계 강남점",
            address: "신반포로 176 1층, 서초구, 서울특별시 , 6546",
            guide: "보기",
            latlng: { lat: 37.5039351769908, lng: 127.002413006799 },
        },
        {
            local: "경기",
            store: "AK 분당점",
            address: "분당구 황새울로360번길 42 1층, 성남시, 경기도, 13591",
            guide: "보기",
            latlng: { lat: 37.3851022326251, lng: 127.122703082975 },
        },
        {
            local: "경기",
            store: "현대 판교점",
            address: "분당구 판교역로 146번길 20, 성남시 , 경기도 , 13529",
            guide: "보기",
            latlng: { lat: 37.39279369494, lng: 127.112017130086 },
        },
        {
            local: "서울",
            store: "롯데 월드타워점",
            address: "올림픽로 300 지하 1층, 송파구 , 서울특별시, 5551",
            guide: "보기",
            latlng: { lat: 37.5137129859207, lng: 127.104301829165 },
        },
        {
            local: "서울",
            store: "송파 롯데 잠실점",
            address: "올림픽로 240 1층, 송파구 , 서울특별시, 5554",
            guide: "보기",
            latlng: { lat: 37.5113096112036, lng: 127.098141751177 },
        },
        {
            local: "경기",
            store: "갤러리아 광교점",
            address: "영통구 광교호수공원로 320 1층, 수원시, 경기도, 16514",
            guide: "보기",
            latlng: { lat: 37.2845590569979, lng: 127.05753004948 },
        },
        {
            local: "경기",
            store: "롯데 수원점",
            address: "권선구 세화로 134 타임빌라스 수원점 1층, 수원시, 경기도, 16621",
            guide: "보기",
            latlng: { lat: 37.264162726921, lng: 126.997385539043 },
        },
        {
            local: "경기",
            store: "AK 수원점",
            address: "팔달구 덕영대로 924 1층, 수원시 , 경기도, 16622",
            guide: "보기",
            latlng: { lat: 37.2655920786365, lng: 127.000179930083 },
        },
        {
            local: "경기",
            store: "롯데 평촌점",
            address: "동안구 시민대로 180 , 1층, 안양시, 경기도, 14073",
            guide: "보기",
            latlng: { lat: 37.390002179095, lng: 126.950178643649 },
        },
        {
            local: "서울",
            store: "현대 목동",
            address: "목동동로 257 1층, 양천구, 서울특별시 , 7998",
            guide: "보기",
            latlng: { lat: 37.5273217750941, lng: 126.874619136454 },
        },
        {
            local: "서울",
            store: "더현대 서울점",
            address: "여의대로 108 1층, 영등포구, 서울특별시, 7335",
            guide: "보기",
            latlng: { lat: 37.5251913154781, lng: 126.929112756574 },
        },
        {
            local: "서울",
            store: "신세계 타임스퀘어점",
            address: "영중로 9 1층, 영등포구, 서울특별시 , 7305",
            guide: "보기",
            latlng: { lat: 37.5171899712591, lng: 126.905567071705 },
        },
        {
            local: "서울",
            store: "한남 부티크점",
            address: "이태원로 267 베이지, 용산구, 서울특별시, 4348",
            guide: "보기",
            latlng: { lat: 37.5384987479277, lng: 127.001133061453 },
        },
        {
            local: "경기",
            store: "신세계 경기 용인점",
            address: "수지구 포은대로 536 1층, 용인시, 경기도, 16896",
            guide: "보기",
            latlng: { lat: 37.3249887152059, lng: 127.108118540886 },
        },
        {
            local: "대전",
            store: "신세계 대전점",
            address: "대전 유성구 엑스포로 1, 34121",
            guide: "보기",
            latlng: { lat: 36.3751817693989, lng: 127.381765372066 },
        },
        {
            local: "경기",
            store: "신세계 의정부점",
            address: "평화로 525 신세계 백화점 3층, 의정부시, 경기도, 11696",
            guide: "보기",
            latlng: { lat: 38.0174303716467, lng: 127.06900392384 },
        },
        {
            local: "전북",
            store: "롯데 전주점",
            address: "완산구 온고을로 2 롯데백화점 1층, 전주시, 전라북도, 54946",
            guide: "보기",
            latlng: { lat: 35.8344588976618, lng: 127.121908184239 },
        },
        {
            local: "서울",
            store: "롯데 서울본점",
            address: "남대문로 81 1층, 중구, 서울특별시, 4533",
            guide: "보기",
            latlng: { lat: 37.5647299033135, lng: 126.981730421825 },
        },
        {
            local: "서울",
            store: "롯데 신세계 본점",
            address: "소공로 63 신관 1층, 중구, 서울특별시, 4530",
            guide: "보기",
            latlng: { lat: 37.560919019936, lng: 126.980979034083 },
        },
        {
            local: "대구",
            store: "현대 대구점",
            address: "달구벌대로 2077, 중구, 대구시, 41936",
            guide: "보기",
            latlng: { lat: 35.8666296004242, lng: 128.590625718585 },
        },
        {
            local: "경남",
            store: "롯데 창원점",
            address: "성산구 중앙대로 124 1층, 창원시, 경상남도 , 51494",
            guide: "보기",
            latlng: { lat: 35.2245696276926, lng: 128.681839748806 },
        },
        {
            local: "충남",
            store: "갤러리아 센터시티점",
            address: "서북구 공원로 227(불당동), 천안시, 충청남도, 31168",
            guide: "보기",
            latlng: { lat: 36.800564020263, lng: 127.104726252319 },
        },
        {
            local: "경기",
            store: "스타필드 하남점",
            address: "미사대로 750 2층, 하남시, 경기도 , 12942",
            guide: "보기",
            latlng: { lat: 37.5454041231797, lng: 127.223940331575 },
        },
        {
            local: "부산",
            store: "신세계 센텀시티점",
            address: "센텀남대로 35 1층, 해운대구, 부산광역시, 48058",
            guide: "보기",
            latlng: { lat: 35.1688178394069, lng: 129.129523260187 },
        },
        {
            local: "경기",
            store: "롯데 백화점 동탄점",
            address: "동탄역로 160 2층, 화성시, 경기도, 18478",
            guide: "보기",
            latlng: { lat: 37.200666359626, lng: 127.098203113972 },
        },
    ]

    useEffect(() => {
        setPositions(data.map(item => item.latlng));
    }, []);

    const handleLocationClick = (lat, lng, index) => {
        setCenter({ lat, lng });
        setSelectedMarker(index);
        setZoomLevel(4);
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
            (zoomLevel <= 11 && (
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

    const LocationTable = ({ locationData }) => {
        return (
            <table>
                <colgroup>
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "20%" }} />
                    <col style={{ width: "auto" }} />
                    <col style={{ width: "15%" }} />
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
                            <td>
                                <Link 
                                    className={styles.viewButton}
                                    onClick={() => handleLocationClick(item.latlng.lat, item.latlng.lng, index)}
                                >
                                    {item.guide}
                                </Link>
                            </td>
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
                    <LocationTable locationData={curLocations} />
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

            <Map
                center={center}
                style={{
                    width: "90%",
                    height: "450px",
                    margin: "20px auto",
                }}
                level={zoomLevel}
                onCreate={setMap}
            >
                <MarkerClusterer
                    averageCenter={true}
                    minLevel={11}
                >
                    {positions.map((pos, index) => (
                        <React.Fragment key={`marker-group-${index}`}>
                            <MapMarker
                                key={`${pos.lat}-${pos.lng}`}
                                position={pos}
                                image={selectedMarker === index ? {
                                    src: "http://t1.daumcdn.net/mapjsapi/images/marker.png",
                                    size: { width: 29, height: 42 }
                                } : undefined}
                                onClick={() => setSelectedMarker(index)}

                            />
                            <CustomOverlayMap
                                key={`overlay-${pos.lat}-${pos.lng}`}
                                position={pos}
                            >
                            </CustomOverlayMap>
                        </React.Fragment>
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