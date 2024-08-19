import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import ExQuanAn from "../../components/QuanAn/QuanAnTable";

const QuanAn = () => {

  const navigate = useNavigate();

  const handleAddQuanAn = () => {
    navigate('/admin/quanan/add');
  };

    return (
        <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              DANH SÁCH QUÁN ĂN
            </Typography>
            <Button variant="contained" onClick={handleAddQuanAn}style={{width: "150px", marginRight: "40px"}}>
              Thêm quán ăn
            </Button>
          </Box>
          <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
            <ExQuanAn/>
          </Box>
        </CardContent>
      </Card>
    </Box>
    );
};

export default QuanAn;
