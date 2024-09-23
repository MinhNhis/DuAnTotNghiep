import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { getKhongkhiById, putkhongkhi } from "../../../../services/Khongkhi";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const UpdateKhongKhi = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [khongkhi, setKhongkhi] = useState({});
  const params = useParams();
  const id = params?.id_khongkhi;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  useEffect(() => {
    fetchKhongkhi();
  }, []);

  const fetchKhongkhi = async () => {
    try {
      const res = await getKhongkhiById(id);
      setKhongkhi(res.data);
      setValue("khong_khi", res.data.khong_khi || "");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await putkhongkhi(id, {
        khong_khi: data?.khong_khi,
        created_user: accounts.id_nguoidung,
        updated_user: accounts.id_nguoidung
      });
      enqueueSnackbar('Cập nhật không khí thành công!', { variant: 'success' });
      navigate("/admin/khong-khi");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi cập nhật không khí!', { variant: 'error' });
      console.error("Lỗi khi cập nhật Không Khí:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/khong-khi");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>
              CẬP NHẬT KHÔNG KHÍ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container" key={String(khongkhi.khong_khi)}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Tên không khí
                </label>
                <Controller
                  name="khong_khi"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      variant="outlined"
                      type="text"
                      fullWidth
                      sx={{ mb: 2 }}
                    />
                  )}
                  {...register("khong_khi", {
                    required: {
                      value: true,
                      message: "Không khí không được bỏ trống",
                    },
                  })}
                />
                {formState?.errors?.khong_khi && (
                  <small className="text-danger">
                    {formState?.errors?.khong_khi?.message}
                  </small>
                )}
              </div>
            </div>

            <div
              className="mb-3"
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
              }}
            >
              <div
                className="mb-3"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "5px",
                  marginLeft: "10px"
                }}
              >
                <Button type="submit" color="primary" variant="contained">
                  Sửa
                </Button>

                <Button
                  color="error"
                  variant="contained"
                  onClick={handleCancel}
                >
                  Hủy
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateKhongKhi;
