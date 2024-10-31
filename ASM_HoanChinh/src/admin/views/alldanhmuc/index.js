import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import Alldanhmuc from "../../components/Alldanhmuc";


const AllDanhmuc  = () => {
    const navigate = useNavigate();

  const handleAddAllDanhmuc = () => {
    navigate('/admin/alldanhmuc/add');
  };

  return (
    <Box>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH  TẤT CẢ DANH MỤC</Typography>
                    <Button variant="contained" sx={{width: '150px', marginLeft: '940px' }} onClick={handleAddAllDanhmuc}>Thêm Danh mục</Button>
                <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                    <Alldanhmuc />
                </Box>
            </CardContent>
        </Card>
    </Box>
);
}

export default AllDanhmuc;