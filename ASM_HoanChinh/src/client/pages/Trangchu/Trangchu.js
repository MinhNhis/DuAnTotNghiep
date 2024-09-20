import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BounceLoader, BeatLoader } from "react-spinners";

import './style.css'
import { getQuanan, paginator } from '../../../services/Quanan';
import { BASE_URL } from '../../../config/ApiConfig';
import { getGioithieu } from '../../../services/Gioithieu';
import Menu from '../../components/Menu';
import PaginationRounded from "../../../admin/components/Paginator";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet-routing-machine";
import geocodeAddress from '../../components/GeoLocation';
import osm from "../../components/Map/osm-providers";
import { makerIcon } from '../../components/Map';


const Trangchu = () => {
    const [center, setCenter] = useState({ lat: 10.0452, lng: 105.7469 });
    const ZOOM_LEVEL = 10;
    const mapRef = useRef(null);
    const [locations, setLocations] = useState([]);
    const [userLocation, setUserLocation] = useState(null);
    const [quanan, setQuanan] = useState([]);
    const [quanan20Km, setQuanan20Km] = useState([]);
    const [gioithieu, setGioithieu] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const accounts = JSON.parse(localStorage.getItem("accounts"));

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
    }, []);

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

            const quans = res.data;
            const { latitude, longitude } = geoPosition.coords;
            const userCoords = { lat: latitude, lng: longitude };

            setUserLocation(userCoords);

            const distancePromises = quans.map(async (item) => {
                const coords = await geocodeAddress(item.dia_chi);
                if (!coords) return null;

                const quanCoords = { lat: coords.lat, lng: coords.lng };

                const distanceInKm = await khoangCach(userCoords, quanCoords);
                return distanceInKm !== null ? { ...item, coords, distanceInKm } : null;
            });

            const results = await Promise.all(distancePromises);
            const fillQuan = results.filter(item => item !== null);

            setLocations(fillQuan);

            // Lọc khoảng cách <= 20 km
            const quan20Km = fillQuan.filter(quan => quan.distanceInKm <= 20);
            setQuanan20Km(quan20Km);
        } catch (error) {
            console.error("Error loading map data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div>
                <div className="container-fluid bg-light py-3 my-6 mt-0">
                    <div style={{ position: 'relative', width: '100%' }}>
                        <MapContainer
                            center={center}
                            zoom={ZOOM_LEVEL}
                            ref={mapRef}
                            className="position-relative"
                            style={{ height: '500px', width: '100%', border: '10px', borderRadius: '10px' }}
                        >
                            <TileLayer url={osm.maptiler.url} attribution={null} />
                            {isLoading ? (
                                <div className="loading-overlay d-flex justify-content-center align-items-center">
                                    <div className="text-center">
                                        <BounceLoader color="#d4a762" loading={true} size={100} />
                                        <p className="mt-2" style={{ color: "#d4a762" }}>Loading Map...</p>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {locations.map((element, index) => (
                                        <Marker key={index} position={[element.coords.lat, element.coords.lng]} icon={makerIcon}>
                                            <Popup>
                                                <img src={`${BASE_URL}/uploads/${element.hinh_anh}`} alt="" style={{ width: "100%" }} /><br />
                                                <b>{element.ten_quan_an}</b><br />
                                                {element.gio_hoat_dong} <br />
                                                {element.dia_chi}
                                            </Popup>
                                        </Marker>
                                    ))}
                                </>
                            )}
                        </MapContainer>

                        <div style={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1000 }}>
                            <div className="input-group mx-auto d-flex" style={{ width: '100%'}}>
                                <input
                                    type="search"
                                    className="form-control p-2"
                                    placeholder="Search..."
                                    aria-describedby="search-icon-1"
                                    style={{ backgroundColor: 'white', height: '40px', border: '2px solid #ccc', borderRadius: '50px 0 0 50px' }}
                                />
                                <span
                                    id="search-icon-1"
                                    className="input-group-text p-2"
                                    style={{ backgroundColor: 'white', height: '40px', border: '2px solid #ccc', borderRadius: '0px 50px 50px 0px'}}
                                >
                                    <i className="fa fa-search"></i>
                                </span>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="container-fluid">
                    <div className="container">
                        <div className="text-center wow " data-wow-delay="0.1s">
                            <div class="hr-with-icon-centered">
                                <hr />
                                <i class="fas fa-snowflake"></i>
                                <i class="fas fa-snowflake"></i>
                                <i class="fas fa-snowflake"></i>
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
                                            {
                                                quanan20Km.map((value, index) => {
                                                    return (

                                                        <div className='col-lg-3 mb-3' key={index} style={{ height: "300px" }}>
                                                            <div className='card'>
                                                                <div className='row g-5'>
                                                                    <div className="col-lg-12 wow " data-wow-delay="0.1s">
                                                                        <Link to={`/chi-tiet/${value.id_quanan}`}><img src={`${BASE_URL}/uploads/${value?.hinh_anh}`} className="img-fluid rounded" alt="" style={{ width: "100%", height: "200px" }} /></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='row g-5'>
                                                                <div className="col-lg-12 wow " data-wow-delay="0.3s">
                                                                    <h5 className="display-5 mb-1" style={{ fontSize: '20px', fontWeight: 'bold' }}><Link to={`/chi-tiet/${value.id_quanan}`}>{value?.ten_quan_an}</Link></h5>
                                                                    <div className='mb-2'>
                                                                        Giờ hoạt động: {value.gio_hoat_dong}
                                                                    </div>

                                                                    <div className='mb-2'>
                                                                        <i className="fas fa-star text-primary me-2"></i>
                                                                        <i className="fas fa-star text-primary me-2"></i>
                                                                        <i className="fas fa-star text-primary me-2"></i>
                                                                        <i className="fas fa-star text-primary me-2"></i>
                                                                    </div>
                                                                    <div className="row g-4 text-dark mb-5">
                                                                        {
                                                                            gioithieu.map((gt) => {
                                                                                return (
                                                                                    gt.id_gioithieu === value.id_gioithieu ? <div
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
                                                                                    </div> : ''
                                                                                )

                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                })
                                            }
                                        </>
                                        : <>
                                            {
                                                quanan.map((value, index) => {
                                                    return (
                                                        <div className='col-lg-3 mb-3' key={index} style={{ height: "300px" }}>
                                                            <div className='card'>
                                                                <div className='row g-5'>
                                                                    <div className="col-lg-12 wow " data-wow-delay="0.1s">
                                                                        <Link to={`/chi-tiet/${value.id_quanan}`}><img src={`${BASE_URL}/uploads/${value?.hinh_anh}`} className="img-fluid rounded" alt="" style={{ width: "100%", height: "200px" }} /></Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className='row g-5'>
                                                                <div className="col-lg-12 wow " data-wow-delay="0.3s">
                                                                    <h5 className="display-5 mb-1" style={{ fontSize: '20px', fontWeight: 'bold' }}><Link to={`/chi-tiet/${value.id_quanan}`}>{value?.ten_quan_an}</Link></h5>
                                                                    <div className='mb-2'>
                                                                        Giờ hoạt động: {value.gio_hoat_dong}
                                                                    </div>

                                                                    <div className='mb-2'>
                                                                        <i className="fas fa-star text-primary me-2"></i>
                                                                        <i className="fas fa-star text-primary me-2"></i>
                                                                        <i className="fas fa-star text-primary me-2"></i>
                                                                        <i className="fas fa-star text-primary me-2"></i>
                                                                    </div>
                                                                    <div className="row g-4 text-dark mb-5">
                                                                        {
                                                                            gioithieu.map((gt) => {
                                                                                return (
                                                                                    gt.id_gioithieu === value.id_gioithieu ? <div
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
                                                                                    </div> : ''
                                                                                )

                                                                            })
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    )
                                                })
                                            }
                                            <div className='mt-5 mb-3' style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                                                <PaginationRounded onDataChange={initData} paginator={paginator} />
                                            </div>
                                        </>
                                    }

                                </div>
                            </>
                        }

                    </div>
                </div>
                <div className="container-fluid event py-3">
                    <div className="container">
                        <div class="hr-with-icon-centered">
                            <hr />
                            <i class="fas fa-snowflake"></i>
                            <i class="fas fa-snowflake"></i>
                            <i class="fas fa-snowflake"></i>
                            <hr />
                        </div>
                        <Menu />
                    </div>
                </div>
                <div className="container-fluid blog py-3">
                    <div className="container">
                        <div class="hr-with-icon-centered">
                            <hr />
                            <i class="fas fa-snowflake"></i>
                            <i class="fas fa-snowflake"></i>
                            <i class="fas fa-snowflake"></i>
                            <hr />
                        </div>
                        <div className="text-center wow " data-wow-delay="0.1s">
                            <h1 className="display-5 mb-5">Các bài viết nổi bật </h1>
                        </div>
                        <div className="row gx-4 justify-content-center">
                            <div className="col-md-6 col-lg-4 wow " data-wow-delay="0.1s">
                                <div className="blog-item">
                                    <div className="overflow-hidden rounded">
                                        <img src="img/blog-1.jpg" className="img-fluid w-100" alt="" />
                                    </div>
                                    <div className="blog-content mx-4 d-flex rounded bg-light">
                                        <div className="text-dark bg-primary rounded-start">
                                            <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                                                <p className="fw-bold mb-0">16</p>
                                                <p className="fw-bold mb-0">Sep</p>
                                            </div>
                                        </div>
                                        <a href="/" className="h5 lh-base my-auto h-100 p-3">How to get more test in your food from</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 wow " data-wow-delay="0.3s">
                                <div className="blog-item">
                                    <div className="overflow-hidden rounded">
                                        <img src="img/blog-2.jpg" className="img-fluid w-100" alt="" />
                                    </div>
                                    <div className="blog-content mx-4 d-flex rounded bg-light">
                                        <div className="text-dark bg-primary rounded-start">
                                            <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                                                <p className="fw-bold mb-0">16</p>
                                                <p className="fw-bold mb-0">Sep</p>
                                            </div>
                                        </div>
                                        <a href="/" className="h5 lh-base my-auto h-100 p-3">How to get more test in your food from</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-lg-4 wow " data-wow-delay="0.5s">
                                <div className="blog-item">
                                    <div className="overflow-hidden rounded">
                                        <img src="img/blog-3.jpg" className="img-fluid w-100" alt="" />
                                    </div>
                                    <div className="blog-content mx-4 d-flex rounded bg-light">
                                        <div className="text-dark bg-primary rounded-start">
                                            <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                                                <p className="fw-bold mb-0">16</p>
                                                <p className="fw-bold mb-0">Sep</p>
                                            </div>
                                        </div>
                                        <a href="/" className="h5 lh-base my-auto h-100 p-3">How to get more test in your food from</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trangchu;