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
  CardMedia,
  CardActions,
  Box,
  IconButton,
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
  const itemsPerPage = 10;

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
            {filteredQuanan.map((items, index) => (
                <TableRow key={items.id_quanan}>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {items.ten_quan_an}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {items.hinh_anh && (
                        <img
                            style={{ height: "5rem", width: "6rem" }}
                            src={`${BASE_URL}/uploads/${items.hinh_anh}`}
                            alt={items.ten_quan_an}
                        />
                    )}
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
                    <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                      {items.gio_hoat_dong}
                    </Typography>
                  </TableCell>
                  <TableCell>{items.link_website}</TableCell>
                  <TableCell>{items.link_facebook}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableRow sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <PaginationRounded
              onDataChange={cookies.role === 0 ? initData : initQuanan}
              paginator={paginator}
          />
        </TableRow>
      </>
  );

  const renderProfile = () => (
      <>
        <Grid aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
          {filteredQuanan.map((items, index) => (
              <Grid item xs={12} sm={12} md={12} key={items.id_quanan}>
                {items.hinh_anh && (
                    <CardMedia
                        component="img"
                        height="400px"
                        image={`${BASE_URL}/uploads/${items.hinh_anh}`}
                        alt={items.ten_quan_an}
                        sx={{ borderRadius: "6px 6px 6px 6px", objectFit: 'cover' }}
                    />
                )}
                <CardContent>
                  <Typography variant="h4" sx={{ fontSize:"40px", fontWeight: "bold" }}>
                    {items.ten_quan_an}
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Địa chỉ:</strong> {items.dia_chi}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Điện thoại:</strong> {items.dien_thoai}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Giờ hoạt động:</strong> {items.gio_hoat_dong}
                  </Typography>
                </CardContent>
                <CardActions>
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

                <CardActions>
                  <Box mt={1} mb={2} display="flex" justifyContent="space-between" px={2}>
                    <Link to={`/admin/quanan/edit/${items.id_quanan}`}>
                      <IconButton aria-label="edit" color="primary" style={{ width: "45px", height: "45px" }}>
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <Link to={`/admin/quanan/delete/${items.id_quanan}`}>
                      <IconButton aria-label="delete" color="danger" style={{ float: "left", width: "45px", height: "45px" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Link>
                  </Box>
                </CardActions>
              </Grid>
          ))}
        </Grid>
      </>
  );

  return cookies.role === 0 ? renderTable() : renderProfile();
};

export default ExQuanAn;