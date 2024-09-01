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

import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getDatcho, paginator } from "../../../services/Datcho";
import { getQuanan } from "../../../services/Quanan";
import PaginationRounded from "../Paginator";
import { useCookies } from "react-cookie";

const DatchoTable = () => {
    const [datcho, setDatcho] = useState([])
    const [quanan, setQuanan] = useState([])
    const [accounts, setAccounts] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const accounts = JSON.parse(localStorage.getItem("accounts"));
        setAccounts(accounts);
        initDatcho()
    }, [])

    const [cookies] = useCookies(["token", "role"]);

    const initData = async (data) => {
        if (cookies.role === 0) {
            setDatcho(data.data)
            setCurrentPage(data.pagination.currentPage)
        }
        else {
            const result = await getDatcho()
            setDatcho(result.data)
        }

        const resultQuan = await getQuanan()
        setQuanan(resultQuan.data)
    }


    const initDatcho = async () => {
        if (cookies.role !== 0) {
            const result = await getDatcho()
            setDatcho(result.data)

            const resultQuan = await getQuanan()
            setQuanan(resultQuan.data)

        } else return null
    }
    const quan = quanan.find((e) => e.created_user === accounts.id_nguoidung || e.updated_user === accounts.id_nguoidung)

    return (
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
                            Tên quán
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Tên khách hàng
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Điện thoại
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Email
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Ngày
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Giờ
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Số lượng người
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Yêu cầu khác
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Trạng thái
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Hành động
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {datcho.filter(fil => fil?.id_quanan === quan?.id_quanan || accounts?.vai_tro === 0).map((dc, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Typography variant="body1" sx={{ fontSize: "15px", ml: 0.5, }}>
                                {(currentPage - 1) * itemsPerPage + index + 1}

                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.ten_quan}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.ten_kh}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.sdt_kh}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.email_kh}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.ngay_dat.split('T')[0]}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.thoi_gian.split('T')[0]}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.so_luong_nguoi}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.yeu_cau_khac}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", }}>
                                <Box>
                                    <Typography variant="body1" sx={{ ml: 0.5, }}>
                                        {dc.trang_thai === 0 ? "Đang chờ xử lý" : ""}
                                        {dc.trang_thai === 1 ? "Đã có chỗ" : ""}
                                        {dc.trang_thai === 2 ? "Đã hủy" : ""}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Typography >
                                <Link to={`/admin/dat-cho/edit/${dc.id_datcho}`}>
                                    <IconButton aria-label="edit" color="primary" style={{ width: "50px" }} >
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                                {/* <Link to={`/admin/dat-cho/delete/${dc.id_datcho}`}>
                                    <IconButton aria-label="edit" color="danger" style={{width: "50px"}}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Link> */}
                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
                {cookies.role !== 2 && (
                    <TableRow sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
                        <PaginationRounded onDataChange={cookies.role === 0 ? initData : initDatcho} paginator={paginator} />
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DatchoTable;
