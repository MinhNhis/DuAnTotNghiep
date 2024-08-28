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
import { deleteAnuong, getAnuongById } from "../../../../services/Anuong";

const DeleteAnuong = () => {
  const [anuong, setAnuong] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id_anuong;
  const { enqueueSnackbar } = useSnackbar(); 

  const handleCancle = () => {
    navigate("/admin/an-uong");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getAnuongById(id);
      setAnuong(result.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const submit = async () => {
    try {
      await deleteAnuong(id);
      enqueueSnackbar('Xóa danh sách ăn uống thành công!', { variant: 'success' }); 
      navigate("/admin/an-uong");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi xóa ăn uống!', { variant: 'error' }); 
      console.error("Lỗi khi xóa ăn uống:", error);
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

export default DeleteAnuong;
