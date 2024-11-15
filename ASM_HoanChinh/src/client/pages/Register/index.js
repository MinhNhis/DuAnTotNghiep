import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addNguoiDung } from "../../../services/Nguoidung";
import { useSnackbar } from "notistack";
import { TextField, Button } from "@mui/material";

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
        try {
            await addNguoiDung({
                ten_nguoi_dung: value?.ten_nguoi_dung,
                mat_khau: value?.mat_khau,
                email: value?.email,
                so_dien_thoai: value?.so_dien_thoai,
                dia_chi: value?.dia_chi,
                vai_tro: check ? 2 : 1,
                stk: check && value.stk? value.stk : null,
                ngan_hang: check && value.ngan_hang ? value.ngan_hang : null,
                ctk: check && value.ctk ? value.ctk : null
            });
            enqueueSnackbar("Đăng kí tài khoản thành công!", { variant: "success" });
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data.message === "Email đã tồn tại") {
                enqueueSnackbar("Email đã tồn tại, vui lòng thử email khác!", { variant: "error" });
            } else {
                enqueueSnackbar("Có lỗi xảy ra khi thêm người dùng!", { variant: "error" });
            }
        }
    };

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

                            {/* ten nguoi dung */}
                            <div className="form-group mb-1">
                                <TextField
                                    label="Họ và tên"
                                    variant="outlined"
                                    fullWidth
                                    {...register("ten_nguoi_dung", {
                                        required: "Tên người dùng không được bỏ trống",
                                        minLength: { value: 3, message: "Tên người dùng phải nhiều hơn 3 ký tự" },
                                    })}
                                    error={!!formState.errors.ten_nguoi_dung}
                                    helperText={formState.errors.ten_nguoi_dung?.message}
                                    sx={{
                                        mb: 2,
                                        "& .MuiInputBase-root": {
                                            height: "40px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiInputLabel-root": {
                                            top: "-5px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            fontSize: "0.75rem",
                                            marginTop: "2px",
                                            marginLeft: "2px",
                                        },
                                    }}
                                />
                            </div>

                            {/* Email */}
                            <div className="form-group mb-1">
                                <TextField
                                    label="Email"
                                    type="email"
                                    variant="outlined"
                                    fullWidth
                                    {...register("email", {
                                        required: "Email không được bỏ trống",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Email không hợp lệ",
                                        },
                                    })}
                                    error={!!formState.errors.email}
                                    helperText={formState.errors.email?.message}
                                    sx={{
                                        mb: 2,
                                        "& .MuiInputBase-root": {
                                            height: "40px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiInputLabel-root": {
                                            top: "-5px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            fontSize: "0.75rem",
                                            marginTop: "2px",
                                            marginLeft: "2px",
                                        },
                                    }}
                                />
                            </div>

                            {/* mat khau */}
                            <div className="form-group mb-1">
                                <TextField
                                    label="Mật khẩu"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    {...register("mat_khau", {
                                        required: "Mật khẩu không được bỏ trống",
                                        minLength: { value: 6, message: "Mật khẩu phải ít nhất 6 ký tự" },
                                    })}
                                    error={!!formState.errors.mat_khau}
                                    helperText={formState.errors.mat_khau?.message}
                                    sx={{
                                        mb: 2,
                                        "& .MuiInputBase-root": {
                                            height: "40px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiInputLabel-root": {
                                            top: "-5px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            fontSize: "0.75rem",
                                            marginTop: "2px",
                                            marginLeft: "2px",
                                        },
                                    }}
                                />
                            </div>

                            {/* nhap lai mat khau */}
                            <div className="form-group mb-1">
                                <TextField
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    {...register("xac_nhan_mat_khau", {
                                        required: "Xác nhận mật khẩu không được bỏ trống",
                                        validate: (value) => value === getValues("mat_khau") || "Mật khẩu không khớp",
                                    })}
                                    error={!!formState.errors.xac_nhan_mat_khau}
                                    helperText={formState.errors.xac_nhan_mat_khau?.message}
                                    sx={{
                                        mb: 2,
                                        "& .MuiInputBase-root": {
                                            height: "40px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiInputLabel-root": {
                                            top: "-5px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            fontSize: "0.75rem",
                                            marginTop: "2px",
                                            marginLeft: "2px",
                                        },
                                    }}
                                />
                            </div>

                            {/* so dien thoai */}
                            <div className="form-group mb-1">
                                <TextField
                                    label="Số điện thoại"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    {...register("so_dien_thoai", {
                                        required: "Số điện thoại không được bỏ trống",
                                        minLength: { value: 10, message: "Số điện thoại phải có ít nhất 10 chữ số" },
                                    })}
                                    error={!!formState.errors.so_dien_thoai}
                                    helperText={formState.errors.so_dien_thoai?.message}
                                    sx={{
                                        mb: 2,
                                        "& .MuiInputBase-root": {
                                            height: "40px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiInputLabel-root": {
                                            top: "-5px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            fontSize: "0.75rem",
                                            marginTop: "2px",
                                            marginLeft: "2px",
                                        },
                                    }}
                                />
                            </div>

                            {/* dia chi */}
                            <div className="form-group mb-1">
                                <TextField
                                    label="Địa chỉ"
                                    type="text"
                                    variant="outlined"
                                    fullWidth
                                    {...register("dia_chi", {
                                        required: "Địa chỉ không được bỏ trống",
                                        minLength: { value: 5, message: "Địa chỉ phải có ít nhất 5 ký tự" },
                                    })}
                                    error={!!formState.errors.dia_chi}
                                    helperText={formState.errors.dia_chi?.message}
                                    sx={{
                                        mb: 2,
                                        "& .MuiInputBase-root": {
                                            height: "40px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiInputLabel-root": {
                                            top: "-5px",
                                            fontSize: "0.9rem",
                                        },
                                        "& .MuiFormHelperText-root": {
                                            fontSize: "0.75rem",
                                            marginTop: "2px",
                                            marginLeft: "2px",
                                        },
                                    }}
                                />
                            </div>

                            {/* Checkbox chu quan*/}
                            <div className="form-check mb-1">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={check}
                                    onChange={handleCheckboxChange}
                                />
                                <label className="form-check-label ms-2" style={{ textAlign: "left", display: "block" }}>Đăng kí chủ quán?</label>
                            </div>

                            {check && (
                                <>
                                    {/* <div className="form-group mb-1 mt-3">
                                        <TextField
                                            label="Số tài khoản"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            {...register("stk", {
                                                required: "Số tài khoản không được bỏ trống",
                                            })}
                                            error={!!formState.errors.stk}
                                            helperText={formState.errors.stk?.message}
                                            sx={{
                                                mb: 2,
                                                "& .MuiInputBase-root": {
                                                    height: "40px",
                                                    fontSize: "0.9rem",
                                                },
                                                "& .MuiInputLabel-root": {
                                                    top: "-5px",
                                                    fontSize: "0.9rem",
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    fontSize: "0.75rem",
                                                    marginTop: "2px",
                                                    marginLeft: "2px",
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <TextField
                                            label="Ngân hàng"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            {...register("ngan_hang", {
                                                required: "Ngân hàng không được bỏ trống",
                                            })}
                                            error={!!formState.errors.ngan_hang}
                                            helperText={formState.errors.ngan_hang?.message}
                                            sx={{
                                                mb: 2,
                                                "& .MuiInputBase-root": {
                                                    height: "40px",
                                                    fontSize: "0.9rem",
                                                },
                                                "& .MuiInputLabel-root": {
                                                    top: "-5px",
                                                    fontSize: "0.9rem",
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    fontSize: "0.75rem",
                                                    marginTop: "2px",
                                                    marginLeft: "2px",
                                                },
                                            }}
                                        />
                                    </div>
                                    <div className="form-group mb-1">
                                        <TextField
                                            label="Chủ tài khoản"
                                            type="text"
                                            variant="outlined"
                                            fullWidth
                                            {...register("ctk", {
                                                required: "Chủ tài khoản không được bỏ trống",
                                            })}
                                            error={!!formState.errors.ctk}
                                            helperText={formState.errors.ctk?.message}
                                            sx={{
                                                mb: 2,
                                                "& .MuiInputBase-root": {
                                                    height: "40px",
                                                    fontSize: "0.9rem",
                                                },
                                                "& .MuiInputLabel-root": {
                                                    top: "-5px",
                                                    fontSize: "0.9rem",
                                                },
                                                "& .MuiFormHelperText-root": {
                                                    fontSize: "0.75rem",
                                                    marginTop: "2px",
                                                    marginLeft: "2px",
                                                },
                                            }}
                                        />
                                    </div> */}
                                    <div className="form-check mb-1">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={checkLuuY}
                                            onChange={handleCheckLuuY}
                                        />
                                        <label className="form-check-label ms-2">
                                            <span style={{ color: "red" }}>*</span>Lưu ý: Nếu đăng quán bạn sẽ cần phải trả phí. Bạn có đồng ý không?
                                        </label>
                                    </div>
                                </>
                            )}

                            <Button type="submit" className="btn btn-primary w-100" disabled={check && !checkLuuY}
                            sx={{
                                borderRadius: "5px",
                                height: "37px",
                                backgroundColor: "#d4a762",
                                color: "white",
                                fontWeight: "bold",
                              }}>
                                Đăng ký
                            </Button>
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