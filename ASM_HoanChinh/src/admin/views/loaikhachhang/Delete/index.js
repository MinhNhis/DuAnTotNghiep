import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardActions, Box, Typography, Button } from "@mui/material";
import { useSnackbar } from 'notistack'; 
import { deleteLKH, getLKHById } from "../../../../services/Khachhang";

const DeleteLHK = () => {
    const [LHK, setLHK] = useState([]);
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const { enqueueSnackbar } = useSnackbar(); 

    const handleCancle = () => {
        navigate('/admin/loai-khach-hang');
    };

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        try {
            const result = await getLKHById(id);
            setLHK(result.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const submit = async () => {
        try {
            await deleteLKH(id);
            enqueueSnackbar('Xóa loại khách hàng thành công!', { variant: 'success' }); 
            navigate("/admin/loai-khach-hang");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi xóa loại khách hàng!', { variant: 'error' }); 
            console.error('Lỗi khi xóa loại khách hàng:', error);
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
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={handleCancle} style={{ width: "100px" }}>
                        Cancel
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default DeleteLHK;
