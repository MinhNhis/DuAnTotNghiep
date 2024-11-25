import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, Grid, Stack } from "@mui/material";
import { getNguoiDungById } from "../../../../services/Nguoidung";
import { BASE_URL } from "../../../../config/ApiConfig";
import ImgUser from "../../../assets/images/user.png";
import { getQuanan } from "../../../../services/Quanan";
import { getDanhgia } from "../../../../services/Danhgia";
const EditNguoiDung = () => {
  const [nguoidung, setNguoidung] = useState(null);
  const [quanan, setQuanan] = useState(null);
  const params = useParams();
  const id = params.id;
  const [danhgia, setDanhGia] = useState([]);
  const [stars, setStar] = useState(0);
  //khai báo phần xem thêm nội dung
  const [showFullDescription, setShowFullDescription] = useState(false);
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  //hết

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getNguoiDungById(id);
      setNguoidung(result.data);

      if (result.data.id_nguoidung) {
        const quananResult = await getQuanan();
        const quan = quananResult.data.find((e) => e.created_user === result.data.id_nguoidung);
        setQuanan(quan);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
    const DanhGiaList = await getDanhgia();
    setDanhGia(DanhGiaList.data);
  };
  const renderStars = (stars) => {
    return [...Array(5)].map((_, i) => {
      if (i < Math.floor(stars)) {
        return <i key={i} className="fas fa-star text-primary me-2"></i>;
      } else if (i < stars) {
        return <i key={i} className="fas fa-star-half-alt text-primary me-2"></i>;
      } else {
        return <i key={i} className="far fa-star text-primary me-2"></i>;
      }
    });
  };

  useEffect(() => {

    let totalStars = 0;
    let count = 0;


    danhgia.forEach(e => {
      console.log("Đánh giá hiện tại:", e);
      if (e.id_quanan === quanan.id_quanan) {
        // Kiểm tra xem giá trị có hợp lệ không
        if (typeof e.sao === 'number') {
          totalStars += e.sao;
          count++;
        }
      } else {
        console.log("Không khớp id quán ăn:", e.id_quanan, quanan.id_quanan);
      }
    });
    // Tính toán giá trị trung bình
    setStar(count > 0 ? (totalStars / count).toFixed(1) : 0);
  }, [danhgia, quanan]);

  return (
      <div className="container mt-4">
        <Card variant="outlined" sx={{ p: 0 }}>
          <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                CHI TIẾT NGƯỜI DÙNG
              </Typography>
            </Box>
          </Box>
          <CardContent sx={{ padding: "40px" }}>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} sm={4} sx={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                    src={nguoidung?.hinh_anh ? (nguoidung.hinh_anh.startsWith('http') ? nguoidung.hinh_anh : `${BASE_URL}/uploads/${nguoidung.hinh_anh}`) : (ImgUser)}
                    alt="User Avatar"
                    style={{
                      width: 150,
                      height: 150,
                      marginBottom: 2,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                />
                <Typography variant="h5" fontWeight="600" sx={{ color: "#333" }}>
                  {nguoidung?.ten_nguoi_dung || "Chủ quán"}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  Quản lý quán ăn
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <Stack spacing={2}>
                  <Typography variant="body1"><strong>Ngày sinh:</strong> {nguoidung?.ngay_sinh ? nguoidung.ngay_sinh.split("-").reverse().join("/") : "N/A"}</Typography>

                  <Typography variant="body1"><strong>Giới tính:</strong> {nguoidung?.gioi_tinh || "N/A"}</Typography>
                  <Typography variant="body1"><strong>Email:</strong> {nguoidung?.email || "N/A"}</Typography>
                  <Typography variant="body1"><strong>Số điện thoại:</strong> {nguoidung?.so_dien_thoai || "N/A"}</Typography>
                  <Typography variant="body1"><strong>Địa chỉ:</strong> {nguoidung?.dia_chi || "N/A"}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </CardContent>
          {nguoidung && quanan && quanan.created_user === nguoidung.id_nguoidung && (
              <>
                <Divider variant="middle" />
                <CardContent>
                  <Box sx={{ textAlign: "center", marginBottom: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: "bold", color: "#1976d2" }}>
                      <strong>Thông Tin Quán Ăn</strong>
                    </Typography>
                  </Box>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <img
                          src={quanan?.hinh_anh ? `${BASE_URL}/uploads/${quanan?.hinh_anh}` : ""}
                          alt="Restaurant"
                          style={{
                            width: "100%",
                            height: "400px",
                            borderRadius: "10px",
                            objectFit: "cover",
                          }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Stack spacing={2}>
                        <Typography variant="body1"><strong>Tên quán ăn:</strong> <span style={{fontSize: "20px"}}>{quanan?.ten_quan_an}</span></Typography>
                        <Typography variant="body1"><strong>Đánh giá :  {renderStars(stars)} ({stars})</strong></Typography>
                        <Typography variant="body1"><strong>Địa chỉ:</strong> {quanan?.dia_chi}</Typography>
                        <Typography variant="body1"><strong>Điện thoại:</strong> {quanan?.dien_thoai}</Typography>
                        <Typography variant="body1"><strong>Giờ hoạt động:</strong> {quanan?.gio_mo_cua} - {quanan?.gio_dong_cua}</Typography>
                      </Stack>
                      <Box mt={4}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1976d2", textAlign: "left", mb: 2 }}>
                          <strong>Thông tin giới thiệu</strong>
                        </Typography>

                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography variant="body1"><strong>Giới thiệu:</strong><span
                                style={{
                                  ml: 0.5,
                                  fontSize: "15px",
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  display: '-webkit-box',
                                  WebkitLineClamp: showFullDescription ? 'none' : 2,
                                  WebkitBoxOrient: 'vertical',
                                  whiteSpace: 'normal',
                                }}
                            > {quanan?.mo_ta || "Chưa cập nhật"}</span>
                              {!showFullDescription && quanan?.mo_ta && quanan.mo_ta.length > 100 && (
                                  <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleToggleDescription}>
                              ... Xem thêm
                            </span>
                              )}
                              {showFullDescription && (
                                  <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleToggleDescription}>
                              Xem ít hơn
                            </span>
                              )}</Typography>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={2}>
                              <Typography variant="body1">
                                <strong>Tiện nghi:</strong>{" "}
                                {quanan?.tiennghis && quanan.tiennghis.length > 0
                                    ? quanan.tiennghis.map((tiennghi) => tiennghi.tien_nghi).join(", ")
                                    : "Chưa cập nhật"}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Không khí:</strong>{" "}
                                {quanan?.khongkhis && quanan.khongkhis.length > 0
                                    ? quanan.khongkhis.map((khongkhi) => khongkhi.khong_khi).join(", ")
                                    : "Chưa cập nhật"}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Dịch vụ:</strong>{" "}
                                {quanan?.dichvus && quanan.dichvus.length > 0
                                    ? quanan.dichvus.map((dichvu) => dichvu.dich_vu).join(", ")
                                    : "Chưa cập nhật"}
                              </Typography>
                            </Stack>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Stack spacing={2}>
                              <Typography variant="body1">
                                <strong>Kế hoạch:</strong>{" "}
                                {quanan?.kehoachs && quanan.kehoachs.length > 0
                                    ? quanan.kehoachs.map((kehoach) => kehoach.ke_hoach).join(", ")
                                    : "Chưa cập nhật"}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Bãi dỗ xe:</strong>{" "}
                                {quanan?.baidoxes && quanan.baidoxes.length > 0
                                    ? quanan.baidoxes.map((baidoxe) => baidoxe.bai_do_xe).join(", ")
                                    : "Chưa cập nhật"}
                              </Typography>
                              <Typography variant="body1">
                                <strong>Loại khách hàng:</strong>{" "}
                                {quanan?.loaikhs && quanan.loaikhs.length > 0
                                    ? quanan.loaikhs.map((loaikh) => loaikh.khach_hang).join(", ")
                                    : "Chưa cập nhật"}
                              </Typography>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </>
          )}
        </Card>
      </div>
  );
};

export default EditNguoiDung;