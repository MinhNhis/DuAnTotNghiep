import React from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import DatchoTable from "../../components/Datcho";

const Datcho = () => {
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h3" sx={{ fontWeight: "bold" }}>DANH SÁCH ĐƠN</Typography>
                    <Box sx={{ overflow: { xs: "auto", sm: "unset", }, fontWeight: "bold" }}>
                        <DatchoTable />
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

export default Datcho;