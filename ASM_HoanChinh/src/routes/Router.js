import { lazy } from "react";
import {
  Navigate,
} from "react-router-dom";
import DeleteDichVu from "../admin/views/dichvu/Delete/index.js";
import DeleteGioithieu from "../admin/views/gioithieu/Delete/index.js";
import Datcho from "../admin/views/datcho/index.js";
import AddDatcho from "../admin/views/datcho/Add/index.js";
import DeleteDatcho from "../admin/views/datcho/Delete/index.js";
import EditDatcho from "../admin/views/datcho/Edit/index.js";
import DatCho from "../client/pages/Datcho/Datcho.js";
import DeleteNguoiDung from "../admin/views/nguoidung/Delete/index.js";
import DeleteLHK from "../admin/views/loaikhachhang/Delete/index.js";
import AddCDV from "../admin/views/cacdichvu/Add/index.js";
import EditCDV from "../admin/views/cacdichvu/Edit/index.js";
import DeleteCDV from "../admin/views/cacdichvu/Delete/index.js";
import CacDichVu from "../admin/views/cacdichvu/index.js";
import ChiTietDon from "../client/pages/Chitietdon/Chitietdon.js";
import Profile from "../client/pages/Profile/index.js";
import Client from "../client/pages/index.js";
import ThanhToan from "../admin/views/thanhtoandki/index.js";
import ThanhToanDKi from "../admin/views/thanhtoandki/Add/index.js";
import Success from "../admin/views/thanhtoandki/Success/index.js";
import Failed from "../admin/views/thanhtoandki/Failed/index.js";

const DichVu = lazy(() => import("../admin/views/dichvu/index.js"))
const AddDichVu = lazy(() => import("../admin/views/dichvu/Add/index.js"));
const EditDichVu = lazy(() => import("../admin/views/dichvu/Edit/index.js"));

/***** Giới thiệu*/

const GioiThieu = lazy(() => import("../admin/views/gioithieu/index.js"));
const AddGioiThieu = lazy(() => import("../admin/views/gioithieu/Add/index.js"));
const EditGioiThieu = lazy(() => import("../admin/views/gioithieu/Edit/index.js"));

//kehoach
const KeHoach = lazy(() => import("../admin/views/kehoach/index.js"));
const AddKeHoach = lazy(() => import("../admin/views/kehoach/Add/index.js"));
const UpdateKeHoach = lazy(() => import("../admin/views/kehoach/Update/index.js"));
const DeleteKeHoach = lazy(() => import("../admin/views/kehoach/Delete/index.js"));

//bai do xe
const BaiDoXe = lazy(() => import("../admin/views/baidoxe/index.js"));
const AddBaiDoXe = lazy(() => import("../admin/views/baidoxe/Add/index.js"));
const UpdateBaiDoXe = lazy(() => import("../admin/views/baidoxe/Update/index.js"));
const DeleteBaidoxe = lazy(() => import("../admin/views/baidoxe/Delete/index.js"));

//khong khi
const KhongKhi = lazy(() => import("../admin/views/khongkhi/index.js"));
const AddKhongKhi = lazy(() => import("../admin/views/khongkhi/Add/index.js"));
const UpdateKhongKhi = lazy(() => import("../admin/views/khongkhi/Update/index.js"));
const DeleteKhongkhi = lazy(() => import("../admin/views/khongkhi/Delete/index.js"));

//tien nghi
const TienNghi = lazy(() => import("../admin/views/tiennghi/index.js"));
const AddTienNghi = lazy(() => import("../admin/views/tiennghi/Add/index.js"));
const UpdateTienNghi = lazy(() => import("../admin/views/tiennghi/Update/index.js"));
const DeleteTiennghi = lazy(() => import("../admin/views/tiennghi/Delete/index.js"));

