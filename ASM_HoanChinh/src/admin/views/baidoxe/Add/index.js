import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack'; 
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { addbaidoxe } from "../../../../services/Baidoxe";

const AddBaiDoXe = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); 

  const submit = async (value) => {
    try {
      const newBaidoxe = {
        bai_do_xe: value.bai_do_xe, 
      };
      await addbaidoxe(newBaidoxe);
      enqueueSnackbar('Thêm bãi đỗ xe thành công!', { variant: 'success' });
      navigate("/admin/bai-do-xe"); 
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi thêm bãi đỗ xe!', { variant: 'error' });
      console.error("Lỗi khi thêm Bãi Đỗ Xe:", error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              THÊM DANH SÁCH BÃI ĐỖ XE
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(submit)}>
            <TextField
              id="bai_do_xe"
              label="Bãi Đỗ Xe"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
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
            <div>
              <Button color="primary" variant="contained" type="submit" style={{width: "100px"}}>
                Thêm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddBaiDoXe;
