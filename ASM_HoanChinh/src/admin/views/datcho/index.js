import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";
import DatchoTable from "../../components/Datcho";



const Datcho  = () => {
    const navigate = useNavigate();

  const handleAddDatcho = () => {
    navigate('/admin/dat-cho/add');
  };

  return (
    <Box>
        <Card variant="outlined">
            <CardContent>
                <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH ĐƠN</Typography>
                    {/* <Button variant="contained" sx={{width: '150px', marginLeft: '940px' }} onClick={handleAddDatcho}>Thêm đơn</Button> */}
                <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                    <DatchoTable />
                </Box>
            </CardContent>
        </Card>
    </Box>
);
}

export default Datcho;