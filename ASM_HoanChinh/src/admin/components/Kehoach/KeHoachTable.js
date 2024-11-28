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
import { kehoach } from "../../../services/Kehoach";

const KeHoachTable = () => {
  const [kehoachs, setKehoach] = useState([]);
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await kehoach();
      setKehoach(result.data)
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bãi đỗ xe:", error);
      setKehoach([]);
    }
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
              Kế Hoạch
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
        {kehoachs.filter(fil => fil?.created_user === accounts?.id_nguoidung || fil?.updated_user === accounts?.id_nguoidung || accounts?.vai_tro === 0).map((kehoach, index) => (
          <TableRow key={kehoach.id_kehoach}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {index + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {kehoach.ke_hoach}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography sx={{ width: "50px", height: "50px" }}>
                <Box sx={{ display: "flex", gap: "10px" }}>
                  <Link to={`/admin/ke-hoach/edit/${kehoach.id_kehoach}`}>
                    <IconButton aria-label="edit" color="primary">
                      <EditIcon />
                    </IconButton>
                  </Link>
                  <Link to={`/admin/ke-hoach/delete/${kehoach.id_kehoach}`}>
                    <IconButton aria-label="delete" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Link>
                </Box>
              </Typography>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default KeHoachTable;

