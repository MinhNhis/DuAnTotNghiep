import React, { useEffect } from "react";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkStatus, sendMail } from "../../../../services/Thanhtoandki";


const Success = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const navigate = useNavigate()
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const orderId = query.get('orderId');
    useEffect(() => {
        sendMailToUser();
    }, []);

    const sendMailToUser = async () => {
        if (orderId) {
            const res = await checkStatus({ orderId: orderId })
            if (res.resultCode === 0) {
                try {
                    await sendMail({
                        orderId: orderId,
                        transId: res.transId,
                        name: accounts.ten_nguoi_dung,
                        amount: res.amount,
                        email: accounts.email,
                    });
                    navigate('/admin/quanan');
                } catch (error) {
                    console.error('Error sending mail:', error);
                }
            } else {
                navigate('/admin/thanh-toan/failed');
            }
        } else {
            navigate('/admin/thanh-toan/failed');
        }

    }

    return (
        <Card>
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                        backgroundColor: '#e6f7e6',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        color: '#28a745',
                        height: '400px',
                        textAlign: 'center'
                    }}
                >
                    <CheckCircleIcon sx={{ fontSize: '70px', marginBottom: '8px' }} />
                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Bạn đã thanh toán thành công!
                    </Typography>
                    <Box sx={{ paddingTop: "50px" }}>
                        <Link to='/admin/quanan'><Button><ArrowBackIcon />Quay lại</Button></Link>
                    </Box>

                </Box>
            </CardContent>
        </Card>

    )
}

export default Success