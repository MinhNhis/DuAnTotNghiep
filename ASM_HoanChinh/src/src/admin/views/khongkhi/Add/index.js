import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { addkhongkhi } from "../../../../services/Khongkhi";

const AddKhongKhi = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  const submit = async (value) => {
    try {
      const newKhongkhi = {
        khong_khi: value.khong_khi,
        created_user: accounts.id_nguoidung
      };
      await addkhongkhi(newKhongkhi);
      enqueueSnackbar('Thêm không khí thành công!', { variant: 'success' });
      navigate("/admin/khong-khi");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm không khí!', { variant: 'error' });
      console.error("Lỗi khi thêm Không Khí:", error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM DANH SÁCH KHÔNG KHÍ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              id="khong_khi"
              label="Không khí"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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
            <div>
              <Button color="primary" variant="contained" type="submit" style={{ width: "100px" }}>
                Thêm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddKhongKhi;
