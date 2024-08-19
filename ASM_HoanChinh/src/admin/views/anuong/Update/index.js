import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack'; 
import { getAnuongById, putanuong } from "../../../../services/Anuong";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const UpdateAnUong = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [anuong, setAnuong] = useState({});
  const params = useParams();
  const id = params?.id_anuong;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    fetchAnUong();
  }, []);

  const fetchAnUong = async () => {
    try {
      const res = await getAnuongById(id);
      setAnuong(res.data);
      setValue("an_uong", res.data.an_uong || "");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu ăn uống:", error);
    }
  };

  const onSubmit = async (data) => {
    try {
      await putanuong(id, {
        an_uong: data?.an_uong,
      });
      enqueueSnackbar('Cập nhật ăn uống thành công!', { variant: 'success' }); 
      navigate("/admin/an-uong");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi cập nhật ăn uống!', { variant: 'error' });
      console.error("Lỗi khi cập nhật ăn uống:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/an-uong");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>
              CẬP NHẬT ĂN UỐNG
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container" key={String(anuong.an_uong)}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Tên ăn uống
                </label>
                <Controller
                  name="an_uong"
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
                  {...register("an_uong", {
                    required: {
                      value: true,
                      message: "Ăn uống không được bỏ trống",
                    },
                  })}
                />
                {formState?.errors?.an_uong && (
                  <small className="text-danger">
                    {formState?.errors?.an_uong?.message}
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

export default UpdateAnUong;
