import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import { tiennghi } from "../../../services/Tiennghi";

const TienNghiTable = () => {
  const [tiennghis, setTiennghi] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await tiennghi();
      setTiennghi(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bãi đỗ xe:", error);
      setTiennghi([]);
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
              Tiện Nghi
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
        {tiennghis.map((tien, index) => (
          <TableRow key={tien.id_tiennghi}>
            <TableCell>
              <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                {index + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: "600" }}>
                    {tien.tien_nghi}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", gap: "10px" }}>
                <Link to={`/admin/tien-nghi/edit/${tien.id_tiennghi}`}>
                  <IconButton aria-label="edit" color="primary">
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to={`/admin/tien-nghi/delete/${tien.id_tiennghi}`}>
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
  );
};

export default TienNghiTable;
