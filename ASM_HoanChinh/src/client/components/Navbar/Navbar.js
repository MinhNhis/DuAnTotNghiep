import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Login from '../../pages/Login';
import Register from '../../pages/Register';
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);
  const navigate = useNavigate()
  const logOut = () => {
    const date = new Date();
    localStorage.setItem("accounts", JSON.stringify(null))
    removeCookie("token", null, { path: "/", expires: date });
    removeCookie("role", null, { path: "/", expires: date });
  }

  return (
    <div className="container-fluid nav-bar">
      <div className="container">
        <nav className="navbar navbar-light navbar-expand-lg py-4">
          <Link to="/" className="navbar-brand">
            <h1 className="text-primary fw-bold mb-0">
              Food<span className="text-dark">Seeker</span>
            </h1>
          </Link>
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars text-primary"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              <Link to="/" className="nav-item nav-link active">
                Trang chủ
              </Link>
              <Link to="/kham-pha" className="nav-item nav-link">
                Khám phá
              </Link>
              {/* <div className="nav-item dropdown">
                <div
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Đánh giá
                </div>
                <div className="dropdown-menu bg-light">
                  <Link to="/danh-gia" className="dropdown-item">
                    Viết đánh giá
                  </Link>
                  <Link to="/chi-tiet" className="dropdown-item">
                    Xem đánh giá
                  </Link>
                </div>
              </div> */}
            </div>
            {cookies.role == 1 ?
              <>

                <div className="nav-item dropdown">
                  <div className="nav-link dropdown-toggle d-flex align-items-center" data-bs-toggle="dropdown">
                    <img src="./img/user.png" alt="User" className="rounded-circle me-2 border-black" style={{ width: '40px', height: '40px' }} />
                  </div>

                  <div className="dropdown-menu bg-light">
                    <Link to="/profile" className="dropdown-item">
                      Thông tin
                    </Link>
                    <Link to="/chi-tiet-don" className="dropdown-item">
                      Đơn đặt chỗ
                    </Link>
                    <Link to={"/login"} onClick={logOut} className="dropdown-item">
                      LogOut
                    </Link>
                  </div>
                </div>
                {/* <button onClick={logOut} className="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill" style={{ marginRight: '50px', width: '150px' }} >
                  Đăng xuất
                </button> */}
              </>
              : <Link to={"/login"}>
                <button
                  className="btn btn-primary py-2 px-4 d-none d-xl-inline-block rounded-pill"
                  style={{ marginRight: '50px', width: '150px' }}
                >
                  Đăng nhập
                </button>
              </Link>
            }

            <button
              className="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex"
              data-bs-toggle="modal"
              data-bs-target="#searchModal"
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
