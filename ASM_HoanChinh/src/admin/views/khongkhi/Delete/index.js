import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from "@mui/material";
import { deleteKhongkhi } from "../../../../services/Khongkhi";

const DeleteKhongkhi = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id_khongkhi;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/admin/khong-khi');
  };

  const handleDelete = async () => {
    try {
      await deleteKhongkhi(id);
      enqueueSnackbar('Xóa không khí thành công!', { variant: 'success' });
      navigate("/admin/khong-khi");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi xóa không khí!', { variant: 'error' });
    }
  };

  return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <WarningIcon sx={{ fontSize: 40, color: 'warning.main', marginRight: 1 }} />
            Bạn có chắc chắn muốn xóa?
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText align="center">
            Hành động này sẽ không thể hoàn tác.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
              variant="contained"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              sx={{ width: "100px" }}
          >
            Delete
          </Button>
          <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ width: "100px" }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
  );
};

export default DeleteKhongkhi;