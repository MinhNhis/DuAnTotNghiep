import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Button,
    TextField,
    Grid,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { editNguoiDung, getNguoiDungById } from "../../../services/Nguoidung";
import "./profileadmin.css";
import { BASE_URL } from "../../../config/ApiConfig";
import ImgUser from "../../../admin/assets/images/user.png";
import { changPassword } from "../../../services/Auth";
import { useNavigate } from "react-router-dom";

const  ProfileAdminTable = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    const profileForm = useForm();
    const passwordForm = useForm();
    const { enqueueSnackbar } = useSnackbar();
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
            const resultNguoiDung = await getNguoiDungById(accounts.id_nguoidung);
            setnguoidung(resultNguoiDung.data);
        } catch (error) {
            enqueueSnackbar("Có lỗi xảy ra khi tải thông tin!", { variant: "error" });
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

  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-avatar">
          <img
            src={
              nguoidung?.hinh_anh ? (nguoidung.hinh_anh.startsWith('http') ? nguoidung.hinh_anh : `${BASE_URL}/uploads/${nguoidung.hinh_anh}`) : (ImgUser)
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
  );
};

export default ProfileAdminTable;
