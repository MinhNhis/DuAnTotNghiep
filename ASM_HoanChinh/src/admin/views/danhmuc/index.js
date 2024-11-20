import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import ExDanhmuc from "../../components/Danhmuc/ExDanhmuc";


const Danhmuc  = () => {
    const navigate = useNavigate();

  const handleAddDanhmuc = () => {
    navigate('/admin/danhmuc/add');
  };

  

  return (
    <Box>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH DANH MỤC</Typography>
                    <Link
                    to={'/admin/alldanhmuc'}
                    >
                        <Button variant="contained" sx={{width: '150px', marginLeft: '940px' }}>
                            Trở về
                        </Button>
                    </Link>
                <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                    <ExDanhmuc />
                </Box>
            </CardContent>
        </Card>
    </Box>
);
}

export default Danhmuc;