import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import ExQuanAn from "../../components/QuanAn/QuanAnTable";
import { useCookies } from "react-cookie";

const QuanAn = () => {

  const navigate = useNavigate();
  const [cookie] = useCookies(["role"]);

  const handleAddQuanAn = () => {
    navigate('/admin/quanan/add');
  };

  return (
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {cookie.role === 0?"DANH SÁCH QUÁN ĂN":"THÔNG TIN QUÁN ĂN"}
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
