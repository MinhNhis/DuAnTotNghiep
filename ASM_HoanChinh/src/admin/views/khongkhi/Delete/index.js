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
import { deleteKhongkhi, getKhongkhiById } from "../../../../services/Khongkhi";

const DeleteKhongkhi = () => {
  const [khongkhi, setKhongkhi] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id_khongkhi;
  const { enqueueSnackbar } = useSnackbar(); 

  const handleCancle = () => {
    navigate("/admin/khong-khi");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getKhongkhiById(id);
      setKhongkhi(result.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const submit = async () => {
    try {
      await deleteKhongkhi(id);
      enqueueSnackbar('Xóa không khí thành công!', { variant: 'success' });
      navigate("/admin/khong-khi");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi xóa không khí!', { variant: 'error' });
      console.error("Lỗi khi xóa Không Khí:", error);
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
            {/* Additional description if needed */}
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

export default DeleteKhongkhi;
