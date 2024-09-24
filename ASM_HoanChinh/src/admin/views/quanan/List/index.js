import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Typography,
  FormControl,
  Card,
  CardContent,
  Box,
  Divider,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

import { getQuananById } from "../../../../services/Quanan";
import { BASE_URL } from "../../../../config/ApiConfig";
import { getMenus } from "../../../../services/MenuPhu";
import { getNguoiDung } from "../../../../services/Nguoidung";
import { getDanhmuc } from "../../../../services/Danhmuc";
import { getDanhgia } from "../../../../services/Danhgia";
import { getDatcho } from "../../../../services/Datcho";

const ListQuanAn = () => {
  const [quanan, setQuanan] = useState(null);
  const [menu, setMenu] = useState([]);
  const [nguoidung, setNguoidung] = useState([]);
  const [nguoidungdanh, setNguoiDungDanhGia] = useState([]);
  const [selectedTab, setSelectedTab] = useState("menu");
  const [danhmuc, setDanhMuc] = useState([]);
  const [danhgia, setDanhGia] = useState([]);
  const [dondat, setDonDat] = useState([]);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    initData();
  }, [id]);

  const initData = async () => {
    try {
      const quananResult = await getQuananById(id);
      setQuanan(quananResult.data);

      if (quananResult.data?.id_quanan) {
        const menuResult = await getMenus(quananResult.data.id_quanan);
        setMenu(menuResult.data);
      }

      const nguoiDungList = await getNguoiDung();
      const User = nguoiDungList.data.find(
        (e) => e.id_nguoidung === quananResult.data.created_user
      );
      if (User) {
        setNguoidung(User);
      } else {
        setNguoidung([]);
      }
      setNguoiDungDanhGia(nguoiDungList.data);

      const DanhMucList = await getDanhmuc();
      setDanhMuc(DanhMucList.data);

      const DanhGiaList = await getDanhgia();
      setDanhGia(DanhGiaList.data);

      const DonDatList = await getDatcho();
      setDonDat(DonDatList.data);

    } catch (error) {
      console.error("không có dữ liệu:", error);
    }
  };
  const renderStars = (stars) => {
    return [...Array(5)].map((_, i) => (
      i < stars
        ? <i key={i} className="fas fa-star text-primary me-2"></i>
        : <i key={i} className="far fa-star text-primary me-2"></i>
    ));
  };

