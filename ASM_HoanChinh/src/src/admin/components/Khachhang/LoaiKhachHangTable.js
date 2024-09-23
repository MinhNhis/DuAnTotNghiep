import React, { useEffect, useState } from "react";
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
import { getLKH } from "../../../services/Khachhang";

const LHKTable = () => {
  const [LKH, setLKH] = useState([]);
  const [accounts, setAccounts] = useState(null);

  const index2 = 0;
  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initData();
  }, []);
  const initData = async () => {
    const result = await getLKH();
    setLKH(result.data);
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
              Loại khách hàng
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
        {LKH.filter(fil => fil?.created_user === accounts?.id_nguoidung || fil?.updated_user === accounts?.id_nguoidung || accounts?.vai_tro === 0).map((value, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography variant="body1" sx={{ fontSize: "15px", ml: 0.5 }}>
                {accounts?.vai_tro === 0 ? index + 1 : index2 + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="body1" sx={{ ml: 0.5 }}>
                    {value.khach_hang}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography>
                <Link to={`/admin/loai-khach-hang/edit/${value.id_loaikh}`}>
                  <IconButton aria-label="edit" color="primary" style={{ width: "50px", height: "50px" }}>
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to={`/admin/loai-khach-hang/delete/${value.id_loaikh}`}>
                  <IconButton aria-label="delete" color="danger" style={{ width: "50px", height: "50px" }}>
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

export default LHKTable;
