import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardActions, Box, Typography, Button } from "@mui/material";
import { deleteDatcho } from "../../../../services/Datcho";
import { useSnackbar } from 'notistack'; 

const DeleteDatcho = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id_datcho;
    const { enqueueSnackbar } = useSnackbar(); 

    const handleCancel = () => {
        navigate('/admin/dat-cho');
    };

    const submit = async () => {
        try {
            await deleteDatcho(id);
            enqueueSnackbar('Xóa thành công!', { variant: 'success' }); 
            navigate("/admin/dat-cho");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra!', { variant: 'error' }); 
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
                    <Button 
                        variant="contained" 
                        color="error" 
                        startIcon={<DeleteIcon />} 
                        sx={{ marginRight: 2 }}
                        style={{ width: "100px" }}
                        onClick={submit}
                    >
                        Xóa
                    </Button>
                    <Button 
                        variant="outlined"
                        onClick={handleCancel} 
                        style={{ width: "100px" }}
                    >
                        Hủy
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default DeleteDatcho;
