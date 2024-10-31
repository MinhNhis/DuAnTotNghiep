import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardActions, Box, Typography, Button } from "@mui/material";
import { deleteGioithieu, getGioithieuById } from "../../../../services/Gioithieu";
import { useSnackbar } from 'notistack';

const DeleteGioithieu = () => {
    const [gioithieu, setGioithieu] = useState({});
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const { enqueueSnackbar } = useSnackbar();

    const handleCancle = () => {
        navigate('/admin/gioi-thieu');
    };

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        try {
            const result = await getGioithieuById(id);
            console.log(result);
            setGioithieu(result.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const submit = async () => {
        try {
            await deleteGioithieu(id);
            enqueueSnackbar('Xóa giới thiệu thành công!', { variant: 'success' }); // Show success message
            navigate("/admin/gioi-thieu");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại.', { variant: 'error' }); // Show error message
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
                    <Typography key={gioithieu.id_gioithieu} variant="body1" color="textSecondary">
                        Giới thiệu : {gioithieu.gioi_thieu}
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

export default DeleteGioithieu;
