import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Box, Divider, Grid, Stack, Button } from "@mui/material";
import { getQuananById } from "../../../../services/Quanan";
import ImgUser from "../../../assets/images/user.png";
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
  const [stars, setStar] = useState(0);
  const params = useParams();
  const id = params.id;
  const [serviceRating, setServiceRating] = useState(0); // Đánh giá dịch vụ
  const [foodRating, setFoodRating] = useState(0); // Đánh giá đồ ăn
  const [atmosphereRating, setAtmosphereRating] = useState(0); // Đánh giá không khí
  const [visibleCount, setVisibleCount] = useState(2); // Initially show 2 items

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 2); // Increase count by 2
  };

  const handleServiceRating = (value) => {
    setServiceRating(value);
  }

  const handleFoodRating = (value) => {
    setFoodRating(value);
  }

  const handleAtmosphereRating = (value) => {
    setAtmosphereRating(value);
  }


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
  const renderStars = (Rating) => {
    return [...Array(5)].map((_, i) => {
      if (i < Math.floor(Rating)) {
        return <i key={i} className="fas fa-star text-primary me-2"></i>;
      } else if (i < Rating) {
        return <i key={i} className="fas fa-star-half-alt text-primary me-2"></i>;
      } else {
        return <i key={i} className="far fa-star text-primary me-2"></i>;
      }
    });
  };

  useEffect(() => {
    let totalFoodStars = 0;
    let totalServiceStars = 0;
    let totalAtmosphereStars = 0;
    let totalStars = 0;
    let count = 0;
    let foodCount = 0;
    let serviceCount = 0;
    let atmosphereCount = 0;

    danhgia.forEach(e => {
      console.log("Đánh giá hiện tại:", e);
      if (e.id_quanan === quanan.id_quanan) {
        // Kiểm tra xem giá trị có hợp lệ không
        if (typeof e.danh_gia_do_an === 'number') {
          totalFoodStars += e.danh_gia_do_an;
          foodCount++;
        }
        if (typeof e.danh_gia_dich_vu === 'number') {
          totalServiceStars += e.danh_gia_dich_vu;
          serviceCount++;
        }
        if (typeof e.danh_gia_khong_khi === 'number') {
          totalAtmosphereStars += e.danh_gia_khong_khi;
          atmosphereCount++;
        }
        if (typeof e.sao === 'number') {
          totalStars += e.sao;
          count++;
        }
      } else {
        console.log("Không khớp id quán ăn:", e.id_quanan, quanan.id_quanan);
      }
    });

    // Log kết quả tính toán
    console.log({
      totalFoodStars,
      foodCount,
      totalServiceStars,
      serviceCount,
      totalAtmosphereStars,
      atmosphereCount,
      totalStars,
      count
    });

    // Tính toán giá trị trung bình
    setStar(count > 0 ? (totalStars / count).toFixed(1) : 0);
    setFoodRating(foodCount > 0 ? (totalFoodStars / foodCount).toFixed(1) : 0);
    setServiceRating(serviceCount > 0 ? (totalServiceStars / serviceCount).toFixed(1) : 0);
    setAtmosphereRating(atmosphereCount > 0 ? (totalAtmosphereStars / atmosphereCount).toFixed(1) : 0);
  }, [danhgia, quanan]);

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
                <Grid container>
                  <Grid xs={12} md={12}>
                    <Box sx={{ paddingLeft: "10px", paddingTop: "15px" }}>
                      {danhgia.filter((fil) => fil.id_quanan === quanan?.id_quanan).length > 0 ? (
                          danhgia
                              .filter((fil) => fil.id_quanan === quanan?.id_quanan)
                              .slice(0, visibleCount) // Show only visibleCount reviews
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
                                                    key={ngdg.id_nguoidung}
                                                    sx={{
                                                      fontSize: "15px",
                                                      color: "#000",
                                                    }}
                                                >
                                                  <strong style={{ fontSize: '15px',  }}>Người dùng: {ngdg.ten_nguoi_dung}</strong>
                                                </Typography>
                                            );
                                          } else return null;
                                        })}
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
                                              width: "30%",
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
                                        <h1 style={{ fontSize: '25px' }}>Đánh giá</h1>
                                        {renderStars(danhgia.sao)}
                                      </Typography>
                                      <Typography
                                          sx={{
                                            fontSize: "14px",
                                            color: "#777",
                                            marginBottom: "4px",
                                            marginTop: "10px",
                                          }}
                                      >
                                        <h1 style={{ fontSize: '25px' }}>Các đánh giá khác</h1>
                                        <p>{renderStars(danhgia.danh_gia_do_an)} (Đánh giá đồ ăn)</p>
                                        <p>{renderStars(danhgia.danh_gia_dich_vu)} (Đánh giá dịch vụ)</p>
                                        <p>{renderStars(danhgia.danh_gia_khong_khi)} (Đánh giá không khí)</p>
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

                      {danhgia.filter((fil) => fil.id_quanan === quanan?.id_quanan).length > visibleCount && (
                          <Box sx={{ display: "flex", justifyContent: "center", mt:'10px', mb:"10px" }}>
                            <Button
                                variant="outlined"
                                onClick={handleLoadMore}
                            >
                              Xem thêm
                            </Button>
                          </Box>
                      )}
                    </Box>
                  </Grid>
                </Grid>
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
          </Grid>

        </Card>
      </div>
  );
};

export default ListQuanAn;                           