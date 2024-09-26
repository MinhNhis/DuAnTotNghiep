import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";

import { checkStatus, getThanhtoan, updateThanhtoan } from "../../../services/Thanhtoandki";
import { getNguoiDung } from "../../../services/Nguoidung";

const ThanhToanTable = () => {
    const [thanhtoan, setThanhtoan] = useState([])
    const [nguoidung, setnguoidung] = useState([])

    useEffect(() => {
        initThanhtoan()
    }, [])

    const initThanhtoan = async () => {
        try {
            const resultNguoiDung = await getNguoiDung()
            setnguoidung(resultNguoiDung.data);

            const result = await getThanhtoan();
            const data = result.data;
            const updatedThanhtoan = [];

            for (const element of data) {
                const res = await checkStatus({ orderId: element.ma_don });

                const updateResult = await updateThanhtoan(element.id_thanhtoan, {
                    ma_don: res.orderId,
                    tong_tien: res.amount,
                    noi_dung: "pay with MOMO",
                    trang_thai: res.resultCode,
                    thoi_gian: element.thoi_gian,
                    ma_giao_dich: res.transId,
                    id_nguoidung: res.id_nguoidung
                });

                if (updateResult && typeof updateResult.data === 'object') {
                    updatedThanhtoan.push(updateResult.data);
                } else {
                    console.log("Lỗi khi cập nhật thanh toán hoặc dữ liệu không phải là object:", updateResult);
                }
            }

            const resThanhtoan = await getThanhtoan()
            setThanhtoan(resThanhtoan.data)

        } catch (error) {
            console.log("Lỗi trong quá trình thanh toán:", error);
        }
    };

    return (
        <>
            <Table aria-label="simple table" sx={{ mt: 3 }}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                STT
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Mã đơn hàng
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Mã giao dịch
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Tên khách hàng
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Thời gian
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Tổng tiền
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Nội dung
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                                Trạng thái
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {thanhtoan.map((tt, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <Typography variant="body1" sx={{ fontSize: "15px", ml: 0.5, }}>
                                    {index + 1}

                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ ml: 0.5, }}>
                                            {tt.ma_don}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ ml: 0.5, }}>
                                            {tt.ma_giao_dich}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ ml: 0.5, }}>
                                            {
                                                nguoidung.map((value) => {
                                                    if (value.id_nguoidung === tt.id_nguoidung && value.vai_tro === 2) {
                                                        return (
                                                            <>
                                                                {value.ten_nguoi_dung}
                                                            </>
                                                        )
                                                    }
                                                })
                                            }

                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ ml: 0.5, }}>
                                            {tt.thoi_gian}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ ml: 0.5, }}>
                                            {tt.tong_tien}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ ml: 0.5, }}>
                                            {tt.noi_dung}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: "flex", alignItems: "center", }}>
                                    <Box>
                                        <Typography variant="body1" sx={{ ml: 0.5, }}>
                                            {tt.trang_thai !== 0 ? "Đang chờ thanh toán " : "Đã thanh toán"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>
    );
};

export default ThanhToanTable;
