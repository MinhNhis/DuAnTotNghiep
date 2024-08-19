import React from 'react';
import './style2.css';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addNguoiDung } from '../../../services/Nguoidung';
import { useSnackbar } from "notistack";

const Register = () => {
    const { register, handleSubmit, getValues, formState } = useForm()
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const submit = async (value) => {
        console.log(value);
        await addNguoiDung({
            ten_nguoi_dung: value?.ten_nguoi_dung,
            mat_khau: value?.mat_khau,
            email: value?.email,
            vai_tro: 1,
        })
        enqueueSnackbar("Đăng kí tài khoản thành công!", { variant: "success" });
        navigate("/login")
    }
    return (
        <div className="modal-content mt-5">
            <div className="modal-header">
                <Link to={"/"} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></Link>
            </div>
            <div className="modal-body">
                <div className="form-content">
                    <h2>ĐĂNG KÝ</h2>
                    <form action="#">
                        <div className="input-field mb-3">
                            <input type="text" required className="form-control"
                                {...register("ten_nguoi_dung", {
                                    required: {
                                        value: true,
                                        message: "Tên người dùng không được bỏ trống"
                                    },
                                    minLength: {
                                        value: 3,
                                        message: "Tên người dùng phải nhiều hơn 3 ký tự"
                                    }
                                })}
                            />
                            <label>Tên</label>
                        </div>
                        {formState?.errors?.ten_nguoi_dung && (
                            <small className="text-danger">
                                {formState?.errors?.ten_nguoi_dung?.message}
                            </small>
                        )}
                        <div className="input-field mb-3 mt-5">
                            <input type="text" required className="form-control"
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
                        <div className="input-field mb-3 mt-5">
                            <input type="password" required className="form-control"
                                {...register("mat_khau", {
                                    required: {
                                        value: true,
                                        message: "Mật khẩu không được bỏ trống"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: "Mật khẩu phải ít nhất 6 ký tự"
                                    }
                                })}
                            />
                            <label>Mật Khẩu</label>
                        </div>
                        {formState?.errors?.mat_khau && (
                            <small className="text-danger">
                                {formState?.errors?.mat_khau?.message}
                            </small>
                        )}
                        <div className="input-field mb-3 mt-5">
                            <input type="password" required className="form-control"
                                {...register("xac_nhan_mat_khau", {
                                    required: {
                                        value: true,
                                        message: "Xác nhận mật khẩu không được bỏ trống",
                                    },
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
                        <button type="submit" className="btn btn-primary w-100 mt-3" onClick={handleSubmit(submit)}>Đăng Ký</button>
                    </form>
                    <div className="bottom-link mt-3">
                        Bạn đã có tài khoản?
                        <Link to={"/login"} id="login-link" >Đăng nhập</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;