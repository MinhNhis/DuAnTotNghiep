import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { deleteTiennghi, getTiennghiById } from "../../../../services/Tiennghi";

const DeleteTiennghi = () => {
  const [tiennghi, setTiennghi] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id_tiennghi;
  const { enqueueSnackbar } = useSnackbar(); 

  const handleCancle = () => {
    navigate("/admin/tien-nghi");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getTiennghiById(id);
      setTiennghi(result.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const submit = async () => {
    try {
      await deleteTiennghi(id);
      enqueueSnackbar('Xóa tiện nghi thành công!', { variant: 'success' }); 
      navigate("/admin/tien-nghi");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi xóa tiện nghi!', { variant: 'error' });
      console.error("Lỗi khi xóa Tiện Nghi:", error);
    }
  };

  return (
    <div>
      <Card
        variant="outlined"
        sx={{
          maxWidth: 1100,
          margin: "20px auto",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <CardContent sx={{ padding: "30px", textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <WarningIcon sx={{ fontSize: 40, color: "warning.main" }} />
          </Box>
          <Typography variant="h5" gutterBottom>
            Bạn có chắc chắn muốn xóa ?
          </Typography>
          <Typography variant="body1" color="textSecondary">

          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", padding: "20px" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ marginRight: 2 }}
            onClick={submit}
            style={{ width: "100px" }}
          >
            Delete
          </Button>
          <Button variant="outlined" onClick={handleCancle} style={{ width: "100px" }}>
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default DeleteTiennghi;
