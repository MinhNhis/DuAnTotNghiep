import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { useSnackbar } from 'notistack'; 
import { addanuong } from "../../../../services/Anuong";

const AddAnUong = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const submit = async (value) => {
    try {
      const newAnuong = {
        an_uong: value.an_uong, 
      };
      await addanuong(newAnuong);
      enqueueSnackbar('Thêm danh sách ăn uống thành công!', { variant: 'success' }); 
      navigate("/admin/an-uong"); 
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm ăn uống!', { variant: 'error' }); 
      console.error("Lỗi khi thêm ăn uống:", error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM DANH SÁCH ĂN UỐNG
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              id="an_uong"
              label="Ăn uống"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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

export default AddAnUong;
