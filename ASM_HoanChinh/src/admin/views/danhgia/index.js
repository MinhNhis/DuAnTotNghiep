import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography} from "@mui/material";

import ExDanhGia from "../../components/Danhgia/DanhGiaTable";

const DanhGia = () => {
  const navigate = useNavigate();
    return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              DANH SÁCH ĐÁNH GIÁ
            </Typography>
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
