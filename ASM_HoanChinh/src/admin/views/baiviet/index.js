import React from "react";
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button} from "@mui/material";
import BaiVietTable from "../../components/Baiviet/BaiVietTable";

const BaiViet =  () => {
  const navigate = useNavigate();

  const handleAddBaiViet = () => {
    navigate('/admin/bai-viet/add');
  };

    return (
      <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              DANH SÁCH BÀI VIẾT
            </Typography>
            <Button variant="contained" onClick={(handleAddBaiViet)} style={{width: "150px", marginRight: "40px"}}>
              Thêm bài viết
            </Button>
          </Box>
          <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
            <BaiVietTable/>
          </Box>
        </CardContent>
      </Card>
    </Box>
    );
};

export default BaiViet;