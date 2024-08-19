import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import ExDanhGia from "../../components/Danhgia/DanhGiaTable";

const DanhGia = () => {
  const navigate = useNavigate();

  const handleAddDanhGia = () => {
    navigate('/admin/danhgia/add');
  };

    return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              DANH SÁCH ĐÁNH GIÁ
            </Typography>
            {/* <Button variant="contained" onClick={handleAddDanhGia}style={{width: "150px", marginRight: "40px"}}>
              Thêm đánh giá
            </Button> */}
          </Box>
          <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
            <ExDanhGia/>
          </Box>
        </CardContent>
      </Card>
    </Box>
    );
};

export default DanhGia;
