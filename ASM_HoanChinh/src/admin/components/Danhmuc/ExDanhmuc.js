import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getDanhmuc } from "../../../services/Danhmuc";
import { useState, useEffect } from "react";
import { getAllDanhmucById } from "../../../services/Alldanhmuc";

const ExDanhmuc = () => {
  const params = useParams();
  const id = params.id_alldanhmuc
  const [open, setOpen] = useState(true);
  const [Danhmuc, setDanhmuc] = useState([]);
  const [allDanhmuc, setAllDanhmuc] = useState({});

  const [accounts, setAccounts] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initData();
  }, []);
  const handleClose = () => {
    setOpen(false);
    navigate(`/admin/alldanhmuc`);
  };

  const initData = async () => {
    getDanhmuc().then((result) => {
      if (result && Array.isArray(result.data)) {
        setDanhmuc(result.data);
      } else {
        setDanhmuc([]);
      }
    });
    const res = await getAllDanhmucById(id);
    setAllDanhmuc(res.data)
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogContent>
        <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap" }}>
          <TableHead>
            <TableRow>
              <TableCell colSpan={3} sx={{ textAlign: "center", fontWeight: "bold", fontSize:"18px" }}>
                {`Danh mục của danh muc chính: ${allDanhmuc.ten_danhmuc}`}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  STT
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
            {Danhmuc.filter(fil => fil?.created_user === accounts?.id_nguoidung && fil?.id_alldanhmuc === Number(id)).map((danhmuc, index) => (
              <TableRow key={danhmuc.id_danhmuc}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {Number(index) + 1}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box>
                      <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                        {danhmuc.danh_muc}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography sx={{ width: "50px", height: "50px" }}>
                    <Link to={`/admin/danhmuc/edit/${danhmuc.id_danhmuc}`}>
                      <IconButton aria-label="edit" color="primary">
                        <EditIcon />
                      </IconButton>
                    </Link>
                    <Link to={`/admin/danhmuc/delete/${danhmuc.id_danhmuc}`}>
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
      </DialogContent>
    </Dialog>
  );
};

export default ExDanhmuc;
