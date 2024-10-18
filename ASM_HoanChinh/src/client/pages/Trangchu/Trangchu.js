import React, { useEffect, useState, Suspense, lazy } from "react";
import { TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import './style.css';
import { paginator } from '../../../services/Quanan/index';
import PaginationRounded from "../../../admin/components/Paginator";
import { getGioithieu } from '../../../services/Gioithieu';
import { baiviet } from '../../../services/Baiviet';
import Menu from '../../components/Menu/index'
import { BASE_URL } from '../../../config/ApiConfig';

const Map = lazy(() => import('../../components/Map/index'))
const Trangchu = () => {
    const [quanan, setQUanan] = useState([]);
    const [gioithieu, setGioithieu] = useState([]);
    const [baiviets, setBaiViet] = useState([]);
    useEffect(() => {
        initData2()
    }, [])
    const initData2 = async () => {
        const res = await getGioithieu();
        setGioithieu(res.data)

        const resBv = await baiviet();
        setBaiViet(resBv.data.slice(0, 3))
    }
    const initData = async (data) => {
        setQUanan(data.data)
    }
    return (
        <div className='container-fluid'>
            <div className="container-fluid bg-light py-3 my-6 mt-0">
                <div className="container-fluid" style={{ position: 'relative', width: '100%' }}>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Map />
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
            </div>
        </div>
    );
}

export default Trangchu;
