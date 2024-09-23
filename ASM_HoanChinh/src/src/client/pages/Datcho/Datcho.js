import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Grid } from '@mui/material';


import { useForm } from "react-hook-form";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getQuananById } from "../../../services/Quanan";
import { addDatcho } from "../../../services/Datcho";
import { useCookies } from "react-cookie";
import { useSnackbar } from "notistack";

const DatCho = () => {
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const { register, handleSubmit, formState } = useForm()
    const accounts = JSON.parse(localStorage.getItem("accounts"))
    const [quanan, setQuanan] = useState([])

    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        const resultQa = await getQuananById(id)
        setQuanan(resultQa.data)
    }

    const submit = async (value) => {
        await addDatcho({
            ten_quan: quanan.ten_quan_an,
            ten_kh: value?.ten_kh,
            sdt_kh: value?.sdt,
            email_kh: value?.email,
            thoi_gian_dat: value?.thoi_gian,
            so_luong_nguoi: value?.so_luong,
            trang_thai: 0,
            yeu_cau_khac: value?.yeu_cau,
            id_nguoidung: accounts.id_nguoidung,
            id_quanan: id
        })
        enqueueSnackbar("Đặt chỗ thành công!", { variant: "success" });
        navigate("/chi-tiet-don")
    }

    const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);

    useEffect(() => {
        getUserInfo();
    }, [cookies]);

    const getUserInfo = async () => {
        const accounts = JSON.parse(localStorage.getItem("accounts"))

        if (accounts?.vai_tro !== cookies.vai_tro) {
            setCookie("role", accounts?.vai_tro);
        }
    };
    const handleCancle = () => {
        navigate(`/chi-tiet/${quanan.id_quanan}`)
    }
    return cookies?.token && cookies?.role === 1 ? (
        <>
            <div className="container-fluid contact py-3 wow " data-wow-delay="0.1s">
                <div className="container">
                    <div className="p-5 bg-light rounded contact-form">
                        <div className="row g-4">

                            <div className="col-12">
                                <small className="d-inline-block fw-bold text-dark text-uppercase bg-light border border-primary rounded-pill px-4 py-1 mb-3">Đặt Chỗ</small>
                                <h1 className="display-5 mb-0">Đặt chỗ cho bữa ăn của bạn ở quán: {quanan.ten_quan_an}
                                </h1>
                            </div>
                            <div className="col-md-12 mb-4">
                                <Box component="form" noValidate autoComplete="off">
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="name"
                                                label="Tên của bạn"
                                                variant="outlined"
                                                required
                                                defaultValue={accounts.ten_nguoi_dung}
                                                sx={{ mb: 3 }}
                                                {
                                                ...register("ten_kh", {
                                                    required: {
                                                        value: true,
                                                        message: "Tên của bạn không được để trống"
                                                    }
                                                })
                                                }
                                            />
                                            {formState?.errors?.ten_kh && (
                                                <small className="text-danger">
                                                    {formState?.errors?.ten_kh?.message}
                                                </small>
                                            )}
                                        </Grid>

                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                type="number"
                                                fullWidth
                                                id="phone"
                                                label="Số điện thoại"
                                                variant="outlined"
                                                required
                                                sx={{ mb: 3 }}
                                                {...register("sdt", {
                                                    required: {
                                                        value: true,
                                                        message: "Số điện thoai không được bỏ trống"
                                                    },
                                                    maxLength: {
                                                        value: 10,
                                                        message: "Sô điện thoại phải 10 số"
                                                    },
                                                    minLength: {
                                                        value: 10,
                                                        message: "Sô điện thoại phải 10 số"
                                                    }
                                                })}
                                            />
                                            {formState?.errors?.sdt && (
                                                <small className="text-danger">
                                                    {formState?.errors?.sdt?.message}
                                                </small>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="date"
                                                label="Thời gian"
                                                type="date"
                                                InputLabelProps={{ shrink: true }}
                                                variant="outlined"
                                                required
                                                sx={{ mb: 3 }}
                                                {...register("thoi_gian", {
                                                    required: {
                                                        value: true,
                                                        message: "Thời gian không được bỏ trống"
                                                    },
                                                    validate: (thoi_gian) => {
                                                        const selectedDate = new Date(thoi_gian);
                                                        const today = new Date();
                                                        today.setHours(0, 0, 0, 0);

                                                        if (selectedDate < today) {
                                                            return "Thời gian không được nhỏ hơn ngày hiện tại";
                                                        }

                                                        return true;
                                                    }
                                                })}

                                            />
                                            {formState?.errors?.thoi_gian && (
                                                <small className="text-danger">
                                                    {formState?.errors?.thoi_gian?.message}
                                                </small>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="guests"
                                                label="Số lượng khách"
                                                type="number"
                                                variant="outlined"
                                                required
                                                sx={{ mb: 3 }}
                                                {...register("so_luong",
                                                    {
                                                        required: {
                                                            value: true,
                                                            message: "Số lượng không được bỏ trống"
                                                        }
                                                    }
                                                )}
                                            />
                                            {formState?.errors?.so_luong && (
                                                <small className="text-danger">
                                                    {formState?.errors?.so_luong?.message}
                                                </small>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="guests"
                                                label="Email"
                                                type="email"
                                                variant="outlined"
                                                defaultValue={accounts.email}
                                                required
                                                sx={{ mb: 3 }}
                                                {...register("email", {
                                                    required: {
                                                        value: true,
                                                        message: "Email không được bỏ trống"
                                                    },
                                                    pattern: {
                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                                                        message: "Email không đúng định dạng"
                                                    }
                                                })}
                                            />
                                            {formState?.errors?.email && (
                                                <small className="text-danger">
                                                    {formState?.errors?.email?.message}
                                                </small>
                                            )}
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <TextField
                                                fullWidth
                                                id="guests"
                                                label="Yêu cầu khác"
                                                type="text"
                                                variant="outlined"
                                                required
                                                sx={{ mb: 3 }}
                                                {...register("yeu_cau", {
                                                    required: {
                                                        value: true,
                                                        message: "Yêu cầu không được bỏ trống"
                                                    }
                                                })}
                                            />
                                            {formState?.errors?.yeu_cau && (
                                                <small className="text-danger">
                                                    {formState?.errors?.yeu_cau?.message}
                                                </small>
                                            )}


                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Box display="flex" alignItems="center" className="mb-3">
                                                <Button
                                                    style={{ width: "100px", backgroundColor: "#d4a762", color: "white", marginRight: "-10px" }} // Màu vàng đất
                                                    onClick={handleSubmit(submit)}
                                                    className="mt-5"
                                                >
                                                    Đặt chỗ
                                                </Button>
                                                <Button
                                                    style={{ width: "100px", backgroundColor: "#d4a762", color: "white", marginLeft: "20px" }} // Màu vàng đất
                                                    onClick={handleCancle}
                                                    className="mt-5"
                                                >
                                                    Hủy
                                                </Button>
                                            </Box>


                                        </Grid>
                                    </Grid>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : <Navigate to={"/login"} />
};

export default DatCho;
