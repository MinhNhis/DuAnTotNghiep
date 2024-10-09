import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { baiviet } from "../../../services/Baiviet";
import { BASE_URL } from "../../../config/ApiConfig";

const BaiVietTable = () => {
  const [baiviets, setBaiviet] = useState([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await baiviet();
      setBaiviet(result.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bãi đỗ xe:", error);
      setBaiviet([]);
    }
  };
console.log(baiviets);

  return (
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
              Bài viết
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Nội dung
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Hình ảnh
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Ngày đăng
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
        {baiviets.map((baiviet, index) => (
          <TableRow key={baiviet.id_baiviet}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {index + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {baiviet.tieu_de}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {baiviet.noi_dung}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    <img src={`${BASE_URL}/uploads/${baiviet.hinh_anh}`} style={{width:'150px'}}></img>
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {baiviet.ngay_dang.split("-").reverse().join("/")}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Link to={`/admin/bai-viet/update/${baiviet.id_baiviet}`}>
                  <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to={`/admin/bai-viet/delete/${baiviet.id_baiviet}`}>
                  <IconButton aria-label="delete" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Link>
              </Box>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default BaiVietTable;