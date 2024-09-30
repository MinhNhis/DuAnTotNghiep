import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import ExQuanAn from "../../components/QuanAn/QuanAnTable";
import { useCookies } from "react-cookie";
import { checkStatus, getThanhtoan, sendMail } from "../../../services/Thanhtoandki";
import { getQuanan } from "../../../services/Quanan";

const QuanAn = () => {
  const [thanhtoan, setThanhToan] = useState([])
  const [quanan, setQuanan] = useState([])
  const navigate = useNavigate();
  const [cookie] = useCookies(["role"]);
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  useEffect(() => {
    initData()
  }, [])

  const initData = async () => {
    const resultQuan = await getQuanan()
    const fillQUan = resultQuan.data.filter((e) => e.created_user === accounts.id_nguoidung);
    setQuanan(fillQUan)

    const result = await getThanhtoan()
    const fillDon = result.data.find((e) => e.id_nguoidung === accounts.id_nguoidung && accounts.vai_tro === 2)
    setThanhToan(fillDon)
  }

  const handleAddQuanAn = async () => {
    if (thanhtoan) {
      const res = await checkStatus({ orderId: thanhtoan.ma_don })
      if (res.resultCode === 0) {
        navigate('/admin/quanan/add');
        await sendMail({
          orderId: res.orderId,
          transId: res.transId,
          name: accounts.ten_nguoi_dung,
          amount: res.amount,
          email: accounts.email,
        })
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
            {quanan.length === 0 ?
              <Button variant="contained" onClick={handleAddQuanAn} style={{ width: "150px", marginRight: "40px" }}>
                Thêm quán ăn
              </Button> : ''
            }
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
