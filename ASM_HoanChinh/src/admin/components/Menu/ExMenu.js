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
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getMenus, paginator } from "../../../services/MenuPhu";
import { BASE_URL } from "../../../config/ApiConfig";
import PaginationRounded from "../Paginator";
import { useCookies } from "react-cookie";

const ExMenu = () => {
  const [Menu, setMenus] = useState([]);
  const [accounts, setAccounts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initMenu()
  }, []);

  const [cookies] = useCookies(["token", "role"]);
  const initMenu = async () => {
    if (cookies.role !== 0) {
      const result = await getMenus()
      setMenus(result.data)
    } else return null
  }
  const initData = async (data) => {
    if (cookies.role === 0) {
      setMenus(data.data)
      setCurrentPage(data.pagination.currentPage)
    }
    else {
      const result = await getMenus()
      setMenus(result.data)
    }
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
          {Menu.filter(fil => fil?.created_user === accounts?.id_nguoidung || fil?.updated_user === accounts?.id_nguoidung || accounts?.vai_tro === 0).map((menu, index) => (
            <TableRow key={menu.id_menu}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Box>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
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
                      style={{ width: "6rem", height: "5rem" }}
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
      {cookies.role !== 2 && (
        <TableRow sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <PaginationRounded onDataChange={cookies.role === 0 ? initData : initMenu} paginator={paginator} />
        </TableRow>
      )}
    </>
  );
};

export default ExMenu;
