import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Box, Typography, Button } from "@mui/material";

import Alldanhmuc from "../../components/Alldanhmuc";

const AllDanhmuc = () => {
    const navigate = useNavigate();

    const handleAddAllDanhmuc = () => {
        navigate("/admin/alldanhmuc/add");
    };

    const handleAddDanhmuc = () => {
        navigate("/admin/danhmuc/add");
    };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                        DANH SÁCH TẤT CẢ DANH MỤC
                    </Typography>
                    <Box
                        sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mb: 2 }}
                    >
                        <Button
                            variant="contained"
                            sx={{ width: "180px" }}
                            onClick={handleAddAllDanhmuc}
                        >
                            Thêm Danh Mục Chính
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ width: "180px" }}
                            onClick={handleAddDanhmuc}
                        >
                            Thêm Danh Mục
                        </Button>
                    </Box>
                    <Box
                        sx={{ overflow: { xs: "auto", sm: "unset" }, fontWeight: "bold" }}
                    >
                        <Alldanhmuc />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AllDanhmuc;
