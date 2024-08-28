import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack'; // Import useSnackbar
import {
    Card,
    CardContent,
    Divider,
    Box,
    Typography,
    Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addDatcho, getKhachhang, getQuanan } from "../../../../services/Datcho";

const AddDatcho = () => {
    const { register, handleSubmit, formState } = useForm();
    const [quanan, setQuanan] = useState([]);
    const [khachhang, setKhachhang] = useState([]);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const accounts = JSON.parse(localStorage.getItem("accounts"));

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const resultQuanan = await getQuanan();
        setQuanan(resultQuanan.data);

        const resultKh = await getKhachhang();
        setKhachhang(resultKh.data);
    };

    const submit = async (value) => {
        try {
            
            await addDatcho({
                ten_quan: value?.quan_an.split(",")[0],
                ten_kh: value?.khach_hang,
                sdt_kh: value?.sdt,
                email_kh: value?.email,
                thoi_gian_dat: value?.thoi_gian,
                so_luong_nguoi: value?.so_luong,
                trang_thai: 0,
                yeu_cau_khac: value?.yeu_cau,
                id_nguoidung: accounts.id_nguoidung,
                id_quanan: value?.quan_an.split(",")[1]
            });
            enqueueSnackbar('Thêm thành công!', { variant: 'success' });
            navigate("/admin/dat-cho");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra!', { variant: 'error' });
        }
    };

    return (
        <div>
            <Card variant="outlined" sx={{ p: 0, }}>
                <Box sx={{ padding: "15px 30px", }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "bold", }}>
                            THÊM ĐƠN
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <CardContent sx={{ padding: "30px" }}>
                    <form>
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-lable mb-2">Quán ăn</label>
                                    <select className="form-select text-dark" aria-label="Default select example" {...register("quan_an", {
                                        validate: (quan_an) => {
                                            if (quan_an === "-1") {
                                                return "Vui lòng chọn quán ăn"
                                            }
                                            return true
                                        }
                                    })}>
                                        <option selected value={"-1"}>-----Quán ăn-----</option>
                                        {
                                            quanan.map((value, index) => {
                                                return (
                                                    <option key={index} value={[value?.ten_quan_an, value?.id_quanan]} >{value?.ten_quan_an}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {formState?.errors?.quan_an && (
                                        <small className="text-danger">
                                            {formState?.errors?.quan_an?.message}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-lable mb-2">Khách hàng</label>
                                    <select className="form-select text-dark" aria-label="Default select example" {...register("khach_hang", {
                                        validate: (khach_hang) => {
                                            if (khach_hang === "-1") {
                                                return "Vui lòng chọn khách hàng"
                                            }
                                            return true
                                        }
                                    })}>
                                        <option selected value={"-1"}>-----Khách hàng-----</option>
                                        {
                                            khachhang.map((value, index) => {
                                                return (
                                                    <option key={index} value={value?.ten_nguoi_dung} >{value?.ten_nguoi_dung}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    {formState?.errors?.khach_hang && (
                                        <small className="text-danger">
                                            {formState?.errors?.khach_hang?.message}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control text-dark" id="email" placeholder="Email" {...register("email", {
                                        required: {
                                            value: true,
                                            message: "Email không được bỏ trống"
                                        },
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                                            message: "Email không đúng định dạng"
                                        }
                                    })} />
                                    {formState?.errors?.email && (
                                        <small className="text-danger">
                                            {formState?.errors?.email?.message}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-label">Số điện thoại</label>
                                    <input type="number" className="form-control text-dark" id="sdt" placeholder="Số điện thoại" {...register("sdt", {
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
                                    })} />
                                    {formState?.errors?.sdt && (
                                        <small className="text-danger">
                                            {formState?.errors?.sdt?.message}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Thời gian</label>
                                    <input type="date" className="form-control text-dark" id="thoigian" {...register("thoi_gian", {
                                        required: {
                                            value: true,
                                            message: "Thời gian không được bỏ trống"
                                        },
                                    })} />
                                    {formState?.errors?.thoi_gian && (
                                        <small className="text-danger">
                                            {formState?.errors?.thoi_gian?.message}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Số lượng người</label>
                                    <input type="number" className="form-control text-dark" id="soluongnguoi" placeholder="Số lượng người" {...register("so_luong",
                                        {
                                            required: {
                                                value: true,
                                                message: "Số lượng không được bỏ trống"
                                            }
                                        }
                                    )} />
                                    {formState?.errors?.so_luong && (
                                        <small className="text-danger">
                                            {formState?.errors?.so_luong?.message}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Yêu cầu khác</label>
                            <input type="text" className="form-control text-dark" id="yeucau" placeholder="Yêu cầu khác....." {...register("yeu_cau")} />
                        </div>
                        <Button color="primary" variant="contained" onClick={handleSubmit(submit)} style={{ width: "100px" }}>
                            Thêm
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddDatcho;
