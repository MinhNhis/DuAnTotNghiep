import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import ExDanhmuc from "../../components/Danhmuc/ExDanhmuc";


const Danhmuc  = () => {
    const navigate = useNavigate();

  const handleAddDanhmuc = () => {
    navigate('/admin/danhmuc/add');
  };

  return (
    <Box>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH DANH MỤC</Typography>
                    <Button variant="contained" sx={{width: '150px', marginLeft: '940px' }} onClick={handleAddDanhmuc}>Thêm Danh Mục</Button>
                <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                    <ExDanhmuc />
                </Box>
            </CardContent>
        </Card>
    </Box>
);
}

export default Danhmuc;