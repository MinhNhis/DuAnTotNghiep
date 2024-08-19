import React from "react";
import { useNavigate,} from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import GioiThieuTable from "../../components/Gioithieu/GioiThieuTable";

const GioiThieu = () => {

  const navigate = useNavigate();

  const handleAddGioiThieu = () => {
    navigate('/admin/gioi-thieu/add');
  };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH GIỚI THIỆU</Typography>
                        <Button variant="contained" sx={{ marginLeft: "940px", width: "150px" }} onClick={handleAddGioiThieu}>Thêm giới thiệu</Button>
                    <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                        <GioiThieuTable />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default GioiThieu;
