import React, { useEffect, useState } from "react";
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
import { getQuanan, isDeleteQuanan } from "../../../../services/Quanan";

const DeleteNguoiDung = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [reason, setReason] = useState("");
  const [nguoidung, setNguoidung] = useState({});
  const [quanan, setquanan] = useState({});
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
      const resquan = await getQuanan();
      if (Array.isArray(resquan.data) && resquan.data.length > 0) {
        const fill = resquan.data.find((e) => e.created_user === Number(id));
        setquanan(fill);
      } else {
        console.error("Lỗi api");
      }
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
      if (quanan) {
        await isDeleteQuanan(quanan.id_quanan, {
          reason: 'Tài khoản người dùng đã bị xóa',
          id_nguoidung: quanan.created_user,
          role: cookies.role,
          is_delete: 1
        })
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
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', fontSize: '25px' }}>
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
            sx={{ width: "100%", marginTop: 1 }}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          color="error"
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
