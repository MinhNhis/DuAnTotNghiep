import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardContent, Divider, Box, Typography, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getNguoiDungById } from "../../../../services/Nguoidung";
import { BASE_URL } from "../../../../config/ApiConfig";
import imgUser from "../../../assets/images/user.png"

const EditNguoiDung = () => {
  const [nguoidung, setNguoidung] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getNguoiDungById(id);
      setNguoidung(result.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };
  return (
    <div className="container">
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              CHI TIẾT NGƯỜI DÙNG
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>

          <Card style={{ position: 'relative' }}>
            <CardContent>
              <div className="col-6 offset-3 text-center mb-5">
                <img src={nguoidung?.hinh_anh ? `${BASE_URL}/uploads/${nguoidung?.hinh_anh}` : imgUser} alt="image" className="center" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} />
                <h3 className="text-dark">{nguoidung?.ten_nguoi_dung}</h3>
              </div>
              <div className="row  offset-3">
                <div className="col-6">
                  <p className="mb-3"><strong>Ngày sinh</strong>: {nguoidung?.ngay_sinh}</p>
                  <p className="mb-3"><strong>Giới tính</strong>: {nguoidung?.gioi_tinh}</p>
                  <p className="mb-3"><strong>Email</strong>: {nguoidung?.email}</p>
                </div>
                <div className="col-6">
                  <p className="mb-3"><strong>Số điện thoại</strong>: {nguoidung?.so_dien_thoai}</p>
                  <p className="mb-3"><strong>Địa chỉ</strong>: {nguoidung?.dia_chi}</p>
                </div>
              </div>
            </CardContent>
            <Link to={"/admin/nguoi-dung"}><CloseIcon style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}/></Link>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditNguoiDung;
