import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { getKehoachById, putKehoach } from "../../../../services/Kehoach";
import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { useSnackbar } from 'notistack'; 

const UpdateKeHoach = () => {
  const { control, register, handleSubmit, formState, setValue } = useForm();
  const [kehoach, setKehoach] = useState({});
  const params = useParams();
  const id = params?.id_kehoach;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  useEffect(() => {
    fetchKeHoach();
  }, []);

  const fetchKeHoach = async () => {
    const res = await getKehoachById(id);
    setKehoach(res.data);
    setValue("ke_hoach", res.data.ke_hoach || "");
  };

  const onSubmit = async (data) => {
    try {
      await putKehoach(id, {
        ke_hoach: data?.ke_hoach,
      });
      enqueueSnackbar('Cập nhật kế hoạch thành công!', { variant: 'success' }); 
      navigate("/admin/ke-hoach");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi cập nhật kế hoạch!', { variant: 'error' }); 
      console.error("Lỗi khi cập nhật Kế Hoạch:", error);
    }
  };

  const handleCancel = () => {
    navigate("/admin/ke-hoach");
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography
              sx={{ fontSize: "18px", fontWeight: "bold", textAlign: "center" }}
            >
              CẬP NHẬT KẾ HOẠCH
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container" key={String(kehoach.ke_hoach)}>
              <div className="mb-3">
                <label htmlFor="" className="form-label">
                  Tên kế hoạch
                </label>
                <Controller
                  name="ke_hoach"
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
                  {...register("ke_hoach", {
                    required: {
                      value: true,
                      message: "Kế hoạch không được bỏ trống",
                    },
                  })}
                />
                {formState?.errors?.ke_hoach && (
                  <small className="text-danger">
                    {formState?.errors?.ke_hoach?.message}
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

export default UpdateKeHoach;
