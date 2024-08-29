import React from "react";
import "./style2.css";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addNguoiDung } from "../../../services/Nguoidung";
import { useSnackbar } from "notistack";

const Register = () => {
    const { register, handleSubmit, getValues, formState } = useForm();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const submit = async (value) => {
        try{
            await addNguoiDung({
                ten_nguoi_dung: value?.ten_nguoi_dung,
                mat_khau: value?.mat_khau,
                email: value?.email,
                so_dien_thoai: value?.so_dien_thoai,
                ngay_sinh: value?.ngay_sinh,
                gioi_tinh: value?.gioi_tinh,
                dia_chi: value?.dia_chi,
                hinh_anh: value?.hinh_anh[0] || '',
                vai_tro: 1,
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
        <div className="modal-content mt-3">
            <div className="modal-header">
                <Link
                    to={"/"}
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></Link>
            </div>
            <div className="modal-body">
                <div className="form-content">
                    <h2>ĐĂNG KÝ</h2>
                    <form className="text-dark" action="#">
                        <div className="input-field mb-3">
                            <input
                                type="text"
                                required
                                className="form-control"
                                {...register("ten_nguoi_dung", {
                                    required: "Tên người dùng không được bỏ trống",
                                    minLength: {
                                        value: 3,
                                        message: "Tên người dùng phải nhiều hơn 3 ký tự",
                                    },
                                })}
                            />
                            <label>Họ và tên</label>
                        </div>
                        {formState?.errors?.ten_nguoi_dung && (
                            <small className="text-danger">
                                {formState?.errors?.ten_nguoi_dung?.message}
                            </small>
                        )}

                        {/* Email */}
                        <div className="input-field mb-3 mt-3">
                            <input
                                type="text"
                                required
                                className="form-control"
                                {...register("email", {
                                    required: "Email không được bỏ trống",
                                    pattern: {
                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                                        message: "Email không hợp lệ",
                                    },
                                })}
                            />
                            <label>Email</label>
                        </div>
                        {formState?.errors?.email && (
                            <small className="text-danger">
                                {formState?.errors?.email?.message}
                            </small>
                        )}

                        {/* mật khẩu*/}
                        <div className="input-field mb-3 mt-3">
                            <input
                                type="password"
                                required
                                className="form-control"
                                {...register("mat_khau", {
                                    required: "Mật khẩu không được bỏ trống",
                                    minLength: {
                                        value: 6,
                                        message: "Mật khẩu phải ít nhất 6 ký tự",
                                    },
                                })}
                            />
                            <label>Mật Khẩu</label>
                        </div>
                        {formState?.errors?.mat_khau && (
                            <small className="text-danger">
                                {formState?.errors?.mat_khau?.message}
                            </small>
                        )}

                        {/* nhập lại mật  khẩu */}
                        <div className="input-field mb-3 mt-3">
                            <input
                                type="password"
                                required
                                className="form-control"
                                {...register("xac_nhan_mat_khau", {
                                    required: "Xác nhận mật khẩu không được bỏ trống",
                                    minLength: {
                                        value: 6,
                                        message: "Xác nhận mật khẩu ít nhất có 6 ký tự",
                                    },
                                    validate: (xac_nhan_mat_khau) => {
                                        const mat_khau = getValues()?.mat_khau;
                                        if (xac_nhan_mat_khau === mat_khau) {
                                            return true;
                                        }
                                        return "Mật khẩu và xác nhận không trùng nhau";
                                    },
                                })}
                            />
                            <label>Xác Nhận Mật Khẩu</label>
                        </div>
                        {formState?.errors?.xac_nhan_mat_khau && (
                            <small className="text-danger">
                                {formState?.errors?.xac_nhan_mat_khau?.message}
                            </small>
                        )}

                        {/* điện thoại */}
                        <div className="input-field mb-3 mt-3">
                            <input
                                type="text"
                                required
                                className="form-control"
                                {...register("so_dien_thoai", {
                                    required: "Số điện thoại không được bỏ trống",
                                    pattern: {
                                        value: /^[0-9]+$/,
                                        message: "Số điện thoại không hợp lệ",
                                    },
                                    minLength: {
                                        value: 10,
                                        message: "Số điện thoại phải có ít nhất 10 chữ số",
                                    },
                                })}
                            />
                            <label>Số Điện Thoại</label>
                        </div>
                        {formState?.errors?.so_dien_thoai && (
                            <small className="text-danger">
                                {formState?.errors?.so_dien_thoai?.message}
                            </small>
                        )}

                        {/* ngày sinh */}
                        <div className="input-field mb-3 mt-3">
                            <input
                                type="date"
                                required
                                className="form-control"
                                {...register("ngay_sinh", {
                                    required: "Ngày sinh không được bỏ trống",
                                    validate: (ngay_sinh) => {
                                        const selectedDate = new Date(ngay_sinh);
                                        const today = new Date();
                                        today.setHours(0, 0, 0, 0);

                                        if (selectedDate > today) {
                                            return "Ngày sinh không hợp lệ!";
                                        }

                                        return true;
                                    }
                                })}
                            />
                            <label>Ngày Sinh</label>
                        </div>
                        {formState?.errors?.ngay_sinh && (
                            <small className="text-danger">
                                {formState?.errors?.ngay_sinh?.message}
                            </small>
                        )}

                        {/* img */}
                        <div className="input-field mb-3 mt-3">
                            <input
                                type="file"
                                className="form-control"
                                {...register("hinh_anh")}
                            />
                            <label>Hình ảnh</label>
                        </div>
                        {/* Giới tính */}
                        <div className="mb-3 mt-3">
                            <label>Giới tính</label>
                            <div className="d-flex align-items-center">
                                <div className="form-check me-4">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gioi_tinh"
                                        id="gioi_tinh_nam"
                                        value="Nam"
                                        {...register("gioi_tinh", {
                                            required: "Vui lòng chọn giới tính",
                                        })}
                                    />
                                    <label className="form-check-label" htmlFor="gioi_tinh_nam">
                                        Nam
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gioi_tinh"
                                        id="gioi_tinh_nu"
                                        value="Nữ"
                                        {...register("gioi_tinh", {
                                            required: "Vui lòng chọn giới tính",
                                        })}
                                    />
                                    <label className="form-check-label" htmlFor="gioi_tinh_nu">
                                        Nữ
                                    </label>
                                </div>
                            </div>
                        </div>
                        {formState?.errors?.gioi_tinh && (
                            <small className="text-danger">
                                {formState?.errors?.gioi_tinh?.message}
                            </small>
                        )}

                        {/* địa chỉ */}
                        <div className="input-field mb-3 mt-3">
                            <input
                                type="text"
                                required
                                className="form-control"
                                {...register("dia_chi", {
                                    required: "Địa chỉ không được bỏ trống",
                                    minLength: {
                                        value: 5,
                                        message: "Địa chỉ phải có ít nhất 5 ký tự",
                                    },
                                })}
                            />
                            <label>Địa Chỉ</label>
                        </div>
                        {formState?.errors?.dia_chi && (
                            <small className="text-danger">
                                {formState?.errors?.dia_chi?.message}
                            </small>
                        )}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mt-3"
                            onClick={handleSubmit(submit)}
                        >
                            Đăng Ký
                        </button>
                    </form>
                    <div className="bottom-link mt-3">
                        Bạn đã có tài khoản?
                        <Link to={"/login"} id="login-link">
                            Đăng nhập
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
