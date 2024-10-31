import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate, useParams } from "react-router-dom";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Box,
  TextField,
} from "@mui/material";
import { deleteNguoiDung, getNguoiDungById } from "../../../../services/Nguoidung";
import { useSnackbar } from "notistack";
import { useCookies } from "react-cookie";

const DeleteNguoiDung = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [reason, setReason] = useState("");
  const [nguoidung, setNguoidung] = useState({});
  const [open, setOpen] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const [cookies] = useCookies(["token", "role"]);
  const id = params.id;

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

  const handleClose = () => {
    setOpen(false);
    navigate("/admin/nguoi-dung");
  };

  const submit = async () => {
    try {
      if (nguoidung?.vai_tro === 0) {
        enqueueSnackbar("Không thể xóa người dùng có vai trò là Admin!", {
          variant: "warning",
        });
        navigate("/admin/nguoi-dung");
        return;
      }

      await deleteNguoiDung(id, reason);
      enqueueSnackbar("Xóa người dùng thành công!", { variant: "success" });
      navigate("/admin/nguoi-dung");
    } catch (error) {
      enqueueSnackbar("Có lỗi xảy ra khi xóa người dùng!", { variant: "error" });
      console.error("Lỗi khi xóa người dùng:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <WarningIcon sx={{ fontSize: 40, color: "warning.main", marginRight: 1 }} />
          Bạn có chắc chắn muốn xóa?
        </Box>
      </DialogTitle>
      <DialogContent>
        <DialogContentText align="center">
          Người dùng: {nguoidung.ten_nguoi_dung}
        </DialogContentText>
        <DialogContentText align="center">
          <TextField
            label="Lý do"
            variant="outlined"
            multiline
            rows={1.75}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            sx={{ width: "50%", marginTop: 1 }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={submit}
          sx={{ width: "100px" }}
        >
          Xóa
        </Button>
        <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ width: "100px" }}
        >
          Hủy
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteNguoiDung;
