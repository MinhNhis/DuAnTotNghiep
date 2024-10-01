import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardContent, Divider, Box, Typography, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { getNguoiDungById } from "../../../../services/Nguoidung";
import { BASE_URL } from "../../../../config/ApiConfig";
import imgUser from "../../../assets/images/user.png";

import { getQuanan } from "../../../../services/Quanan";


const EditNguoiDung = () => {
  const [nguoidung, setNguoidung] = useState(null);
  const [quanan, setQuanan] = useState([]);
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

      if (result.data.id_nguoidung) {
        const quananResult = await getQuanan();
        const quan = quananResult.data.find((e) => e.created_user === result.data.id_nguoidung)
        setQuanan(quan);
      }

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
            <Link to={"/admin/nguoi-dung"}><CloseIcon style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }} /></Link>
          </Card>
        </CardContent>
      </Card>

      {nguoidung && quanan && quanan.created_user === nguoidung.id_nguoidung ?
        <Grid item xs={12} md={6}>
          <Card style={{ height: "100%" }}>
            <CardContent>
              <Box className="text-center mb-3">
                <img
                  src={
                    quanan?.hinh_anh
                      ? `${BASE_URL}/uploads/${quanan?.hinh_anh}`
                      : ""
                  }
                  alt="restaurant"
                  className="img-fluid"
                  style={{
                    width: "100%",
                    height: "400px",
                    borderRadius: "10px",
                    objectFit: "cover",
                  }}
                />
                <Typography
                  sx={{ fontSize: "24px", fontWeight: "bold" }}
                  className="mt-3"
                >
                  {quanan?.ten_quan_an}
                </Typography>
              </Box>
              <Typography variant="body1" className="mb-3">
                <strong>Địa chỉ:</strong> {quanan?.dia_chi}
              </Typography>
              <Typography variant="body1" className="mb-3">
                <strong>Điện thoại:</strong> {quanan?.dien_thoai}
              </Typography>
              <Typography variant="body1" className="mb-3">
                <strong>Giờ hoạt động:</strong> {quanan?.gio_hoat_dong}
              </Typography>
              <Typography variant="body1" className="mb-3">
                <strong>Chủ quán:</strong> {nguoidung?.ten_nguoi_dung}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        : null}
        <>
        </>
    </div>

  );
};

export default EditNguoiDung;
