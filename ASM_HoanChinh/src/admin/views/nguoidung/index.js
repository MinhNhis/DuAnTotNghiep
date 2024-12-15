import React from "react";
import { useNavigate,} from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import NguoiDungTable from "../../components/Nguoidung/NguoiDungTable";

const DichVu = () => {

  const navigate = useNavigate();

  const handleAddnguoidung = () => {
    navigate('/admin/nguoi-dung/add');
  };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH NGƯỜI DÙNG</Typography>
                        <Button variant="contained" sx={{ marginLeft: "940px", width:"150px", display: 'none' }} onClick={handleAddnguoidung}>Thêm người dùng</Button>
                    <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                        <NguoiDungTable />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DichVu;
