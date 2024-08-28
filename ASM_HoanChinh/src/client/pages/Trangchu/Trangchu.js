import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getQuanan } from '../../../services/Quanan';
import { BASE_URL } from '../../../config/ApiConfig';
import { getGioithieu } from '../../../services/Gioithieu';
import Menu from '../../components/Menu';


const Trangchu = () => {
    const [quanan, setQuanan] = useState([]);
    const [gioithieu, setGioithieu] = useState([]);
    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        const result = await getQuanan()
        setQuanan(result.data)

        const resultGt = await getGioithieu()
        setGioithieu(resultGt.data)
    }
    console.log(gioithieu);

    return (
        <>
            <div>
                <div className="modal fade" id="searchModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content rounded-0">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Search by keyword</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body d-flex align-items-center">
                                <div className="input-group w-75 mx-auto d-flex">
                                    <input type="search" className="form-control bg-transparent p-3" placeholder="keywords" aria-describedby="search-icon-1" />
                                    <span id="search-icon-1" className="input-group-text p-3"><i className="fa fa-search"></i></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid bg-light py-3 my-6 mt-0">
                    <div className="container">
                        <div className="row g-5 align-items-center">
                            <div className="col-lg-7 col-md-12">
                                <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-4 animated bounceInDown">Welcome to FoodSeeker</small>
                                <h1 className="display-1 mb-4 animated bounceInDown">Bạn<span className="text-primary">Muốn</span>Ăn Gì?</h1>
                                <a className="btn btn-primary border-0 rounded-pill py-3 px-4 px-md-5 animated bounceInLeft" href='/'>Know More</a>
                            </div>
                            <div className="col-lg-5 col-md-12">
                                <img src="img/hero.png" className="img-fluid rounded animated zoomIn" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="container-fluid service py-3">
                    <div className="container">
                        <div class="hr-with-icon-centered">
                            <hr />
                            <i class="fas fa-snowflake"></i>
                            <i class="fas fa-snowflake"></i>
                            <i class="fas fa-snowflake"></i>
                            <hr />
                        </div>
                        <div id="serviceCarousel" class="carousel slide" data-ride="carousel" >
                            <div class="carousel-inner">
                                <div class="carousel-item active" >
                                    <div class="row g-4">
                                        <div class="col-lg-3 col-md-6 col-sm-12 wow " data-wow-delay="0.1s">
                                            <div class="bg-light rounded service-item">
                                                <div class="service-content d-flex align-items-center justify-content-center p-4">
                                                    <div class="service-content-icon text-center">
                                                        <i class="fas fa-cheese fa-7x text-primary"></i>
                                                        <h4 class="mb-3">Dịch Vụ Tiệc Cưới</h4>
                                                        <p class="mb-4">Chúng tôi cung cấp dịch vụ tiệc cưới với thực đơn đa dạng và phong phú.</p>
                                                        <a href="/" class="btn btn-primary px-4 py-2 rounded-pill">Đọc Thêm</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-12 wow " data-wow-delay="0.3s">
                                            <div class="bg-light rounded service-item">
                                                <div class="service-content d-flex align-items-center justify-content-center p-4">
                                                    <div class="service-content-icon text-center">
                                                        <i class="fas fa-pizza-slice fa-7x text-primary"></i>
                                                        <h4 class="mb-3">Catering Công Ty</h4>
                                                        <p class="mb-4">Dịch vụ catering cho công ty với thực đơn phong phú, phục vụ chuyên nghiệp.</p>
                                                        <a href="/" class="btn btn-primary px-4 py-2 rounded-pill">Đọc Thêm</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-12 wow " data-wow-delay="0.5s">
                                            <div class="bg-light rounded service-item">
                                                <div class="service-content d-flex align-items-center justify-content-center p-4">
                                                    <div class="service-content-icon text-center">
                                                        <i class="fas fa-hotdog fa-7x text-primary"></i>
                                                        <h4 class="mb-3">Tiệc Cocktail</h4>
                                                        <p class="mb-4">Tổ chức tiệc cocktail với các món ăn nhẹ và thức uống đa dạng.</p>
                                                        <a href="/" class="btn btn-primary px-4 py-2 rounded-pill">Đọc Thêm</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-lg-3 col-md-6 col-sm-12 wow " data-wow-delay="0.7s">
                                            <div class="bg-light rounded service-item">
                                                <div class="service-content d-flex align-items-center justify-content-center p-4">
                                                    <div class="service-content-icon text-center">
                                                        <i class="fas fa-hamburger fa-7x text-primary"></i>
                                                        <h4 class="mb-3">Dịch Vụ Bento</h4>
                                                        <p class="mb-4">Chúng tôi cung cấp các suất ăn Bento tiện lợi và ngon miệng.</p>
                                                        <a href="/" class="btn btn-primary px-4 py-2 rounded-pill">Đọc Thêm</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> */}

                <div className="container-fluid py-3">
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
                    
                        <div className="row g-5 align-items-center">
                            {
                                quanan.map((value, index) => {
                                    return (
                                        <div className='col-lg-3' key={index} style={{height: "400px"}}>
                                            <div className='card'>
                                                <div className='row g-5'>
                                                    <div className="col-lg-12 wow " data-wow-delay="0.1s">
                                                        <Link to={`/chi-tiet/${value.id_quanan}`}><img src={`${BASE_URL}/uploads/${value?.hinh_anh}`} className="img-fluid rounded" alt="" style={{ width: "400px", height: "200px" }} /></Link>
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
                        </div>


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