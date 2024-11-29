import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";

import {
  Charts,
  ChartsCQ
} from "./dashboard1-components";
import ReportCard from "./ReportCard";
import { useTheme } from "@mui/material/styles";
import { getDatcho } from "../../../services/Datcho";
import { useCookies } from "react-cookie";
import { getQuanan } from "../../../services/Quanan";
import { getMenus } from "../../../services/MenuPhu";
import { getDanhgia } from "../../../services/Danhgia";
import { getAllDanhmuc } from "../../../services/Alldanhmuc";


const Dashboard1 = () => {
  const [menu, setMenu] = useState([]);
  const [danhgia, setDanhgia] = useState([]);
  const [alldanhmuc, setAlldanhmuc] = useState([]);
  const [quanan, setQuanan] = useState([]);
  const [datcho, setDatCho] = useState([]);
  const [cookies] = useCookies(["token", "role"]);
  const accounts = JSON.parse(localStorage.getItem("accounts"));
  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const quanan = await getQuanan();
      if (quanan?.data && Array.isArray(quanan.data)) {
        const quan = quanan.data.find(
          (e) => e.created_user === accounts.id_nguoidung
        );
        if (quan) {
          const res = await getDatcho();
          setDatCho(res.data.filter((e) => e.id_quanan === quan.id_quanan));

          const resMenu = await getMenus();
          setMenu(resMenu.data.filter((e) => e.id_quanan === quan.id_quanan));

          const resDanhgia = await getDanhgia();
          setDanhgia(resDanhgia.data.filter((e) => e.id_quanan === quan.id_quanan));

          const resDanhmuc = await getAllDanhmuc();
          setAlldanhmuc(
            resDanhmuc.data.filter((e) => e.created_user === accounts.id_nguoidung)
          );
        } else {
          console.log("Lỗi khi lấy đơn đặt chỗ");
        }
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };
  const theme = useTheme();
  const renderTable = () => (
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
      </Grid>
    </Box>
  );
  return (
    <>
      <Box>
        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            {cookies.role === 2 ? renderTable() : renderProfile()}
            {cookies.role === 0 ? <Charts /> : <ChartsCQ />}
          </Grid>
        </Grid>
      </Box>
    </>

  );
};

export default Dashboard1;
