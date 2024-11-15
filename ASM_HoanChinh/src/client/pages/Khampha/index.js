import React from "react";



const KhamPha = () => {
    const khamPha = [
        {
            id: 1,
            name: "Quán ăn Hương Vị Việt - Nơi Hòa Quyện Hương Vị Truyền Thống",
            images: "nhahang1.jpg",
            descript: "Chào mừng quý khách đến với quán ăn Hương Vị Việt - nơi mang đến cho bạn những trải nghiệm ẩm thực đậm chất Việt Nam. Với phong cách truyền thống kết hợp cùng sự sáng tạo hiện đại, chúng tôi tự hào là điểm đến lý tưởng cho những ai yêu thích hương vị truyền thống và không gian ấm cúng."
        },

        {
            id: 2,
            name: "Quán ăn Truyền Thống - Nơi Hòa Quyện Hương Vị Truyền Thống",
            images: "nhahang2.jpg",
            descript: "Chào mừng quý khách đến với nhà hàng chúng tôi - nơi kết hợp hoàn hảo giữa hương vị tinh tế và không gian đẳng cấp Cảm ơn quý khách đã lựa chọn nhà hàng của chúng tôi. Chúng tôi hy vọng sẽ mang đến cho quý vị một trải nghiệm ẩm thực đáng nhớ và thú vị"
        },

        {
            id: 3,
            name: "Quán ăn Mái Ấm - Nơi Hòa Quyện Hương Vị Truyền Thống",
            images: "nhahang3.jpg",
            descript: "Chào mừng quý khách đến với nhà hàng chúng tôi - nơi kết hợp hoàn hảo giữa hương vị tinh tế và không gian đẳng cấp Cảm ơn quý khách đã lựa chọn nhà hàng của chúng tôi. Chúng tôi hy vọng sẽ mang đến cho quý vị một trải nghiệm ẩm thực đáng nhớ và thú vị"
        },
        {
            id: 4,
            name: "Quán ăn Hài Hòa - Nơi Hòa Quyện Hương Vị Truyền Thống",
            images: "nhahang4.jpg",
            descript: "Chào mừng quý khách đến với nhà hàng chúng tôi - nơi kết hợp hoàn hảo giữa hương vị tinh tế và không gian đẳng cấp Cảm ơn quý khách đã lựa chọn nhà hàng của chúng tôi. Chúng tôi hy vọng sẽ mang đến cho quý vị một trải nghiệm ẩm thực đáng nhớ và thú vị"
        },

    ]


    return (
        <>
            <div className="container-fluid bg-light py-6 my-6 mt-0 pb-4">
                <div className="container text-center animated ">
                    <h1 className="display-1 mb-4">Khám Phá Quán Ăn </h1>
                    <ol className="breadcrumb justify-content-center mb-0 animated ">
                        <li className="breadcrumb-item"><a href="/">Trang Chủ</a></li>
                        <li className="breadcrumb-item text-dark" aria-current="page">Khám Phá</li>
                        <li className="breadcrumb-item text-dark" aria-current="page"><a href='/Lien-he'>Liên hệ</a></li>
                    </ol>
                </div>
            </div>

            {khamPha.map((value) => (
                <div className="container py-4">
                    <div className="row g-4 align-items-center">
                        <div className="col-lg-5">
                         <img src={`/images/${value?.images}`} className="img-fluid rounded" style={{ height: "320px", width: "500px" }} alt="Giới Thiệu Nhà Hàng" />
                        </div>
                        <div className="col-lg-7">
                            <h1 className="display-5 mb-4">{value?.name}</h1>
                            <p className="mb-4">{value?.descript}</p>
                            <div className="row g-3 text-dark mb-4">
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
                        </div>
                    </div>
                    <hr />
                </div>
            ))}



            {/* <div className="container-fluid facts py-6">
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
            </div> */}

            {/* <div className="container-fluid team py-6">
                <div className="container">
                    <div className="text-center wow " data-wow-delay="0.1s">
                        <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Đội Ngũ</small>
                        <h1 className="display-5 mb-5">Chúng Tôi Có Đội Ngũ Đầu Bếp Kinh Nghiệm</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6 wow " data-wow-delay="0.1s">
                            <div className="team-item rounded">
                                <img className="img-fluid rounded-top" src="img/team-1.jpg" alt="Đầu Bếp Henry" />
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
                                <img className="img-fluid rounded-top" src="img/team-2.jpg" alt="Đầu Bếp James Born" />
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
                                <img className="img-fluid rounded-top" src="img/team-3.jpg" alt="Đầu Bếp Dony" />
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
                                <img className="img-fluid rounded-top" src="img/team-4.jpg" alt="Đầu Bếp Hana" />
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
            </div> */}
        </>
    );
};

export default KhamPha;
