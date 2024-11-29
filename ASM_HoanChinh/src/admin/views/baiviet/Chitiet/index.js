import React, { useEffect, useState } from "react";
import { Card, CardContent, Divider, Box, Typography, Grid, Stack } from "@mui/material";
import { getBaivietById } from "../../../../services/Baiviet";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../../../config/ApiConfig";


const ChitietBaiViet = () => {
    const params = useParams();
    const id = params.id_baiviet;
    const [baiviet, setBaiviet] = useState({});

    const initData = async () => {
        const result = await getBaivietById(id);
        setBaiviet(result.data);
    }
    useEffect(() => {
        initData()
    }, [])

    return (
        <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
            <CardContent>
                <Box sx={{ textAlign: 'start', mb: 3 }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#333' }}>
                        CHI TIẾT BÀI VIẾT
                    </Typography>
                </Box>
                <Divider sx={{ mb: 2 }} />

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <img
                            src={baiviet?.hinh_anh ? `${BASE_URL}/uploads/${baiviet?.hinh_anh}` : ""}
                            alt="Restaurant"
                            style={{
                                width: '100%',
                                height: '300px',
                                borderRadius: '10px',
                                objectFit: 'cover',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Stack spacing={2} sx={{ p: 2 }}>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                <strong>Tiêu đề: </strong>
                                <span style={{ fontSize: '20px', color: '#555' }}>{baiviet?.tieu_de}</span>
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                <strong>Nội dung: </strong>
                                <span dangerouslySetInnerHTML={{ __html: (baiviet.noi_dung) }}></span>
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                <strong>Ngày đăng: </strong>
                                <span style={{ color: '#555' }}>{baiviet?.ngay_dang}</span>
                            </Typography>
                            <Typography variant="body1" sx={{ color: '#333' }}>
                                <strong>Tác giả: </strong>
                                <span style={{ color: '#555' }}>{baiviet.created_user === 2 ? 'FoodSeeker' : ''}</span>
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default ChitietBaiViet;