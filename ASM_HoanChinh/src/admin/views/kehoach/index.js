import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import KeHoachTable from "../../components/Kehoach/KeHoachTable";

const KeHoach = () => {
  const navigate = useNavigate();

  const handleAddKeHoach = () => {
    navigate('/admin/ke-hoach/add');
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              DANH SÁCH KẾ HOẠCH
            </Typography>
            <Button variant="contained" onClick={handleAddKeHoach}style={{width: "150px", marginRight: "40px"}}>
              Thêm kế hoạch
            </Button>
          </Box>
          <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
            <KeHoachTable/>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default KeHoach;
