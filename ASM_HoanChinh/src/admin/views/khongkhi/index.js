import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import KhongKhiTable from "../../components/Khongkhi/KhongKhiTable";

const KhongKhi = () => {

  const navigate = useNavigate();

  const handleAddKhongKhi = () => {
    navigate('/admin/khong-khi/add');
  };

    return (
    <Box>
    <Card variant="outlined">
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          DANH SÁCH KHÔNG KHÍ
          </Typography>
          <Button variant="contained" onClick={handleAddKhongKhi}style={{width: "150px", marginRight: "40px"}}>
          Thêm không khí
          </Button>
        </Box>
        <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
          <KhongKhiTable/>
        </Box>
      </CardContent>
    </Card>
   </Box>
    );
}

export default KhongKhi;