import React, { useEffect, useState, Suspense, lazy, useRef } from "react";
import { TableRow } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Link } from 'react-router-dom';
import './style.css';
import { getQuanan, paginator, searchQuanan } from '../../../services/Quanan/index';
import PaginationRounded from "../../../admin/components/Paginator";
import { baiviet } from '../../../services/Baiviet';
import { getDanhgia } from '../../../services/Danhgia';
import Menu from '../../components/Menu/index'
import { BASE_URL } from '../../../config/ApiConfig';
import ORS from 'openrouteservice-js';
import useGeolocation from "../../components/Map/useGeolocation";
const client = new ORS.Directions({
    // api_key: "5b3ce3597851110001cf62481bfe3c5668ca4f02a5a4d522952268ab",
    api_key: "5b3ce3597851110001cf6248a066b1203eb849da836d3446aa790f2f",
});

const Map = lazy(() => import('../../components/Map/index'))
const Trangchu = () => {
    const [quanan, setQUanan] = useState([]);
    const [dg, setDg] = useState([]);
    const [quananMap, setQuananMap] = useState([]);
    const [baiviets, setBaiViet] = useState([]);
    const [quanan5Km, setQUanan5Km] = useState([]);
    const quanan5km = JSON.parse(localStorage.getItem("QUAN_AN5KM"));
    const location = useGeolocation()
    const locationRef = useRef();
    locationRef.current = location;
    const hasCalledRef = useRef(false);

    useEffect(() => {
        initData2()
    }, [])
    const initData2 = async () => {
        const resQuan = await getQuanan();
        setQuananMap(resQuan.data);

        const resBv = await baiviet();
        setBaiViet(resBv.data.slice(0, 3));
    };

    const initData = async (data) => {
        const res = await getDanhgia();
        const danhgia = res.data
        setDg(res.data)
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
    setTimeout(() => {
        checkLoca(quanan5km, dg)
    }, 1000);
    const checkLoca = async (quanan, danhgia, retries = 3) => {
        try {
            if (quanan) {
                const sortedQuanan = [...quanan5km].sort((a, b) => a.distanceKm - b.distanceKm);
                const promises = sortedQuanan.map(async (item, index) => {
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
                    setQUanan5Km(results);
                } else {
                    setQUanan5Km(sortedQuanan);
                }

            } else {
                return null
            }
        } catch (error) {
            if (retries > 0) {
                console.warn("thử lại...", retries);
                return await checkLoca(quanan, retries - 1);
            } else {
                console.error("Lỗi sau nhiều lần thử:", error);
                return null;
            }
        }
    }

    const capitalizeFirstLetter = (string) => {
        if (!string) return '';
        return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const [timKiem, setTimKiem] = useState('');
    const [dstimkiem, setDstimkiem] = useState([]);
    const [checkTimKiem, setCheckTimKiem] = useState(false);

    const checkKm = async (latitude, longitude) => {
        try {
            const currentLocation = locationRef.current;
            if (!currentLocation.latitude || !currentLocation.longitude) {
                console.error("Vị trí người dùng không hợp lệ.");
                return;
            }
            const apiKey = client.defaultArgs.api_key;
            const openRouteServiceUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${currentLocation.longitude},${currentLocation.latitude}&end=${longitude},${latitude}`;
            const response = await fetch(openRouteServiceUrl);
            const data = await response.json();
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} - ${response.statusText}`);
            }
            const distanceKm = (data.features[0].properties.segments[0].distance / 1000).toFixed(1);
            // const timeMinutes = data.features[0].properties.segments[0].duration / 60;
            return distanceKm
        } catch (error) {
            console.log('Lỗi', error);

        }
    }

    const handleSearch = async () => {
        if (timKiem.trim() === "") {
            setDstimkiem([]);
            return;
        }

        try {
            const res = await getDanhgia();
            const danhgia = res.data;
            const ratingLookup = danhgia.reduce((acc, e) => {
                if (!acc[e.id_quanan]) {
                    acc[e.id_quanan] = { totalStars: 0, count: 0 };
                }
                acc[e.id_quanan].totalStars += e.sao;
                acc[e.id_quanan].count++;
                return acc;
            }, {});
            const resultSeach = await searchQuanan(timKiem);
            const promises = resultSeach.data.map(async (item) => {
                const km = await checkKm(item.lat, item.lng);
                const rating = ratingLookup[item.id_quanan] || { totalStars: 0, count: 0 };
                const startTB = rating.count > 0 ? rating.totalStars / rating.count : 0;
                return { ...item, km, startTB };
            });
            const updatedResults = await Promise.all(promises);
            if (updatedResults) {
                const sortedResults = updatedResults.sort((a, b) => a.km - b.km);
                setDstimkiem(sortedResults);
                setCheckTimKiem(true)
            } else {
                setCheckTimKiem(false)
            }

        } catch (error) {
            console.error("Lỗi khi tìm kiếm:", error);
        }
    };


    return (
        <div className='container-fluid'>
            <div className="container-fluid bg-light py-3 my-6 mt-0">
                <div className="container-fluid" style={{ position: 'relative', width: '100%' }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Map quanan={quananMap} sizeData={quananMap.length} />
                    </Suspense>

                    <div style={{ position: 'absolute', top: '10px', left: '50px', zIndex: 2000 }}>
                        <div className="input-group mx-auto d-flex">
                            <input
                                type="search"
                                className="form-control p-2"
                                placeholder="Tìm kiếm quán ăn..."
                                aria-describedby="search-icon-1"
                                value={timKiem}
                                style={{
                                    width: "175px",
                                    outline: 'none',
                                    boxShadow: 'none',
                                    border: 'none'
                                }}
                                onChange={(e) => setTimKiem(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSearch();
                                    }
                                }}
                            />
                            {timKiem && (
                                <button
                                    className="btn btn-light"
                                    type="button"
                                    style={{
                                        backgroundColor: "#FFFFFF	"
                                    }}
                                    onClick={() => {
                                        setTimKiem("");
                                        setDstimkiem([]);
                                        setCheckTimKiem(false)
                                    }}
                                >
                                    <span><ClearIcon /></span>
                                </button>
                            )}
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={handleSearch}
                            >
                                <SearchIcon />
                            </button>
                        </div>
                        {dstimkiem.length > 0 && (
                            <div className="dropdown-menu show">
                                {dstimkiem.map((value, index) => (
                                    <Link
                                        to={`/chi-tiet/${value.id_quanan}`}
                                        key={index}
                                        className="dropdown-item"
                                        onClick={() => setTimKiem(value?.ten_quan_an)}
                                    >
                                        <div className="card mb-3" fullWidth>
                                            <img
                                                src={`${BASE_URL}/uploads/${value?.hinh_anh}`}
                                                className="card-img-top"
                                                alt={value.ten_quan_an}
                                                style={{ width: "100%" }}
                                            />
                                            <div className='card-body'>
                                                <h5 className="tittleQuan" style={{ fontWeight: 'bold' }}>
                                                    {value?.ten_quan_an}
                                                    {value.is_delete === 1 && (
                                                        <span style={{ fontSize: '0.8rem', color: 'red', marginLeft: '5px' }}>
                                                            (Ngừng hoạt động)
                                                        </span>
                                                    )}
                                                </h5>
                                                <div className='mb-1'>{renderStars(value.startTB)}</div>
                                                <div className='mb-1'>{value.km} Km</div>
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
                                    </Link>
                                ))}
                            </div>
                        )}

                        {dstimkiem.length === 0 && checkTimKiem && timKiem != '' && (
                            <div className="dropdown-menu show h-200 text-center">
                                <p className="mb-3 mt-3">Không tìm thấy quán</p>
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
                    <div className="row g-5 align-items-center">
                        <div className='row mb-3'>
                            <h2>{quanan5Km.length > 0 ? 'Quán ăn gần đây' : ''}</h2>
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
                                                    <Link to={`/chi-tiet/${value.id_quanan}`}>
                                                        {value?.ten_quan_an}
                                                        {value.is_delete === 1 && (
                                                            <span style={{ fontSize: '0.8rem', color: 'red', marginLeft: '5px' }}>
                                                                (Ngừng hoạt động)
                                                            </span>
                                                        )}
                                                    </Link>
                                                </h5>

                                                <div className='mb-1'>{renderStars(value.startTB)}</div>
                                                <div className='mb-1'>{value.distanceKm} Km</div>
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
                        <div className='row mb-3'>
                            <h2>Tất cả quán ăn</h2>
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
                                                    <Link to={`/chi-tiet/${value.id_quanan}`}>
                                                        {value?.ten_quan_an}
                                                        {value.is_delete === 1 && (
                                                            <span style={{ fontSize: '0.8rem', color: 'red', marginLeft: '5px' }}>
                                                                (Ngừng hoạt động)
                                                            </span>
                                                        )}
                                                    </Link>
                                                </h5>
                                                <div className='mb-1'>{renderStars(value.startTB)}</div>
                                                {/* <div className='mb-1'>{value.distanceKm} Km</div> */}
                                                <div className='mb-1' style={{
                                                    color: isOpen(value.gio_mo_cua, value.gio_dong_cua) ? 'green' : 'red',
                                                    display: value.is_delete === 1? 'none': 'block'
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
                                                            <p dangerouslySetInnerHTML={{ __html: capitalizeFirstLetter(baiviet.noi_dung) }}></p>
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
                                                            Tác giả: {baiviet.created_user === 2 ? "FoodSeeker" : ""}
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
