import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import '../Navbar/nav.css';
import { BASE_URL } from "../../../config/ApiConfig";
import ImgUser from "../../../admin/assets/images/user.png";
import { getNguoiDungById } from "../../../services/Nguoidung";
import Search from "../Search/Search";

const Navbar = () => {
  const accounts = JSON.parse(localStorage.getItem("accounts")) || {}
  const [cookies, removeCookie] = useCookies(["token", "role"]);
  const [nguoidung, setNguoidung] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  useEffect(() => {
    if (accounts && accounts.id_nguoidung) {
      // Chỉ gọi initData nếu nguoidung chưa được thiết lập
      if (!nguoidung || accounts.id_nguoidung !== nguoidung.id_nguoidung) {
        initData();
      }
    }
  }, [accounts, nguoidung]);

  const initData = async () => {
    const resultNguoidung = await getNguoiDungById(accounts.id_nguoidung);
    setNguoidung(resultNguoidung.data);
  }
  const logOut = () => {
    const date = new Date();
    localStorage.setItem("accounts", JSON.stringify(null));
    localStorage.removeItem("Link");
    removeCookie("token", null, { path: "/", expires: date });
    removeCookie("role", null, { path: "/", expires: date });
  };
  const handleOpenDialog = () => {
    setOpenDialog(true); // Mở dialog
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Đóng dialog
  };

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Hàm để đóng navbar
  const closeNavbar = () => {
    setNavbarOpen(false);
  };

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
            onClick={toggleNavbar}  // Thêm hàm mở/tắt navbar
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars text-primary"></span>
          </button>
          <div className={`collapse navbar-collapse ${navbarOpen ? 'show' : ''}`} id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              <Link to="/" className="nav-item nav-link active" onClick={closeNavbar}>
                Trang chủ
              </Link>
              <Link to="/kham-pha" className="nav-item nav-link" onClick={closeNavbar}>
                Khám phá
              </Link>
              <Link to="/" className="nav-item nav-link" onClick={closeNavbar}>
                Thực đơn
              </Link>
              <Link to="/Lien-he" className="nav-item nav-link" onClick={closeNavbar}>
              Liên Hệ
              </Link>
            </div>

            <button
              className="btn-search btn btn-primary btn-md-square me-4 rounded-circle d-none d-lg-inline-flex"
              onClick={handleOpenDialog}
            >
              <i className="fas fa-search"></i>
            </button>

            <Search open={openDialog} onClose={handleCloseDialog} />
            {cookies.role === 1 ? (
              <>
                <div className="nav-item dropdown">
                  <div
                    className="nav-link d-flex align-items-center"
                    data-bs-toggle="dropdown"
                  >
                    <img
                      src={nguoidung?.hinh_anh ? (nguoidung.hinh_anh.startsWith('http') ? nguoidung.hinh_anh : `${BASE_URL}/uploads/${nguoidung.hinh_anh}`) : (accounts.hinh_anh || ImgUser)}
                      alt="User"
                      className="rounded-circle me-2 border-black user-icon"
                    />
                    <p className="icon mt-4">{nguoidung?.ten_nguoi_dung}</p>
                  </div>
                  <div className="dropdown-menu bg-light dropdown-menu-end">
                    <Link to="/profile" className="dropdown-item" onClick={closeNavbar}>
                      Thông tin
                    </Link>
                    <Link to="/login" onClick={logOut} className="dropdown-item">
                      Đăng xuất
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary py-2 px-4 rounded-pill" style={{ marginRight: "50px", width: "150px" }}>
                  Đăng nhập
                </button>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;