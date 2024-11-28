import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText, Divider, Box, Button } from '@mui/material'
import { useNavigate, useParams } from "react-router-dom";
import { getQuananById, isDeleteQuanan } from "../../../../services/Quanan";
import { useCookies } from "react-cookie";
import { useSnackbar } from 'notistack';

const Restart = () => {
    const params = useParams()
    const { enqueueSnackbar } = useSnackbar();
    const id = params.id
    const [open, setOpen] = useState(true);
    const [quanan, setQuanAn] = useState({});
    const [cookie] = useCookies()
    const navigate = useNavigate()
    const handleClose = () => {
        setOpen(false);
        navigate('/admin/quanan');
    };

    const initData = async () => {
        const res = await getQuananById(id);
        setQuanAn(res.data)
    }

    useEffect(() => {
        initData()
    }, [])
    const submit = async () => {
        await isDeleteQuanan(id, {
            reason: "Quán đã được khôi phục",
            id_nguoidung: quanan.created_user,
            role: cookie.role,
            is_delete: 0
        })

        enqueueSnackbar('Khôi phục quán ăn thành công!', { variant: 'success' });
        navigate("/admin/quanan");
    }
    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', fontSize: '25px' }}>
                    Bạn có chắc chắn muốn khôi phục?
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
                    color="success"
                    sx={{ width: "100px" }}
                    onClick={submit}
                >
                    Khôi phục
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
    )
}

export default Restart