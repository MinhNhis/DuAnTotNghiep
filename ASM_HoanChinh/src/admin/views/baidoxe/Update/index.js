import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { useSnackbar } from 'notistack'; 
import { getBaidoxeById, putbaidoxe } from "../../../../services/Baidoxe";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";

const UpdateBaiDoXe = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [baidoxe, setBaidoxe] = useState({});
  const params = useParams();
  const id = params?.id_baidoxe;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    fetchBaiDoXe();
  }, []);

  const fetchBaiDoXe = async () => {
    const res = await getBaidoxeById(id);
    setBaidoxe(res.data);
    setValue("bai_do_xe", res.data.bai_do_xe || "");
  };

  const onSubmit = async (data) => {
    try {
      await putbaidoxe(id, {
        bai_do_xe: data?.bai_do_xe
      });
      enqueueSnackbar('Cập nhật bãi đỗ xe thành công!', { variant: 'success' }); 
      navigate("/admin/bai-do-xe");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi cập nhật bãi đỗ xe!', { variant: 'error' }); 
      console.error("Lỗi khi cập nhật Bãi Đỗ Xe:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/bai-do-xe");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}>
              CẬP NHẬT BÃI ĐỖ XE
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container" key={String(baidoxe.bai_do_xe)}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Tên bãi đỗ xe
                </label>
                <Controller
                  name="bai_do_xe"
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
                  {...register("bai_do_xe", {
                    required: {
                      value: true,
                      message: "Bãi đỗ xe không được bỏ trống",
                    },
                  })}
                />
                {formState?.errors?.bai_do_xe && (
                  <small className="text-danger">
                    {formState?.errors?.bai_do_xe?.message}
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

export default UpdateBaiDoXe;
