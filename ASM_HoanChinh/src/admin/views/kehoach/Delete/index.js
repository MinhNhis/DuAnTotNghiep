import React, { useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from "@mui/material";
import { deleteKehoach } from "../../../../services/Kehoach";
import { useSnackbar } from 'notistack';

const DeleteKeHoach = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id_kehoach;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/admin/ke-hoach');
  };


  const handleDelete = async () => {
    try {
      await deleteKehoach(id);
      enqueueSnackbar('Xóa kế hoạch thành công!', { variant: 'success' });
      navigate("/admin/ke-hoach");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi xóa kế hoạch!', { variant: 'error' });
    }
  };


  return (
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom:'20px', fontSize:'25px' }}>
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
              onClick={handleDelete}
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

export default DeleteKeHoach;