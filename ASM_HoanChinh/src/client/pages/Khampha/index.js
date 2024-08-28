import React from "react";



const KhamPha = () => {
    return (
        <>
            <div className="container-fluid bg-light py-6 my-6 mt-0">
                <div className="container text-center animated ">
                    <h1 className="display-1 mb-4">Khám Phá Nhà Hàng</h1>
                    <ol className="breadcrumb justify-content-center mb-0 animated ">
                        <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                        <li className="breadcrumb-item text-dark" aria-current="page">Khám Phá</li>
                    </ol>
                </div>
            </div>
            
            <div className="container-fluid py-6">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-5 wow " data-wow-delay="0.1s">
                            <img src="img/about.jpg" className="img-fluid rounded" alt="Giới Thiệu Nhà Hàng"/>
                        </div>
                        <div className="col-lg-7 wow " data-wow-delay="0.3s">
                            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Giới Thiệu</small>
                            <h1 className="display-5 mb-4">Phục Vụ Món Ăn Ngon Hơn 10 Năm</h1>
                            <p className="mb-4">
                                Chào mừng đến với nhà hàng của chúng tôi, nơi chúng tôi cung cấp đa dạng các món ăn được làm từ nguyên liệu tươi ngon. Sứ mệnh của chúng tôi là mang đến trải nghiệm ẩm thực khó quên với dịch vụ xuất sắc và không gian thân thiện. Dù bạn đến đây cho một bữa ăn bình thường hay một dịp đặc biệt, chúng tôi luôn nỗ lực để mỗi lần ghé thăm của bạn trở nên đáng nhớ.
                            </p>
                            <div className="row g-4 text-dark mb-5">
                                <div className="col-sm-6">
                                    <i className="fas fa-share text-primary me-2"></i>Giao Hàng Nhanh Và Tươi
                                </div>
                                <div className="col-sm-6">
                                    <i className="fas fa-share text-primary me-2"></i>Hỗ Trợ Khách Hàng 24/7
                                </div>
                                <div className="col-sm-6">
                                    <i className="fas fa-share text-primary me-2"></i>Tùy Chỉnh Dễ Dàng
                                </div>
                                <div className="col-sm-6">
                                    <i className="fas fa-share text-primary me-2"></i>Ưu Đãi Ngon Cho Bữa Ăn Ngon
                                </div>
                            </div>
                            <a href="/about" className="btn btn-primary py-3 px-5 rounded-pill">Tìm Hiểu Thêm<i className="fas fa-arrow-right ps-2"></i></a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid facts py-6">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-7">
                            <div className="row g-4">
                                <div className="col-sm-4 wow " data-wow-delay="0.3s">
                                    <div className="fact-item bg-primary rounded p-4 text-center">
                                        <i className="fas fa-users fa-4x mb-4 text-white"></i>
                                        <h1 className="display-4 fw-bold" data-toggle="counter-up">689</h1>
                                        <p className="text-dark text-uppercase fw-bold mb-0">Khách Hàng Hài Lòng</p>
                                    </div>
                                </div>
                                <div className="col-sm-4 wow " data-wow-delay="0.5s">
                                    <div className="fact-item bg-primary rounded p-4 text-center">
                                        <i className="fas fa-users-cog fa-4x mb-4 text-white"></i>
                                        <h1 className="display-4 fw-bold" data-toggle="counter-up">107</h1>
                                        <p className="text-dark text-uppercase fw-bold mb-0">Đầu Bếp Chuyên Nghiệp</p>
                                    </div>
                                </div>
                                <div className="col-sm-4 wow " data-wow-delay="0.7s">
                                    <div className="fact-item bg-primary rounded p-4 text-center">
                                        <i className="fas fa-check fa-4x mb-4 text-white"></i>
                                        <h1 className="display-4 fw-bold" data-toggle="counter-up">253</h1>
                                        <p className="text-dark text-uppercase fw-bold mb-0">Sự Kiện Hoàn Thành</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 wow " data-wow-delay="0.1s">
                            <div className="video">
                                <button type="button" className="btn btn-play" data-bs-toggle="modal" data-src="https://www.youtube.com/embed/DWRcNpR6Kdc" data-bs-target="#videoModal">
                                    <span></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="modal fade" id="videoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content rounded-0">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Video Giới Thiệu</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="ratio ratio-16x9">
                                <iframe className="embed-responsive-item" title="ifr" src="" id="video" allowFullScreen allowscriptaccess="always"
                                    allow="autoplay" ></iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid team py-6">
                <div className="container">
                    <div className="text-center wow " data-wow-delay="0.1s">
                        <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Đội Ngũ</small>
                        <h1 className="display-5 mb-5">Chúng Tôi Có Đội Ngũ Đầu Bếp Kinh Nghiệm</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6 wow " data-wow-delay="0.1s">
                            <div className="team-item rounded">
                                <img className="img-fluid rounded-top" src="img/team-1.jpg" alt="Đầu Bếp Henry"/>
                                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                                    <h4 className="text-primary">Henry</h4>
                                    <p className="text-white mb-0">Đầu Bếp Trang Trí</p>
                                </div>
                                <div className="team-icon d-flex flex-column justify-content-center m-4">
                                    <a className="share btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fas fa-share-alt"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-twitter"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow " data-wow-delay="0.3s">
                            <div className="team-item rounded">
                                <img className="img-fluid rounded-top" src="img/team-2.jpg" alt="Đầu Bếp James Born"/>
                                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                                    <h4 className="text-primary">James Born</h4>
                                    <p className="text-white mb-0">Bếp Trưởng</p>
                                </div>
                                <div className="team-icon d-flex flex-column justify-content-center m-4">
                                    <a className="share btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fas fa-share-alt"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-twitter"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow " data-wow-delay="0.5s">
                            <div className="team-item rounded">
                                <img className="img-fluid rounded-top" src="img/team-3.jpg" alt="Đầu Bếp Dony"/>
                                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                                    <h4 className="text-primary">Dony</h4>
                                    <p className="text-white mb-0">Đầu Bếp Bánh</p>
                                </div>
                                <div className="team-icon d-flex flex-column justify-content-center m-4">
                                    <a className="share btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fas fa-share-alt"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-twitter"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow " data-wow-delay="0.7s">
                            <div className="team-item rounded">
                                <img className="img-fluid rounded-top" src="img/team-4.jpg" alt="Đầu Bếp Hana"/>
                                <div className="team-content text-center py-3 bg-dark rounded-bottom">
                                    <h4 className="text-primary">Hana</h4>
                                    <p className="text-white mb-0">Đầu Bếp Phụ</p>
                                </div>
                                <div className="team-icon d-flex flex-column justify-content-center m-4">
                                    <a className="share btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fas fa-share-alt"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-facebook-f"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-twitter"></i></a>
                                    <a className="share-link btn btn-primary btn-md-square rounded-circle mb-2" href="/"><i className="fab fa-instagram"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default KhamPha;
