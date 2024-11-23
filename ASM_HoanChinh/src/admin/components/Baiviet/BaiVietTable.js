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
import { baiviet, paginator } from "../../../services/Baiviet";
import { BASE_URL } from "../../../config/ApiConfig";
import PaginationRounded from "../Paginator";

const BaiVietTable = () => {
  const [baiviets, setBaiviet] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    initData();
  }, []);

  const initData = async (data) => {
    try {
      // const data = await baiviet();
      setBaiviet(data.data);
      setCurrentPage(data.pagination.currentPage)
    } catch (error) {
      //console.error("Lỗi khi lấy dữ liệu bài viết:", error);
      setBaiviet([]);
    }
  };

  const capitalizeFirstLetter = (text) => {
    return text.replace(/(?:^|\.\s+)(\w)/g, (match) => match.toUpperCase());
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
                  Tác giả
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
                    <Typography variant="body1" sx={{ fontSize: "15px", ml: 0.5, }}>
                      {(currentPage - 1) * itemsPerPage + index + 1}

                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <Typography
                            variant="body1"
                            sx={{
                              ml: 0.5,
                              fontSize: "15px",
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              whiteSpace: 'normal',
                              width: '200px',
                            }}
                        >
                          {capitalizeFirstLetter(baiviet.tieu_de)}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <Typography
                            variant="body1"
                            sx={{
                              ml: 0.5,
                              fontSize: "15px",
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              display: '-webkit-box',
                              WebkitLineClamp: 4,
                              WebkitBoxOrient: 'vertical',
                              whiteSpace: 'normal',
                              width: '200px',

                            }}
                        >
                          <p dangerouslySetInnerHTML={{ __html: capitalizeFirstLetter(baiviet.noi_dung) }}></p>
                        </Typography>

                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                          <img src={`${BASE_URL}/uploads/${baiviet.hinh_anh}`} style={{ width: '200px', height: '130px', borderRadius: '5px', }}></img>
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
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box>
                        <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                          {baiviet.created_user === 2 ? 'FoodSeeker' : ''}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell>
                    <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
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
          <PaginationRounded onDataChange={initData} paginator={paginator} />
        </TableRow>
      </>
  );
};

export default BaiVietTable;