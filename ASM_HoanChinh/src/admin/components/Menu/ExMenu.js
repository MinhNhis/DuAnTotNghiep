import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getMenus } from "../../../services/MenuPhu";
import { BASE_URL } from "../../../config/ApiConfig";
// import { deleteMenu } from "../../../services/MenuPhu";

const ExMenu = () => {
  const [Menu, setMenus] = useState([]);
  const navigate = useNavigate();
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

  useEffect(() => {
    initData();
  }, []);

  const initData = () => {
    getMenus().then((result) => {
      console.log(result);
      if (result && Array.isArray(result.data)) {
        setMenus(result.data);
      } else {
        setMenus([]);
      }
    });
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
              Tên món ăn
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Giá
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Hình ảnh
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
        {Menu.map((menu, index) => (
          <TableRow key={menu.id_menu}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {Number(index) + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    {menu.ten_menu}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {formatCurrency(menu.gia)}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {menu.hinh_anh && (
                  <img
                    src={`${BASE_URL}/uploads/${menu.hinh_anh}`}
                    style={{ width: "50px", height: "50px" }}
                    alt=""
                  />
                )}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ width: "50px", height: "50px" }}>
                <Link to={`/admin/menu/edit/${menu.id_menu}`}>
                  <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>

                <Link to={`/admin/menu/delete/${menu.id_menu}`}>
                  <IconButton aria-label="delete" color="error">
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

export default ExMenu;
