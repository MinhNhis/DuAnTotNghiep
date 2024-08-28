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
import { getCDV } from "../../../services/Cacdichvu";

const LHKTable = () => {

  const [CDV, setCDV] = useState([]);
  useEffect(() => {
    initData();
  }, []);
  const initData = async () => {
    const result = await getCDV();
    setCDV(result.data);
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
              Các dịch vụ
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
        {CDV.map((value, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography variant="body1" sx={{ fontSize: "15px", ml: 0.5 }}>
                {Number(index) + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box>
                  <Typography variant="body1" sx={{ ml: 0.5 }}>
                    {value.tuy_chon_dv}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography>
                <Link to={`/admin/cac-dich-vu/edit/${value.id_cacdichvu}`}>
                  <IconButton aria-label="edit" color="primary"style={{width: "50px", height: "50px"}}>
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to={`/admin/cac-dich-vu/delete/${value.id_cacdichvu}`}>
                  <IconButton aria-label="delete" color="danger"style={{width: "50px", height: "50px"}}>
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
