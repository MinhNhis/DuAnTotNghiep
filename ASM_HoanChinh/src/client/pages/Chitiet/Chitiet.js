import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Grid, CardContent, Card } from '@mui/material';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getQuananById } from "../../../services/Quanan";
import { BASE_URL } from "../../../config/ApiConfig";


import {
    getBaidoxe,
    getCacDichvu,
    getGioithieu,
    getKehoach,
    getKhongkhi,
    getTiennghi,
} from "../../../services/Gioithieu";
import { getDichvu } from "../../../services/Dichvu";
import { getLKH } from "../../../services/Khachhang";
import { getDanhgia } from "../../../services/Danhgia";
import { getNguoiDung } from "../../../services/Nguoidung";
import { getMenus } from "../../../services/MenuPhu";
import { addDatcho, getDatcho } from "../../../services/Datcho";
import { useSnackbar } from "notistack";
import FacebookIcon from '@mui/icons-material/Facebook';
import { useCookies } from "react-cookie";
import MapComponent from "../../components/Map";

const Gioithieu = () => {
    const { register, handleSubmit, formState } = useForm()
    const navigate = useNavigate()
    const params = useParams();
    const id = params.id;

    const [quanan, setQuanan] = useState({});
    const [gioithieu, setGioithieu] = useState([]);
    const [danhgia, setDanhgia] = useState([]);
    const [nguoidg, setNguoidanhgia] = useState([]);
    const [menu, setMenu] = useState([]);
    const [datcho, setDatcho] = useState([]);

    const [cacdichvu, setCacdichvu] = useState([]);
    const [dichvu, setDichvu] = useState([]);
    const accounts = JSON.parse(localStorage.getItem("accounts"))
    const { enqueueSnackbar } = useSnackbar();
    const [baidoxe, setBaidoxe] = useState([]);
    const [kehoach, setKehoach] = useState([]);
    const [loaikhachhang, setLoaikhachhang] = useState([]);
    const [tiennghi, setTiennghi] = useState([]);
    const [khongkhi, setKhongkhi] = useState([]);
    const [stars, setStar] = useState(0);

    useEffect(() => {
        initData();
    }, []);

    const initData = async () => {
        const resultQa = await getQuananById(id);
        setQuanan(resultQa.data);

        const resultGt = await getGioithieu();
        setGioithieu(resultGt.data);

        const resultDg = await getDanhgia();
        setDanhgia(resultDg.data);

        const resultNdg = await getNguoiDung();
        setNguoidanhgia(resultNdg.data);

        const resultMenu = await getMenus();
        setMenu(resultMenu.data);

        const resultDatcho = await getDatcho();
        const filteredDatcho = resultDatcho.data.filter(datcho => datcho.id_quanan === resultQa.data.id_quanan);
        setDatcho(filteredDatcho);

        const resultCacdv = await getCacDichvu();
        setCacdichvu(resultCacdv.data);

        const resultDv = await getDichvu();
        setDichvu(resultDv.data);

        const resultBdx = await getBaidoxe();
        setBaidoxe(resultBdx.data);

        const resultKh = await getKehoach();
        setKehoach(resultKh.data);

        const resultLoaikh = await getLKH();
        setLoaikhachhang(resultLoaikh.data);

        const resultTn = await getTiennghi();
        setTiennghi(resultTn.data);

        const resultKk = await getKhongkhi();
        setKhongkhi(resultKk.data);
    };


    const [cookies, setCookie, removeCookie] = useCookies(["token", "role"]);
    useEffect(() => {
        getUserInfo();
    }, [cookies]);

    const getUserInfo = async () => {
        const accounts = JSON.parse(localStorage.getItem("accounts"))

        if (accounts?.vai_tro !== cookies.vai_tro) {
            setCookie("role", accounts?.vai_tro);
        }
    };

    const submit = async (value) => {
        await addDatcho({
            ten_quan: quanan.ten_quan_an,
            ten_kh: value?.ten_kh,
            sdt_kh: value?.sdt,
            email_kh: value?.email,
            ngay_dat: value?.ngay,
            thoi_gian: value?.thoi_gian,
            so_luong_nguoi: value?.so_luong,
            trang_thai: 0,
            yeu_cau_khac: value?.yeu_cau,
            id_nguoidung: accounts.id_nguoidung,
            id_quanan: id
        })
        enqueueSnackbar("Đặt chỗ thành công!", { variant: "success" });
        navigate("/profile")
    }

    const renderStars = (stars) => {
        return [...Array(5)].map((_, i) => {
            if (i < Math.floor(stars)) {
                return <i key={i} className="fas fa-star text-primary me-2"></i>;
            } else if (i < stars) {
                return <i key={i} className="fas fa-star-half-alt text-primary me-2"></i>;
            } else {
                return <i key={i} className="far fa-star text-primary me-2"></i>;
            }
        });
    };


    useEffect(() => {
        let totalStars = 0;
        let count = 0;

        danhgia.forEach(e => {
            if (e.id_quanan === quanan.id_quanan) {
                totalStars += e.sao;
                count++;
            }
        });

        if (count > 0) {
            setStar(totalStars / count);
        } else {
            setStar(0);
        }
    }, [danhgia, quanan]);


    return (
        <>
            {/* <Navbar /> */}
            <div class="row mb-2" style={{ height: "600px" }}>
                <div class="col-12 ">
                    <img
                        src={`${BASE_URL}/uploads/${quanan.hinh_anh}`}
                        className=""
                        alt=""
                        style={{ width: "100%", height: "600px" }}
                    />
                </div>
            </div>

            <div className="container-fluid py-1">
                <div className="container">
                    <div class="d-flex align-items-center justify-content-between ">
                        <h2
                            className="display-5 mb-3"
                            style={{ fontSize: "60px", fontWeight: "bold" }}
                        >
                            {quanan.ten_quan_an}
                        </h2>

                    </div>
                    <p className="mb-4">
                        {gioithieu.map((value) => {
                            return value.id_gioithieu === quanan.id_gioithieu ? (
                                <div className="text-dark">{value.gioi_thieu}</div>
                            ) : (
                                ""
                            );
                        })}
                    </p>
                    <div className="row mt-3 mb-3" style={{ borderRadius: "10px", backgroundColor: '#fffcf8' }} >
                        <div className="col-lg-6 mb-3">
                            <Card>
                                <CardContent>
                                    <h1 className="text-dark text-center mt-1">ĐẶT CHỖ</h1>
                                    {cookies?.token && cookies?.role === 1 ?
                                        <>
                                            <div className="col-lg-12 mb-4">
                                                <Box component="form" noValidate autoComplete="off">
                                                    <Grid container spacing={0.5}>
                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                id="name"
                                                                label="Tên của bạn*"
                                                                variant="outlined"
                                                                defaultValue={accounts?.ten_nguoi_dung || ""}

                                                                sx={{ mb: 2 }}
                                                                {...register("ten_kh", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Tên của bạn không được để trống"
                                                                    }
                                                                })}
                                                            />
                                                            {formState?.errors?.ten_kh && (
                                                                <small className="text-danger">
                                                                    {formState?.errors?.ten_kh?.message}
                                                                </small>
                                                            )}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                type="number"
                                                                fullWidth
                                                                id="phone"
                                                                label="Số điện thoại*"
                                                                variant="outlined"
                                                                defaultValue={accounts?.so_dien_thoai || ""}
                                                                sx={{ mb: 2 }}
                                                                {...register("sdt", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Số điện thoai không được bỏ trống"
                                                                    },
                                                                    maxLength: {
                                                                        value: 10,
                                                                        message: "Sô điện thoại phải 10 số"
                                                                    },
                                                                    minLength: {
                                                                        value: 10,
                                                                        message: "Sô điện thoại phải 10 số"
                                                                    }
                                                                })}
                                                            />
                                                            {formState?.errors?.sdt && (
                                                                <small className="text-danger">
                                                                    {formState?.errors?.sdt?.message}
                                                                </small>
                                                            )}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                id="date"
                                                                label="Ngày"
                                                                type="date"
                                                                InputLabelProps={{ shrink: true }}
                                                                variant="outlined"
                                                                required
                                                                sx={{ mb: 2 }}
                                                                {...register("ngay", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Ngày không được bỏ trống"
                                                                    },
                                                                    validate: (ngay) => {
                                                                        const selectedDate = new Date(ngay);
                                                                        const today = new Date();
                                                                        today.setHours(0, 0, 0, 0);

                                                                        if (selectedDate < today) {
                                                                            return "Thời gian không được nhỏ hơn ngày hiện tại";
                                                                        }

                                                                        return true;
                                                                    }
                                                                })}
                                                            />
                                                            {formState?.errors?.ngay && (
                                                                <small className="text-danger">
                                                                    {formState?.errors?.ngay?.message}
                                                                </small>
                                                            )}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                id="date"
                                                                label="Thời Gian"
                                                                type="time"
                                                                InputLabelProps={{ shrink: true }}
                                                                variant="outlined"
                                                                required
                                                                sx={{ mb: 3 }}
                                                                {...register("thoi_gian", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Thời gian không được bỏ trống"
                                                                    },
                                                                    validate: (thoi_gian) => {
                                                                        const selectedDate = new Date(thoi_gian);
                                                                        const today = new Date();
                                                                        today.setHours(0, 0, 0, 0);

                                                                        if (selectedDate < today) {
                                                                            return "Thời gian không được nhỏ hơn ngày hiện tại";
                                                                        }

                                                                        return true;
                                                                    }
                                                                })}
                                                            />
                                                            {formState?.errors?.thoi_gian && (
                                                                <small className="text-danger">
                                                                    {formState?.errors?.thoi_gian?.message}
                                                                </small>
                                                            )}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                id="guests"
                                                                label="Số lượng khách"
                                                                type="number"
                                                                variant="outlined"
                                                                required
                                                                sx={{ mb: 2 }}
                                                                {...register("so_luong", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Số lượng không được bỏ trống"
                                                                    }
                                                                })}
                                                            />
                                                            {formState?.errors?.so_luong && (
                                                                <small className="text-danger">
                                                                    {formState?.errors?.so_luong?.message}
                                                                </small>
                                                            )}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                id="guests"
                                                                label="Email*"
                                                                type="email"
                                                                variant="outlined"
                                                                defaultValue={accounts?.email || ""}
                                                                sx={{ mb: 2 }}
                                                                {...register("email", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Email không được bỏ trống"
                                                                    },
                                                                    pattern: {
                                                                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                                                                        message: "Email không đúng định dạng"
                                                                    }
                                                                })}
                                                            />
                                                            {formState?.errors?.email && (
                                                                <small className="text-danger">
                                                                    {formState?.errors?.email?.message}
                                                                </small>
                                                            )}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <TextField
                                                                fullWidth
                                                                id="guests"
                                                                label="Yêu cầu khác"
                                                                type="text"
                                                                variant="outlined"
                                                                sx={{ mb: 2 }}
                                                                {...register("yeu_cau", {
                                                                    required: {
                                                                        value: true,
                                                                        message: "Yêu cầu không được bỏ trống"
                                                                    }
                                                                })}
                                                            />
                                                            {formState?.errors?.yeu_cau && (
                                                                <small className="text-danger">
                                                                    {formState?.errors?.yeu_cau?.message}
                                                                </small>
                                                            )}
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <Box display="flex" alignItems="center" className="mb-0">
                                                                <Button
                                                                    style={{
                                                                        width: "100px",
                                                                        backgroundColor: "#d4a762",
                                                                        color: "white",
                                                                        marginRight: "-10px"
                                                                    }}
                                                                    className="mt-0"
                                                                    onClick={handleSubmit(submit)}
                                                                >
                                                                    Đặt chỗ
                                                                </Button>
                                                            </Box>
                                                        </Grid>
                                                    </Grid>
                                                </Box>
                                            </div>
                                        </> : <h5 className="text-center mt-5"> Bạn cần đăng nhập để có thể đặt chỗ !</h5>
                                    }

                                </CardContent>
                            </Card>

                        </div>

                        <div className="col-lg-6 mb-3">
                            <Card>
                                <h1 className="text-dark text-center">MENU</h1>
                                <CardContent>
                                    <div className="row">
                                        {menu.map((value) => {
                                            return value.id_quanan === quanan.id_quanan ? (
                                                <div className="col-4">

                                                    <img
                                                        src={`${BASE_URL}/uploads/${value.hinh_anh}`}
                                                        className=""
                                                        alt=""
                                                        style={{
                                                            width: "100%",
                                                            height: "100px",
                                                            paddingBottom: "1px",
                                                            borderRadius: "5px"
                                                        }}
                                                    />
                                                    <h5 className="text-dark mt-1">{value.ten_menu}</h5>
                                                    <h6 className="text-secondary mt-1 ">{value.gia}đ</h6>

                                                    <div class="form-check mb-4">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="dat_mon" />
                                                        <label class="form-check-label" id="dat_mon" for=""> Chọn
                                                            món </label>
                                                    </div>
                                                </div>
                                            ) : ""
                                        })}

                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                    </div>


                    <div className="row mb-3">
                        <div className="col-4 col-md-4">
                            <div className="card" style={{ height: "400px" }}>
                                <div className="card-body">
                                    <h4 className="mb-1" style={{ fontWeight: "bold" }}>
                                        Xếp hạng và đánh giá
                                    </h4>
                                    <div className="row g-4 text-dark mb-5">
                                        <div className="col-sm-12">
                                            <h3>
                                                {stars} {renderStars(stars)}
                                            </h3>
                                            <hr />
                                            <h5 className="mb-3" style={{ fontWeight: "bold" }}>
                                                Xếp hạng
                                            </h5>
                                            <div className="row">
                                                <div className="col-6">
                                                    <p>
                                                        <i className="bi bi-cup-straw me-2"></i>Đồ ăn
                                                    </p>
                                                    <p>
                                                        <i className="bi bi-shop me-2"></i>Dịch vụ
                                                    </p>
                                                    <p>
                                                        <i className="bi bi-wind me-2"></i>Không khí
                                                    </p>
                                                </div>
                                                <div className="col-6">
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-4">
                            <div className="card" style={{ height: "400px" }}>
                                <div className="card-body">
                                    <h4 className="mb-3" style={{ fontWeight: "bold" }}>
                                        Giới thiệu
                                    </h4>
                                    {gioithieu.map((value) => {
                                        return value.id_gioithieu === quanan.id_gioithieu ? (
                                            <div className="row">
                                                <div className="col-6">
                                                    <p
                                                        className="mb-2 text-dark"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        Các tùy chọn dịch vụ
                                                    </p>
                                                    <div
                                                        className="row g-4 text-dark"
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        <div className="col-sm-4">
                                                            {cacdichvu.map((cdv, index) => {
                                                                return cdv.id_cacdichvu ===
                                                                    value.id_tuychondichvu ? (
                                                                    <div key={index}>{cdv.tuy_chon_dv}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <p
                                                        className="mb-2 text-dark"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        Không khí
                                                    </p>
                                                    <div
                                                        className="row g-4 text-dark"
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        <div className="col-sm-4">
                                                            {khongkhi.map((kk, index) => {
                                                                return kk.id_khongkhi === value.id_khongkhi ? (
                                                                    <div key={index}>{kk.khong_khi}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <p
                                                        className="mb-2 text-dark"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        Dịch vụ
                                                    </p>
                                                    <div
                                                        className="row g-4 text-dark"
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        <div className="col-sm-4">
                                                            {dichvu.map((dv, index) => {
                                                                return dv.id_dichvu === value.id_dichvu ? (
                                                                    <div key={index}>{dv.dich_vu}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <p
                                                        className="mb-2 text-dark"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        Tiện nghi
                                                    </p>
                                                    <div
                                                        className="row g-4 text-dark"
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        <div className="col-sm-4">
                                                            {tiennghi.map((tn, index) => {
                                                                return tn.id_tiennghi === value.id_tiennghi ? (
                                                                    <div key={index}>{tn.tien_nghi}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">


                                                    <p
                                                        className="mb-2 text-dark"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        Kế hoạch
                                                    </p>
                                                    <div
                                                        className="row g-4 text-dark"
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        <div className="col-sm-4">
                                                            {kehoach.map((kh, index) => {
                                                                return kh.id_kehoach === value.id_kehoach ? (
                                                                    <div key={index}>{kh.ke_hoach}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <p
                                                        className="mb-2 text-dark"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        Bãi đỗ xe
                                                    </p>
                                                    <div
                                                        className="row g-4 text-dark"
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        <div className="col-sm-4">
                                                            {baidoxe.map((bdx, index) => {
                                                                return bdx.id_baidoxe === value.id_baidoxe ? (
                                                                    <div key={index}>{bdx.bai_do_xe}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    <p
                                                        className="mb-2 text-dark"
                                                        style={{ fontWeight: "bold" }}
                                                    >
                                                        Loại khách hàng
                                                    </p>
                                                    <div
                                                        className="row g-4 text-dark"
                                                        style={{ whiteSpace: "nowrap" }}
                                                    >
                                                        <div className="col-sm-4">
                                                            {loaikhachhang.map((loaikh, index) => {
                                                                return loaikh.id_loaikh === value.id_loaikh ? (
                                                                    <div key={index}>{loaikh.khach_hang}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="col-4 col-md-4">
                            <div className="card" style={{ height: "400px" }}>
                                <div className="card-body">
                                    <h4 className="mb-1" style={{ fontWeight: "bold" }}>
                                        Thông tin liên hệ
                                    </h4>
                                    <div className="row g-4 text-dark mb-5">
                                        <div className="col-sm-12">
                                            <MapComponent />
                                        </div>
                                        <div className="col-sm-6">
                                            <i class="fas fa-map-marker-alt me-2"></i>
                                            {quanan.dia_chi}
                                        </div>
                                        <div className="col-sm-6" >
                                            <Link to="/" target="_blank" rel="noopener noreferrer"><FacebookIcon style={{ color: "black" }} /></Link>
                                        </div>
                                        <div className="col-sm-12">
                                            <i className="bi bi-phone me-2"></i>SĐT:
                                            {quanan.dien_thoai}
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-12">
                            <Link
                                to={`/danh-gia/${quanan.id_quanan}`}
                                className="d-flex align-items-center mb-2"
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                            >
                                <Button
                                    style={{ borderRadius: "50px", fontSize: "15px", width: "150px", backgroundColor: "#d4a762", color: "white", marginRight: "-10px" }}
                                    className="mt-0"
                                >
                                    Viết đánh giá
                                </Button>

                            </Link>
                            <div className="card" style={{ height: "auto" }}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-4">
                                            <h4 className="mb-1" style={{ fontWeight: "bold" }}>
                                                Đánh giá
                                            </h4>
                                        </div>
                                        <div className="col-8">
                                            <h4 className="mb-1" style={{ fontWeight: "bold" }}>
                                                Bài đánh giá
                                            </h4>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div
                                            className="col-4"
                                            style={{ borderRight: "1px solid #000" }}
                                        >
                                            <div className="row">
                                                <div className="col-6 text-dark">
                                                    <p> Tuyệt vời</p>
                                                    <p> Rất tốt</p>
                                                    <p> Trung Bình</p>
                                                    <p> Tệ</p>
                                                    <p> Kinh khủng</p>
                                                </div>
                                                <div className="col-6">
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                    <p>
                                                        <i className="fas fa-star text-primary me-2"></i>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-8">
                                            <Box component="form" noValidate autoComplete="off">
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12}>
                                                        <Grid container spacing={2}>
                                                            {danhgia.map((dg, index) => {
                                                                return dg.id_quanan === quanan.id_quanan ? (
                                                                    <Grid item xs={12} key={index}>
                                                                        <Card sx={{ mb: 2 }}>
                                                                            <CardContent>
                                                                                <Grid container spacing={2}>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography variant="body2" component="div">
                                                                                            {nguoidg.map((ndg) => (
                                                                                                dg.id_nguoidung === ndg.id_nguoidung ? (
                                                                                                    <span key={ndg.id_nguoidung}><strong>{ndg.ten_nguoi_dung}</strong></span>
                                                                                                ) : (
                                                                                                    ''
                                                                                                )
                                                                                            ))}
                                                                                        </Typography>
                                                                                        <Typography variant="caption" display="block">
                                                                                            {dg.created_at.split("T")[0]}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs={6} display="flex" alignItems="center" justifyContent="flex-end">
                                                                                        {renderStars(dg.sao)}
                                                                                    </Grid>
                                                                                    <Grid item xs={12}>
                                                                                        <img
                                                                                            src={`${BASE_URL}/uploads/${dg.hinh_anh}`}
                                                                                            alt="image"
                                                                                            style={{ width: "150px", borderRadius: "10px" }}
                                                                                        />
                                                                                    </Grid>
                                                                                    <Grid item xs={12}>
                                                                                        <Typography variant="body2" component="div">
                                                                                            {dg.binh_luan}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </Grid>
                                                                ) : (
                                                                    ''
                                                                );
                                                            })}
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    );
};

export default Gioithieu;
