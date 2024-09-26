import React from "react";
import { Card, CardContent, Box, Typography, Button} from "@mui/material";
import ThanhToanTable from "../../components/Thanhtoan";

const ThanhToan = () => {
  return (
      <Box>
        <Card variant="outlined">
          <CardContent>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {'Danh sách đơn thanh toán đăng kí'}
              </Typography>
            </Box>
            <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
              <ThanhToanTable/>
            </Box>
          </CardContent>
        </Card>
      </Box>
  );
};

export default ThanhToan;
