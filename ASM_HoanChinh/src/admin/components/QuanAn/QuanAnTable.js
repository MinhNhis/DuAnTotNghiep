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
} from "@mui/material";

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getQuanan, paginator } from "../../../services/Quanan";

import PaginationRounded from "../Paginator";
import { useCookies } from "react-cookie";


const ExQuanAn = () => {
  const [quanan, setQuanan] = useState([])
  const [accounts, setAccounts] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initQuanan()
  }, [])

  const [cookies] = useCookies(["token", "role"]);
  const initData = async (data) => {
    if (cookies.role === 0) {
      setQuanan(data.data)
      setCurrentPage(data.pagination.currentPage)
    }
    else {
      const result = await getQuanan()
      setQuanan(result.data)
    }
  }

  const initQuanan = async () => {
    if (cookies.role !== 0) {
      const result = await getQuanan()
      setQuanan(result.data)
    } else return null
  }



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
              Giờ Hoạt Động
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Link Website
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Link Facebook
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
        {quanan.filter(fil => fil?.created_user === accounts?.id_nguoidung || fil?.updated_user === accounts?.id_nguoidung || accounts?.vai_tro === 0).map((items, index) => (
          <TableRow key={items.id_quanan}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                {(currentPage - 1) * itemsPerPage + index + 1}

              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                {items.ten_quan_an}
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
              <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                {items.dia_chi}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                {items.dien_thoai}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                {items.gio_hoat_dong}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                {items.link_website}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500", }}>
                {items.link_facebook}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography >
                <Link to={`/admin/quanan/edit/${items.id_quanan}`}>
                  <IconButton aria-label="edit" color="primary" style={{ width: "50px", height: "50px" }}>
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to={`/admin/quanan/delete/${items.id_quanan}`}>
                  <IconButton aria-label="edit" color="danger" style={{ width: "50px", height: "50px" }}>
                    <DeleteIcon />
                  </IconButton>
                </Link>
              </Typography>
            </TableCell>
          </TableRow>
        ))}

        {cookies.role !== 2 && (
          <TableRow sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <PaginationRounded onDataChange={cookies.role === 0 ? initData : initQuanan} paginator={paginator} />
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default ExQuanAn;
