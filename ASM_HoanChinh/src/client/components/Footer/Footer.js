import React from "react";

const Footer = () => {
    return (
        <div className="container-fluid footer py-6 my-6 mb-0 bg-light wow " data-wow-delay="0.1s">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h1 className="text-primary">Food<span className="text-dark">Seeker</span></h1>
                            <p className="lh-lg mb-4">Chúng tôi mang đến những món ăn ngon và dịch vụ tốt nhất cho khách hàng. Hãy đến và thưởng thức những món ăn đặc biệt của chúng tôi.</p>
                            <div className="footer-icon d-flex">
                                <a className="btn btn-primary btn-sm-square me-2 rounded-circle" href="/"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-primary btn-sm-square me-2 rounded-circle" href="/"><i className="fab fa-twitter"></i></a>
                                <a href="/" className="btn btn-primary btn-sm-square me-2 rounded-circle"><i className="fab fa-instagram"></i></a>
                                <a href="/" className="btn btn-primary btn-sm-square rounded-circle"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="mb-4">Dịch Vụ Đặc Biệt</h4>
                            <div className="d-flex flex-column align-items-start">
                                <a className="text-body mb-3" href="/"><i className="fa fa-check text-primary me-2"></i>Bánh Burger Phô Mai</a>
                                <a className="text-body mb-3" href="/"><i className="fa fa-check text-primary me-2"></i>Bánh Sandwich</a>
                                <a className="text-body mb-3" href="/"><i className="fa fa-check text-primary me-2"></i>Bánh Burger Panner</a>
                                <a className="text-body mb-3" href="/"><i className="fa fa-check text-primary me-2"></i>Đặc Biệt Ngọt</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="mb-4">Liên Hệ</h4>
                            <div className="d-flex flex-column align-items-start">
                                <p><i className="fa fa-map-marker-alt text-primary me-2"></i> 123 Đường, New York, Mỹ</p>
                                <p><i className="fa fa-phone-alt text-primary me-2"></i> (+012) 3456 7890 123</p>
                                <p><i className="fas fa-envelope text-primary me-2"></i> info@example.com</p>
                                <p><i className="fa fa-clock text-primary me-2"></i> Dịch Vụ 24/7</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div className="footer-item">
                            <h4 className="mb-4">Thư Viện Mạng Xã Hội</h4>
                            <div className="row g-2">
                                <div className="col-4">
                                    <img src="img/menu-01.jpg" className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                </div>
                                <div className="col-4">
                                    <img src="img/menu-02.jpg" className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                </div>
                                <div className="col-4">
                                    <img src="img/menu-03.jpg" className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                </div>
                                <div className="col-4">
                                    <img src="img/menu-04.jpg" className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                </div>
                                <div className="col-4">
                                    <img src="img/menu-05.jpg" className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                </div>
                                <div className="col-4">
                                    <img src="img/menu-06.jpg" className="img-fluid rounded-circle border border-primary p-2" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;