//menu
const Menu = lazy(() => import("../admin/views/menu/index.js"))
const AddMenu = lazy(() => import("../admin/views/menu/Add/index.js"));
const EditMenu = lazy(() => import("../admin/views/menu/Edit/index.js"));
const DeleteMenu = lazy(() => import("../admin/views/menu/Delete/index.js"));

//danh mục

const Danhmuc = lazy(() => import("../admin/views/danhmuc/index.js"))
const AddDanhmuc = lazy(() => import("../admin/views/danhmuc/Add/index.js"));
const EditDanhmuc = lazy(() => import("../admin/views/danhmuc/Edit/index.js"));
const DeleteDanhmuc = lazy(() => import("../admin/views/danhmuc/Delete/index.js"));

// tất cả danh mục
const AllDanhmuc = lazy(() => import("../admin/views/alldanhmuc/index.js"))
const AddAllDanhmuc = lazy(() => import("../admin/views/alldanhmuc/Add/index.js"));
const EditAllDanhmuc = lazy(() => import("../admin/views/alldanhmuc/Edit/index.js"));
const DeleteAllDanhmuc = lazy(() => import("../admin/views/alldanhmuc/Delete/index.js"));

/***** Người dùng*/
const NguoiDung = lazy(() => import("../admin/views/nguoidung/index.js"));
const AddNguoiDung = lazy(() => import("../admin/views/nguoidung/Add/index.js"));
const EditNguoiDung = lazy(() => import("../admin/views/nguoidung/Edit/index.js"));

/***** Loại khách hàng*/

const LoaiKhachHang = lazy(() => import("../admin/views/loaikhachhang/index.js"));
const AddLKH = lazy(() => import("../admin/views/loaikhachhang/Add/index.js"));
const EditLKH = lazy(() => import("../admin/views/loaikhachhang/Edit/index.js"));

// Đánh Giá
const DanhGia = lazy(() => import("../admin/views/danhgia/index.js"))
const AddDanhGia = lazy(() => import("../admin/views/danhgia/Add/index.js"));
const EditDanhGia = lazy(() => import("../admin/views/danhgia/Edit/index.js"));
const DeleteDanhgia = lazy(() => import("../admin/views/danhgia/Delete/index.js"));

//Quán Ăn
const QuanAn = lazy(() => import("../admin/views/quanan/index.js"))
const AddQuanAn = lazy(() => import("../admin/views/quanan/Add/index.js"));
const EditQuanAn = lazy(() => import("../admin/views/quanan/Edit/index.js"));
const DeleteQuanAn = lazy(() => import("../admin/views/quanan/Delete/index.js"));
const ListQuanAn = lazy(() => import("../admin/views/quanan/List/index.js"));
/****Layouts*****/
const FullLayout = lazy(() => import("../admin/layouts/FullLayout/FullLayout.js"));
/****End Layouts*****/

/*****Pages******/
const Dashboard1 = lazy(() => import("../admin/views/dashboards/Dashboard1.js"));



