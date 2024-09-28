import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import ExQuanAn from "../../components/QuanAn/QuanAnTable";
import { useCookies } from "react-cookie";
import { getThanhtoan } from "../../../services/Thanhtoandki";

const QuanAn = () => {
  const [thanhtoan, setThanhToan] = useState([])
  const navigate = useNavigate();
  const [cookie] = useCookies(["role"]);
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const result = await getThanhtoan()
    const fillDon = result.data.find((e) => e.id_nguoidung === accounts.id_nguoidung && accounts.vai_tro === 2)
    setThanhToan(fillDon)
  }

  const handleAddQuanAn = () => {
    if (thanhtoan) {
      if (thanhtoan.trang_thai === 0) {
        navigate('/admin/quanan/add');
      } else {
        navigate('/admin/thanh-toan/thanh-toan-dki')
      }
    } else {
      navigate('/admin/thanh-toan/thanh-toan-dki')
    }

  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              {cookie.role === 0 ? "DANH SÁCH QUÁN ĂN" : "THÔNG TIN QUÁN ĂN"}
            </Typography>
            <Button variant="contained" onClick={handleAddQuanAn} style={{ width: "150px", marginRight: "40px" }}>
              Thêm quán ăn
            </Button>
          </Box>
          <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
            <ExQuanAn />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default QuanAn;
