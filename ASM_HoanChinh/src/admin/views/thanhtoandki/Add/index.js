import React, { useEffect, useState } from "react";
import { Card, Box, Typography, CardContent, TextField, Button, Divider } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useForm } from "react-hook-form";
import { addMomo, addThanhtoan, checkStatus, getThanhtoan } from "../../../../services/Thanhtoandki";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ThanhToanChuyenTien = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [resThanhtoan, setResThanhtoan] = useState({})
    const [thanhtoan, setThanhtoan] = useState([])
    const accounts = JSON.parse(localStorage.getItem("accounts"));

    const onSubmit = async (data) => {
        try {
            const result = await addMomo({
                amount: data.price,
                orderInfo: data.noidung
            })
            setResThanhtoan(result)
            enqueueSnackbar("Vui lòng chờ 3 giây", { variant: 'success' })
            setTimeout(() => {
                window.open(result.payUrl, "_blank");
            }, 3000);

        } catch (error) {
            enqueueSnackbar("Có lỗi xảy ra khi thanh toán", { variant: "error" })
        }
    };

    useEffect(() => {
        submitAdd()
        initData()
    }, [resThanhtoan])

    const initData = async () => {
        const result = await getThanhtoan();
        const fillDon = result.data.find((e) => e.id_nguoidung === accounts.id_nguoidung)
        if (fillDon) {
            const res = await checkStatus({ orderId: fillDon.ma_don })
            if (res.resultCode === 0) {
                setThanhtoan(res)
            } else {
                setThanhtoan([])
            }
        } else {
            setThanhtoan([])
        }
    }

    const submitAdd = async () => {
        const now = new Date();
        const ngayHienTai = now.toLocaleDateString();
        const gioHienTai = now.toLocaleTimeString();
        if (resThanhtoan && resThanhtoan.orderId) {
            const result = await checkStatus({ orderId: resThanhtoan.orderId })
            await addThanhtoan({
                ma_don: result.orderId,
                tong_tien: result.amount,
                noi_dung: "pay with MOMO",
                trang_thai: result.resultCode,
                thoi_gian: `${ngayHienTai}-${gioHienTai}`,
                ma_giao_dich: result.transId,
                id_nguoidung: accounts.id_nguoidung
            })
            navigate('/admin/quanan')
        } else {
            console.log("lỗi");
        }
    }
    return (
        <Card variant="outlined" sx={{ p: 0 }}>
            <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
                <Box flexGrow={1}>
                    <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                        Chuyển tiền MOMO
                    </Typography>
                </Box>
            </Box>
            <Divider />
            {thanhtoan && thanhtoan.resultCode === 0 ?
                <CardContent>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '16px',
                            backgroundColor: '#e6f7e6',
                            borderRadius: '8px',
                            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                            color: '#28a745',
                            height: '400px',
                            textAlign: 'center'
                        }}
                    >
                        <CheckCircleIcon sx={{ fontSize: '70px', marginBottom: '8px' }} />
                        <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                            Bạn đã thanh toán thành công!
                        </Typography>
                        <Box sx={{ paddingTop: "50px" }}>
                            <Link to='/admin/quanan'><Button><ArrowBackIcon />Quay lại</Button></Link>
                        </Box>

                    </Box>
                </CardContent>
                :
                <CardContent sx={{ padding: "30px" }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            id="price"
                            label="100.000 (VNĐ)"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            type="number"
                            {...register("price", {
                                required: {
                                    value: true,
                                    message: "Số tiền không được bỏ trống",
                                },
                                min: {
                                    value: 1000,
                                    message: "Số tiền tối thiểu là 1,000 VNĐ",
                                },
                            })}
                        />
                        {errors?.price && (
                            <small className="text-danger">
                                {errors?.price?.message}
                            </small>
                        )}

                        <TextField
                            id="noidung"
                            label="pay with MOMO"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            {...register("noidung", {
                                required: {
                                    value: true,
                                    message: "Nội dung không được bỏ trống",
                                },
                            })}
                        />
                        {errors?.noidung && (
                            <small className="text-danger">
                                {errors?.noidung?.message}
                            </small>
                        )}

                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                style={{ width: "150px" }}
                            >
                                Thanh toán
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            }
        </Card>
    );
};

export default ThanhToanChuyenTien;
