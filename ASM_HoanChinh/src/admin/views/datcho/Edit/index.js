import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { editDatcho, getDatchoById, getKhachhang, getQuanan } from "../../../../services/Datcho";
import { useSnackbar } from 'notistack';
import { getNguoiDung } from "../../../../services/Nguoidung";

const EditDatcho = () => {
    const { register, handleSubmit, setValue, formState } = useForm();
    const [datcho, setDatcho] = useState(null);
    const [quanan, setQuanan] = useState([]);
    const [khachhang, setKhachhang] = useState([]);
    const [nguoidungs, setNguoidung] = useState([])
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id_datcho;
    const { enqueueSnackbar } = useSnackbar();

    const accounts = JSON.parse(localStorage.getItem("accounts"));

    const handleCancel = () => {
        navigate('/admin/dat-cho');
    };

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        try {
            const resultQuanan = await getQuanan();
            setQuanan(resultQuanan.data);

            const resultKh = await getKhachhang();
            setKhachhang(resultKh.data);

            const resultNd = await getNguoiDung();
            setNguoidung(resultNd.data)

            const result = await getDatchoById(id);
            setDatcho(result.data);
            setValue('quan_an', result.data.ten_quan || '');
            setValue('khach_hang', result.data.ten_kh || '');
            setValue('email', result.data.email_kh || '');
            setValue('sdt', result.data.sdt_kh || '');
            setValue('thoi_gian', result.data.thoi_gian_dat || '');
            setValue('so_luong', result.data.so_luong_nguoi || '');
            setValue('yeu_cau', result.data.yeu_cau_khac || '');
            setValue('trang_thai', result.data.trang_thai || '-1');
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const submit = async (value) => {
        console.log(value);

        try {
            const nguoidung = nguoidungs.find((e) => e.id_nguoidung === datcho.id_nguoidung)
            console.log(nguoidung);

            await editDatcho(id, {
                ten_quan: value?.quan_an.split(",")[0],
                ten_kh: value?.khach_hang,
                sdt_kh: value?.sdt,
                email_kh: value?.email,
                thoi_gian_dat: value?.thoi_gian,
                so_luong_nguoi: value?.so_luong,
                trang_thai: value?.trang_thai,
                yeu_cau_khac: value?.yeu_cau,
                id_nguoidung: nguoidung.id_nguoidung,
                id_quanan: value?.quan_an.split(",")[1]
            });
            enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
            navigate("/admin/dat-cho");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra!', { variant: 'error' });
        }
    };

    return (
        <div>
            <Card variant="outlined" sx={{ p: 0 }}>
                <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                            CẬP NHẬT ĐƠN
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
                                    <input type="text" className="form-control text-dark" {...register("quan_an", {
                                        required: {
                                            value: true,
                                            message: "Quán ăn không được bỏ trống"
                                        }
                                    })} />
                                    {formState?.errors?.quan_an && (
                                        <small className="text-danger">
                                            {formState?.errors?.quan_an?.message}
                                        </small>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-lable mb-2">Khách hàng</label>
                                    <input type="text" className="form-control text-dark" {...register("khach_hang", {
                                        required: {
                                            value: true,
                                            message: "Khách hàng không được bỏ trống"
                                        }
                                    })} />
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
                                        validate: (thoi_gian) => {
                                            const selectedDate = new Date(thoi_gian);
                                            const today = new Date();
                                            today.setHours(0, 0, 0, 0);

                                            if (selectedDate < today) {
                                                return "Thời gian không được nhỏ hơn ngày hiện tại";
                                            }

                                            return true;
                                        }
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
                            <label className="form-label">Trạng thái</label>
                            <select className="form-select text-dark" aria-label="Default select example" {...register("trang_thai", {
                                validate: (trang_thai) => {
                                    if (trang_thai === "-1") {
                                        return "Trạng thái không được bỏ trống";
                                    }
                                    return true;
                                }
                            })}>
                                <option value={"-1"}>Trạng thái</option>
                                <option value={0}>Đang chờ xử lí</option>
                                <option value={1}>Đã có chỗ</option>
                                <option value={2}>Đã hủy</option>
                            </select>
                            {formState?.errors?.trang_thai && (
                                <small className="text-danger">
                                    {formState?.errors?.trang_thai?.message}
                                </small>
                            )}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Yêu cầu khác</label>
                            <input type="text" className="form-control text-dark" id="yeucau" placeholder="Yêu cầu khác....." {...register("yeu_cau")} />
                        </div>
                        <div className="mb-3">
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleSubmit(submit)}
                                sx={{ width: "100px", marginRight: 2 }}
                            >
                                Sửa
                            </Button>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleCancel}
                                sx={{ width: "100px", color: "white" }}
                            >
                                Hủy
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditDatcho;
