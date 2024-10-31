import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardActions, Box, Typography, Button } from "@mui/material";
import { deleteDanhgia } from "../../../../services/Danhgia";
import { useSnackbar } from 'notistack'; 

const DeleteDanhGia = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id_danhgia;
    const { enqueueSnackbar } = useSnackbar(); 

    const handleCancle = () => {
        navigate('/admin/danhgia');
    };

    const submit = async () => {
        try {
            await deleteDanhgia(id);
            enqueueSnackbar('Xóa đánh giá thành công!', { variant: 'success' }); 
            navigate("/admin/danhgia");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi xóa!', { variant: 'error' });
        }
    };

    return (
        <div>
            <Card variant="outlined" sx={{ maxWidth: 1100, margin: '20px auto', borderRadius: 2, boxShadow: 3 }}>
                <CardContent sx={{ padding: '30px', textAlign: 'center' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}>
                        <WarningIcon sx={{ fontSize: 40, color: 'warning.main' }} />
                    </Box>
                    <Typography variant="h5" gutterBottom>
                        Bạn có chắc chắn muốn xóa ?
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', padding: '20px' }}>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ marginRight: 2 }} style={{ width: "100px" }} onClick={submit}>
                        Xóa
                    </Button>
                    <Button variant="outlined" onClick={handleCancle} style={{ width: "100px" }}>
                        Hủy
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default DeleteDanhGia;
