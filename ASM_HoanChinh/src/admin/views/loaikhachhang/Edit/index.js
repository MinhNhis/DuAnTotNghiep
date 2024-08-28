import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, Divider, Box, Typography, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { editLKH, getLKHById } from "../../../../services/Khachhang";
import { useSnackbar } from 'notistack';

const EditLKH = () => {
  const { control, register, handleSubmit, setValue, formState } = useForm();
  const [LKH, setLKH] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;
  const { enqueueSnackbar } = useSnackbar();
  const accounts = JSON.parse(localStorage.getItem("accounts"));

  const handleCancle = () => {
    navigate("/admin/loai-khach-hang");
  };

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    try {
      const result = await getLKHById(id);
      setLKH(result.data);
      setValue("loaikhachhang", result.data.khach_hang || "");
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  };

  const submit = async (value) => {
    try {
      await editLKH(id, {
        khach_hang: value?.loaikhachhang,
        created_user: accounts.id_nguoidung,
        updated_user: accounts.id_nguoidung
      });
      enqueueSnackbar('Sửa loại khách hàng thành công!', { variant: 'success' });
      navigate("/admin/loai-khach-hang");
    } catch (error) {
      enqueueSnackbar('Có lỗi xảy ra khi sửa loại khách hàng!', { variant: 'error' });
      console.error('Lỗi khi sửa loại khách hàng:', error);
    }
  };

  return (
    <div>
      <Card variant="outlined" sx={{ p: 0 }}>
        <Box sx={{ padding: "15px 30px" }} display="flex" alignItems="center">
          <Box flexGrow={1}>
            <Typography sx={{ fontSize: "18px", fontWeight: "bold" }}>
              SỬA LOẠI KHÁCH HÀNG
            </Typography>
          </Box>
        </Box>
        <Divider />
        <CardContent sx={{ padding: "30px" }}>
          <form>
            <TextField
              id="loaikhachhang"
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
                Sửa
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditLKH;
