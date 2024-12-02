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
import { getThanhtoan } from "../../../services/Thanhtoandki";
import { baiviet } from "../../../services/Baiviet";
import { getNguoiDung } from "../../../services/Nguoidung";

const Dashboard1 = () => {
  const [menu, setMenu] = useState([]);
  const [danhgia, setDanhgia] = useState([]);
  const [alldanhmuc, setAlldanhmuc] = useState([]);
  const [quanan, setQuanan] = useState([]);
  const [datcho, setDatCho] = useState([]);
  const [cookies] = useCookies(["token", "role"]);
  const [thanhtoandk, setThanhToanDK] = useState([]);
  const [allbaiviet, setBaiViet] = useState([]);
  const [nguoidung, setNguoiDung] = useState([]);
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
          const resttdk = await getThanhtoan();
          setThanhToanDK(resttdk.data);

          const resquanan = await getQuanan();
          setQuanan(resquanan.data);

          const resbaiviet = await baiviet();
          setBaiViet(resbaiviet.data);

          const resnguoidung = await getNguoiDung();
          setNguoiDung(resnguoidung.data);

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
            secondary="Đơn đặt chỗ của quán"
            color={theme.palette.warning.main}
            footerData= {`Tổng đặt chổ của quán là ${datcho.length} `}
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={cookies.role === 2 ? menu.length : ""}
            secondary="Menu của quán"
            color={theme.palette.error.main}
            footerData={`Tổng menu của quán là ${menu.length}`}
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={danhgia.length}
            secondary="Đánh giá của quán"
            color={theme.palette.success.main}
            footerData={`Tổng đánh giá của quán là ${danhgia.length}`}
            iconPrimary=""
            iconFooter=""
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={alldanhmuc.length}
            secondary="Danh mục của quán"
            color={theme.palette.primary.main}
            footerData={`Tổng danh mục của quán là ${alldanhmuc.length}`}
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
            primary={thanhtoandk.length}
            secondary="Thanh toán đăng ký"
            color={theme.palette.warning.main}
            footerData={`Tổng thanh toán chủ quán là ${thanhtoandk.length}`}
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={quanan.length}
            secondary="Quán ăn của chủ quán"
            color={theme.palette.error.main}
            footerData={`Tổng quán ăn là ${quanan.length}`}
            iconPrimary=""
            iconFooter=""
          />
        </Grid>

        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={allbaiviet.length}
            secondary="Bài viết dựa trên Admin"
            color={theme.palette.success.main}
            footerData={`Tống bài viết là ${allbaiviet.length}`}
            iconPrimary=""
            iconFooter=""
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <ReportCard
            primary={nguoidung.length}
            secondary="Tài khoản người dùng"
            color={theme.palette.primary.main}
            footerData={`Tổng tài khoản là ${nguoidung.length}`}
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
