import React from "react";
import { useNavigate,} from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import LoaiKhachHangTable from "../../components/Khachhang/LoaiKhachHangTable";

const LoaiKhachHang = () => {

  const navigate = useNavigate();

  const handleAddLKH = () => {
    navigate('/admin/loai-khach-hang/add');
  };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH LOẠI KHÁCH HÀNG</Typography>
                        <Button variant="contained" sx={{ marginLeft: "940px", width: "150px" }} onClick={handleAddLKH}>Thêm loại</Button>
                    <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                        <LoaiKhachHangTable />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoaiKhachHang;
