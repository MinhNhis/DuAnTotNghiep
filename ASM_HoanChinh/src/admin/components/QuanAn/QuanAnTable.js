import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../config/ApiConfig";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
  Stack,
  Divider,
  CardActions,
  Button
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import FacebookIcon from '@mui/icons-material/Facebook';
import { getQuanan, paginator } from "../../../services/Quanan";
import PaginationRounded from "../Paginator";
import { useCookies } from "react-cookie";

const ExQuanAn = () => {
  const [quanan, setQuanan] = useState([]);
  const [accounts, setAccounts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  //khai báo phần xem thêm nội dung
  const [showFullDescription, setShowFullDescription] = useState(false);
  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  //hết
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initQuanan();
  }, []);

  const [cookies] = useCookies(["token", "role"]);

  const initData = async (data) => {
    if (cookies.role === 0) {
      setQuanan(data.data);
      setCurrentPage(data.pagination.currentPage);
    } else {
      const result = await getQuanan();
      setQuanan(result.data);
    }
  };

  const initQuanan = async () => {
    if (cookies.role !== 0) {
      const result = await getQuanan();
      setQuanan(result.data);
    } else return null;
  };

  const filteredQuanan = quanan.filter(
    (fil) =>
      fil?.created_user === accounts?.id_nguoidung ||
      fil?.updated_user === accounts?.id_nguoidung ||
      accounts?.vai_tro === 0
  );

  const renderTable = () => (
    <>
      <Table aria-label="simple table" sx={{ mt: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                STT
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Tên Quán Ăn
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Hình Ảnh
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Địa Chỉ
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Điện Thoại
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Hành động
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredQuanan.map((items, index) => (
            <TableRow key={items.id_quanan}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  <Link
                    to={`/admin/quanan/chi-tiet/${items?.id_quanan}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {items.ten_quan_an}
                  </Link>
                </Typography>
              </TableCell>
              <TableCell>
                <Link to={`/admin/quanan/chi-tiet/${items?.id_quanan}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {items.hinh_anh && (
                    <img
                      style={{ height: "5rem", width: "6rem" }}
                      src={`${BASE_URL}/uploads/${items.hinh_anh}`}
                      alt={items.ten_quan_an}
                    />
                  )}
                </Link>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {items.dia_chi}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {items.dien_thoai}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <Link to={`/admin/quanan/edit/${items.id_quanan}`}>
                    <IconButton
                      aria-label="edit"
                      color="primary"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <Link to={`/admin/quanan/delete/${items.id_quanan}`}>
                    <IconButton
                      aria-label="delete"
                      color="danger"
                      style={{ width: "50px", height: "50px" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Link>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TableRow
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
          button: {
            color: "black",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            fontSize: "0.8rem",
            margin: "0 5px",
            "&.Mui-selected": 
            {
              backgroundColor: "#CCCCCC",
            }
          },
        }}>
        <PaginationRounded
          onDataChange={cookies.role === 0 ? initData : initQuanan}
          paginator={paginator}
        />
      </TableRow>
    </>
  );

  const renderProfile = () => (
    <div className="container mt-4">
      <CardContent sx={{ padding: "30px", position: "relative" }}>
        <Grid container spacing={4}>
          {filteredQuanan.map((items, index) => (
            <React.Fragment key={index}>
              <Divider variant="middle" />
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <img
                    src={
                      items?.hinh_anh
                        ? `${BASE_URL}/uploads/${items?.hinh_anh}`
                        : ""
                    }
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
                    <Typography variant="body1">
                      <strong>Tên quán ăn:</strong> <span style={{fontSize: "20px"}}>{items?.ten_quan_an}</span>
                    </Typography>
                    <Typography variant="body1">
                      <strong>Địa chỉ:</strong> {items?.dia_chi}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Điện thoại:</strong> {items?.dien_thoai}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Giờ hoạt động:</strong> {items?.gio_mo_cua} - {items?.gio_dong_cua}
                    </Typography>
                  </Stack>
                  <Box mt={4}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: "bold",
                        color: "#1976d2",
                        textAlign: "left",
                        mb: 2,
                      }}
                    >
                      <strong>Thông tin giới thiệu</strong>
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="body1">
                          <strong>Giới thiệu:</strong>
                          <span
                            style={{
                              ml: 0.5,
                              fontSize: "15px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: showFullDescription ? 'none' : 2,
                              WebkitBoxOrient: "vertical",
                              whiteSpace: "normal",
                            }}
                          >
                            {" "}
                            {items?.mo_ta || "Chưa cập nhật"}
                          </span>
                          {!showFullDescription && items?.mo_ta && items.mo_ta.length > 100 && (
                            <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleToggleDescription}>
                              ... Xem thêm
                            </span>
                          )}
                          {showFullDescription && (
                            <span style={{ cursor: 'pointer', color: 'blue' }} onClick={handleToggleDescription}>
                              Xem ít hơn
                            </span>
                          )}
                        </Typography>

                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                          <Typography variant="body1">
                            <strong>Tiện nghi:</strong>{" "}
                            {items?.tiennghis && items.tiennghis.length > 0
                              ? items.tiennghis
                                .map((tiennghi) => tiennghi.tien_nghi)
                                .join(", ")
                              : "Chưa cập nhật"}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Không khí:</strong>{" "}
                            {items?.khongkhis && items.khongkhis.length > 0
                              ? items.khongkhis
                                .map((khongkhi) => khongkhi.khong_khi)
                                .join(", ")
                              : "Chưa cập nhật"}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Dịch vụ:</strong>{" "}
                            {items?.dichvus && items.dichvus.length > 0
                              ? items.dichvus
                                .map((dichvu) => dichvu.dich_vu)
                                .join(", ")
                              : "Chưa cập nhật"}
                          </Typography>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Stack spacing={2}>
                          <Typography variant="body1">
                            <strong>Kế hoạch:</strong>{" "}
                            {items?.kehoachs && items.kehoachs.length > 0
                              ? items.kehoachs
                                .map((kehoach) => kehoach.ke_hoach)
                                .join(", ")
                              : "Chưa cập nhật"}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Bãi đỗ xe:</strong>{" "}
                            {items?.baidoxes && items.baidoxes.length > 0
                              ? items.baidoxes
                                .map((baidoxe) => baidoxe.bai_do_xe)
                                .join(", ")
                              : "Chưa cập nhật"}
                          </Typography>
                          <Typography variant="body1">
                            <strong>Loại khách hàng:</strong>{" "}
                            {items?.loaikhs && items.loaikhs.length > 0
                              ? items.loaikhs
                                .map((loaikh) => loaikh.khach_hang)
                                .join(", ")
                              : "Chưa cập nhật"}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Box>
                  <CardActions
                    sx={{
                      position: "absolute",
                      bottom: -25,
                      left: 16,
                    }}
                  >
                    {items.link_website && (
                      <Button
                        size="medium"
                        startIcon={<LanguageIcon />}
                        href={items.link_website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Website
                      </Button>
                    )}
                    {items.link_facebook && (
                      <Button
                        size="medium"
                        startIcon={<FacebookIcon />}
                        href={items.link_facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Facebook
                      </Button>
                    )}
                  </CardActions>
                  <CardActions
                    sx={{
                      position: "absolute",
                      top: -30,
                      right: 16,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: 'center'
                    }}
                  >
                    <Link to={`/admin/quanan/edit/${items.id_quanan}`}>
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        sx={{
                          width: "45px",
                          height: "45px",
                          mb: 1,
                          backgroundColor: "rgba(230, 230, 230, 0.8)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <Link to={`/admin/quanan/delete/${items.id_quanan}`}>
                      <IconButton
                        aria-label="delete"
                        color="error"
                        sx={{
                          width: "45px",
                          height: "45px",
                          backgroundColor: "rgba(230, 230, 230, 0.8)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 1)",
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Link>

                  </CardActions>
                </Grid>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </div>

  );
  return cookies.role === 0 ? renderTable() : renderProfile();
};

export default ExQuanAn;