import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import ExMenu from "../../components/Menu/ExMenu";

const Menu = () => {
    const navigate = useNavigate();

    const handleAddMenu = () => {
        navigate('/admin/menu/add');
    };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH MENU</Typography>
                    <Button variant="contained" sx={{ width: '150px', marginLeft: '940px' }} onClick={handleAddMenu} >Thêm Menu</Button>
                    <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                        <ExMenu />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Menu;