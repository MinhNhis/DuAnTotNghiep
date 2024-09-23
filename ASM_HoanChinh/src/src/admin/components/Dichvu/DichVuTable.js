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

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { getDichvu } from "../../../services/Dichvu";

const DichVuTable = () => {
  const [dichvu, setDichvu] = useState([])
  const [accounts, setAccounts] = useState(null);

  useEffect(() => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    setAccounts(accounts);
    initFata()
  }, [])
  const initFata = async () => {
    const result = await getDichvu()
    setDichvu(result.data)
  }

  return (
    <Table aria-label="simple table" sx={{ mt: 3, whiteSpace: "nowrap", }}>
      <TableHead>
        <TableRow>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              STT
            </Typography>
          </TableCell>
          <TableCell>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Dịch vụ
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
        {dichvu.filter(fil => fil?.created_user === accounts?.id_nguoidung || fil?.updated_user === accounts?.id_nguoidung || accounts?.vai_tro === 0).map((dv, index) => (
          <TableRow key={index}>
            <TableCell>
              <Typography variant="body1" sx={{ fontSize: "15px", ml: 0.5, }}>
                {index + 1}
              </Typography>
            </TableCell>
            <TableCell>
              <Box sx={{ display: "flex", alignItems: "center", }}>
                <Box>
                  <Typography variant="body1" sx={{ ml: 0.5, }}>
                    {dv.dich_vu}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>
              <Typography >
                <Link to={`/admin/dich-vu/edit/${dv.id_dichvu}`}>
                  <IconButton aria-label="edit" color="primary" style={{ width: "50px", height: "50px" }}>
                    <EditIcon />
                  </IconButton>
                </Link>
                <Link to={`/admin/dich-vu/delete/${dv.id_dichvu}`}>
                  <IconButton aria-label="edit" color="danger" style={{ width: "50px", height: "50px" }}>
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

export default DichVuTable;
