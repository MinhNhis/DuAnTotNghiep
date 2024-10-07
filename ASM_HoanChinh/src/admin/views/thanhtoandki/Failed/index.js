import React from "react";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from "react-router-dom";


const Failed = () => {
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
                        backgroundColor: '#f8d7da',
                        borderRadius: '8px',
                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                        color: '#dc3545',
                        height: '400px',
                        textAlign: 'center'
                    }}
                >
                    <CancelIcon sx={{ fontSize: '70px', marginBottom: '8px' }} />
                    <Typography sx={{ fontSize: '18px', fontWeight: 'bold' }}>
                        Thanh toán thất bại!
                    </Typography>
                    <Box sx={{ paddingTop: "50px" }}>
                        <Link to='/admin/quanan'>
                            <Button startIcon={<ArrowBackIcon />}>Quay lại</Button>
                        </Link>
                    </Box>
                </Box>
            </CardContent>
        </Card>

    )
}

export default Failed