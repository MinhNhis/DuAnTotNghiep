import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Box, Divider, Grid, Stack } from "@mui/material";
import { getQuananById } from "../../../../services/Quanan";
import ImgUser from "../../../assets/images/user.png";
import { BASE_URL } from "../../../../config/ApiConfig";
import { getMenus } from "../../../../services/MenuPhu";
import { getNguoiDung } from "../../../../services/Nguoidung";
import { getDanhmuc } from "../../../../services/Danhmuc";
import { getDanhgia } from "../../../../services/Danhgia";
import { getDatcho } from "../../../../services/Datcho";
import { getMenuOrder } from "../../../../services/MenuOrder";

const ListQuanAn = () => {
  const [quanan, setQuanan] = useState(null);
  const [menu, setMenu] = useState([]);
  const [menuOrder, setMenuOrder] = useState([]);
  const [nguoidung, setNguoidung] = useState([]);
  const [nguoidungdanh, setNguoiDungDanhGia] = useState([]);
  const [selectedTab, setSelectedTab] = useState("menu");
  const [danhmuc, setDanhMuc] = useState([]);
  const [danhgia, setDanhGia] = useState([]);
  const [dondat, setDonDat] = useState([]);
  const [stars, setStar] = useState(0);
  const params = useParams();
  const id = params.id;

  //khai báo phần xem thêm nội dung
  const [showFullDescription, setShowFullDescription] = useState(false);
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

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

      const resMenuOrder = await getMenuOrder();
      setMenuOrder(resMenuOrder.data)

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
      if (e.id_quanan === quanan.id_quanan) {
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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

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
                        <Typography variant="body1"><strong>Tên quán ăn:</strong> <span style={{ fontSize: "20px" }}>{quanan?.ten_quan_an}</span></Typography>
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
                              Ẩn bớt
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

          <Grid item xs={12} md={12}>

            <ul className="nav nav-tabs">
              <li className="nav-item">
                <div
                    className={`nav-link ${selectedTab === "menu" ? "active" : ""}`}
                    aria-current="page"
                    href="#"
                    onClick={() => setSelectedTab("menu")}
                    style={{ color: "#007bff" }}
                >
                  Menu
                </div>
              </li>
              <li className="nav-item">
                <div
                    className={`nav-link ${selectedTab === "danhmuc" ? "active" : ""}`}
                    aria-current="page"
                    href="#"
                    onClick={() => setSelectedTab("danhmuc")}
                    style={{ color: "#007bff" }}
                >
                  Danh mục
                </div>
              </li>
              <li className="nav-item">
                <div
                    className={`nav-link ${selectedTab === "danhgia" ? "active" : ""}`}
                    aria-current="page"
                    href="#"
                    onClick={() => setSelectedTab("danhgia")}
                    style={{ color: "#007bff" }}
                >
                  Đánh giá
                </div>
              </li>
              <li className="nav-item">
                <div
                    className={`nav-link ${selectedTab === "dondat" ? "active" : ""}`}
                    aria-current="page"
                    href="#"
                    onClick={() => setSelectedTab("dondat")}
                    style={{ color: "#007bff" }}
                >
                  Đơn đặt
                </div>
              </li>
            </ul>

            {selectedTab === "menu" && (
                <Grid container spacing={3} sx={{ paddingLeft: "10px", paddingTop: "15px" }}>
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
                              textAlign: "center",
                              paddingTop: "10px",
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
                                <Typography sx={{ fontSize: "15px", color: "#000" }}>
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
                <Box sx={{ paddingLeft: "10px", paddingTop: "15px" }}>
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

                    <Box sx={{
                      display: "flex", gap: 4, padding: 2, borderBottom: "1px solid #eee"
                    }}>
                      {/* Cột bên trái: Thông tin quán */}
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: "bold",
                            color: "#333",
                            marginBottom: "16px",
                          }}
                        >
                          {index + 1}. {dondat.ten_quan}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Ngày đặt:</strong> {new Date(dondat.ngay_dat).toLocaleDateString()} - {dondat.thoi_gian}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Mã đơn hàng:</strong> {dondat.ma_don}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Mã giao dịch:</strong> {dondat.ma_giao_dich}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Tiền cọc:</strong> {formatPrice(dondat.tien_coc)} (30%)
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Khách hàng:</strong> {dondat.ten_kh}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Số điện thoại:</strong> {dondat.sdt_kh}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Email:</strong> {dondat.email_kh}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Số lượng người:</strong> {dondat.so_luong_nguoi}
                        </Typography>
                        <Typography sx={{ fontSize: "15px", color: "#666", marginBottom: "8px" }}>
                          <strong>Yêu cầu khác:</strong> {dondat.yeu_cau_khac || "Không có yêu cầu đặc biệt"}
                        </Typography>
                        <Typography>
                          {dondat.trang_thai === 0 ? <span class="badge badge-warning">Đang chờ xử lý</span> : (dondat.trang_thai === 1 ? <span class="badge badge-success">Đã có chỗ</span> : (dondat.trang_thai === 2 ? <span class="badge badge-danger">Đã hủy</span> : (dondat.trang_thai === 3 ? <span class="badge badge-success">Đã hoàn thành</span> : "")))}
                        </Typography>
                      </Box>

                      {/* Cột bên phải: Thông tin món */}
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333", marginBottom: "16px" }}>
                          Thực đơn đã đặt
                        </Typography>
                        {menuOrder.map((item, itemIndex) => {
                          if (item.id_datcho === dondat.id_datcho) {
                            return (
                              <React.Fragment key={itemIndex}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "8px 0",
                                    borderBottom: itemIndex < menuOrder.length - 1 ? "1px solid #eee" : "none",
                                  }}
                                >
                                  <Typography sx={{ fontSize: "15px", flex: 2 }}>{item.ten_mon}</Typography>
                                  <Typography
                                    sx={{ fontSize: "15px", flex: 1, textAlign: "right", color: "#666" }}
                                  >
                                    {formatPrice(item.gia)} x {item.so_luong}
                                  </Typography>
                                </Box>
                              </React.Fragment>
                            );
                          }
                          return null;
                        })}

                        <React.Fragment >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mt: 2,
                            }}
                          >
                            <Typography sx={{ fontSize: "15px", fontWeight: "bold" }}>Tổng tiền:</Typography>
                            <Typography
                              sx={{
                                fontSize: "15px",
                                textAlign: "right",
                                color: "#666",
                              }}
                            >
                              {menuOrder
                                .filter((item) => item.id_datcho === dondat.id_datcho)
                                .reduce((total, item) => total + item.gia * item.so_luong, 0)
                                .toLocaleString("vi-VN", { style: "currency", currency: "VND" })}
                            </Typography>
                          </Box>
                        </React.Fragment>

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
                  Hiện tại chưa có đơn đặt chỗ nào.
                </Typography>
              )}
            </Box>
          )}
        </Grid>
      </Card>
    </div>
  );
};

export default ListQuanAn;                           