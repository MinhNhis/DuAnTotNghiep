import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Divider } from '@mui/material';
import { useNavigate, useParams } from "react-router-dom";
import { getDatchoById } from "../../../../services/Datcho";
import { getMenuOrder } from "../../../../services/MenuOrder";

const ChiTietDonDatCho = () => {
    const [open, setOpen] = useState(true);
    const [datcho, setDatcho] = useState({});
    const [menuorder, setMenuOrder] = useState([]);
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id_datcho
    const handleClose = () => {
        setOpen(false);
        navigate("/admin/dat-cho")
    };

    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        const resDon = await getDatchoById(id)
        setDatcho(resDon.data)

        const resMenu = await getMenuOrder();
        setMenuOrder(resMenu.data)
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="lg"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    width: '80%',
                    maxWidth: 'none',
                    position: 'absolute',
                    top: '10%',
                    transform: 'translateY(-10% -10%)',
                }
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "20px" }}>
                    Chi tiết đơn hàng
                </Box>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ fontWeight: "bold" }}>Thông tin đơn hàng</Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Khách hàng</TableCell>
                                <TableCell align="left">Điện thoại</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Ngày giờ</TableCell>
                                <TableCell align="left">Số lượng</TableCell>
                                <TableCell align="left">Yêu cầu khác</TableCell>
                                <TableCell align="left">Trạng thái</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow key={1}>
                                <TableCell>{datcho.ten_kh}</TableCell>
                                <TableCell align="left">{datcho.sdt_kh}</TableCell>
                                <TableCell align="left">{datcho.email_kh}</TableCell>
                                <TableCell align="left">{datcho.ngay_dat} - {datcho.thoi_gian}</TableCell>
                                <TableCell align="left">{datcho.so_luong_nguoi}</TableCell>
                                <TableCell align="left">{datcho.yeu_cau_khac}</TableCell>
                                <TableCell align="left">
                                    {datcho.trang_thai === 0 ? "Đang chờ xử lí" : (datcho.trang_thai === 1 ? "Đã có chỗ" : (datcho.trang_thai === 2 ? "Đã hủy" : (datcho.trang_thai === 3 ? "Đã hoàn thành" : "")))}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ fontWeight: "bold", mb: 2, mt: 3 }}>Thông tin gọi món</Box>
                <Grid container spacing={2}>
                    {
                        menuorder.map((item, index) => {
                            if (item.id_datcho === datcho.id_datcho) {
                                return (
                                    <>
                                        <Grid item xs={4}>
                                            <Box sx={{ fontSize: "14px" }}>
                                                {item.ten_mon}
                                            </Box>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Box sx={{ fontSize: "14px" }}>
                                                {formatPrice(item.gia)} x {item.so_luong}
                                            </Box>
                                        </Grid>
                                        {index < menuorder.length - 1 && <Grid item xs={12}><Divider sx={{ width: "50%" }} /></Grid>}
                                    </>
                                )
                            }
                        })
                    }
                    <Grid item xs={4}>
                        <Box sx={{ fontSize: "14px", fontWeight: "bold" }}>
                            Thành tiền:
                        </Box>
                    </Grid>
                    <Grid item xs={8}>
                        <Box sx={{ fontSize: "14px", fontWeight: "bold" }}>
                            {
                                menuorder
                                    .filter(item => item.id_datcho === datcho.id_datcho)
                                    .reduce((total, item) => total + item.gia * item.so_luong, 0)
                                    .toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })
                            }
                        </Box>
                    </Grid>
                </Grid>

            </DialogContent>
        </Dialog >


    )
}


export default ChiTietDonDatCho