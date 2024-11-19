import React from "react";
import { Link } from "react-router-dom";
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
import EditIcon from "@mui/icons-material/Edit";
import { getAllDanhmuc } from "../../../services/Alldanhmuc";
import { getDanhmuc } from "../../../services/Danhmuc";
import { useState, useEffect } from "react";

const Alldanhmuc = () => {
  const [AllDanhmuc, setAllDanhmuc] = useState([]);
  const [Danhmuc, setDanhmuc] = useState([]);
  const [accounts, setAccounts] = useState(null);

  const [showAll, setShowAll] = useState(false);

  const handleShowDanhmuc = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initAllDanhmucData();
    initDanhmucData();
  }, []);

  const initAllDanhmucData = async () => {
    const res = await getAllDanhmuc();
    console.log(res.data);
    setAllDanhmuc(res.data)
  };

  const initDanhmucData = () => {
    getDanhmuc().then((result) => {
      if (result && Array.isArray(result.data)) {
        setDanhmuc(result.data);
      } else {
        setDanhmuc([]);
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
              Danh mục Chính
            </Typography>
          </TableCell>

          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Danh mục
            </Typography>
          </TableCell>

          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Hành động
            </Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      {/* <TableBody>
        {AllDanhmuc.filter(fil => fil?.created_user === accounts?.id_nguoidung || fil?.updated_user === accounts?.id_nguoidung || accounts?.vai_tro === 0).map((ten_danhmuc, index) => (
          <TableRow key={ten_danhmuc.id}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {Number(index) + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {ten_danhmuc.ten_danhmuc}
                  </Typography>
                </Box>
              </Box>
            </TableCell>

            {Danhmuc.filter(fil => fil?.created_user === accounts?.id_nguoidung || fil?.updated_user === accounts?.id_nguoidung || accounts?.vai_tro === 0).map((danhmuc, index) => (
            <TableRow key={danhmuc.id_danhmuc}>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {danhmuc.danh_muc}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
          </TableRow>
        ))}
            <TableCell>
              <Typography sx={{ width: "50px", height: "50px" }}>
                <Link to={`/admin/alldanhmuc/edit/${ten_danhmuc.id_alldanhmuc}`}>
                  <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to={`/admin/alldanhmuc/delete/${ten_danhmuc.id_alldanhmuc}`}>
                  <IconButton aria-label="delete" color="error">
                    <DeleteIcon />
                  </IconButton>
                </Link>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody> */}

      <TableBody>
        {AllDanhmuc.filter(fil =>
          fil?.created_user === accounts?.id_nguoidung ||
          fil?.updated_user === accounts?.id_nguoidung ||
          accounts?.vai_tro === 0
        ).map((ten_danhmuc, index) => {
          const danhMucCon = Danhmuc.filter(danhmuc =>
            danhmuc.id_alldanhmuc === ten_danhmuc.id_alldanhmuc &&
            (danhmuc?.created_user === accounts?.id_nguoidung ||
              danhmuc?.updated_user === accounts?.id_nguoidung ||
              accounts?.vai_tro === 0)
          );
          const categoriesToShow = showAll ? danhMucCon : danhMucCon.slice(0, 4);

          return (
            <TableRow key={ten_danhmuc.id_alldanhmuc}>
              <TableCell>
                <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                  {index + 1}
                </Typography>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {ten_danhmuc.ten_danhmuc}
                  </Typography>
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                  <Typography
                    sx={{
                      fontSize: "15px",
                      fontWeight: "500",
                      whiteSpace: "normal",
                      overflow: "hidden", 
                      textOverflow: "ellipsis", 
                      maxWidth: "200px",
                    }}
                  >
                    {categoriesToShow.map(danhmuc => danhmuc.danh_muc).join(', ')}
                    {danhMucCon.length > 4 && (
                    <span style={{ cursor: 'pointer', color: 'blue', marginLeft: '8px', whiteSpace: 'nowrap' }} onClick={handleShowDanhmuc}>
                      {showAll ? '... Xem ít hơn' : '... Xem thêm'}
                    </span>
                  )}
                  </Typography>
                
                </Box>
              </TableCell>

              <TableCell>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Link to={`/admin/alldanhmuc/edit/${ten_danhmuc.id_alldanhmuc}`}>
                    <IconButton aria-label="edit" color="primary" sx={{ width: "50px", height: "50px" }}>
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <Link to={`/admin/alldanhmuc/delete/${ten_danhmuc.id_alldanhmuc}`}>
                    <IconButton aria-label="delete" color="error" sx={{ width: "50px", height: "50px" }}>
                      <DeleteIcon />
                    </IconButton>
                  </Link>
                </Box>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>


    </Table>
  );
};

export default Alldanhmuc;
