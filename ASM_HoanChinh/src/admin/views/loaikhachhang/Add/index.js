import React from "react";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { addLKH } from "../../../../services/Khachhang";
import { useSnackbar } from 'notistack'; 

const AddLKH = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const submit = async (value) => {
    try {
      console.log(value);
      await addLKH({
        khach_hang: value?.loaikhachhang,
      });
      enqueueSnackbar('Thêm loại khách hàng thành công!', { variant: 'success' }); 
      navigate("/admin/loai-khach-hang");
      console.log(value);
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm loại khách hàng!', { variant: 'error' }); 
      console.error('Lỗi khi thêm loại khách hàng:', error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM LOẠI KHÁCH HÀNG
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <TextField
              id="loaikhachhang"
              label= "Loại khách hàng"
              variant="outlined"
              fullWidth
              {...register("loaikhachhang", {
                required: {
                  value: true,
                  message: "Không được bỏ trống",
                },
              })}
            />
            {formState?.errors?.loaikhachhang && (
              <small className="text-danger">
                {formState?.errors?.loaikhachhang?.message}
              </small>
            )}
            <div>
              <Button
                color="primary"
                variant="contained"
                className="mt-2"
                style={{ width: "100px" }}
                onClick={handleSubmit(submit)}
              >
                Thêm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddLKH;
