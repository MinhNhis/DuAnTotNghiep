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
        <CardContent sx={{ padding: "30px", backgroundColor: "#f9f9f9", borderRadius: "10px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
          <div style={{ position: 'relative' }}>
            <CardContent>
              <div className="col-6 offset-3 text-center mb-5">
                <img
                  src={nguoidung?.hinh_anh ? (nguoidung.hinh_anh.startsWith('http') ? nguoidung.hinh_anh : `${BASE_URL}/uploads/${nguoidung?.hinh_anh}`) : imgUser}
                  alt="image"
                  className="center"
                  style={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "4px solid #ddd",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)"
                  }}
                />
                <h3 className="text-dark" style={{ fontWeight: "600", marginTop: "15px" }}>{nguoidung?.ten_nguoi_dung}</h3>
              </div>
              <div className="row offset-3" style={{ display: 'flex', justifyContent: 'space-between', fontSize: "16px" }}>
                <div className="col-6" style={{ marginBottom: "15px" }}>
                  <p><strong>Ngày sinh</strong>: {nguoidung?.ngay_sinh}</p>
                  <p><strong>Giới tính</strong>: {nguoidung?.gioi_tinh}</p>
                  <p><strong>Email</strong>: {nguoidung?.email}</p>
                </div>
                <div className="col-6" style={{ marginBottom: "15px" }}>
                  <p><strong>Số điện thoại</strong>: {nguoidung?.so_dien_thoai}</p>
                  <p><strong>Địa chỉ</strong>: {nguoidung?.dia_chi}</p>
                </div>
              </div>
            </CardContent>
            <Link to={"/admin/nguoi-dung"}>
              <CloseIcon style={{
                position: 'absolute',
                top: 10,
                right: 10,
                cursor: 'pointer',
                color: "#999",
                transition: "color 0.3s ease"
              }}
                onMouseEnter={(e) => e.target.style.color = "#333"}
                onMouseLeave={(e) => e.target.style.color = "#999"} />
            </Link>
          </div>
        </CardContent>

        {nguoidung && quanan && quanan.created_user === nguoidung.id_nguoidung ?
          <Grid item xs={12} md={6}>
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
          </Grid>
          : null}
      </Card>
    </div>

  );
};

export default EditNguoiDung;
