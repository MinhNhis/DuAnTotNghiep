import React, { useEffect, useState } from "react";
import { Card, Box, Typography, CardContent, TextField, Button, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { addMomo, addThanhtoan, checkStatus } from "../../../../services/Thanhtoandki";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const ThanhToanChuyenTien = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate()
    const [resThanhtoan, setResThanhtoan] = useState({})
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
    console.log(resThanhtoan);


    useEffect(() => {

        submitAdd()

    }, [resThanhtoan])

    const submitAdd = async () => {
        const now = new Date();
        const ngayHienTai = now.toLocaleDateString(); // Lấy ngày hiện tại theo định dạng chuỗi
        const gioHienTai = now.toLocaleTimeString();
        if (resThanhtoan && resThanhtoan.orderId) {
            const result = await checkStatus({ orderId: resThanhtoan.orderId })
            console.log(result);
            await addThanhtoan({
                ma_don: result.orderId,
                tong_tien: result.amount,
                noi_dung: "pay with MOMO",
                trang_thai: result.resultCode,
                thoi_gian: `${ngayHienTai}-${gioHienTai}`,
                ma_giao_dich: result.transId,
                id_nguoidung: accounts.id_nguoidung
            })
            navigate('/admin')
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
            <CardContent sx={{ padding: "30px" }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        id="price"
                        label="Số tiền (VNĐ)"
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
                        label="Nội dung chuyển tiền"
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
        </Card>
    );
};

export default ThanhToanChuyenTien;
