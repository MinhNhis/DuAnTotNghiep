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

import { Link } from "react-router-dom";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { getDanhgia } from "../../../services/Danhgia";


const ExDanhGia = () => {
  const [danhgia, setDanhGia] = useState([])

  useEffect(() => {
    initFata()
  }, [])
  const initFata = async () => {
    const result = await getDanhgia()
    setDanhGia(result.data)
  }

  const renderStars = (stars) => {
    return [...Array(5)].map((_, i) => (
      i < stars
        ? <i key={i} className="fas fa-star text-primary me-2"></i>
        : <i key={i} className="far fa-star text-primary me-2"></i>
    ));
  };

  return (
    <Table aria-label="simple table" sx={{ mt: 3, }}>
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
        {danhgia.map((items, index) => (
          <TableRow key={items.id_danhgia}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                {index + 1}
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
                    WebkitLineClamp: 3,
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
  );
};

export default ExDanhGia;
