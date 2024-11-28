
import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";

import {
  BlogCard,
  SalesOverview,
  ProductPerformance,
  DailyActivities,
  MapComponent,
  Charts
} from "./dashboard1-components";

const Dashboard1 = () => {
  // 2

  return (
    <Box>
      <Grid container spacing={0}>
        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={cookies.role === 2 ? datcho.length : ""}
            secondary="Đơn đặt chỗ của bạn"
            color={theme.palette.warning.main}
            footerData="Dựa trên tài khoản của bạn"
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={cookies.role === 2 ? menu.length : ""}
            secondary="Menu quán ăn"
            color={theme.palette.error.main}
            footerData="Menu quán ăn"
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={danhgia.length}
            secondary="Đánh giá quán ăn"
            color={theme.palette.success.main}
            footerData="Đánh giá quán ăn"
            iconPrimary=""
            iconFooter=""
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={alldanhmuc.length}
            secondary="Danh mục quán ăn"
            color={theme.palette.primary.main}
            footerData="Danh mục quán ăn"
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item xs={12} lg={12}>
          {cookie.role === 0 ? <Charts /> : <ChartsCQ/>}
        </Grid>
      </Grid>
    </Box>
  );

  const renderProfile = () => (
    <Box>
      <Grid container spacing={0}>
        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary="200"
            secondary="Thanh toán đăng ký"
            color={theme.palette.warning.main}
            footerData="Dựa trên tài khoản Admin"
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary="200"
            secondary="Quán ăn"
            color={theme.palette.error.main}
            footerData="Quán ăn"
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary="200"
            secondary="Bài viết"
            color={theme.palette.success.main}
            footerData="Bài viết"
            iconPrimary=""
            iconFooter=""
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary="200"
            secondary="Người dùng"
            color={theme.palette.primary.main}
            footerData="Người dùng"
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item xs={12} lg={12}>
          <Charts />
        </Grid>
      </Grid>
    </Box>
  );

  return cookies.role === 2 ? renderTable() : renderProfile();
};
export default Dashboard1;