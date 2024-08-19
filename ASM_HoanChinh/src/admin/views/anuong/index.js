import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";
import AnUongTable from "../../components/Anuong/AnUongTable";

const AnUong = () => {
  const navigate = useNavigate();

  const handleAddAnUong = () => {
    navigate("/admin/an-uong/add");
  };

  return (
    <Box>
      <Card variant="outlined">
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              DANH SÁCH ĂN UỐNG
            </Typography>
            <Button variant="contained" onClick={handleAddAnUong} style={{width: "150px", marginRight: "40px"}}>
              Thêm ăn uống
            </Button>
          </Box>
          <Box sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}>
            <AnUongTable />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnUong;