console.log(nguoidungdanh);

  return (
    <div className="container mt-4">
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              CHI TIẾT QUÁN ĂN
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={12}>
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
                        height: "500px",
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

            <Grid item xs={12} md={12}>

              <CardContent>
                <Typography sx={{ fontSize: "20px", fontWeight: "bold" }}>
                  Xem chi tiết quán
                </Typography>
                <FormControl fullWidth className=" mt-4" style={{ width: "20%" }}>
                  <InputLabel id="tab-select-label">Chọn mục</InputLabel>
                  <Select
                    labelId="tab-select-label"
                    id="tab-select"
                    value={selectedTab}
                    label="Chọn mục"
                    onChange={(e) => setSelectedTab(e.target.value)}
                  >
                    <MenuItem value="menu">Menu</MenuItem>
                    <MenuItem value="danhmuc">Danh mục</MenuItem>
                    <MenuItem value="danhgia">Đánh giá</MenuItem>
                    <MenuItem value="dondat">Đơn đặt chổ</MenuItem>
                  </Select>
                </FormControl>
                {selectedTab === "menu" && (
                  <Grid container spacing={3}>
                    {menu.filter((item) => item.id_quanan === quanan?.id_quanan).length > 0 ? (
                      menu
                        .filter((item) => item.id_quanan === quanan?.id_quanan)
                        .map((item) => (
                          <Grid item xs={12} sm={6} md={3} key={item.id_menu}>
                            <Card sx={{ borderRadius: "12px", width: "100%", padding: "10px" }}>
                              <CardContent>
                                <img
                                  src={item?.hinh_anh ? `${BASE_URL}/uploads/${item?.hinh_anh}` : ""}
                                  alt={item.ten_menu}
                                  style={{
                                    width: "100%",
                                    height: "90px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                  }}
                                />
                                <Typography sx={{ fontSize: "15px", color: "#000" }}>
                                  {item.ten_menu}
                                </Typography>
                                <Typography sx={{ fontSize: "14px", color: "#757575" }}>
                                  Giá: {item.gia}đ
                                </Typography>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))
                    ) : (
                      <Grid item xs={12}>
                        <Typography
                          sx={{
                            fontSize: "15px",
                            color: "#000",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: "30px",
                          }}
                        >
                          Hiện tại chưa có món ăn nào.
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                )}
                {selectedTab === "danhmuc" && (
                  <Box sx={{ paddingLeft: "10px", paddingTop: "15px" }}>
                    {danhmuc.filter((fil) => fil.created_user === quanan?.created_user).length > 0 ? (
                      danhmuc
                        .filter((fil) => fil.created_user === quanan?.created_user)
                        .map((danhmuc, index) => (
                          <Box
                            key={danhmuc.id_danhmuc}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              marginBottom: "10px",
                              padding: "12px 20px",
                              borderBottom: "1px solid #E0E0E0",
                            }}
                          >
                            <Typography
                              sx={{
                                fontSize: "15px",
                                color: "#000",
                              }}
                            >
                              {danhmuc.danh_muc}
                            </Typography>
                          </Box>
                        ))
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#000",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        Hiện tại chưa có danh mục nào.
                      </Typography>
                    )}
                  </Box>
                )}

                {selectedTab === "danhgia" && (
                  <Box sx={{ padding: "15px" }}>
                    {danhgia.filter((fil) => fil.id_quanan === quanan?.id_quanan).length > 0 ? (
                      danhgia
                        .filter((fil) => fil.id_quanan === quanan?.id_quanan)
                        .map((danhgia) => (
                          <Box
                            key={danhgia.id_danhgia}
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              marginBottom: "15px",
                              padding: "15px",
                              borderRadius: "8px",
                              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.1)",
                              backgroundColor: "#f9f9f9",
                            }}
                          >
                            <Box sx={{ flex: 1 }}>
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  marginTop: "10px",
                                }}
                              >
                                {nguoidungdanh.map((ngdg) => {
                                  if (ngdg.id_nguoidung === danhgia.id_nguoidung) {
                                    return (
                                      <Typography
                                        sx={{
                                          fontSize: "15px",
                                          color: "#000",
                                        }}
                                      >
                                        <strong>{ngdg.ten_nguoi_dung}</strong>
                                      </Typography>
                                    )
                                  } else return null
                                }
                                )}
                                <Typography
                                  sx={{
                                    fontSize: "14px",
                                    color: "#999",
                                  }}
                                >
                                  {new Date(danhgia.created_at).toLocaleDateString()}
                                </Typography>
                              </Box>
                              <Typography>
                                <img
                                  src={danhgia?.hinh_anh ? `${BASE_URL}/uploads/${danhgia?.hinh_anh}` : ""}
                                  style={{
                                    width: "40%",
                                    height: "200px",
                                    objectFit: "cover",
                                    borderRadius: "8px",
                                    marginTop: "10px",
                                  }}
                                />
                              </Typography>
                              {danhgia.hinh_danh && (
                                <Box sx={{ marginTop: "8px" }}>
                                  <img
                                    src={danhgia.hinh_danh}
                                    alt="Hình đánh giá"
                                    style={{
                                      maxWidth: "100%",
                                      borderRadius: "8px",
                                      boxShadow: "0 1px 4px rgba(0, 0, 0, 0.2)",
                                    }}
                                  />
                                </Box>
                              )}
                              <Typography
                                sx={{
                                  fontSize: "14px",
                                  color: "#777",
                                  marginBottom: "4px",
                                  marginTop: "10px",
                                }}
                              >
                                {renderStars(danhgia.sao)}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  color: "#333",
                                  marginBottom: "8px",
                                }}
                              >
                                <strong>Nội dung:</strong> {danhgia.binh_luan}
                              </Typography>
                            </Box>
                          </Box>
                        ))
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#000",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        Hiện tại chưa có đánh giá nào.
                      </Typography>
                    )}
                  </Box>
                )}
                {selectedTab === "dondat" && (
                  <Box sx={{ paddingLeft: "10px", paddingTop: "15px" }}>
                    {dondat.filter((fil) => fil.id_quanan === quanan?.id_quanan).length > 0 ? (
                      dondat
                        .filter((fil) => fil.id_quanan === quanan?.id_quanan)
                        .map((dondat, index) => (
                          <Box
                            key={dondat.id_datcho}
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              marginBottom: "10px",
                              padding: "10px",
                              borderBottom: "1px solid #E0E0E0",
                              backgroundColor: "#f9f9f9",
                              borderRadius: "5px",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "#333",
                                }}
                              >
                                {index + 1}. {dondat.ten_quan}
                              </Typography>
                              <Typography
                                sx={{
                                  fontSize: "15px",
                                  color: "#888",
                                }}
                              >
                                {new Date(dondat.ngay_dat).toLocaleDateString()} - {dondat.thoi_gian}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                flexWrap: "wrap",
                                marginBottom: "8px",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                <strong>Khách hàng:</strong> {dondat.ten_kh}
                              </Typography>
                              <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                <strong>Số điện thoại:</strong> {dondat.sdt_kh}
                              </Typography>
                              <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                <strong>Email:</strong> {dondat.email_kh}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                justifyContent: "space-between",
                                marginBottom: "8px",
                              }}
                            >
                              <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                <strong>Số lượng người:</strong> {dondat.so_luong_nguoi}
                              </Typography>
                              <Typography sx={{ fontSize: "15px", color: "#555" }}>
                                <strong>Trạng thái:</strong> {dondat.trang_thai === 0 ? "Đang chờ xử lý" : null}
                                {dondat.trang_thai === 1 ? "Đã có chổ" : null}
                                {dondat.trang_thai === 2 ? "Đã hủy" : null}

                              </Typography>
                            </Box>
                            <Typography sx={{ fontSize: "15px", color: "#555" }}>
                              <strong>Yêu cầu khác:</strong> {dondat.yeu_cau_khac || "Không có yêu cầu đặc biệt"}
                            </Typography>
                          </Box>
                        ))
                    ) : (
                      <Typography
                        sx={{
                          fontSize: "15px",
                          color: "#000",
                          textAlign: "center",
                          paddingTop: "10px",
                        }}
                      >
                        Hiện tại chưa có đơn đặt chỗ nào.
                      </Typography>
                    )}
                  </Box>
                )}

              </CardContent>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListQuanAn;