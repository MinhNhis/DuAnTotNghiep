// Thêm các import cần thiết ở đầu file nếu chưa có
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addNguoiDung } from "../../../services/Nguoidung";
import { useSnackbar } from "notistack";

const Register = () => {
    const { register, handleSubmit, getValues, formState } = useForm();
    const navigate = useNavigate();
    const [check, setCheck] = useState(false);
    const [checkLuuY, setCheckLuuY] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleCheckboxChange = (event) => {
        setCheck(event.target.checked);
    };

    const handleCheckLuuY = (event) => {
        setCheckLuuY(event.target.checked);
    };

    const submit = async (value) => {
        try{
            await addNguoiDung({
                ten_nguoi_dung: value?.ten_nguoi_dung,
                mat_khau: value?.mat_khau,
                email: value?.email,
                so_dien_thoai: value?.so_dien_thoai,
                dia_chi: value?.dia_chi,
                vai_tro: check ? 2 : 1,
            });
            enqueueSnackbar("Đăng kí tài khoản thành công!", { variant: "success" });
            navigate("/login");
        }catch(error){
            if (error.response && error.response.data.message === "Email đã tồn tại") {
                enqueueSnackbar('Email đã tồn tại, vui lòng thử email khác!', { variant: 'error' });
            } else {
                enqueueSnackbar('Có lỗi xảy ra khi thêm người dùng!', { variant: 'error' });
            }
        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="col-12 col-sm-10 col-md-8 col-lg-4 col-xl-3">
                <div className="card shadow-sm p-4 border-3">
                    <div className="card-header bg-transparent border-0 pb-0">
                        <Link to="/" className="btn-close position-absolute top-0 end-0 mt-2 me-2"></Link>
                    </div>
                    <div className="card-body">
                        <h4 className="text-center mb-3 fw-bold">ĐĂNG KÝ</h4>
                        <form onSubmit={handleSubmit(submit)} className="text-center">

                            {/* Tên người dùng */}
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Họ và tên"
                                    {...register("ten_nguoi_dung", {
                                        required: "Tên người dùng không được bỏ trống",
                                        minLength: { value: 3, message: "Tên người dùng phải nhiều hơn 3 ký tự" },
                                    })}
                                />
                                {formState?.errors?.ten_nguoi_dung && (
                                    <small className="text-danger"style={{ textAlign: "left", display: "block", marginTop: "5px" }}>
                                        {formState?.errors?.ten_nguoi_dung?.message}</small>
                                )}
                            </div>

                            {/* Email */}
                            <div className="form-group mb-3">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    {...register("email", {
                                        required: "Email không được bỏ trống",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Email không hợp lệ",
                                        },
                                    })}
                                />
                                {formState?.errors?.email && (
                                    <small className="text-danger"style={{ textAlign: "left", display: "block", marginTop: "5px" }}>
                                        {formState?.errors?.email?.message}</small>
                                )}
                            </div>

                            {/* Mật khẩu */}
                            <div className="form-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Mật khẩu"
                                    {...register("mat_khau", {
                                        required: "Mật khẩu không được bỏ trống",
                                        minLength: { value: 6, message: "Mật khẩu phải ít nhất 6 ký tự" },
                                    })}
                                />
                                {formState?.errors?.mat_khau && (
                                    <small className="text-danger"style={{ textAlign: "left", display: "block", marginTop: "5px" }}>
                                        {formState?.errors?.mat_khau?.message}</small>
                                )}
                            </div>

                            {/* Xác nhận mật khẩu */}
                            <div className="form-group mb-3">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Xác nhận mật khẩu"
                                    {...register("xac_nhan_mat_khau", {
                                        required: "Xác nhận mật khẩu không được bỏ trống",
                                        validate: (value) => value === getValues("mat_khau") || "Mật khẩu không khớp",
                                    })}
                                />
                                {formState?.errors?.xac_nhan_mat_khau && (
                                    <small className="text-danger"style={{ textAlign: "left", display: "block", marginTop: "5px" }}>
                                        {formState?.errors?.xac_nhan_mat_khau?.message}</small>
                                )}
                            </div>

                            {/* Số điện thoại */}
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Số điện thoại"
                                    {...register("so_dien_thoai", {
                                        required: "Số điện thoại không được bỏ trống",
                                        minLength: { value: 10, message: "Số điện thoại phải có ít nhất 10 chữ số" },
                                    })}
                                />
                                {formState?.errors?.so_dien_thoai && (
                                    <small className="text-danger"style={{ textAlign: "left", display: "block", marginTop: "5px" }}>
                                        {formState?.errors?.so_dien_thoai?.message}</small>
                                )}
                            </div>

                            {/* Địa chỉ */}
                            <div className="form-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Địa chỉ"
                                    {...register("dia_chi", {
                                        required: "Địa chỉ không được bỏ trống",
                                        minLength: { value: 5, message: "Địa chỉ phải có ít nhất 5 ký tự" },
                                    })}
                                />
                                {formState?.errors?.dia_chi && (
                                    <small className="text-danger"style={{ textAlign: "left", display: "block", marginTop: "5px" }}>
                                        {formState?.errors?.dia_chi?.message}</small>
                                )}
                            </div>
                            {/* Checkbox Đăng ký quán ăn */}
                            <div className="form-check mb-3">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={check}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label"style={{marginRight:"130px"}}>Đăng kí chủ quán?</label>
                            </div>

                            {check && (
                                <div className="form-check mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        checked={checkLuuY}
                                        onChange={handleCheckLuuY}
                                    />
                                    <label className="form-check-label">
                                        <span style={{ color: "red" }}>*</span>Lưu ý: Nếu đăng quán bạn sẽ cần phải trả phí. Bạn có đồng ý không?
                                    </label>
                                </div>
                            )}

                            <button type="submit" className="btn btn-primary w-100 mt-3" disabled={check && !checkLuuY}>
                                Đăng ký
                            </button>
                        </form>
                        <p className="text-center mt-3">
                            Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;