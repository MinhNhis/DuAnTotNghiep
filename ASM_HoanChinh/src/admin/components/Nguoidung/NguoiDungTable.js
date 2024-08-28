import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Visibility from "@mui/icons-material/Visibility";
import { getNguoiDung } from "../../../services/Nguoidung";
import { BASE_URL } from "../../../config/ApiConfig";
import imgUser from '../../assets/images/user.png'

const DichVuTable = () => {
  const navigate = useNavigate();

  const [nguoidung, setNguoidung] = useState([]);
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    const result = await getNguoiDung();
    setNguoidung(result.data);
  };

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
              Họ và tên
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Hình ảnh
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Email
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Vai trò
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
        {nguoidung.map((value, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography variant="body1" sx={{ fontSize: "15px", ml: 0.5 }}>
                {Number(index) + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="body1" sx={{ ml: 0.5 }}>
                    {value?.ten_nguoi_dung}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="body1" sx={{ ml: 0.5 }}>
                    <img src={value?.hinh_anh ? `${BASE_URL}/uploads/${value?.hinh_anh}` : imgUser} alt="image" style={{ width: "70px", height: "70px", borderRadius: "50%", objectFit: "cover" }} />
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="body1" sx={{ ml: 0.5 }}>
                    {value?.email}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="body1" sx={{ ml: 0.5 }}>
                    {value?.vai_tro == 0 ? "Admin": ""} 
                    {value?.vai_tro == 1 ? "User": ""} 
                    {value?.vai_tro == 2 ? "Admin quán": ""} 
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography>
                <Link to = {`/admin/nguoi-dung/chi-tiet/${value?.id_nguoidung}`}>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  style={{width: "50px", height: "50px"}}
                >
                  <Visibility />
                </IconButton>
                </Link>
                <Link to = {`/admin/nguoi-dung/delete/${value?.id_nguoidung}`}>
                <IconButton aria-label="delete" color="danger"style={{width: "50px", height: "50px"}}>
                  <DeleteIcon />
                </IconButton>
                </Link>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DichVuTable;
