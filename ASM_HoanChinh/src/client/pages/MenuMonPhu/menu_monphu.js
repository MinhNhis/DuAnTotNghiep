import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';



const MenuMonPhu = () => {
    const [menu,setMenu] = useState([]);
    useEffect(() => {
        initData();
    },[]);
    

    const initData = async () => {
        // const result = await getMenu();
        // setMenu(result);        
    }


    return (
        <>
            <div className="container-fluid py-3">
                    <div className="container">
                        <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
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
                            <div className='col-lg-3'>
                                <div className='card'>
                                    <div className='row'>
                                        <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.1s">
                                            <Link to={''}><img src="img/about.jpg" className="img-fluid rounded" alt="" /></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.3s">
                                        <h5 className="display-5 mb-1" style={{ fontSize: '20px', fontWeight: 'bold' }}><Link to={''}>{}</Link></h5>
                                        <div className='mb-3'>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                        </div>
                                        <div className="row g-4 text-dark mb-5">
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Giờ giảm giá đặc biệt
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Phần ăn nhỏ
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Phần ăn lớn
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Bia
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='card'>
                                    <div className='row'>
                                        <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.1s">
                                            <Link to={''}><img src="img/about.jpg" className="img-fluid rounded" alt="" /></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.3s">
                                        <h5 className="display-5 mb-1" style={{ fontSize: '20px', fontWeight: 'bold' }}><Link to={''}>Trusted By 200 + satisfied clients</Link></h5>
                                        <div className='mb-3'>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                        </div>
                                        <div className="row g-4 text-dark mb-5">
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Giờ giảm giá đặc biệt
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Phần ăn nhỏ
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Phần ăn lớn
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Bia
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='card'>
                                    <div className='row'>
                                        <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.1s">
                                            <Link to={''}><img src="img/about.jpg" className="img-fluid rounded" alt="" /></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.3s">
                                        <h5 className="display-5 mb-1" style={{ fontSize: '20px', fontWeight: 'bold' }}><Link to={''}>Trusted By 200 + satisfied clients</Link></h5>
                                        <div className='mb-3'>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                        </div>
                                        <div className="row g-4 text-dark mb-5">
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Giờ giảm giá đặc biệt
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Phần ăn nhỏ
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Phần ăn lớn
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Bia
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3'>
                                <div className='card'>
                                    <div className='row'>
                                        <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.1s">
                                            <Link to={''}><img src="img/about.jpg" className="img-fluid rounded" alt="" /></Link>
                                        </div>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className="col-lg-12 wow bounceInUp" data-wow-delay="0.3s">
                                        <h5 className="display-5 mb-1" style={{ fontSize: '20px', fontWeight: 'bold' }}><Link to={''}>Trusted By 200 + satisfied clients</Link></h5>
                                        <div className='mb-3'>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                            <i className="fas fa-star text-primary me-2"></i>
                                        </div>
                                        <div className="row g-4 text-dark mb-5">
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Giờ giảm giá đặc biệt
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Phần ăn nhỏ
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Phần ăn lớn
                                            </div>
                                            <div className="col-sm-6">
                                                <i className="fas fa-share text-primary me-2"></i>Bia
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        <div className="text-center wow bounceInUp" data-wow-delay="0.1s">
                            <h1 className="display-5 mb-5">Our Social & Professional Events Gallery</h1>
                        </div>
                        <div className="tab-className text-center">
                            <ul className="nav nav-pills d-inline-flex justify-content-center mb-5 wow bounceInUp" data-wow-delay="0.1s">
                                <li className="nav-item p-2">
                                    <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill active" data-bs-toggle="pill" href="#tab-1">
                                        <span className="text-dark" style={{ width: '150px' }}>All Events</span>
                                    </a>
                                </li>
                                <li className="nav-item p-2">
                                    <a className="d-flex py-2 mx-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-2">
                                        <span className="text-dark" style={{ width: '150px' }}>Wedding</span>
                                    </a>
                                </li>
                                <li className="nav-item p-2">
                                    <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-3">
                                        <span className="text-dark" style={{ width: '150px' }}>Corporate</span>
                                    </a>
                                </li>
                                <li className="nav-item p-2">
                                    <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-4">
                                        <span className="text-dark" style={{ width: '150px' }}>Cocktail</span>
                                    </a>
                                </li>
                                <li className="nav-item p-2">
                                    <a className="d-flex mx-2 py-2 border border-primary bg-light rounded-pill" data-bs-toggle="pill" href="#tab-5">
                                        <span className="text-dark" style={{ width: '150px' }}>Buffet</span>
                                    </a>
                                </li>
                            </ul>
                            <div className="tab-content">
                                <div id="tab-1" className="tab-pane fade show p-0 active">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                                <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.1s">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-1.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Wedding</h4>
                                                            <a href="img/event-1.jpg" data-lightbox="event-1" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.3s">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-2.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Corporate</h4>
                                                            <a href="img/event-2.jpg" data-lightbox="event-2" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.5s">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-3.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Wedding</h4>
                                                            <a href="img/event-3.jpg" data-lightbox="event-3" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.7s">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-4.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Buffet</h4>
                                                            <a href="img/event-4.jpg" data-lightbox="event-4" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.1s">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-5.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Cocktail</h4>
                                                            <a href="img/event-5.jpg" data-lightbox="event-5" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.3s">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-6.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Wedding</h4>
                                                            <a href="img/event-6.jpg" data-lightbox="event-6" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.5s">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-7.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Buffet</h4>
                                                            <a href="img/event-7.jpg" data-lightbox="event-7" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3 wow bounceInUp" data-wow-delay="0.7s">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-8.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Corporate</h4>
                                                            <a href="img/event-8.jpg" data-lightbox="event-17" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-2" className="tab-pane fade show p-0">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                                <div className="col-md-6 col-lg-3">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-1.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Wedding</h4>
                                                            <a href="img/01.jpg" data-lightbox="event-8" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-2.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Wedding</h4>
                                                            <a href="img/01.jpg" data-lightbox="event-9" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-3" className="tab-pane fade show p-0">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                                <div className="col-md-6 col-lg-3">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-3.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Corporate</h4>
                                                            <a href="img/01.jpg" data-lightbox="event-10" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-4.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Corporate</h4>
                                                            <a href="img/01.jpg" data-lightbox="event-11" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-4" className="tab-pane fade show p-0">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                                <div className="col-md-6 col-lg-3">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-5.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Cocktail</h4>
                                                            <a href="img/01.jpg" data-lightbox="event-12" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-6.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Cocktail</h4>
                                                            <a href="img/01.jpg" data-lightbox="event-13" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="tab-5" className="tab-pane fade show p-0">
                                    <div className="row g-4">
                                        <div className="col-lg-12">
                                            <div className="row g-4">
                                                <div className="col-md-6 col-lg-3">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-7.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Buffet</h4>
                                                            <a href="img/01.jpg" data-lightbox="event-14" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-lg-3">
                                                    <div className="event-img position-relative">
                                                        <img className="img-fluid rounded w-100" src="img/event-8.jpg" alt="" />
                                                        <div className="event-overlay d-flex flex-column p-4">
                                                            <h4 className="me-auto">Buffet</h4>
                                                            <a href="img/01.jpg" data-lightbox="event-15" className="my-auto"><i className="fas fa-search-plus text-dark fa-2x"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>

    )
}

export default MenuMonPhu;