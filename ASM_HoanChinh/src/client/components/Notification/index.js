import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BlockIcon from '@mui/icons-material/Block';

const Notification = () => {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate()

    const handleClose = () => {
        setOpen(false);
        navigate(`/`)
    };
    return (
        <Dialog 
            open={open} 
            onClose={handleClose} 
            aria-labelledby="maintenance-dialog-title"
            PaperProps={{
                style: { 
                    borderRadius: '12px', 
                    padding: '20px',
                    maxWidth: '400px'
                }
            }}
        >
            <DialogTitle id="maintenance-dialog-title" sx={{ textAlign: 'center', fontWeight: 'bold', color: '#b71c1c' }}>
                Thông báo
            </DialogTitle>
            <DialogContent sx={{ textAlign: 'center' }}>
                <BlockIcon sx={{ fontSize: '80px', color: '#d32f2f', marginBottom: '10px' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: '10px', color: '#b71c1c' }}>
                    Quán ăn hiện ngừng hoạt động
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: '10px' }}>
                    Vui lòng quay lại sau.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Chúng tôi xin lỗi vì sự bất tiện này và cảm ơn bạn đã thông cảm!
                </Typography>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center', marginTop: '10px' }}>
                <Button 
                    onClick={handleClose} 
                    color="primary" 
                    variant="contained" 
                    sx={{
                        backgroundColor: '#d32f2f',
                        ':hover': { backgroundColor: '#b71c1c' },
                        textTransform: 'none',
                        fontWeight: 'bold',
                        padding: '6px 20px',
                        borderRadius: '8px'
                    }}
                >
                    Đóng
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Notification;
