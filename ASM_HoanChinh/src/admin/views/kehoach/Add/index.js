import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { addkehoach } from "../../../../services/Kehoach";
import { useSnackbar } from 'notistack';

const AddKeHoach = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  const submit = async (value) => {
    try {
      const newKeHoach = {
        ke_hoach: value.ke_hoach,
        created_user: accounts.id_nguoidung
      };
      await addkehoach(newKeHoach);
      enqueueSnackbar('Thêm kế hoạch thành công!', { variant: 'success' });
      navigate("/admin/ke-hoach");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm kế hoạch!', { variant: 'error' });
      console.error("Lỗi khi thêm Kế Hoạch:", error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM DANH SÁCH KẾ HOẠCH
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              id="ke_hoach"
              label="Kế hoạch"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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

export default AddKeHoach;