const Trangchu = lazy(() => import("../client/pages/Trangchu/Trangchu.js"))
const Chitiet = lazy(() => import("../client/pages/Chitiet/Chitiet.js"))
const Danhgia = lazy(() => import("../client/pages/Danhgia/Danhgia.js"))
const KhamPha = lazy(() => import("../client/pages/Khampha/index.js"))
const Login = lazy(() => import("../client/pages/Login/index.js"))
const Register = lazy(() => import("../client/pages/Register/index.js"))
const MenuPhu = lazy(() => import("../client/pages/MenuMonPhu/menu_monphu.js"))
/*****Routes******/
const ThemeRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <Client />,
    children: [
      { path: "", exact: true, element: <Trangchu /> },
      { path: "/chi-tiet/:id", element: <Chitiet /> },
      // {
      //   path: '/login',
      //   element: <Login />
      // },
      // {
      //   path: '/register',
      //   element: <Register />
      // },
      {
        path: '/danh-gia/:id',
        element: <Danhgia />
      },
      {
        path: '/menu-phu',
        element: <MenuPhu />
      },
      {
        path: '/kham-pha',
        element: <KhamPha />
      },
      {
        path: '/dat-cho/:id',
        element: <DatCho />
      },

      {
        path: '/chi-tiet-don',
        element: <ChiTietDon />
      },
      {
        path: '/profile',
        element: <Profile />
      },
    ]
  },
  // {
  //   path: '/login',
  //   element: <Login />
  // },
  // {
  //   path: '/register',
  //   element: <Register />
  // },
  // // {
  // //   path: 'chi-tiet/:id',
  // //   element: <Chitiet />
  // // },
  // {
  //   path: '/danh-gia/:id',
  //   element: <Danhgia />
  // },
  // {
  //   path: '/menu-phu',
  //   element: <MenuPhu />
  // },
  // {
  //   path: '/kham-pha',
  //   element: <KhamPha />
  // },
  // {
  //   path: '/dat-cho/:id',
  //   element: <DatCho />
  // },
  // {
  //   path: '/login',
  //   element: <Login />
  // },
  // {
  //   path: '/register',
  //   element: <Register />
  // },
  // {
  //   path: '/chi-tiet-don',
  //   element: <ChiTietDon />
  // },
  // {
  //   path: '/profile',
  //   element: <Profile />
  // },
  {
    path: "",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="admin" /> },
      { path: "admin", exact: true, element: <Dashboard1 /> },

      { path: "admin/dat-cho", element: <Datcho />, },
      { path: "admin/dat-cho/add", element: <AddDatcho />, },
      { path: "admin/dat-cho/delete/:id_datcho", element: <DeleteDatcho />, },
      { path: "admin/dat-cho/edit/:id_datcho", element: <EditDatcho />, },

      { path: "admin/dich-vu/add", exact: true, element: <AddDichVu /> },
      { path: "admin/dich-vu/edit/:id", exact: true, element: <EditDichVu /> },
      { path: "admin/dich-vu/delete/:id", exact: true, element: <DeleteDichVu /> },
      { path: "admin/dich-vu", element: <DichVu />, },

      { path: "admin/gioi-thieu/add", exact: true, element: <AddGioiThieu /> },
      { path: "admin/gioi-thieu/edit/:id", exact: true, element: <EditGioiThieu /> },
      { path: "admin/gioi-thieu/delete/:id", exact: true, element: <DeleteGioithieu /> },
      { path: "admin/gioi-thieu", element: <GioiThieu />, },

      { path: "admin/ke-hoach/add", exact: true, element: <AddKeHoach /> },
      { path: "admin/ke-hoach/edit/:id_kehoach", exact: true, element: <UpdateKeHoach /> },
      { path: "admin/ke-hoach/delete/:id_kehoach", exact: true, element: <DeleteKeHoach /> },
      { path: "admin/ke-hoach", element: <KeHoach />, },

      { path: "admin/bai-do-xe/add", exact: true, element: <AddBaiDoXe /> },
      { path: "admin/bai-do-xe/edit/:id_baidoxe", exact: true, element: <UpdateBaiDoXe /> },
      { path: "admin/bai-do-xe/delete/:id_baidoxe", exact: true, element: <DeleteBaidoxe /> },
      { path: "admin/bai-do-xe", element: <BaiDoXe />, },

      { path: "admin/khong-khi/add", exact: true, element: <AddKhongKhi /> },
      { path: "admin/khong-khi/edit/:id_khongkhi", exact: true, element: <UpdateKhongKhi /> },
      { path: "admin/khong-khi/delete/:id_khongkhi", exact: true, element: <DeleteKhongkhi /> },
      { path: "admin/khong-khi", element: <KhongKhi />, },

      { path: "admin/tien-nghi/add", exact: true, element: <AddTienNghi /> },
      { path: "admin/tien-nghi/edit/:id_tiennghi", exact: true, element: <UpdateTienNghi /> },
      { path: "admin/tien-nghi/delete/:id_tiennghi", exact: true, element: <DeleteTiennghi /> },
      { path: "admin/tien-nghi", element: <TienNghi /> },

      { path: "admin/menu", exact: true, element: <Menu /> },
      { path: "admin/menu/add", exact: true, element: <AddMenu /> },
      { path: "admin/menu/edit/:id_menu", exact: true, element: <EditMenu /> },
      { path: "admin/menu/delete/:id_menu", exact: true, element: <DeleteMenu /> },

      { path: "admin/danhmuc", exact: true, element: <Danhmuc /> },
      { path: "admin/danhmuc/add", exact: true, element: <AddDanhmuc /> },
      { path: "admin/danhmuc/edit/:id_danhmuc", exact: true, element: <EditDanhmuc /> },
      { path: "admin/danhmuc/delete/:id_danhmuc", exact: true, element: <DeleteDanhmuc /> },

      { path: "admin/alldanhmuc", exact: true, element: <AllDanhmuc /> },
      { path: "admin/alldanhmuc/add", exact: true, element: <AddAllDanhmuc /> },
      { path: "admin/alldanhmuc/edit/:id_alldanhmuc", exact: true, element: <EditAllDanhmuc /> },
      { path: "admin/alldanhmuc/delete/:id_alldanhmuc", exact: true, element: <DeleteAllDanhmuc /> },



      { path: "admin/danhgia", exact: true, element: <DanhGia /> },
      { path: "admin/danhgia/add", exact: true, element: <AddDanhGia /> },
      { path: "admin/danhgia/edit/:id_danhgia", exact: true, element: <EditDanhGia /> },
      { path: "admin/danhgia/delete/:id_danhgia", exact: true, element: <DeleteDanhgia /> },

      { path: "admin/quanan", exact: true, element: <QuanAn /> },
      { path: "admin/quanan/add", exact: true, element: <AddQuanAn /> },
      { path: "admin/quanan/edit/:id_quanan", exact: true, element: <EditQuanAn /> },
      { path: "admin/quanan/delete/:id_quanan", exact: true, element: <DeleteQuanAn /> },
      { path: "admin/quanan/chi-tiet/:id", exact: true, element: <ListQuanAn /> },

      { path: "admin/loai-khach-hang/add", exact: true, element: <AddLKH /> },
      { path: "admin/loai-khach-hang/edit/:id", exact: true, element: <EditLKH /> },
      { path: "admin/loai-khach-hang/delete/:id", exact: true, element: <DeleteLHK /> },
      { path: "admin/loai-khach-hang", element: <LoaiKhachHang />, },

      { path: "admin/cac-dich-vu/add", exact: true, element: <AddCDV /> },
      { path: "admin/cac-dich-vu/edit/:id", exact: true, element: <EditCDV /> },
      { path: "admin/cac-dich-vu/delete/:id", exact: true, element: <DeleteCDV /> },
      { path: "admin/cac-dich-vu", element: <CacDichVu />, },

      { path: "admin/nguoi-dung/add", exact: true, element: <AddNguoiDung /> },
      { path: "admin/nguoi-dung/chi-tiet/:id", exact: true, element: <EditNguoiDung /> },
      { path: "admin/nguoi-dung/delete/:id", exact: true, element: <DeleteNguoiDung /> },
      { path: "admin/nguoi-dung", element: <NguoiDung />, },

      { path: "admin/thanh-toan", element: <ThanhToan />, },
      { path: "admin/thanh-toan/thanh-toan-dki",exact: true, element: <ThanhToanDKi />, },
      { path: "admin/thanh-toan/success",exact: true, element: <Success />, },
      { path: "admin/thanh-toan/failed",exact: true, element: <Failed />, },

    ],
  },

];

export default ThemeRoutes;
