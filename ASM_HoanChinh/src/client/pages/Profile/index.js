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
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { editNguoiDung, getNguoiDungById } from "../../../services/Nguoidung";
import "./profile.css";
import { BASE_URL } from "../../../config/ApiConfig";
import ImgUser from "../../../admin/assets/images/user.png";
import { changPassword } from "../../../services/Auth";
import { useNavigate } from "react-router-dom";
import { getQuanan } from "../../../services/Quanan";

const Profile = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const profileForm = useForm();
    const passwordForm = useForm();

    const { enqueueSnackbar } = useSnackbar();
    const [dondatcho, setDon] = useState([]);
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

            const resultQuan = await getQuanan();
            setQuans(resultQuan.data)

            // Gọi autoCancelExpiredBookings ngay sau khi lấy danh sách đặt chỗ
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

            // Kiểm tra nếu đơn đã hết hạn và chỉ cập nhật nếu trạng thái là 0 (Đang chờ xử lý)
            if (expirationDate < currentDate && booking.trang_thai === 0) {
                try {
                    // Cập nhật trạng thái hủy đơn đặt chỗ
                    await editDatcho(booking.id_datcho, {
                        ...booking,
                        trang_thai: 2 // Chỉ cập nhật trạng thái thành "Đã hủy"
                    });

                    // Gửi email thông báo với lý do hủy là "Hết hạn"
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

    const onHuydon = async () => {
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
                yeu_cau_khac: datcho?.yeu_cau,
                id_nguoidung: datcho?.id_nguoidung,
            });
            setOpen(false);
            quan.map(async (value) => {
                await sendEmailToQuan(datcho.id_datcho, value.created_user, "Khách hàng đã hủy đơn")
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
            console.log("Cập nhật hồ sơ với dữ liệu:", data);
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
            enqueueSnackbar("Đổi mật khẩu thành công!", { variant: "success" });
            localStorage.removeItem("accounts");
            navigate("/login");
        } catch (error) {
            console.log(error)
            if (error.response && error.response.data.error === "Mật khẩu hiện tại không chính xác") {
                enqueueSnackbar('Mật khẩu hiện tại không chính xác!', { variant: 'error' });
            } else {
                enqueueSnackbar('Có lỗi xảy ra !', { variant: 'error' });
            }
        }
    };

    return (
        <>
            <div className="profile-container">
                <div className="profile-sidebar">
                    <div className="profile-avatar">
                        <img
                            src={
                                nguoidung?.hinh_anh
                                    ? (nguoidung.hinh_anh.startsWith('http')
                                        ? nguoidung.hinh_anh
                                        : `${BASE_URL}/uploads/${nguoidung.hinh_anh}`)
                                    : (accounts.hinh_anh || ImgUser)
                            }
                            alt="User Avatar"
                            className="avatar-img"
                        />
                        <h4 className="profile-name">
                            {nguoidung?.ten_nguoi_dung || "N/A"}
                        </h4>
                    </div>
                    <ul className="profile-menu">
                        <li className="menu-item">
                            <strong> Ngày sinh:</strong>{" "}
                            {nguoidung?.ngay_sinh
                                ? nguoidung.ngay_sinh.split("-").reverse().join("/")
                                : "N/A"}
                        </li>
                        <li className="menu-item">
                            <strong> Giới tính:</strong> {nguoidung?.gioi_tinh || "N/A"}
                        </li>
                        <li className="menu-item">
                            <strong> Điện thoại:</strong> {nguoidung?.so_dien_thoai || "N/A"}
                        </li>
                        <li className="menu-item">
                            <strong> Email: </strong> {nguoidung?.email || "N/A"}
                        </li>
                        <li className="menu-item">
                            <strong> Địa Chỉ:</strong> {nguoidung?.dia_chi || "N/A"}
                        </li>
                        <li className="menu-item-pass">
                            <a href="#">Quên Mật Khẩu</a>
                        </li>
                    </ul>
                </div>

                <div className="profile-content">
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <form className="profile-form">
                                <h5 className="form-title">Cập nhật Hồ Sơ</h5>
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
                        </Grid>
                        {accounts ?
                            <Grid item xs={6} sx={{ display: accounts.googleId === 3 ? 'none' : 'flex' }}>
                                <form className="profile-form" >
                                    <h5 className="form-title">Đổi mật khẩu</h5>
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
                            </Grid> : null
                        }

                    </Grid>
                </div>
            </div>

            <div className="profile-bookings">
                <h3 className="mb-4">Thông Tin Đặt Chỗ</h3>
                {dondatcho.map((value, index) => {
                    return value?.id_nguoidung === accounts?.id_nguoidung ? (
                        <div className="booking-card" key={index}>
                            <div className="d-flex justify-content-between align-items-center">
                                <h4 className="booking-title">Quán ăn: {value.ten_quan}</h4>
                                <span
                                    className={`badge ${value?.trang_thai === 0
                                        ? "badge-warning"
                                        : value?.trang_thai === 1
                                            ? "badge-success"
                                            : "badge-danger"
                                        }`}
                                >
                                    {value?.trang_thai === 0 ? "Đang chờ xử lý" : ""}
                                    {value?.trang_thai === 1 ? "Đã có chỗ" : ""}
                                    {value?.trang_thai === 2 ? "Đã hủy" : ""}
                                </span>
                            </div>
                            <div className="booking-details mt-3">
                                <p>
                                    <strong>Thời gian:</strong> {value?.thoi_gian}
                                </p>
                                <p>
                                    <strong>Số lượng khách:</strong> {value?.so_luong_nguoi}
                                </p>
                                <p>
                                    <strong>Yêu cầu:</strong> {value?.yeu_cau_khac}
                                </p>
                                <p>
                                    <strong>Ngày:</strong>
                                    {value?.ngay_dat.split("T")[0]}
                                </p>
                            </div>
                            <Button
                                variant="contained"
                                color="error"
                                style={
                                    value?.trang_thai === 2
                                        ? { display: "none" }
                                        : { display: "block", width: "100px" }
                                }
                                onClick={() => handleClickOpen(value?.id_datcho)}
                            >
                                Hủy đơn
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Xác nhận hủy đơn</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        Bạn có chắc chắn muốn hủy đặt chỗ quán{" "}
                                        {dondatcho.find((item) => item.id_datcho === id)?.ten_quan}{" "}
                                        này không?
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={onHuydon} color="error" autoFocus>
                                        Có
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        Không
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    ) : null;
                })}
            </div>
        </>
    );
};

export default Profile;