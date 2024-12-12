import React, { useEffect, useState } from "react";
import { editDatcho, getDatcho, sendEmail, sendEmailToQuan } from "../../../services/Datcho";
import { useForm } from "react-hook-form";
import {
    Button,
    TextField,
    Grid,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Card,
    Typography,
    Box,
    FormControl,
    FormControlLabel,
    RadioGroup,
    FormLabel,
    Radio
} from "@mui/material";
import { useSnackbar } from "notistack";
import { editNguoiDung, getNguoiDungById } from "../../../services/Nguoidung";
import { BASE_URL } from "../../../config/ApiConfig";
import ImgUser from "../../../admin/assets/images/user.png";
import { changPassword } from "../../../services/Auth";
import { Link, useNavigate } from "react-router-dom";
import { getQuanan } from "../../../services/Quanan";
import { getMenuOrder } from "../../../services/MenuOrder";

const Profile = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const profileForm = useForm();
    const passwordForm = useForm();
    const { register, handleSubmit, formState } = useForm()
    const { enqueueSnackbar } = useSnackbar();
    const [dondatcho, setDon] = useState([]);
    const [menuorder, setMenuOrder] = useState([]);
    const [quans, setQuans] = useState([]);
    const [nguoidung, setnguoidung] = useState();
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (accounts && accounts.id_nguoidung && !nguoidung) {
            initData();
        }
    }, [accounts, nguoidung]);

    const initData = async () => {
        try {
            const resultDon = await getDatcho();
            setDon(resultDon.data);

            const resultMenuorder = await getMenuOrder()
            setMenuOrder(resultMenuorder.data)

            const resultQuan = await getQuanan();
            setQuans(resultQuan.data)

            await autoCancelExpiredBookings(resultDon.data);

            const resultNguoiDung = await getNguoiDungById(accounts.id_nguoidung);
            setnguoidung(resultNguoiDung.data);
        } catch (error) {
            enqueueSnackbar("Có lỗi xảy ra khi tải thông tin!", { variant: "error" });
        }
    };

    const autoCancelExpiredBookings = async (bookings) => {
        const currentDate = new Date();

        for (const booking of bookings) {
            const bookingDate = new Date(booking.ngay_dat);
            const expirationDate = new Date(bookingDate);
            expirationDate.setDate(expirationDate.getDate() + 1);
            if (expirationDate < currentDate && booking.trang_thai === 0) {
                try {
                    await editDatcho(booking.id_datcho, {
                        ...booking,
                        trang_thai: 2,
                        ly_do_huy: "Hết hạn"
                    });

                    await sendEmail(booking.id_datcho, "Hết hạn");

                    enqueueSnackbar(`Đơn đặt chỗ tại ${booking.ten_quan} đã được hủy vì hết hạn!`, { variant: "warning" });
                } catch (error) {
                    console.error("Lỗi khi tự động hủy đơn đặt chỗ:", error);
                    enqueueSnackbar("Có lỗi khi tự động hủy đơn đặt chỗ!", { variant: "error" });
                }
            }
        }

    };

    const handleClickOpen = (id) => {
        setId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setId(null);
    };

    const onHuydon = async (value) => {
        try {
            const datcho = dondatcho.find((e) => e.id_datcho === id);
            const quan = quans.filter((e) => e.id_quanan === datcho.id_quanan)

            await editDatcho(id, {
                ten_quan: datcho?.quan_an,
                ten_kh: datcho?.khach_hang,
                sdt_kh: datcho?.sdt,
                email_kh: datcho?.email,
                thoi_gian_dat: datcho?.thoi_gian,
                so_luong_nguoi: datcho?.so_luong,
                trang_thai: 2,
                ly_do_huy: value.ly_do_huy,
                yeu_cau_khac: datcho?.yeu_cau,
                id_nguoidung: datcho?.id_nguoidung,
            });
            setOpen(false);
            quan.map(async (item) => {
                await sendEmailToQuan(datcho.id_datcho, item.created_user, `Khách hàng đã hủy đơn với lý do: ${value.ly_do_huy}`)
            })
            setId(null);
            enqueueSnackbar("Hủy thành công!", { variant: "success" });
            initData();
        } catch (error) {
            console.error("Lỗi khi hủy đặt chỗ:", error);
            enqueueSnackbar("Có lỗi xảy ra khi hủy đặt chỗ!", { variant: "error" });
        }
    };

    const onUpdateProfile = async (data) => {
        const id_nguoidung = accounts?.id_nguoidung;

        try {
            const res = await editNguoiDung(id_nguoidung, {
                ten_nguoi_dung: data.ten_nguoi_dung,
                email: data.email,
                so_dien_thoai: data.so_dien_thoai,
                dia_chi: data.dia_chi,
                ngay_sinh: data.ngay_sinh,
                gioi_tinh: data.gioi_tinh,
                hinh_anh: data.hinh_anh[0] || "",
            });
            if (res) {
                const updatedAccount = {
                    ...accounts,
                    ten_nguoi_dung: data.ten_nguoi_dung,
                    email: data.email,
                    so_dien_thoai: data.so_dien_thoai,
                    dia_chi: data.dia_chi,
                    ngay_sinh: data.ngay_sinh,
                    gioi_tinh: data.gioi_tinh,
                    hinh_anh: data.hinh_anh[0] || accounts.hinh_anh,
                };
                localStorage.setItem("accounts", JSON.stringify(updatedAccount));
                enqueueSnackbar("Cập nhật hồ sơ thành công!", { variant: "success" });
                initData();
            } else {
                enqueueSnackbar("Cập nhật hồ sơ thất bại!", { variant: "error" });
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật hồ sơ:", error);
            enqueueSnackbar("Có lỗi xảy ra khi cập nhật hồ sơ!", {
                variant: "error",
            });
        }
    };

    const onChangePassword = async (value) => {
        try {
            await changPassword(accounts.id_nguoidung, {
                mat_khau: value.mat_khau_cu,
                newMat_khau: value.mat_khau_moi,
            })
            localStorage.removeItem("accounts");
            enqueueSnackbar("Đổi mật khẩu thành công!", { variant: "success" });
            navigate("/login");
        } catch (error) {
            if (error.response && error.response.data.error === "Mật khẩu hiện tại không chính xác") {
                enqueueSnackbar('Mật khẩu hiện tại không chính xác!', { variant: 'error' });
            } else {
                enqueueSnackbar('Có lỗi xảy ra !', { variant: 'error' });
            }
        }
    };

    const formatPrice = (price) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
    };

    const thongBao = (array, id_datcho) => {
        const fill = array.filter((item) => item.id_datcho === id_datcho)

        if (fill.length === 0) {
            return (
                <div className="row booking-details mb-3">
                    <p>{"Chưa có món ăn nào được gọi trước"}</p>
                </div>
            )
        }
    }

    const saveId = (id) => {
        localStorage.setItem("id_datcho", id);
    }

    return (
        <>
            <Card sx={{ padding: 2, maxWidth: { xs: '100%', md: '1200px' }, margin: '0 auto' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{
                            border: "1px solid #ddd", borderRadius: "8px", padding: 2, textAlign: "center", backgroundColor: "#f9f9f9",
                        }}>
                            <Box sx={{ marginBottom: 2 }}>
                                <img
                                    src={
                                        nguoidung?.hinh_anh
                                            ? nguoidung.hinh_anh.startsWith("http")
                                                ? nguoidung.hinh_anh
                                                : `${BASE_URL}/uploads/${nguoidung.hinh_anh}`
                                            : ImgUser
                                    }
                                    alt="User Avatar"
                                    style={{
                                        width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover",
                                    }}
                                />
                                <Typography variant="h6" sx={{ marginTop: 1 }}>
                                    {nguoidung?.ten_nguoi_dung || "N/A"}
                                </Typography>
                            </Box>
                            <Box component="ul" sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                gap: "8px",
                            }}>
                                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                    <strong>Ngày sinh:</strong>{" "}
                                    {nguoidung?.ngay_sinh
                                        ? nguoidung.ngay_sinh.split("-").reverse().join("/")
                                        : "N/A"}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                    <strong>Giới tính:</strong> {nguoidung?.gioi_tinh || "N/A"}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                    <strong>Điện thoại:</strong> {nguoidung?.so_dien_thoai || "N/A"}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                    <strong>Email:</strong> {nguoidung?.email || "N/A"}
                                </Typography>
                                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                                    <strong>Địa chỉ:</strong> {nguoidung?.dia_chi || "N/A"}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={8}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        border: "1px solid #ddd",
                                        borderRadius: "8px",
                                        padding: 2,
                                        backgroundColor: "#fff",
                                    }}
                                >
                                    <Typography variant="h4" sx={{ marginBottom: 2 }}>
                                        Cập nhật Hồ Sơ
                                    </Typography>
                                    <form onSubmit={profileForm.handleSubmit(onUpdateProfile)}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Họ và tên"
                                                    variant="outlined"
                                                    fullWidth
                                                    defaultValue={accounts?.ten_nguoi_dung || ""}
                                                    {...profileForm.register("ten_nguoi_dung", {
                                                        required: "Tên người dùng không được bỏ trống",
                                                        minLength: {
                                                            value: 3,
                                                            message: "Tên người dùng phải nhiều hơn 3 ký tự",
                                                        },
                                                    })}
                                                />
                                                {profileForm.formState?.errors?.ten_nguoi_dung && (
                                                    <small className="text-danger">
                                                        {profileForm.formState?.errors?.ten_nguoi_dung?.message}
                                                    </small>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Email"
                                                    variant="outlined"
                                                    fullWidth
                                                    defaultValue={accounts?.email || ""}
                                                    {...profileForm.register("email", {
                                                        required: "Email không được bỏ trống",
                                                        pattern: {
                                                            value: /^\S+@\S+$/i,
                                                            message: "Email không hợp lệ",
                                                        },
                                                    })}
                                                />
                                                {profileForm.formState?.errors?.email && (
                                                    <small className="text-danger">
                                                        {profileForm.formState?.errors?.email?.message}
                                                    </small>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Số điện thoại"
                                                    variant="outlined"
                                                    fullWidth
                                                    defaultValue={accounts?.so_dien_thoai || ""}
                                                    {...profileForm.register("so_dien_thoai", {
                                                        required: "Số điện thoại không được bỏ trống",
                                                        pattern: {
                                                            value: /^[0-9\b]+$/,
                                                            message: "Số điện thoại không hợp lệ",
                                                        },
                                                        maxLength: {
                                                            value: 10,
                                                            message: "Số điện thoại phải 10 số"
                                                        },
                                                        minLength: {
                                                            value: 10,
                                                            message: "Số điện thoại phải 10 số"
                                                        }
                                                    })}
                                                />
                                                {profileForm.formState?.errors?.so_dien_thoai && (
                                                    <small className="text-danger">
                                                        {profileForm.formState?.errors?.so_dien_thoai?.message}
                                                    </small>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    label="Địa chỉ"
                                                    variant="outlined"
                                                    fullWidth
                                                    defaultValue={accounts?.dia_chi || ""}
                                                    {...profileForm.register("dia_chi", {
                                                        required: "Địa chỉ không được bỏ trống",
                                                    })}
                                                />
                                                {profileForm.formState?.errors?.dia_chi && (
                                                    <small className="text-danger">
                                                        {profileForm.formState?.errors?.dia_chi?.message}
                                                    </small>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    type="date"
                                                    defaultValue={accounts?.ngay_sinh || ""}
                                                    {...profileForm.register("ngay_sinh", {
                                                        required: "Ngày sinh không được bỏ trống",
                                                    })}
                                                />
                                                {profileForm.formState?.errors?.ngay_sinh && (
                                                    <small className="text-danger">
                                                        {profileForm.formState?.errors?.ngay_sinh?.message}
                                                    </small>
                                                )}
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    fullWidth
                                                    type="file"
                                                    {...profileForm.register("hinh_anh")}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <FormLabel component="legend">Giới tính</FormLabel>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue="Nam"
                                                    name="radio-buttons-group"
                                                    row
                                                >
                                                    <FormControlLabel
                                                        value="Nam"
                                                        control={<Radio />}
                                                        label="Nam"
                                                        {...profileForm.register("gioi_tinh", {
                                                            required: "Giới tính không được bỏ trống",
                                                        })}
                                                    />
                                                    <FormControlLabel
                                                        value="Nữ"
                                                        control={<Radio />}
                                                        label="Nữ"
                                                        {...profileForm.register("gioi_tinh", {
                                                            required: "Giới tính không được bỏ trống",
                                                        })}
                                                    />
                                                </RadioGroup>
                                                {profileForm.formState?.errors?.gioi_tinh && (
                                                    <small className="text-danger">
                                                        {profileForm.formState?.errors?.gioi_tinh?.message}
                                                    </small>
                                                )}
                                            </Grid>

                                            <Grid item xs={12}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    style={{ width: "100px", backgroundColor: "#d4a762" }}
                                                    onClick={profileForm.handleSubmit(onUpdateProfile)}
                                                    type="submit"
                                                >
                                                    Cập nhật
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Box>
                            </Grid>
                            {accounts ?
                                <Grid item xs={12} md={6} sx={{ display: accounts.googleId === 3 ? 'none' : 'flex' }}>
                                    <Box
                                        sx={{
                                            border: "1px solid #ddd",
                                            borderRadius: "8px",
                                            padding: 2,
                                            backgroundColor: "#fff",
                                        }}
                                    >
                                        <Typography variant="h4" sx={{ marginBottom: 2 }}>
                                            Đổi mật khẩu
                                        </Typography>
                                        <form onSubmit={passwordForm.handleSubmit(onChangePassword)}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Mật khẩu hiện tại"
                                                        variant="outlined"
                                                        type={"password"}
                                                        fullWidth
                                                        {...passwordForm.register("mat_khau_cu", {
                                                            required: "Mật khẩu cũ không được bỏ trống",
                                                            minLength: {
                                                                value: 6,
                                                                message: "Mật khẩu phải có ít nhất 6 ký tự",
                                                            },
                                                        })}
                                                    />
                                                    {passwordForm.formState?.errors?.mat_khau_cu && (
                                                        <small className="text-danger">
                                                            {passwordForm.formState?.errors?.mat_khau_cu?.message}
                                                        </small>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Mật khẩu mới"
                                                        variant="outlined"
                                                        type={"password"}
                                                        fullWidth
                                                        {...passwordForm.register("mat_khau_moi", {
                                                            required: "Mật khẩu mới không được bỏ trống",
                                                            minLength: {
                                                                value: 6,
                                                                message: "Mật khẩu phải có ít nhất 6 ký tự",
                                                            },
                                                        })}
                                                    />
                                                    {passwordForm.formState?.errors?.mat_khau_moi && (
                                                        <small className="text-danger">
                                                            {passwordForm.formState?.errors?.mat_khau_moi?.message}
                                                        </small>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Xác nhận mật khẩu mới"
                                                        variant="outlined"
                                                        type={"password"}
                                                        fullWidth
                                                        {...passwordForm.register("xac_nhan_mat_khau", {
                                                            required: "Xác nhận mật khẩu không được bỏ trống",
                                                            minLength: {
                                                                value: 6,
                                                                message: "Mật khẩu phải có ít nhất 6 ký tự",
                                                            },
                                                            validate: (value) =>
                                                                value === passwordForm.watch("mat_khau_moi") ||
                                                                "Mật khẩu xác nhận không khớp",
                                                        })}
                                                    />
                                                    {passwordForm.formState?.errors?.xac_nhan_mat_khau && (
                                                        <small className="text-danger">
                                                            {
                                                                passwordForm.formState?.errors?.xac_nhan_mat_khau
                                                                    ?.message
                                                            }
                                                        </small>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        style={{ width: "100px", backgroundColor: "#d4a762" }}
                                                        onClick={passwordForm.handleSubmit(onChangePassword)}
                                                        type="submit"
                                                    >
                                                        Thay đổi
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Box>
                                </Grid>
                                : null
                            }
                        </Grid>
                    </Grid>
                </Grid>
                <Typography variant="h4" className="mb-4" sx={{padding: 2}}>
                    Thông Tin Đặt Chỗ
                </Typography>
                {dondatcho.map((value, index) => {
                    return value?.id_nguoidung === accounts?.id_nguoidung ? (
                        <Box
                            key={index}
                            className="booking-card"
                            sx={{
                                mb: 4,
                                p: 2,
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                            }}
                        >
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography variant="h6" className="booking-title">
                                    Quán ăn: {value.ten_quan}
                                </Typography>
                                <span
                                    className={`badge ${value?.trang_thai === 0
                                        ? "badge-warning"
                                        : value?.trang_thai === 1 || value?.trang_thai === 3
                                            ? "badge-success"
                                            : "badge-danger"
                                    }`}
                                >
                                    {value?.trang_thai === 0 && "Đang chờ xử lý"}
                                    {value?.trang_thai === 1 && "Đã có chỗ"}
                                    {value?.trang_thai === 2 && "Đã hủy"}
                                    {value?.trang_thai === 3 && "Đã hoàn thành"}
                                </span>
                            </Box>
                            <Grid container spacing={2}>
                                {/* Left Column */}
                                <Grid item xs={12} md={4}>
                                    <Box className="booking-details">
                                        <Typography>
                                            <strong>Mã đơn:</strong> {value?.ma_don}
                                        </Typography>
                                        <Typography>
                                            <strong>Mã giao dịch:</strong> {value?.ma_giao_dich}
                                        </Typography>
                                        <Typography>
                                            <strong>Tiền cọc:</strong> {formatPrice(value?.tien_coc)}{" "}
                                            (30%)
                                        </Typography>
                                        <Typography>
                                            <strong>Ngày:</strong> {value?.ngay_dat.split("T")[0]}
                                        </Typography>
                                        <Typography>
                                            <strong>Thời gian:</strong> {value?.thoi_gian}
                                        </Typography>
                                        <Typography>
                                            <strong>Số lượng khách:</strong> {value?.so_luong_nguoi}
                                        </Typography>
                                        <Typography>
                                            <strong>Yêu cầu:</strong> {value?.yeu_cau_khac || "N/A"}
                                        </Typography>
                                        {value.trang_thai === 2 && (
                                            <Typography>
                                                <strong>Lý do hủy đơn:</strong> {value?.ly_do_huy}
                                            </Typography>
                                        )}
                                    </Box>
                                </Grid>

                                {/* Right Column */}
                                <Grid item xs={12} md={8}>
                                    <Box>
                                        <Typography variant="h6" gutterBottom>
                                            Thông tin gọi món
                                        </Typography>
                                        <Box className="booking-details mt-3">
                                            {menuorder.map((item, idx) => {
                                                if (item.id_datcho === value.id_datcho) {
                                                    return (
                                                        <Box
                                                            key={idx}
                                                            className="row booking-details"
                                                            sx={{ mb: 1 }}
                                                        >
                                                            <Grid container alignItems="center">
                                                                <Grid item xs={6}>
                                                                    <Typography>{item.ten_mon}</Typography>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography>
                                                                        {formatPrice(item.gia)} x {item.so_luong}
                                                                    </Typography>
                                                                </Grid>
                                                            </Grid>
                                                            <hr
                                                                className="text-dark"
                                                                style={{ width: "50%" }}
                                                            ></hr>
                                                        </Box>
                                                    );
                                                }
                                                return null;
                                            })}
                                            {thongBao(menuorder, value.id_datcho)}

                                            <Grid container className="booking-details">
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        Tổng tiền:
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography sx={{ fontWeight: "bold" }}>
                                                        {menuorder
                                                            .filter(
                                                                (item) => item.id_datcho === value.id_datcho
                                                            )
                                                            .reduce(
                                                                (total, item) => total + item.gia * item.so_luong,
                                                                0
                                                            )
                                                            .toLocaleString("vi-VN", {
                                                                style: "currency",
                                                                currency: "VND",
                                                            })}
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </Box>
                                </Grid>
                            </Grid>

                            {/* Action Buttons */}
                            <Box
                                display="flex"
                                justifyContent="flex-start"
                                alignItems="center"
                                gap={2}
                                mt={2}
                            >
                                <Button
                                    variant="contained"
                                    color="error"
                                    style={
                                        value?.trang_thai === 2 ||
                                        value?.trang_thai === 3 ||
                                        value?.trang_thai === 1
                                            ? { display: "none" }
                                            : { display: "block", width: "100px" }
                                    }
                                    onClick={() => handleClickOpen(value?.id_datcho)}
                                >
                                    Hủy đơn
                                </Button>
                                <Link
                                    to={`/danh-gia/${value.id_quanan}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button
                                        variant="contained"
                                        style={
                                            value?.is_danhgia === 0 || value.trang_thai === 2
                                                ? { display: "none" }
                                                : {
                                                    display: "block",
                                                    width: "150px",
                                                    backgroundColor: "#d4a762",
                                                    color: "#fff",
                                                }
                                        }
                                        onClick={() => saveId(value.id_datcho)}
                                    >
                                        Viết đánh giá
                                    </Button>
                                </Link>
                            </Box>

                            {/* Dialog for Cancel Confirmation */}
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Xác nhận hủy đơn</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Bạn có chắc chắn muốn hủy đặt chỗ quán{" "}
                                        {
                                            dondatcho.find((item) => item.id_datcho === id)?.ten_quan
                                        }{" "}
                                        này không?
                                    </DialogContentText>
                                    <TextField
                                        label="Lý do"
                                        name="noiDung"
                                        rows={4}
                                        fullWidth
                                        variant="outlined"
                                        sx={{
                                            "& .MuiInputBase-input": { color: "black" },
                                            "& .MuiInputLabel-root": { color: "black" },
                                            "& .Mui-disabled": { color: "black" },
                                            mt: 2,
                                        }}
                                        {...register("ly_do_huy", {
                                            required: {
                                                value: true,
                                                message: "Vui lòng nhập lý do",
                                            },
                                        })}
                                    />
                                    {formState?.errors?.ly_do_huy && (
                                        <small className="text-danger">
                                            {formState?.errors?.ly_do_huy?.message}
                                        </small>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={handleSubmit(onHuydon)}
                                        color="error"
                                        autoFocus
                                    >
                                        Có
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Không
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Box>
                    ) : null;
                })}
            </Card>
        </>
    );
};

export default Profile;