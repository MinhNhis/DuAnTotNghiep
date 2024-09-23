import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/ApiConfig";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
} from "@mui/material";



import { getDanhgia, paginator } from "../../../services/Danhgia";
import { getQuanan } from "../../../services/Quanan";

import PaginationRounded from "../Paginator";
import { useCookies } from "react-cookie";


const ExDanhGia = () => {
  const [danhgia, setDanhGia] = useState([])
  const [quanan, setQuanan] = useState([])
  const [accounts, setAccounts] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initDanhgia()
  }, [])

  const [cookies] = useCookies(["token", "role"]);
  const initData = async (data) => {
    if (cookies.role === 0) {
      setDanhGia(data.data)
      setCurrentPage(data.pagination.currentPage)
    }
    else {
      const result = await getDanhgia()
      setDanhGia(result.data)
    }
    const resultQuan = await getQuanan()
    setQuanan(resultQuan.data)
  }

  const initDanhgia = async () => {
    if (cookies.role !== 0) {
      const result = await getDanhgia()
      setDanhGia(result.data)

      const resultQuan = await getQuanan()
      setQuanan(resultQuan.data)

    } else return null
  }
  const quan = quanan.find((e) => e.created_user === accounts.id_nguoidung || e.updated_user === accounts.id_nguoidung)

  const renderStars = (stars) => {
    return [...Array(5)].map((_, i) => (
      i < stars
        ? <i key={i} className="fas fa-star text-primary me-2"></i>
        : <i key={i} className="far fa-star text-primary me-2"></i>
    ));
  };

  return (
    <>
      <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                STT
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Hình Ảnh
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Bình Luận
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Thức ăn
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Dịch vụ
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Không Khí
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Số Sao
              </Typography>
            </TableCell>
            {/* <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Hành động
            </Typography>
          </TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {danhgia.filter(fil => fil?.id_quanan === quan?.id_quanan || accounts?.vai_tro === 0).map((items, index) => (
            <TableRow key={items.id_danhgia}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                  {items.hinh_anh && (
                    <img style={{ height: '5rem', width: '6rem' }} src={`${BASE_URL}/uploads/${items.hinh_anh}`} alt=""></img>
                  )}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  <Typography
                    variant="body1"
                    sx={{
                      ml: 0.5,
                      fontSize: "15px",
                      display: '-webkit-box',
                      WebkitLineClamp: 2, // Chỉ hiển thị 2 dòng
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal'
                    }}
                  >
                    {items.binh_luan}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                  {items.danh_gia_do_an}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                  {items.danh_gia_dich_vu}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                  {items.danh_gia_khong_khi}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                  {renderStars(items.sao)}
                </Typography>
              </TableCell>
              <TableCell>
                {/* <Typography >
                <Link to={`/admin/danhgia/edit/${items.id_danhgia}`}>
                  <IconButton aria-label="edit" color="primary" style={{ width: "50px", heighte: "50px" }}>
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to={`/admin/danhgia/delete/${items.id_danhgia}`}>
                  <IconButton aria-label="edit" color="danger" style={{ width: "50px", heighte: "50px" }}>
                    <DeleteIcon />
                  </IconButton>
                </Link>
              </Typography> */}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {cookies.role !== 2 && (
        <TableRow
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            button: {
              backgroundColor: "#1976d2",
              color: "#fff",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              fontSize: "0.8rem",
              margin: "0 5px",
              "&.Mui-selected": {
                backgroundColor: "#1e88e5",
              }
            },
          }}>
          <PaginationRounded onDataChange={cookies.role === 0 ? initData : initDanhgia} paginator={paginator} />
        </TableRow>
      )}
    </>
  );
};

export default ExDanhGia;
