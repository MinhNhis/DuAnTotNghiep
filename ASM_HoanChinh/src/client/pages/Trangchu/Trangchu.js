import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader, BeatLoader } from "react-spinners";
import { TableRow } from '@mui/material';

import './style.css';
import { getQuanan, paginator, searchQuanan } from '../../../services/Quanan';
import { baiviet } from '../../../services/Baiviet';
import { BASE_URL } from '../../../config/ApiConfig';
import { getGioithieu } from '../../../services/Gioithieu';
import Menu from '../../components/Menu';
import PaginationRounded from "../../../admin/components/Paginator";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-routing-machine";
import geocodeAddress from '../../components/GeoLocation';
import osm from "../../components/Map/osm-providers";
import { makerIcon, makerIconBlue } from '../../components/Map';
import Routing from '../../components/RoutingMap';
import { getDanhgia } from '../../../services/Danhgia';


const Trangchu = () => {
    const [center, setCenter] = useState({ lat: 10.0452, lng: 105.7469 });
    const ZOOM_LEVEL = 10;
    const mapRef = useRef(null);
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [quanan, setQuanan] = useState([]);
    const [quanan5Km, setQuanan5Km] = useState([]);
    const [gioithieu, setGioithieu] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [loaderSize, setLoaderSize] = useState(100);
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const [baiviets, setBaiViet] = useState([]);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserLocation({ lat: latitude, lng: longitude });
                    setCenter({ lat: latitude, lng: longitude });
                },
                (error) => {
                    console.error("Error getting location:", error);
                }
            );
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
        loadMap();
        BaiViet();
        const handleOnline = () => {
            setIsOnline(true);
            loadMap();
        };

        const handleOffline = () => {
            setIsOnline(false);
            alert("Không có kết nối internet. Vui lòng kiểm tra lại mạng.");
        };

        const handleResize = () => {
            if (window.innerWidth <= 576) {
                setLoaderSize(50); // Mobile size
            } else {
                setLoaderSize(100); // Desktop size
            }
        };
        handleResize();
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        window.addEventListener('resize', handleResize);
        if (navigator.onLine) {
            setIsOnline(true);
            loadMap();
        } else {
            setIsOnline(false);
            alert("Không có kết nối internet. Vui lòng kiểm tra lại mạng.");
        }
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const BaiViet = async (data) => {
        const listbaiviets = await baiviet();
        setBaiViet(listbaiviets.data.slice(0, 3));
    };

    const initData = async (data) => {
        setQuanan(data.data);

        const resultGt = await getGioithieu();
        setGioithieu(resultGt.data);
    };

    const khoangCach = async (startCoords, endCoords) => {
        const osrmUrl = `http://router.project-osrm.org/route/v1/driving/${startCoords.lng},${startCoords.lat};${endCoords.lng},${endCoords.lat}?overview=false`;

        try {
            const response = await fetch(osrmUrl);
            const data = await response.json();

            if (data.routes.length > 0) {
                const distanceInMeters = data.routes[0].distance;
                const distanceInKm = distanceInMeters / 1000;
                return distanceInKm;
            } else {
                console.error("No route found");
                return null;
            }
        } catch (error) {
            console.error("Error calculating driving distance:", error);
            return null;
        }
    };

    const loadMap = async () => {
        setIsLoading(true);
        try {
            const [res, geoPosition] = await Promise.all([
                getQuanan(),
                new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(resolve, reject);
                })
            ]);

            const result = await getDanhgia();
            const quans = res.data;
            const danhgia = result.data;
            const { latitude, longitude } = geoPosition.coords;
            const userCoords = { lat: latitude, lng: longitude };

            setUserLocation(userCoords);

            // Tính toán tất cả trong một vòng lặp duy nhất
            const promises = quans.map(async (item, index) => {
                const delay = index * 3000;
                await new Promise(resolve => setTimeout(resolve, delay));

                const coords = await geocodeAddress(item.dia_chi);
                if (!coords) return null;

                const quanCoords = { lat: coords.lat, lng: coords.lng };
                const Km = await khoangCach(userCoords, quanCoords);
                const distanceInKm = Km ? Km.toFixed(1) : 0;

                // Tính sao trung bình với reduce
                const { totalStars, count } = danhgia.reduce(
                    (acc, e) => {
                        if (e.id_quanan === item.id_quanan) {
                            acc.totalStars += e.sao;
                            acc.count++;
                        }
                        return acc;
                    },
                    { totalStars: 0, count: 0 }
                );

                const startTB = count > 0 ? totalStars / count : 0;

                return distanceInKm !== null ? { ...item, coords, distanceInKm, startTB } : null;
            });

            const results = await Promise.all(promises);

            const fillQuan = results.filter(item => item !== null);
            setLocations(fillQuan);

            // Lọc khoảng cách <= 5 km
            const quan5Km = fillQuan.filter(quan => quan.distanceInKm <= 5).sort((a, b) => a.distanceInKm - b.distanceInKm);
            setQuanan5Km(quan5Km);
        } catch (error) {
            console.error("Error loading map data:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const initData = async (data) => {
        // Tb Sao
        const res = await getDanhgia()
        const danhgia = res.data
        const quan = data.data
        const dataKm = locations
        const promise = quan.map(async (item, index) => {
            const { totalStars, count } = danhgia.reduce(
                (acc, e) => {
                    if (e.id_quanan === item.id_quanan) {
                        acc.totalStars += e.sao;
                        acc.count++;
                    }
                    return acc;
                },
                { totalStars: 0, count: 0 }
            );

            const { distanceInKm } = dataKm.reduce(
                (acc, e) => {
                    if (e.id_quanan === item.id_quanan) {
                        acc.distanceInKm = e.distanceInKm;
                    }
                    return acc;
                },
                { distanceInKm: 0 }
            );

            const startTB = count > 0 ? totalStars / count : 0;
            return { ...item, distanceInKm, startTB };
        })

        if (promise) {
            const results = await Promise.all(promise);
            const fillQuan = results.filter(item => item !== null).sort((a, b) => a.distanceInKm - b.distanceInKm);
            setQuanan(fillQuan)
        } else {
            setQuanan(data.data)
        }
        const resultGt = await getGioithieu();
        setGioithieu(resultGt.data);
    };

    //Tìm kiếm Map
    const [timKiem, setTimKiem] = useState('');
    const [dstimkiem, setDstimkiem] = useState([]);

    const handleChange = async (event) => {
        const value = event.target.value;
        setTimKiem(value);
        if (value) {
            const resultSeach = await searchQuanan(value);
            setDstimkiem(resultSeach.data);
        } else {
            setDstimkiem([]);
        }
    };
    const renderStars = (stars) => {
        return [...Array(5)].map((_, i) => {
            if (i < Math.floor(stars)) {
                return <i key={i} className="fas fa-star text-primary me-2"></i>;
            } else if (i < stars) {
                return <i key={i} className="fas fa-star-half-alt text-primary me-2"></i>;
            } else {
                return <i key={i} className="far fa-star text-primary me-2"></i>;
            }
        });
    };

    return (
        <>
            <div className='container-fluid'>
                <div className="container-fluid bg-light py-3 my-6 mt-0">
                    <div className="container-fluid" style={{ position: 'relative', width: '100%' }}>
                        <MapContainer
                            center={center}
                            zoom={ZOOM_LEVEL}
                            ref={mapRef}
                            zoomControl={false}
                            className="map-container"
                            style={{ width: '100%', border: '10px', borderRadius: '10px' }}
                        >
                            <TileLayer url={osm.maptiler.url} attribution={null} />
                            {isLoading ? (
                                <div className="loading-overlay d-flex justify-content-center align-items-center">
                                    <div className="text-center">
                                        <BounceLoader color="#d4a762" loading={true} size={loaderSize} />
                                        <p className="mt-2 loadingMap" style={{ color: "#d4a762" }}>Loading Map...</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {userLocation && (
                                        <Marker position={[userLocation.lat, userLocation.lng]} icon={makerIconBlue}>
                                            <Popup>
                                                <b>Vị trí của bạn</b><br />
                                            </Popup>
                                        </Marker>
                                    )}
                                    {locations.map((element, index) => (
                                        <Marker key={index} position={[element.coords.lat, element.coords.lng]} icon={makerIcon}>
                                            <Popup>
                                                <img src={`${BASE_URL}/uploads/${element.hinh_anh}`} alt="" style={{ width: "100%" }} /><br />
                                                <b>{element.ten_quan_an}</b><br />
                                                {element.gio_hoat_dong} <br />
                                                {element.distanceInKm} Km <br />
                                                {element.dia_chi}
                                            </Popup>
                                        </Marker>
                                    ))}
                                    {userLocation && quanan5Km && (
                                        quanan5Km.map((value, index) => (
                                            <Routing
                                                key={index}
                                                waypoints={[
                                                    { lat: userLocation.lat, lng: userLocation.lng },
                                                    { lat: value.coords.lat, lng: value.coords.lng },
                                                ]}
                                                obj={value}
                                            />
                                        ))
                                    )}
                                </>
                            )}
                        </MapContainer>

                        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 2000 }}>
                            <div className="input-group mx-auto d-flex">
                                <input
                                    type="search"
                                    className="form-control p-2"
                                    placeholder="Tìm kiếm quán ăn..."
                                    aria-describedby="search-icon-1"
                                    value={timKiem}
                                    onChange={handleChange}
                                />
                            </div>
                            {dstimkiem.length > 0 && (
                                <div className="dropdown-menu show">
                                    {dstimkiem.map((value, index) => (
                                        <Link to={`/chi-tiet/${value.id_quanan}`} key={index} className="dropdown-item" onClick={() => setTimKiem(value?.ten_quan_an)}>
                                            <div className="card mb-3" fullWidth>
                                                <img
                                                    src={`${BASE_URL}/uploads/${value?.hinh_anh}`}
                                                    className="card-img-top"
                                                    alt={value.ten_quan_an}
                                                    style={{ width: "100%" }}
                                                />
                                                <div className="card-body">
                                                    <h5 className="card-title">{value.ten_quan_an}</h5>
                                                    <div><strong>Giờ hoạt động:</strong> {value?.gio_hoat_dong}</div>
                                                    <p style={{
                                                        width: "100%",
                                                        whiteSpace: "normal",
                                                        wordWrap: "break-word"
                                                    }}>
                                                        {value?.dia_chi}
                                                    </p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div className="container-fluid">
                    <div className="container">
                        <div className="text-center wow " data-wow-delay="0.1s">
                            <div className="hr-with-icon-centered">
                                <hr />
                                <i className="fas fa-snowflake"></i>
                                <i className="fas fa-snowflake"></i>
                                <i className="fas fa-snowflake"></i>
                                <hr />
                            </div>
                            <h1 className="display-5 mb-5">Có thể bạn sẽ thích</h1>
                        </div>
                        {isLoading && locations ?
                            <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: '100px' }}>
                                <BeatLoader color="#d4a762" loading={true} size={20} />
                            </div>
                            : <>
                                <div className="row g-5 align-items-center">
                                    {accounts ?
                                        <>
                                            <div className='row mb-3'>
                                                <h2 className='col-12 tittleChil'>Các quán gần đây</h2>
                                                {
                                                    quanan5Km.map((value, index) => {
                                                        return (
                                                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3' key={index} style={{ height: "auto" }}>
                                                                <div className='card'>
                                                                    <Link to={`/chi-tiet/${value.id_quanan}`}>
                                                                        <img src={`${BASE_URL}/uploads/${value?.hinh_anh}`} className="img-fluid rounded" alt="" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                                                    </Link>
                                                                </div>
                                                                <div className='card-body'>
                                                                    <h5 className="tittleQuan" style={{ fontWeight: 'bold' }}>
                                                                        <Link to={`/chi-tiet/${value.id_quanan}`}>{value?.ten_quan_an}</Link>
                                                                    </h5>
                                                                    <div className='mb-1'>{renderStars(value.startTB)}</div>
                                                                    <div className='mb-1'>{value.distanceInKm} Km</div>
                                                                    <div className='mb-1'>Giờ hoạt động: {value.gio_hoat_dong}</div>
                                                                    <div className='mb-1' style={{
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 1,
                                                                        WebkitBoxOrient: 'vertical',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'normal'
                                                                    }}>
                                                                        {value.dia_chi}
                                                                    </div>
                                                                    <div className="text-dark mb-3">
                                                                        {
                                                                            gioithieu.map((gt) => {
                                                                                return (
                                                                                    gt.id_gioithieu === value.id_gioithieu ? (
                                                                                        <div className='gt'
                                                                                            style={{
                                                                                                display: '-webkit-box',
                                                                                                WebkitLineClamp: 2,
                                                                                                WebkitBoxOrient: 'vertical',
                                                                                                overflow: 'hidden',
                                                                                                textOverflow: 'ellipsis',
                                                                                                whiteSpace: 'normal'
                                                                                            }}
                                                                                            key={gt.id_gioithieu}>
                                                                                            {gt.gioi_thieu}
                                                                                        </div>
                                                                                    ) : ''
                                                                                );
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>

                                            <div className='mt-5 row mb-3'><h2 className='col-12 tittleChil'>Tất cả quán</h2>
                                                {
                                                    quanan.map((value, index) => {
                                                        return (
                                                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3' key={index} style={{ height: "auto" }}>
                                                                <div className='card'>
                                                                    <Link to={`/chi-tiet/${value.id_quanan}`}>
                                                                        <img src={`${BASE_URL}/uploads/${value?.hinh_anh}`} className="img-fluid rounded" alt="" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                                                    </Link>
                                                                </div>
                                                                <div className='card-body'>
                                                                    <h5 className="tittleQuan" style={{ fontWeight: 'bold' }}>
                                                                        <Link to={`/chi-tiet/${value.id_quanan}`}>{value?.ten_quan_an}</Link>
                                                                    </h5>
                                                                    <div className='mb-1'>{renderStars(value.startTB)}</div>
                                                                    <div className='mb-1'>{value.distanceInKm} Km</div>
                                                                    <div className='mb-1'>Giờ hoạt động: {value.gio_hoat_dong}</div>
                                                                    <div className='mb-1' style={{
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 1,
                                                                        WebkitBoxOrient: 'vertical',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'normal'
                                                                    }}>
                                                                        {value.dia_chi}
                                                                    </div>
                                                                    <div className="text-dark mb-3">
                                                                        {
                                                                            gioithieu.map((gt) => {
                                                                                return (
                                                                                    gt.id_gioithieu === value.id_gioithieu ? (
                                                                                        <div className='gt'
                                                                                            style={{
                                                                                                display: '-webkit-box',
                                                                                                WebkitLineClamp: 2,
                                                                                                WebkitBoxOrient: 'vertical',
                                                                                                overflow: 'hidden',
                                                                                                textOverflow: 'ellipsis',
                                                                                                whiteSpace: 'normal'
                                                                                            }}
                                                                                            key={gt.id_gioithieu}>
                                                                                            {gt.gioi_thieu}
                                                                                        </div>
                                                                                    ) : ''
                                                                                );
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                            {!isLoading ?
                                                <TableRow
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        marginTop: "20px",
                                                        button: {
                                                            backgroundColor: "#d4a762",
                                                            color: "#fff",
                                                            borderRadius: "50%",
                                                            width: "20px",
                                                            height: "20px",
                                                            fontSize: "0.8rem",
                                                            margin: "0 5px",
                                                            "&.Mui-selected": {
                                                                backgroundColor: "#b0853d",
                                                            }
                                                        },
                                                    }}
                                                >
                                                    <PaginationRounded onDataChange={initData} paginator={paginator}
                                                    />
                                                </TableRow>
                                                : null}
                                        </>
                                        : <>
                                            <div className='row mb-3'>
                                                {
                                                    quanan.map((value, index) => {
                                                        return (
                                                            <div className='col-lg-3 col-md-4 col-sm-6 mb-3' key={index} style={{ height: "auto" }}>
                                                                <div className='card'>
                                                                    <Link to={`/chi-tiet/${value.id_quanan}`}>
                                                                        <img src={`${BASE_URL}/uploads/${value?.hinh_anh}`} className="img-fluid rounded" alt="" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                                                                    </Link>
                                                                </div>
                                                                <div className='card-body'>
                                                                    <h5 className="tittleQuan" style={{ fontWeight: 'bold' }}>
                                                                        <Link to={`/chi-tiet/${value.id_quanan}`}>{value?.ten_quan_an}</Link>
                                                                    </h5>
                                                                    <div className='mb-1'>{renderStars(value.startTB)}</div>
                                                                    <div className='mb-1'>{value.distanceInKm} Km</div>
                                                                    <div className='mb-1'>Giờ hoạt động: {value.gio_hoat_dong}</div>
                                                                    <div className='mb-1' style={{
                                                                        display: '-webkit-box',
                                                                        WebkitLineClamp: 1,
                                                                        WebkitBoxOrient: 'vertical',
                                                                        overflow: 'hidden',
                                                                        textOverflow: 'ellipsis',
                                                                        whiteSpace: 'normal'
                                                                    }}>
                                                                        {value.dia_chi}
                                                                    </div>
                                                                    <div className="text-dark mb-3">
                                                                        {
                                                                            gioithieu.map((gt) => {
                                                                                return (
                                                                                    gt.id_gioithieu === value.id_gioithieu ? (
                                                                                        <div className='gt'
                                                                                            style={{
                                                                                                display: '-webkit-box',
                                                                                                WebkitLineClamp: 2,
                                                                                                WebkitBoxOrient: 'vertical',
                                                                                                overflow: 'hidden',
                                                                                                textOverflow: 'ellipsis',
                                                                                                whiteSpace: 'normal'
                                                                                            }}
                                                                                            key={gt.id_gioithieu}>
                                                                                            {gt.gioi_thieu}
                                                                                        </div>
                                                                                    ) : ''
                                                                                );
                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    })
                                                }
                                            </div>
                                            {!isLoading ?
                                                <TableRow
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        marginTop: "20px",
                                                        button: {
                                                            backgroundColor: "#d4a762",
                                                            color: "#fff",
                                                            borderRadius: "50%",
                                                            width: "20px",
                                                            height: "20px",
                                                            fontSize: "0.8rem",
                                                            margin: "0 5px",
                                                            "&.Mui-selected": {
                                                                backgroundColor: "#b0853d",
                                                            }
                                                        },
                                                    }}
                                                >
                                                    <PaginationRounded onDataChange={initData} paginator={paginator}
                                                    />
                                                </TableRow>
                                                : null}
                                        </>
                                    }

                                </div>
                            </>
                        }

                    </div>
                </div>
                <div className="container-fluid event py-3">
                    <div className="container">
                        <div className="hr-with-icon-centered">
                            <hr />
                            <i className="fas fa-snowflake"></i>
                            <i className="fas fa-snowflake"></i>
                            <i className="fas fa-snowflake"></i>
                            <hr />
                        </div>
                        <Menu />
                    </div>
                </div>
                <div className="container-fluid blog py-3">
                    <div className="container">
                        <div className="hr-with-icon-centered">
                            <hr />
                            <i className="fas fa-snowflake"></i>
                            <i className="fas fa-snowflake"></i>
                            <i className="fas fa-snowflake"></i>
                            <hr />
                        </div>
                        <div className="text-center wow " data-wow-delay="0.1s">
                            <h1 className="display-5 mb-5">Các bài viết nổi bật </h1>
                        </div>
                        <div className="row gx-4 justify-content-center">
                            {baiviets.length > 0 ? (
                                baiviets.map((baiviet, index) => (
                                    <div className="col-md-6 col-lg-4 wow " data-wow-delay="0.1s">
                                        <div className="blog-item">
                                            <div className="overflow-hidden rounded">
                                                <img src={`${BASE_URL}/uploads/${baiviet?.hinh_anh}`} style={{ width: "100%", height: "380px" }} alt="" />
                                            </div>
                                            <div className="blog-content mx-4 d-flex rounded bg-light">
                                                <div className="text-dark bg-primary rounded-start">
                                                    <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                                                        <p className="fw-bold mb-0">{new Date(baiviet.ngay_dang).getDate()}</p>
                                                        <p className="fw-bold mb-0">
                                                            {new Date(baiviet.ngay_dang).toLocaleString('en-US', { month: 'short' })}
                                                        </p>

                                                    </div>
                                                </div>
                                                <a href="/" className="h5 lh-base my-auto h-150 p-3"
                                                    style={{
                                                        ml: 0.5,
                                                        fontSize: "15px",
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        whiteSpace: 'normal',
                                                    }}
                                                >{baiviet.tieu_de}</a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trangchu;