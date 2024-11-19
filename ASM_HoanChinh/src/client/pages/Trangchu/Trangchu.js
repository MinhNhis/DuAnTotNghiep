import React, { useEffect, useState, Suspense, lazy } from "react";
import { TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import './style.css';
import { getQuanan, paginator } from '../../../services/Quanan/index';
import PaginationRounded from "../../../admin/components/Paginator";
import { baiviet } from '../../../services/Baiviet';
import { getDanhgia } from '../../../services/Danhgia';
import Menu from '../../components/Menu/index'
import { BASE_URL } from '../../../config/ApiConfig';
import useGeolocation from "../../components/Map/useGeolocation";

const Map = lazy(() => import('../../components/Map/index'))
const Trangchu = () => {
    const [quanan, setQUanan] = useState([]);
    const [quananMap, setQuananMap] = useState([]);
    const [baiviets, setBaiViet] = useState([]);
    const [quanan5Km, setQUanan5Km] = useState([]);
    const [locationUser, setLocationUser] = useState(null);
    const location = useGeolocation()
    useEffect(() => {
        setTimeout(()=>{
            initData2()
        }, 5000)

    }, [quanan])
    const initData2 = async () => {
        const resQuan = await getQuanan();
        setQuananMap(resQuan.data);
        const quanan = resQuan.data;

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        await delay(2000);
        // if (location.latitude && location.longitude) {
        //     const promises = quanan.map(async (item, index) => {
        //         const Km = await khoangCach(location.latitude, location.longitude, item.lat, item.lng);
        //         console.log(Km);

        //         const distanceInKm = Km ? Km.toFixed(1) : 0;

        //         return { ...item, distanceInKm };
        //     });
        //     const results = await Promise.all(promises);
        // }


        const resBv = await baiviet();
        setBaiViet(resBv.data.slice(0, 3));
    };

    const khoangCach = async (lat1, lon1, lat2, lon2, retries = 3) => {
        const url = `https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=full&alternatives=true&steps=true`;

        try {
            const response = await fetch(url, { timeout: 1000 });
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                const route = data.routes[0];
                const distance = route.distance / 1000;
                return distance;
            } else {
                return null;
            }
        } catch (error) {
            if (retries > 0) {
                console.warn("Lỗi khi gọi OSRM API, thử lại...", retries);
                return await khoangCach(lat1, lon1, lat2, lon2, retries - 1);
            } else {
                console.error("Lỗi khi gọi OSRM API sau nhiều lần thử:", error);
                return null;
            }
        }
    };

    const initData = async (data) => {
        const res = await getDanhgia();
        const danhgia = res.data
        const quanan = data.data;
        const promises = quanan.map(async (item, index) => {
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
            return { ...item, startTB };
        })

        if (promises) {
            const results = await Promise.all(promises);
            const fillQuan = results.filter(item => item !== null)
            setQUanan(fillQuan)
        } else {
            setQUanan(data.data)
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

    const isOpen = (openTime, closeTime) => {
        const now = new Date();
        const [openHour, openMinute] = openTime.split(':').map(Number);
        const [closeHour, closeMinute] = closeTime.split(':').map(Number);

        const openingTime = new Date(now);
        const closingTime = new Date(now);

        openingTime.setHours(openHour, openMinute, 0);
        closingTime.setHours(closeHour, closeMinute, 0);

        return now >= openingTime && now <= closingTime;
    };

    const capitalizeFirstLetter = (string) => {
        if (!string) return ''; // Kiểm tra chuỗi rỗng
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    return (
        <div className='container-fluid'>
            <div className="container-fluid bg-light py-3 my-6 mt-0">
                <div className="container-fluid" style={{ position: 'relative', width: '100%' }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Map quanan={quananMap} sizeData={quananMap.length} />
                    </Suspense>
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
                    <div className="row g-5 align-items-center">
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
                                                {/* <div className='mb-1'>{value.distanceInKm} Km</div> */}
                                                <div className='mb-1' style={{
                                                    color: isOpen(value.gio_mo_cua, value.gio_dong_cua) ? 'green' : 'red'
                                                }}>
                                                    {isOpen(value.gio_mo_cua, value.gio_dong_cua) ? <p style={{ fontSize: "13px", marginBottom: "0px" }}>{value.gio_mo_cua}- {value.gio_dong_cua} Đang mở cửa</p> : <p style={{ fontSize: "13px", marginBottom: "0px" }}>Đã đóng cửa</p>}
                                                </div>
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
                                                <div className="mb-3 text-dark"
                                                     style={{
                                                         display: '-webkit-box',
                                                         WebkitLineClamp: 2,
                                                         WebkitBoxOrient: 'vertical',
                                                         overflow: 'hidden',
                                                         textOverflow: 'ellipsis',
                                                         whiteSpace: 'normal'
                                                     }}
                                                >
                                                    {value.mo_ta}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>

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
                                        <div className="col-md-6 col-lg-4 wow " data-wow-delay="0.1s" key={index}>
                                            <div className="blog-item">
                                                <div className="overflow-hidden rounded">
                                                    <img src={`${BASE_URL}/uploads/${baiviet?.hinh_anh}`} style={{ width: "100%", height: "380px" }} alt="" />
                                                </div>
                                                <div className="blog-content mx-4 d-flex rounded bg-light">
                                                    <div className="text-dark bg-primary rounded-start">
                                                        <div className="h-100 p-3 d-flex flex-column justify-content-center text-center">
                                                            <p className="fw-bold mb-0">{new Date(baiviet.ngay_dang).getDate()}</p>
                                                            <p className="fw-bold mb-0">
                                                                {new Date(baiviet.ngay_dang).toLocaleString('VN', { month: 'short' })}
                                                            </p>

                                                        </div>
                                                    </div>
                                                    <Link to={"/kham-pha"} className="h5 lh-base my-auto h-150 p-3">
                                                        <p
                                                            style={{
                                                                ml: 0.5,
                                                                fontSize: "16px",
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient: 'vertical',
                                                                whiteSpace: 'normal',
                                                                color: '#D4A762',
                                                                textTransform: 'uppercase',

                                                            }}
                                                        >
                                                            {baiviet.tieu_de}
                                                        </p>
                                                        <p
                                                            style={{
                                                                ml: 0.5,
                                                                fontSize: "13px",
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 3,
                                                                WebkitBoxOrient: 'vertical',
                                                                whiteSpace: 'normal',
                                                                textIndent: '10px',
                                                            }}
                                                        >
                                                            {capitalizeFirstLetter(baiviet.noi_dung)}
                                                        </p>
                                                        <p
                                                            style={{
                                                                ml: 0.5,
                                                                fontSize: "10px",
                                                                overflow: 'hidden',
                                                                textOverflow: 'ellipsis',
                                                                display: '-webkit-box',
                                                                WebkitLineClamp: 1,
                                                                WebkitBoxOrient: 'vertical',
                                                                whiteSpace: 'normal',
                                                                color: 'gray',
                                                            }}
                                                        >
                                                            Tác giả: {baiviet.created_user === 0 ?"FoodSeeker": ""}
                                                        </p>

                                                    </Link>
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
            </div>
        </div>
    );
}

export default Trangchu;
