import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack';
import { getTiennghiById, puttiennghi } from "../../../../services/Tiennghi";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const UpdateTienNghi = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [tiennghi, setTiennghi] = useState({});
  const params = useParams();
  const id = params?.id_tiennghi;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  useEffect(() => {
    fetchTiennghi();
  }, []);

  const fetchTiennghi = async () => {
    try {
      const res = await getTiennghiById(id);
      setTiennghi(res.data);
      setValue("tien_nghi", res.data.tien_nghi || "");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await puttiennghi(id, {
        tien_nghi: data?.tien_nghi,
        created_user: accounts.id_nguoidung,
        updated_user: accounts.id_nguoidung
      });
      enqueueSnackbar('Cập nhật tiện nghi thành công!', { variant: 'success' });
      navigate("/admin/tien-nghi");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi cập nhật tiện nghi!', { variant: 'error' });
      console.error("Lỗi khi cập nhật Tiện Nghi:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/tien-nghi");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>
              CẬP NHẬT TIỆN NGHI
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container" key={String(tiennghi.tien_nghi)}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Tên tiện nghi
                </label>
                <Controller
                  name="tien_nghi"
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
                  {...register("tien_nghi", {
                    required: {
                      value: true,
                      message: "Tiện nghi không được bỏ trống",
                    },
                  })}
                />
                {formState?.errors?.tien_nghi && (
                  <small className="text-danger">
                    {formState?.errors?.tien_nghi?.message}
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

export default UpdateTienNghi;
