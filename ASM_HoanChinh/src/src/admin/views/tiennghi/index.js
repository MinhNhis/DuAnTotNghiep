import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import TienNghiTable from "../../components/Tiennghi/TienNghiTable";

const TienNghi = () => {

  const navigate = useNavigate();

  const handleAddTienNghi = () => {
    navigate('/admin/tien-nghi/add');
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              DANH SÁCH TIỆN NGHI
            </Typography>
            <Button variant="contained" onClick={handleAddTienNghi}style={{width: "150px", marginRight: "40px"}}>
              Thêm tiện nghi
            </Button>
          </Box>
          <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
            <TienNghiTable />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TienNghi;