import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardActions,
  Box,
  Typography,
  Button,
} from "@mui/material";
import {
  deleteNguoiDung,
  getNguoiDungById,
} from "../../../../services/Nguoidung";
import { useSnackbar } from "notistack";

const DeleteNguoiDung = () => {
  const [nguoidung, setNguoidung] = useState({});
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { enqueueSnackbar } = useSnackbar();

  const handleCancle = () => {
    navigate("/admin/nguoi-dung");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getNguoiDungById(id);
      setNguoidung(result.data);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const submit = async () => {
    try {
      if (nguoidung?.vai_tro === 0) {
        enqueueSnackbar("Không thể xóa người dùng có vai trò là Admin!", { variant: "warning" });
        navigate("/admin/nguoi-dung")
        return;
      }
  
      await deleteNguoiDung(id);
      enqueueSnackbar("Xóa người dùng thành công!", { variant: "success" });
      navigate("/admin/nguoi-dung");
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi xóa người dùng!", { variant: "error" });
      console.error("Lỗi khi xóa người dùng:", error);
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
            Người dùng: {nguoidung.ten_nguoi_dung}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center", padding: "20px" }}>
          <Button
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            sx={{ marginRight: 2 }}
            style={{ width: "100px" }}
            onClick={submit}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            onClick={handleCancle}
            style={{ width: "100px" }}
          >
            Cancel
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default DeleteNguoiDung;
