import React, { useEffect, useState } from "react";



const Profile = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts"))
    const maskPassword = (mat_khau) => {
        if (!mat_khau) return '';
        return '*'.repeat(mat_khau.length);
    };
    return (
        <>
            <div className="container-fluid py-6">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-12 wow " data-wow-delay="0.3s">
                            <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Chi Tiết</small>
                            <h3 className="display-5 mb-4">Thông tin cá nhân </h3>

                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-6">
                                        <p className="mb-4">
                                            <strong className="text-dark">Tên người dùng:</strong> {accounts?.ten_nguoi_dung}<br />
                                            <strong className="text-dark">Email:</strong> {accounts?.email}<br />
                                            <strong className="text-dark">Mật khẩu:</strong> {maskPassword(accounts?.mat_khau)}<br />
                                        </p>
                                    </div>
                                </div>

                                <hr />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
