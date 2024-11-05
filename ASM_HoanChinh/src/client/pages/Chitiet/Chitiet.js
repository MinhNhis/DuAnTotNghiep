import React, { useEffect, useState } from "react";
import { TextField, Button, Typography, Box, Grid, CardContent, Card } from '@mui/material';
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getQuanan, getQuananById } from "../../../services/Quanan";
import { BASE_URL } from "../../../config/ApiConfig";
import { getDanhgia } from "../../../services/Danhgia";
import { getNguoiDung } from "../../../services/Nguoidung";
import { getMenus } from "../../../services/MenuPhu";
import { addDatcho, getDatcho } from "../../../services/Datcho";
import { useSnackbar } from "notistack";
import FacebookIcon from '@mui/icons-material/Facebook';
import { useCookies } from "react-cookie";
import Map from "../../components/Map";

const Gioithieu = () => {
    const { register, handleSubmit, formState } = useForm()
    const navigate = useNavigate()
    const params = useParams();
    const id = params.id;

    const [quanan, setQuanan] = useState({});
    const [quananMap, setQuananMap] = useState([]);
    const [danhgia, setDanhgia] = useState([]);
    const [nguoidg, setNguoidanhgia] = useState([]);
    const [menu, setMenu] = useState([]);
    const [datcho, setDatcho] = useState([]);
    const accounts = JSON.parse(localStorage.getItem("accounts"))
    const { enqueueSnackbar } = useSnackbar();
    const [stars, setStar] = useState(0);
    const [visibleCount, setVisibleCount] = useState(2);

    useEffect(() => {
        initData();
        handleCheckboxChange();
    }, []);

    const initData = async () => {
        const resultQa = await getQuananById(id);
        setQuanan(resultQa.data);

        // Quán trên Map
        const resQuan = await getQuanan();
        const fill = resQuan.data.filter((e) => e.id_quanan === resultQa.data.id_quanan)
        setQuananMap(fill);
        /*--------------------------------*/

        const resultDg = await getDanhgia();
        setDanhgia(resultDg.data);

        const resultNdg = await getNguoiDung();
        setNguoidanhgia(resultNdg.data);

        const resultMenu = await getMenus();
        setMenu(resultMenu.data);

        const resultDatcho = await getDatcho();
        const filteredDatcho = resultDatcho.data.filter(datcho => datcho.id_quanan === resultQa.data.id_quanan);
        setDatcho(filteredDatcho);
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
        if (value.so_luong > quanan.so_luong_cho) {
            enqueueSnackbar(`Số lượng người không được quá sô lượng chỗ của quán ${quanan.so_luong_cho}`, { variant: "error" });
        } else {
            const fillDatcho = datcho.filter((e) => e.ngay_dat === value.ngay && e.thoi_gian === value.thoi_gian + ':00' && e.trang_thai !== 2);
            let tongCho = 0

            fillDatcho.forEach((e) => {
                tongCho += e.so_luong_nguoi
            })
            let so_luong_cho_trong = quanan.so_luong_cho - tongCho;

            fillDatcho.find(async (e) => {
                if (value?.thoi_gian + ':00' === e.thoi_gian && value?.ngay === e.ngay_dat && Number(value?.so_luong) <= so_luong_cho_trong) {
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

                } else {
                    return enqueueSnackbar(`Số lượng chỗ không đủ. Thời gian này chỉ còn ${so_luong_cho_trong} chỗ! Vui lòng chọn thời gian khác cách 2 giờ hoặc ngày khác !`, { variant: "error" });
                }
            })
            // Lương///
            if (fillDatcho.length === 0) {
                const res = await addDatcho({
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
        }
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
            setStar((totalStars / count).toFixed(1));
        } else {
            setStar(0);
        }
    }, [danhgia, quanan]);

    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 2);
    };

    const [selectedMenuItems, setSelectedMenuItems] = useState({});
    const [totalPrice, setTotalPrice] = useState(0);
    const [menuOrders, setMenuOrders] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [fillMenu, setFillMenu] = useState([]);
    const fillmenu = menu.filter((e) => e.id_quanan === quanan.id_quanan);
    const [Loadmenu, setLoadMenu] = useState(6);

    const handleCheckboxChange = (event) => {
        if (event && event.target) {
            const menuItemId = parseInt(event.target.value);
            const isChecked = event.target.checked;

            setSelectedMenuItems((prev) => {
                const newSelected = { ...prev };

                if (isChecked) {
                    newSelected[menuItemId] = 1;
                } else {
                    delete newSelected[menuItemId];
                }

                return newSelected;
            });

            const newSelected = [...menuOrders];

            if (isChecked) {
                if (!newSelected.includes(menuItemId)) {
                    newSelected.push(menuItemId);
                }
            } else {
                const index = newSelected.indexOf(menuItemId);
                if (index > -1) {
                    newSelected.splice(index, 1);
                }
            }

            const allSelectedItems = getAllSelectedItems(newSelected);
            // console.log("Tất cả mục đã chọn: ", allSelectedItems);
            setSelectedItems(allSelectedItems);

            const updatedFillMenu = fillmenu.map((item) => {
                const chon = newSelected.includes(item.id_menu) ? 1 : 0;
                return { ...item, chon };
            });

            setFillMenu(updatedFillMenu);
            setMenuOrders(newSelected);
        }
    };

    const getAllSelectedItems = (selectedIds) => {
        return fillmenu.filter(item => selectedIds.includes(item.id_menu));
    };


    const handleQuantityChange = (id_menu, change) => {
        setSelectedMenuItems((prev) => {
            const newQuantity = (prev[id_menu] || 0) + change;
            if (newQuantity < 0) {
                return prev;
            }
            return { ...prev, [id_menu]: newQuantity };
        });
    };

    const handleLoadMenu = () => {
        setLoadMenu((prevCount) => prevCount + 3);
    };

    useEffect(() => {
        const total = Object.entries(selectedMenuItems).reduce((acc, [id_menu, quantity]) => {
            const menuItem = menu.find((item) => item.id_menu === parseInt(id_menu));
            return acc + (menuItem ? menuItem.gia * quantity : 0);
        }, 0);
        setTotalPrice(total);
    }, [selectedMenuItems, menu]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    return (
        <>
            <div className="container-fluid py-1">
                {/* <Navbar /> */}
                <div class="row mb-2" fullWidth style={{ height: "auto" }}>
                    <div class="col-12 ">
                        <Map quanan={quananMap} sizeData={1} />
                    </div>
                </div>
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
                        {/* Mô Tả */}
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
                                                                    },
                                                                    validate: (so_luong) => {
                                                                        if (so_luong <= 0) {
                                                                            return "Số lượng phải lớn hơn 0"
                                                                        }
                                                                        return true
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
                                        {menu.slice(0, Loadmenu).map((value) => {
                                            return value.id_quanan === quanan.id_quanan ? (
                                                <div className="col-4" key={value.id_menu}>
                                                    <img
                                                        src={`${BASE_URL}/uploads/${value.hinh_anh}`}
                                                        alt=""
                                                        style={{
                                                            width: "100%",
                                                            height: "100px",
                                                            paddingBottom: "1px",
                                                            borderRadius: "5px"
                                                        }}
                                                    />
                                                    {value.ten_menu.length > 12 ? `${value.ten_menu.substring(0, 12)}...` : value.ten_menu}

                                                    <h6 className="text-secondary mt-1">{formatPrice(value.gia)}</h6>

                                                    <div className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            value={value.id_menu}
                                                            id={`menu_${value.id_menu}`}
                                                            onChange={handleCheckboxChange}
                                                        />
                                                        <label className="form-check-label" htmlFor={`menu_${value.id_menu}`}>Chọn món</label>
                                                    </div>

                                                    {selectedMenuItems[value.id_menu] !== undefined && (
                                                        <div className="mb-4 d-flex align-items-center" >
                                                            <label htmlFor={`quantity_${value.id_menu}`} className="form-label me-2 pt-1 " ></label>

                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                onClick={() => handleQuantityChange(value.id_menu, -1)}
                                                                disabled={selectedMenuItems[value.id_menu] <= 0}
                                                                style={{ paddingBottom: "1px", paddingTop: "1px" }}
                                                            >
                                                                -
                                                            </button>

                                                            <input
                                                                type="text"
                                                                className="form-control mx-2"
                                                                id={`quantity_${value.id_menu}`}
                                                                value={selectedMenuItems[value.id_menu]}
                                                                onChange={(e) => {
                                                                    const newQuantity = parseInt(e.target.value) || 0;
                                                                    handleQuantityChange(value.id_menu, newQuantity - (selectedMenuItems[value.id_menu] || 0));
                                                                }}
                                                                style={{ paddingBottom: "1px", paddingTop: "1px", width: "60px", textAlign: "center", borderRadius: "4px" }}
                                                            />

                                                            <button
                                                                className="btn btn-outline-secondary"
                                                                onClick={() => handleQuantityChange(value.id_menu, 1)}
                                                                style={{ paddingBottom: "1px", paddingTop: "1px" }}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : null;
                                        })}
                                    </div>
                                    {Loadmenu < menu.filter((mn) => mn.id_quanan === quanan.id_quanan).length && (
                                        <Grid container justifyContent="center">
                                            <Button
                                                variant="outlined"
                                                className="glow-button"
                                                onClick={handleLoadMenu}
                                                style={{
                                                    backgroundColor: '#d4a762',
                                                    color: 'white',
                                                    border: '2px solid #d4a762',
                                                    borderRadius: '20px',
                                                    padding: '8px 16px',
                                                    fontSize: '12px',
                                                    fontWeight: 'bold',
                                                    textTransform: 'uppercase',                                                    cursor: 'pointer',
                                                    position: 'relative',
                                                    overflow: 'hidden',
                                                    transition: 'all 0.3s ease',
                                                }}
                                            >
                                                Xem thêm
                                            </Button>
                                        </Grid>
                                    )}
                                    <p style={{ marginTop: "20px" }}>Tổng tiền dự tính: {formatPrice(totalPrice)}</p>
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
                                    <div className="row">
                                        <div className="col-6">
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
                                                    {/* {khongkhi.map((kk, index) => {
                                                                return kk.id_khongkhi === value.id_khongkhi ? (
                                                                    <div key={index}>{kk.khong_khi}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })} */}
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
                                                    {/* {dichvu.map((dv, index) => {
                                                                return dv.id_dichvu === value.id_dichvu ? (
                                                                    <div key={index}>{dv.dich_vu}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })} */}
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
                                                    {/* {tiennghi.map((tn, index) => {
                                                                return tn.id_tiennghi === value.id_tiennghi ? (
                                                                    <div key={index}>{tn.tien_nghi}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })} */}
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
                                                    {/* {kehoach.map((kh, index) => {
                                                                return kh.id_kehoach === value.id_kehoach ? (
                                                                    <div key={index}>{kh.ke_hoach}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })} */}
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
                                                    {/* {baidoxe.map((bdx, index) => {
                                                                return bdx.id_baidoxe === value.id_baidoxe ? (
                                                                    <div key={index}>{bdx.bai_do_xe}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })} */}
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
                                                    {/* {loaikhachhang.map((loaikh, index) => {
                                                                return loaikh.id_loaikh === value.id_loaikh ? (
                                                                    <div key={index}>{loaikh.khach_hang}</div>
                                                                ) : (
                                                                    ""
                                                                );
                                                            })} */}
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
                                    <h4 className="mb-1" style={{ fontWeight: "bold" }}>
                                        Thông tin liên hệ
                                    </h4>
                                    <div className="row g-4 text-dark mb-5">
                                        <div className="col-sm-12">

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
                                                            {danhgia
                                                                .filter(dg => dg.id_quanan === quanan.id_quanan)
                                                                .slice(0, visibleCount)
                                                                .map((dg, index) => (
                                                                    <Grid item xs={12} key={index}>
                                                                        <Card sx={{ mb: 2 }}>
                                                                            <CardContent>
                                                                                <Grid container spacing={2}>
                                                                                    <Grid item xs={6}>
                                                                                        <Typography variant="body2" component="div">
                                                                                            {nguoidg.map((ndg) =>
                                                                                                dg.id_nguoidung === ndg.id_nguoidung ? (
                                                                                                    <span key={ndg.id_nguoidung}>{ndg.ten_nguoi_dung}</span>
                                                                                                ) : null
                                                                                            )}
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
                                                                ))}
                                                        </Grid>
                                                    </Grid>
                                                    {visibleCount < danhgia.filter(dg => dg.id_quanan === quanan.id_quanan).length && (
                                                        <Grid item xs={12} display="center" justifyContent="center">
                                                            <Button
                                                                variant="outlined"
                                                                className="glow-button"
                                                                onClick={handleLoadMore}
                                                                style={{
                                                                    backgroundColor: '#d4a762',
                                                                    color: 'white',
                                                                    border: '2px solid #d4a762',
                                                                    borderRadius: '20px',
                                                                    padding: '8px 16px',
                                                                    fontSize: '12px',
                                                                    fontWeight: 'bold',
                                                                    textTransform: 'uppercase',                                                    cursor: 'pointer',
                                                                    position: 'relative',
                                                                    overflow: 'hidden',
                                                                    transition: 'all 0.3s ease',
                                                                }}
                                                            >
                                                                Xem thêm
                                                            </Button>
                                                        </Grid>
                                                    )}
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