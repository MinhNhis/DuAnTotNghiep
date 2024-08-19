import React from "react";
import { useNavigate,} from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";

import DichVuTable from "../../components/Dichvu/DichVuTable";

const DichVu = () => {

  const navigate = useNavigate();

  const handleAddDichVu = () => {
    navigate('/admin/dich-vu/add');
  };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH DỊCH VỤ</Typography>
                        <Button variant="contained" sx={{ marginLeft: "940px" , width: "150px" }} onClick={handleAddDichVu}>Thêm dịch vụ</Button>
                    <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                        <DichVuTable />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DichVu;
