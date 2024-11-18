import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, Button, TextField, Select, MenuItem } from "@mui/material";
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useForm } from "react-hook-form";
import { editDatcho, getDatchoById, getKhachhang, getQuanan, sendEmail } from "../../../../services/Datcho";
import { useSnackbar } from 'notistack';
import { getNguoiDung } from "../../../../services/Nguoidung";

const EditDatcho = () => {
    const { register, handleSubmit, setValue, formState } = useForm();
    const [datcho, setDatcho] = useState(null);
    const [quanan, setQuanan] = useState([]);
    const [khachhang, setKhachhang] = useState([]);
    const [nguoidungs, setNguoidung] = useState([])
    const [showPopup, setShowPopup] = useState(false); // Thêm state để kiểm soát popup
    const [reason, setReason] = useState(""); // State để lưu lý do
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id_datcho;
    const { enqueueSnackbar } = useSnackbar();

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
            setValue('quan_an', result?.data.ten_quan || '');
            setValue('khach_hang', result?.data.ten_kh || '');
            setValue('email', result?.data.email_kh || '');
            setValue('sdt', result?.data.sdt_kh || '');
            setValue('thoi_gian', result?.data.ngay_dat || '');
            setValue('gio', result?.data.thoi_gian || '');
            setValue('so_luong', result?.data.so_luong_nguoi || '');
            setValue('yeu_cau', result?.data.yeu_cau_khac || '');
            setValue('trang_thai', result?.data.trang_thai || '-1');
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };
    const submit = async (value) => {
        try {
            if (value.trang_thai === 2) {
                setShowPopup(true);
                return;
            }

            await editDatcho(id, {
                ten_quan: value?.quan_an.split(",")[0],
                ten_kh: value?.khach_hang,
                sdt_kh: value?.sdt,
                email_kh: value?.email,
                ngay_dat: value?.thoi_gian,
                thoi_gian: value?.gio,
                so_luong_nguoi: value?.so_luong,
                trang_thai: value?.trang_thai,
                yeu_cau_khac: value?.yeu_cau,
                id_quanan: value?.quan_an.split(",")[1]
            });
            navigate("/admin/dat-cho");
            enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
            if (value.trang_thai === 1) {
                return await sendEmail(id, "Đơn hàng đã được xử lý");
            }
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Có lỗi xảy ra!', { variant: 'error' });
            return;
        }

    };


    const handlePopupSubmit = async (event) => {
        event.preventDefault();
        setShowPopup(false);
        try {
            await editDatcho(id, {
                ten_quan: datcho.ten_quan,
                ten_kh: datcho.ten_kh,
                sdt_kh: datcho.sdt_kh,
                email_kh: datcho.email_kh,
                ngay_dat: datcho.ngay_dat,
                thoi_gian: datcho.thoi_gian,
                so_luong_nguoi: datcho.so_luong_nguoi,
                trang_thai: "2",
                yeu_cau_khac: datcho.yeu_cau_khac,
                ly_do_huy: reason
            });
            enqueueSnackbar('Đơn hàng đã được hủy!', { variant: 'success' });
            navigate("/admin/dat-cho");
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Có lỗi xảy ra khi hủy đơn!', { variant: 'error' });
        }
        await sendEmail(id, reason)
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
                        <div className="row text-dark">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-lable mb-2">Quán ăn</label>
                                    <TextField disabled type="text" variant="outlined" fullWidth {...register("quan_an", {
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
                                    <TextField disabled type="text" fullWidth {...register("khach_hang", {
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
                                    <TextField disabled type="email" id="email" fullWidth placeholder="Email" {...register("email", {
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
                                    <TextField disabled type="number" id="sdt" placeholder="Số điện thoại" fullWidth {...register("sdt", {
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
                                    <label className="form-label">Ngày</label>
                                    <TextField disabled type="text" id="thoigian" fullWidth {...register("thoi_gian", {
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
                                    <TextField disabled type="number" id="soluongnguoi" placeholder="Số lượng người" fullWidth {...register("so_luong",
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
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-label">Trạng thái</label>
                                    <Select fullWidth defaultValue={"-1"} {...register("trang_thai", {
                                        validate: (trang_thai) => {
                                            if (trang_thai === "-1") {
                                                return "Trạng thái không được bỏ trống";
                                            }
                                            return true;
                                        }
                                    })}>
                                        <MenuItem value={"-1"} disabled>Trạng thái</MenuItem>
                                        <MenuItem value={0}>Đang chờ xử lí</MenuItem>
                                        <MenuItem value={1}>Đã có chỗ</MenuItem>
                                        <MenuItem value={3}>Đã hoàn thành</MenuItem>
                                        <MenuItem value={2}>Đã hủy</MenuItem>
                                    </Select>
                                    {formState?.errors?.trang_thai && (
                                        <small className="text-danger">
                                            {formState?.errors?.trang_thai?.message}
                                        </small>
                                    )}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label className="form-lable mb-2">Giờ</label>
                                    <TextField disabled type="text" variant="outlined" fullWidth {...register("gio", {
                                        required: {
                                            value: true,
                                            message: "Giờ không được bỏ trống"
                                        }
                                    })} />
                                    {formState?.errors?.gio && (
                                        <small className="text-danger">
                                            {formState?.errors?.gio?.message}
                                        </small>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Yêu cầu khác</label>
                            <TextField disabled type="text" id="yeucau" placeholder="Yêu cầu khác....." fullWidth {...register("yeu_cau")} />
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
            {/* Popup để nhập lý do hủy */}
            <Dialog fullWidth maxWidth="md" sx={{ '& .MuiDialog-paper': { padding: 0, margin: 0, width: "500px" } }} open={showPopup} onClose={() => setShowPopup(false)}>
                <DialogTitle fontSize={"25px"} >Lý do hủy đơn</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Lý do"
                        fullWidth
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        variant="outlined"
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handlePopupSubmit} sx={{ marginRight: 0.5 }}>
                        Xác nhận
                    </Button>
                    <Button variant="outlined" color="error" onClick={() => setShowPopup(false)} sx={{ marginRight: 2 }}>
                        Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditDatcho;
