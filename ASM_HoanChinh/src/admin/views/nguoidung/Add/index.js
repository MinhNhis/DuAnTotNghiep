import React from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, Divider, Box, Typography, Button, TextField } from "@mui/material";
import { addNguoiDung } from "../../../../services/Nguoidung";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

const AddNguoiDung = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const submit = async (value) => {
    try {
      await addNguoiDung({
        ten_nguoi_dung: value?.username,
        mat_khau: value?.password,
        email: value?.email,
        hinh_anh: value?.hinh_anh[0] || '',
        so_dien_thoai: value?.sdt,
        ngay_sinh: value?.ngay_sinh,
        gioi_tinh: value?.gioi_tinh,
        dia_chi: value?.dia_chi,
        vai_tro: value?.vaitro,
      });
      enqueueSnackbar('Thêm người dùng thành công!', { variant: 'success' });
      navigate("/admin/nguoi-dung");
    } catch (error) {
      if (error.response && error.response.data.message === "Email đã tồn tại") {
        enqueueSnackbar('Email đã tồn tại, vui lòng thử email khác!', { variant: 'error' });
      } else {
        enqueueSnackbar('Có lỗi xảy ra khi thêm người dùng!', { variant: 'error' });
      }
    }
  };

  const handleClose = () => {
    navigate('/admin/nguoi-dung');
  };


  return (
      <div className="container">
        <Card variant="outlined" sx={{ p: 0 }}>
          <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
            <Box flexGrow={1}>
              <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
                THÊM NGƯỜI DÙNG
              </Typography>
            </Box>
          </Box>
          <Divider />
          <CardContent sx={{ padding: "30px" }}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Họ và tên
                  </label>
                  <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      label="Họ và tên"
                      {...register("username", {
                        required: {
                          value: true,
                          message: "Tên người dùng không được bỏ trống",
                        },
                      })}
                  />
                  {formState?.errors?.username && (
                      <small className="text-danger">
                        {formState?.errors?.username?.message}
                      </small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <TextField
                      type="email"
                      fullWidth
                      variant="outlined"
                      label="Email"
                      {...register("email", {
                        required: "Email không được bỏ trống",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Email không hợp lệ",
                        },
                      })}
                  />
                  {formState?.errors?.email && (
                      <small className="text-danger">
                        {formState?.errors?.email?.message}
                      </small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Mật khẩu
                  </label>
                  <TextField
                      type="password"
                      fullWidth
                      variant="outlined"
                      label="Mật khẩu"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "Mật khẩu không được bỏ trống",
                        },
                        minLength: {
                          value: 6,
                          message: "Mật khẩu ít nhất phải 6 kí tự"
                        }
                      })}
                  />
                  {formState?.errors?.password && (
                      <small className="text-danger">
                        {formState?.errors?.password?.message}
                      </small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="hinh_anh" className="form-label">
                    Avata
                  </label>
                  <TextField
                      type="file"
                      fullWidth
                      variant="outlined"
                      {...register("hinh_anh")}
                  />
                  {formState?.errors?.hinh_anh && (
                      <small className="text-danger">
                        {formState?.errors?.hinh_anh?.message}
                      </small>
                  )}
                </div>

                <label className="form-label">Vai trò</label>
                <div className="" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div className="form-check">
                    <input
                        className="form-check-input"
                        value={0}
                        type="radio"
                        name="vaitro"
                        id="quanly"
                        {...register("vaitro", {
                          required: {
                            value: true,
                            message: "Không được bỏ trống",
                          },
                        })}
                    />

                    <label className="form-check-label" htmlFor="quanly">
                      Admin
                    </label>
                  </div>

                  <div className="form-check">
                    <input
                        className="form-check-input"
                        value={1}
                        type="radio"
                        name="vaitro"
                        id="khachhang"
                        {...register("vaitro", {
                          required: {
                            value: true,
                            message: "Không được bỏ trống",
                          },
                        })}
                    />
                    <label className="form-check-label" htmlFor="khachhang">
                      Khách hàng
                    </label>
                  </div>
                </div>
                {formState?.errors?.vaitro && (
                    <small className="text-danger mb-3">
                      {formState?.errors?.vaitro?.message}
                    </small>
                )}
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="sdt" className="form-label">
                    Số điện thoại
                  </label>
                  <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      label="Số điện thoại"
                      {...register("sdt", {
                        required: {
                          value: true,
                          message: "Số điện thoại không được bỏ trống",
                        },
                        minLength: {
                          value: 10,
                          message: "Số điện thoại không hợp lệ! Phải 10 chữ số"
                        },
                        maxLength: {
                          value: 10,
                          message: "Số điện thoại không hợp lệ! Phải 10 chữ số"
                        },
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Số điện thoại phải là số"
                        }
                      })}
                  />
                  {formState?.errors?.sdt && (
                      <small className="text-danger">
                        {formState?.errors?.sdt?.message}
                      </small>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="ngày sinh" className="form-label">
                    Ngày sinh
                  </label>
                  <TextField
                      type="date"
                      fullWidth
                      variant="outlined"
                      {...register("ngay_sinh", {
                        required: {
                          value: true,
                          message: "Ngày sinh không được bỏ trống",
                        },
                        validate: (ngay_sinh) => {
                          const selectedDate = new Date(ngay_sinh);
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);

                          if (selectedDate > today) {
                            return "Ngày sinh không hợp lệ!";
                          }

                          return true;
                        }
                      })}
                  />
                  {formState?.errors?.ngay_sinh && (
                      <small className="text-danger">
                        {formState?.errors?.ngay_sinh?.message}
                      </small>
                  )}
                </div>
                <label className="form-label" style={{ paddingTop: "6px" }}>Giới tính</label>
                <div className="mb-3">
                  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    <div className="form-check">
                      <input
                          className="form-check-input"
                          value={"Nam"}
                          type="radio"
                          name="gioitinh"
                          id="nam"
                          {...register("gioi_tinh", {
                            required: {
                              value: true,
                              message: "Giới tính không được bỏ trống",
                            },
                          })}
                      />

                      <label className="form-check-label" htmlFor="quanly">
                        Nam
                      </label>
                    </div>

                    <div className="form-check">
                      <input
                          className="form-check-input"
                          value={"Nữ"}
                          type="radio"
                          name="gioi_tinh"
                          id="nu"
                          {...register("gioi_tinh", {
                            required: {
                              value: true,
                              message: "Giới tính không được bỏ trống",
                            },
                          })}
                      />
                      <label className="form-check-label" htmlFor="khachhang">
                        Nữ
                      </label>
                    </div>
                  </div>

                  {formState?.errors?.gioi_tinh && (
                      <small className="text-danger">
                        {formState?.errors?.gioi_tinh?.message}
                      </small>
                  )}
                </div>
                <div className="mb-3" style={{ paddingTop: "23px" }}>
                  <label htmlFor="địa chỉ" className="form-label">
                    Địa chỉ
                  </label>
                  <TextField
                      type="text"
                      fullWidth
                      variant="outlined"
                      label="Địa chỉ"
                      {...register("dia_chi", {
                        required: {
                          value: true,
                          message: "Địa chỉ không được bỏ trống",
                        },
                      })}
                  />
                  {formState?.errors?.dia_chi && (
                      <small className="text-danger">
                        {formState?.errors?.dia_chi?.message}
                      </small>
                  )}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <Button
                  color="primary"
                  variant="contained"
                  className="mt-0.75"
                  sx={{ width: "100px" }}
                  onClick={handleSubmit(submit)}
              >
                Thêm
              </Button>

              <Button
                  color="danger"
                  variant="contained"
                  className="mt-2 m-lg-2"
                  sx={{ width: "100px" }}
                  onClick={handleClose}
              >
                Hủy
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
};

export default AddNguoiDung;
