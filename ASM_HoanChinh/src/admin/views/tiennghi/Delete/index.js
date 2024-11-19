import React, { useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from "@mui/material";
import { deleteTiennghi } from "../../../../services/Tiennghi";

const DeleteTiennghi = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id_tiennghi;
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    navigate('/admin/tien-nghi');
  };

  const handleDelete = async () => {
    try {
      await deleteTiennghi(id);
      enqueueSnackbar('Xóa tiện nghi thành công!', { variant: 'success' });
      navigate("/admin/tien-nghi");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi xóa tiện nghi!', { variant: 'error' });
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

export default DeleteTiennghi;