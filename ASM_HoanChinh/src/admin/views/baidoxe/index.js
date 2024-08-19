import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import BaiDoXeTable from "../../components/Baidoxe/BaiDoXeTable";

const BaiDoXe = () => {

  const navigate = useNavigate();

  const handleAddBaiDoXe = () => {
    navigate('/admin/bai-do-xe/add');
  };

    return (
      <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              DANH SÁCH BÃI ĐỖ XE
            </Typography>
            <Button variant="contained" onClick={handleAddBaiDoXe}style={{width: "150px", marginRight: "40px"}}>
              Thêm bãi đỗ xe
            </Button>
          </Box>
          <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
            <BaiDoXeTable/>
          </Box>
        </CardContent>
      </Card>
    </Box>
    );
}

export default BaiDoXe;