import React from "react";
import { useNavigate,} from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import CacDichVu  from "../../components/Cacdichvu";

const CacDichVus = () => {

  const navigate = useNavigate();

  const handleAddCDV= () => {
    navigate('/admin/cac-dich-vu/add');
  };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH DỊCH VỤ</Typography>
                        <Button variant="contained" sx={{ marginLeft: "890px", width: "200px" }} onClick={handleAddCDV}>Thêm các dịch vụ</Button>
                    <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                        <CacDichVu />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default CacDichVus;
