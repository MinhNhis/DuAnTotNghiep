import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button, Grid } from "@mui/material";
import TienNghiTable from "../../components/Tiennghi/TienNghiTable";
import BlockIcon from '@mui/icons-material/Block';
import { getQuanan } from "../../../services/Quanan";
const TienNghi = () => {

  const navigate = useNavigate();
  const [quan, setQuan] = useState({})
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  const handleAddTienNghi = () => {
    navigate('/admin/tien-nghi/add');
  };
  const initData = async () => {
    try {
      const res = await getQuanan();
      if (res?.data && Array.isArray(res.data)) {
        const quanan = res.data.find((e) => e.created_user === accounts?.id_nguoidung);
        if (quanan) {
          setQuan(quanan);
        } else {
          console.error("Không tìm thấy quán ăn phù hợp.");
        }
      } else {
        console.error("Dữ liệu trả về không hợp lệ:", res);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API:", error);
    }
  };

  useEffect(() => {
    initData()
  }, [])
  return (
    <Box>
      <Card variant="outlined">
        <CardContent> {quan.is_delete === 0 ?
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                DANH SÁCH TIỆN NGHI
              </Typography>
              <Button variant="contained" onClick={handleAddTienNghi} style={{ width: "150px", marginRight: "40px" }}>
                Thêm tiện nghi
              </Button>
            </Box>
            <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
              <TienNghiTable />
            </Box></> :
          <React.Fragment>
            <Grid
              container
              spacing={3}
              justifyContent="center"
              alignItems="center"
              sx={{ textAlign: 'center' }}
            >
              <Grid item xs={12} md={8}>
                <BlockIcon sx={{ fontSize: 100, color: 'error.main', mb: 2 }} />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontWeight: 'bold', color: 'error.main' }}
                >
                  Quán ăn của bạn đã bị ngừng hoạt động!
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  sx={{ mb: 1.5 }}
                >
                  Vui lòng liên hệ <a
                    href="mailto:minhnhidmn0502@gmail.com"
                    style={{ color: '#1976d2', textDecoration: 'underline' }}
                  >
                    minhnhidmn0502@gmail.com
                  </a> để biết thêm chi tiết.
                </Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        }
        </CardContent>
      </Card>
    </Box>
  );
}

export default TienNghi;