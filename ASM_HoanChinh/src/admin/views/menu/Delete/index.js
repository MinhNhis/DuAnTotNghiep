import React, { useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from "@mui/material";
import { useSnackbar } from 'notistack';
import { deleteMenu } from "../../../../services/MenuPhu";

const DeleteMenu = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id_menu;
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        navigate('/admin/menu');
    };

    const handleDelete = async () => {
        try {
            await deleteMenu(id);
            enqueueSnackbar('Xóa menu thành công!', { variant: 'success' });
            navigate("/admin/menu");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi xóa menu!', { variant: 'error' });
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

export default DeleteMenu;