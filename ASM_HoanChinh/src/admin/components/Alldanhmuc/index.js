import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllDanhmuc } from "../../../services/Alldanhmuc";
import { getDanhmuc } from "../../../services/Danhmuc";
import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";


const Alldanhmuc = () => {
  const [AllDanhmuc, setAllDanhmuc] = useState([]);
  const [Danhmuc, setDanhmuc] = useState([]);
  const [accounts, setAccounts] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const handleShowDanhmuc = () => {
    setShowAll(!showAll);
  };

  const navigate = useNavigate();

  const handleAddDanhmuc = (id_alldanhmuc) => {
    navigate(`/admin/danhmuc/add/${id_alldanhmuc}`);
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
      <TableBody>
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
            <TableCell>
              <Link
                to={`/admin/danhmuc/add/${ten_danhmuc.id_alldanhmuc}`}
                variant="contained"
                sx={{ width: "5px" }}
              >
                <Button >
                +
                </Button>
              </Link>

              <Link
                to={`/admin/danhmuc/${ten_danhmuc.id_alldanhmuc}`}
                variant="contained"
                sx={{ width: "5px" }}
              >
                <Button >
                -----
                </Button>
              </Link>
            </TableCell>

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
      </TableBody>

    </Table>
  );
};

export default Alldanhmuc;
