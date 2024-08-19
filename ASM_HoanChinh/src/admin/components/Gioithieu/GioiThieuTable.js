import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
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
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
    getGioithieu,
    getAnuong,
    getBaidoxe,
    getCacDichvu,
    getKehoach,
    getKhachhang,
    getKhongkhi,
    getTiennghi
} from "../../../services/Gioithieu";
import { getDichvu } from "../../../services/Dichvu";

const GioiThieuTable = () => {
    const [gioithieu, setGioithieu] = useState([]);
    const [dichvu, setDichvu] = useState([]);
    const [anuong, setAnuong] = useState([]);
    const [khongkhi, setKhongkhi] = useState([]);
    const [kehoach, setKehoach] = useState([]);
    const [tiennghi, setTiennghi] = useState([]);
    const [khachhang, setKhachhang] = useState([]);
    const [baidoxe, setBaidoxe] = useState([]);
    const [cacdichvu, setCacdichvu] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        initGioithieu()
        initData()
    }, [])

    const initGioithieu = async () => {
        const result = await getGioithieu();
        setGioithieu(result.data)
        console.log(result.data);
    }

    const initData = async () => {
        const result = await getDichvu()
        setDichvu(result.data)
        const resultAnuong = await getAnuong();
        setAnuong(resultAnuong.data)
        const resultKhongkhi = await getKhongkhi();
        setKhongkhi(resultKhongkhi.data)
        const resultKehoach = await getKehoach();
        setKehoach(resultKehoach.data)
        const resultTiennghi = await getTiennghi();
        setTiennghi(resultTiennghi.data)
        const resultKhachhang = await getKhachhang();
        setKhachhang(resultKhachhang.data)
        const resultBaidoxe = await getBaidoxe();
        setBaidoxe(resultBaidoxe.data)
        const resultCacdichvu = await getCacDichvu();
        setCacdichvu(resultCacdichvu.data);

        console.log(resultCacdichvu.data);

    }


    const handleEditGioiThieu = () => {
        navigate('/admin/gioi-thieu/edit');
    };


    return (
        <Table aria-label="simple table" sx={{ mt: 3, }}>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            STT
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Tùy chọn DV
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Dịch vụ
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Bãi đổ xe
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Ăn uống
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Không khí
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Khách hàng
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Kế hoạch
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Tiện nghi
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                            Nội dung
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
                {gioithieu.map((gt, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            <Typography sx={{ fontSize: "15px", }}>
                                {Number(index) + 1}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1, mb: 1 }}>
                                    <CheckIcon sx={{ fontSize: "20px" }} />
                                    {
                                        cacdichvu.map((cdv) => {
                                            if (cdv.id_cacdichvu === gt.id_tuychondichvu) {
                                                return (
                                                    <Typography key={cdv.id_cacdichvu} variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}>
                                                        {cdv.tuy_chon_dv}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1, mb: 1 }}>
                                    <CheckIcon sx={{ fontSize: "20px" }} />
                                    {
                                        dichvu.map((dv) => {
                                            if (dv.id_dichvu === gt.id_dichvu) {
                                                return (
                                                    <Typography key={dv.id_dichvu} variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}>
                                                        {dv.dich_vu}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1, mb: 1 }}>
                                    <CheckIcon sx={{ fontSize: "20px" }} />
                                    {
                                        baidoxe.map((doxe) => {
                                            if (doxe.id_baidoxe === gt.id_baidoxe) {
                                                return (
                                                    <Typography key={doxe.id_baidoxe} variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}>
                                                        {doxe.bai_do_xe}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1, mb: 1 }}>
                                    <CheckIcon sx={{ fontSize: "20px" }} />
                                    {
                                        anuong.map((an_uong) => {
                                            if (an_uong.id_anuong === gt.id_anuong) {
                                                return (
                                                    <Typography key={an_uong.id_anuong} variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}>
                                                        {an_uong.an_uong}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1, mb: 1 }}>
                                    <CheckIcon sx={{ fontSize: "20px" }} />
                                    {
                                        khongkhi.map((kk) => {
                                            if (kk.id_khongkhi === gt.id_khongkhi) {
                                                return (
                                                    <Typography key={kk.id_khongkhi} variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}>
                                                        {kk.khong_khi}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1, mb: 1 }}>
                                    <CheckIcon sx={{ fontSize: "20px" }} />
                                    {
                                        khachhang.map((kh) => {
                                            if (kh.id_loaikh === gt.id_loaikh) {
                                                return (
                                                    <Typography key={kh.id_loaikh} variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}>
                                                        {kh.khach_hang}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1, mb: 1 }}>
                                    <CheckIcon sx={{ fontSize: "20px" }} />
                                    {
                                        kehoach.map((ke_hoach) => {
                                            if (ke_hoach.id_kehoach === gt.id_kehoach) {
                                                return (
                                                    <Typography key={ke_hoach.id_kehoach} variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}>
                                                        {ke_hoach.ke_hoach}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Box sx={{ display: "flex", alignItems: "center", mr: 1, mb: 1 }}>
                                    <CheckIcon sx={{ fontSize: "20px" }} />
                                    {
                                        tiennghi.map((tn) => {
                                            if (tn.id_tiennghi === gt.id_tiennghi) {
                                                return (
                                                    <Typography key={tn.id_tiennghi} variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}>
                                                        {tn.tien_nghi}
                                                    </Typography>
                                                )
                                            }
                                        })
                                    }
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                                <Typography variant="body1" sx={{ ml: 0.5, fontSize: "14px" }}
                                    style={{
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'normal'
                                    }}>
                                    {gt.gioi_thieu}
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell>
                            <Typography >
                                <Link to={`/admin/gioi-thieu/edit/${gt.id_gioithieu}`}>
                                    <IconButton aria-label="edit" color="primary">
                                        <EditIcon />
                                    </IconButton>
                                </Link>

                                <Link to={`/admin/gioi-thieu/delete/${gt.id_gioithieu}`}>
                                    <IconButton aria-label="delete" color="danger">
                                        <DeleteIcon />
                                    </IconButton>
                                </Link>

                            </Typography>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default GioiThieuTable;
