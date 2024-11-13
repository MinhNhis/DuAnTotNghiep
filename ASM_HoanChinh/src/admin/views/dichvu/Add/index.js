import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

import {
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { addDichvu } from "../../../../services/Dichvu";

const AddDichVu = () => {
  const { register, handleSubmit, formState } = useForm();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  const submit = async (value) => {
    try {
      await addDichvu({
        dich_vu: value?.dich_vu,
        created_user: accounts.id_nguoidung
      });
      enqueueSnackbar('Thêm dịch vụ thành công!', { variant: 'success' }); 
      navigate("/admin/dich-vu");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra, vui lòng thử lại.', { variant: 'error' }); 
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0, }}>
        <Box sx={{ padding: "15px 30px", }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold", }}>
              THÊM DỊCH VỤ
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <TextField id="dichvu" label="dịch vụ" variant="outlined" fullWidth sx={{ mb: 2 }} {...register('dich_vu', {
              required: {
                value: true,
                message: "Dịch vụ không được bỏ trống"
              }
            })} />
            {formState?.errors?.dich_vu && (
              <small className="text-danger">
                {formState?.errors?.dich_vu?.message}
              </small>
            )}
            <div>
              <Button style={{width: "100px"}} color="primary" variant="contained" onClick={handleSubmit(submit)}>
                Thêm
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDichVu;
