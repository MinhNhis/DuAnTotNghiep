import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, TextField } from "@mui/material";
import { deleteQuanan, getQuananById } from "../../../../services/Quanan";
import { useSnackbar } from 'notistack';
import { useCookies } from "react-cookie";

const DeleteQuanAn = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [reason, setReason] = useState("");
    const id = params.id_quanan;
    const [quanan, setQuanan] = useState({});
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(true);
    const [cookies] = useCookies(["token", "role"]);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const res = await getQuananById(id);
        setQuanan(res.data);
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/admin/quanan');
    };

    const submit = async () => {
        try {
            await deleteQuanan(id, {
                reason: reason,
                id_nguoidung: quanan.created_user,
                role: cookies.role,
            });
            enqueueSnackbar('Xóa quán ăn thành công!', { variant: 'success' });
            navigate("/admin/quanan");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi xóa quán ăn!', { variant: 'error' });
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
                    {cookies.role === 0 && (
                        <TextField
                            label="Lý do"
                            variant="outlined"
                            multiline
                            rows={1.75}
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                            sx={{ width: "50%", marginTop: 1 }}
                        />
                    )}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
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

export default DeleteQuanAn;
