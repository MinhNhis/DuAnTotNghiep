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
                    top: '0%',
                    transform: 'translateY(0%)', // Dịch chuyển theo trục Y
                }
            }}

        >
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: "20px" }}>
                    Chi tiết đơn hàng
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ fontWeight: "bold" }}>Thông tin đơn hàng</Box>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Mã đơn</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.ma_don}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Mã giao dich</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.ma_giao_dich}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Tiền cọc</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{formatPrice(datcho.tien_coc)} {'(30%)'}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Khách hàng</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.ten_kh}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Điện thoại</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.sdt_kh}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Email</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.email_kh}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Ngày giờ</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.ngay_dat} - {datcho.thoi_gian}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Số lượng</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.so_luong_nguoi}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Yêu cầu khác</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.yeu_cau_khac}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead>
                                        <TableCell sx={{ borderBottom: "none" }} align="left">Trạng thái</TableCell>
                                    </TableHead>
                                    <TableCell align="left">{datcho.trang_thai === 0 ? <span class="badge badge-warning">Đang chờ xử lý</span> : (datcho.trang_thai === 1 ? <span class="badge badge-success">Đã có chỗ</span> : (datcho.trang_thai === 2 ? <span class="badge badge-danger">Đã hủy</span> : (datcho.trang_thai === 3 ? <span class="badge badge-success">Đã hoàn thành</span> : "")))}</TableCell>
                                </TableRow>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{ fontWeight: "bold", mb: 2 }}>Thông tin gọi món</Box>
                        <Grid container spacing={2}>
                            {menuorder.map((item, index) => {
                                if (item.id_datcho === datcho.id_datcho) {
                                    return (
                                        <React.Fragment key={index}>
                                            <Grid item xs={4}>
                                                <Box sx={{ fontSize: "14px" }}>{item.ten_mon}</Box>
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Box sx={{ fontSize: "14px" }}>
                                                    {formatPrice(item.gia)} x {item.so_luong}
                                                </Box>
                                            </Grid>
                                            {index < menuorder.length - 1 && (
                                                <Grid item xs={12}>
                                                    <Divider sx={{ width: "50%" }} />
                                                </Grid>
                                            )}
                                        </React.Fragment>
                                    );
                                }
                            })}
                            <Grid item xs={4}>
                                <Box sx={{ fontSize: "14px", fontWeight: "bold" }}>Thành tiền:</Box>
                            </Grid>
                            <Grid item xs={8}>
                                <Box sx={{ fontSize: "14px", fontWeight: "bold" }}>
                                    {menuorder
                                        .filter((item) => item.id_datcho === datcho.id_datcho)
                                        .reduce((total, item) => total + item.gia * item.so_luong, 0)
                                        .toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                                </Box>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>



            </DialogContent>
        </Dialog >


    )
}


export default ChiTietDonDatCho