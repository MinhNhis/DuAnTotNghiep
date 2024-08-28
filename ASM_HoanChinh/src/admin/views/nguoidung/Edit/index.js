import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, CardContent, Divider, Box, Typography, Button } from "@mui/material";
import { editNguoiDung, getNguoiDungById } from "../../../../services/Nguoidung";
import { useForm } from "react-hook-form";
import { useSnackbar } from 'notistack'; 

const EditNguoiDung = () => {
  const { control, register, handleSubmit, setValue, formState } = useForm();
  const [nguoidung, setNguoidung] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { enqueueSnackbar } = useSnackbar(); 

  const handleCancle = () => {
    navigate("/admin/nguoi-dung");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getNguoiDungById(id);
      setNguoidung(result.data);
      setValue("username", result.data.ten_nguoi_dung || "");
      setValue("password", result.data.mat_khau || "");
      setValue("email", result.data.email || "");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const submit = async (value) => {
    try {
      await editNguoiDung(id, {
        ten_nguoi_dung: value?.username,
        mat_khau: value?.password,
        email: value?.email,
        vai_tro: value?.vaitro,
      });
      enqueueSnackbar('Cập nhật người dùng thành công!', { variant: 'success' });
      navigate("/admin/nguoi-dung");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi cập nhật người dùng!', { variant: 'error' }); 
      console.error('Lỗi khi cập nhật người dùng:', error);
    }
  };

  return (
    <div className="container">
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              CẬP NHẬT NGƯỜI DÙNG
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <div className="col-6 offset-3">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Tài khoản
              </label>
              <input
                type="text"
                className="form-control"
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
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <input
                type="password"
                className="form-control"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Mật khẩu không được bỏ trống",
                  },
                })}
              />
              {formState?.errors?.password && (
                <small className="text-danger">
                  {formState?.errors?.password?.message}
                </small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
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
              <label className="form-label">Vai trò</label>
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
              {formState?.errors?.vaitro && (
                <small className="text-danger">
                  {formState?.errors?.vaitro?.message}
                </small>
              )}
              <div>
                <Button
                  color="primary"
                  variant="contained"
                  className="mt-2"
                  onClick={handleSubmit(submit)}
                >
                  Sửa
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditNguoiDung;
