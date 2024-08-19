import React, { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardActions, Box, Typography, Button } from "@mui/material";
import { useSnackbar } from 'notistack'; 
import { deleteMenu, getMenuById } from "../../../../services/MenuPhu";

const DeleteMenu = () => {
    const [menu, setMenu] = useState({});
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id_menu;
    const { enqueueSnackbar } = useSnackbar(); 

    const handleCancle = () => {
        navigate('/admin/menu');
    };

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        try {
            const result = await getMenuById(id);
            setMenu(result.data);
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu:', error);
        }
    };

    const submit = async () => {
        try {
            await deleteMenu(id);
            enqueueSnackbar('Xóa menu thành công!', { variant: 'success' }); 
            navigate("/admin/menu");
        } catch (error) {
            enqueueSnackbar('Có lỗi xảy ra khi xóa menu!', { variant: 'error' }); 
            console.error('Lỗi khi xóa menu:', error);
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
                    <Typography variant="body1" color="textSecondary">
                        Menu: {menu.ten_menu}
                    </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', padding: '20px' }}>
                    <Button variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ marginRight: 2 }} style={{width: "100px"}} onClick={submit}>
                        Delete
                    </Button>
                    <Button variant="outlined" onClick={handleCancle} style={{width: "100px"}}>
                        Cancel
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default DeleteMenu;
