import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'; 
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { addtiennghi } from "../../../../services/Tiennghi";

const AddTienNghi = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const submit = async (value) => {
    try {
      const newTienNghi = {
        tien_nghi: value.tien_nghi,
      };
      await addtiennghi(newTienNghi);
      enqueueSnackbar('Thêm tiện nghi thành công!', { variant: 'success' });
      navigate("/admin/tien-nghi"); 
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm tiện nghi!', { variant: 'error' }); 
      console.error("Lỗi khi thêm Tiện Nghi:", error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM DANH SÁCH TIỆN NGHI
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              id="tien_nghi"
              label="Tiện nghi"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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

export default AddTienNghi;
